import * as _ from 'lodash';
import { executeMySQL } from '../../../../db/dbUtil';
import { EmployeeMaster } from '../../../../entity/iWEMA/EmployeeMaster';
import { EmployeeMasterCopy } from '../../../../entity/iWEMA/EmployeeMasterCopy';
import { sendEmail } from '../../../../util/sendEmail';
import { logMessage } from '../../../../util/utility';
import { IUser } from '../../../users/getUsers/IUser';
import { getUserDetails } from '../../../users/getUsers/service';
import { getUserMenus_QUERY } from './query';

export const profileUserInEmployeeMasterCopy = async (
  app: any,
  username: string
) => {
  try {
    // there is no domain name then add
    const Email = (username.split('@')[1]
      ? username
      : username + '@wemabank.com'
    ).toLowerCase();

    const empMasterUser = await EmployeeMaster.findOne({ where: { Email } });
    if (empMasterUser) {
      return false;
    }

    getUserDetails(app, Email)
      .then(async (user: IUser) => {
        const result = await EmployeeMasterCopy.create({
          Email: user.mail,
          EmployeeName: user.displayName,
          EmployeeNumber: user.company,
          Job_Title: user.title,
          gsmno: user.mobile,
          gradeid: 0,
          status: 'Y'
        }).save();

        if (result) {
          // send email
          const body = `<p>Hello team, </p>
<p>A new user who is not profiled on iWEMA detail has been logged on <strong>employee_master_copy</strong> table</p>
<p>Please complete the user data on the table and inform the development team to complete the process.</p>
<p>Thank you.</p>
`;

          sendEmail(
            process.env.configAD_USERNAME as string,
            process.env.userProfileMailList as string,
            'New User Logged For Profiling on iWEMA',
            'New profiling required for ' + result.EmployeeName,
            'New profiling required for ' + result.EmployeeName,
            body
          );
        }
      })
      .catch(error => {
        logMessage(
          null,
          username,
          'profileUserInEmployeeMasterCopy',
          'profile user',
          error
        );
        return false;
      });

    return true;
  } catch (error) {
    logMessage(
      null,
      username,
      'profileUserInEmployeeMasterCopy',
      'profile user',
      error
    );
    return false;
  }
};

export const getUserMenus = (app: any, username: string) => {
  return new Promise((resolve, reject) => {
    if (!username) {
      return reject({ err: '', message: 'Username is required' });
    }

    const q = getUserMenus_QUERY(username);

    executeMySQL(q)
      .then(_result => {
        const menus: any[] = [];
        const menu_headers: any[] = [];
        const result = _result[0];

        if (result.length) {
          _.each(result, (val, _key) => {
            // console.log('val.menu_name:', val.menu_name)
            if (menu_headers.indexOf(val.menu_name) === -1) {
              const subm = _.filter(result, x => x.menu_name === val.menu_name);
              const fmenu = {
                header: val.menu_name,
                header_display: val.menu_display,
                header_url: val.menu_link,
                header_dispaly_inside: val.menu_display_inside,
                header_standalone: val.standalone,
                header_sub: subm
              };

              menu_headers.push(val.menu_name);
              menus.push(fmenu);
            }
          });
        }

        return resolve(menus);
      })
      .catch(async err => {
        // TODO: Fav Fix
        // check if the user is profiled, if not profiled the user in employee_master_copy and notify someone to complete the user details
        await profileUserInEmployeeMasterCopy(app, username);

        return reject({ err: err, message: 'No menu found' });
      }); // end of execution
  });
};
