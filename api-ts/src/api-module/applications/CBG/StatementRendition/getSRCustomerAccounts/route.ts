
import * as _ from 'lodash';
import { isAuthenticated } from "../../../../../util/isAuthenticated";
import { checkAccess, logMessage } from '../../../../../util/utility';
import { getCustomerAccounts } from './service';

export const getSRCustomerAccountsRouter = (req, res, jwt) => {

    isAuthenticated(req, jwt).then( async(decoded_token: any) => {
        const accno = _.get(req.query, 'accno');

        const {accessLevels} = decoded_token;

        try {
            const level = await checkAccess("SR-Statement Profiling", accessLevels );
  
          if (level !== "M") {
            return res.status(401).json({
              err: null,
              message: "Access Denied. Unauthorized User"
            });
          }
            
        } catch (error) {
            logMessage(req, decoded_token.data.sAMAccountName,
                'getCustomerAccountsRouter', accno, error);

                return res.status(401).json({
                  err: null,
                  message: "Access Denied. Unauthorized User"
                });
        }
       
        getCustomerAccounts(accno).then(async(result: any[]) => {
                // if (result[0]) {
                // const cif = result[0].CUSTOMERID;
                // const profiledaccounts = await SRCifAccount.find({ where: { cif } });
                // if (profiledaccounts.length) {
                //   const profiledAccNos = profiledaccounts.map(f => f.accountNumber);
                //   if (profiledAccNos.length) {
                //     const filterdResult = result.filter(f => !profiledAccNos.includes(f.ACCOUNTNUMBER));
                //     return res.status(200).json({data: filterdResult, message: 'Account numbers not showing have been profiled already'});
                //   }
                // }
                // } 

            return res.status(200).json({data: result, message: null});
        }).catch(err => {
           logMessage(req, decoded_token.data.sAMAccountName,
                'getCustomerAccounts', accno, JSON.stringify(err));
            return res.status(400).json({ error: err });
        });

    }).catch(err => {
        return res.status(401).json({ error: err });
    });

};
