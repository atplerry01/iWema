import * as fs from 'fs';
import * as _ from "lodash";
// import * as fs from 'fs';
import * as path from "path";

  export const checkAccess = (accessName, accessLevels) => {
    return new Promise((resolve, reject) => {
      if (!accessLevels.length || !accessName) { return reject(false); }

      const access = _.filter(accessLevels, x => {
        return _.toLower(x.module) === _.toLower(accessName);
      });
      if (access.length > 0) {
        return resolve(access[0].access_level); // G=GLOBAL, R=REGIONAL, Z=ZONAL, B=BRANCH, S=SELF, C=CHECKER, M = MAKER
      } else {
        return reject(false);
      }
    });
  };

  ////////////////////////  Creating a Dynamic Sorting Function  ///////////////////////////////////
  // function for dynamic sorting
  export const compareValues = (key, order = "asc") => {
    return (a, b) => {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }

      const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order === "desc" ? comparison * -1 : comparison;
    };
    
  };

    // And this is how you’d use it:
  /*
  const bands = [ 
    { genre: 'Rap', band: 'Migos', albums: 2},
    { genre: 'Pop', band: 'Coldplay', albums: 4, awards: 13},
    { genre: 'Rock', band: 'Breaking Benjamins', albums: 1}
  ];

// array is sorted by band, in ascending order by default
    bands.sort(compareValues('band')); 

// array is sorted by band in descending order
    bands.sort(compareValues('band', 'desc')); 

// array is sorted by albums in ascending order
    bands.sort(compareValues('albums'));
*/
  ////////////////////////////////////////////////////////////////////////////////////


  export const Paginator = (items, page = 1, per_page = 50) => {
    return new Promise((resolve, _reject) => {
    const offset = (page - 1) * per_page;

    const paginatedItems = items.slice(offset).slice(0, per_page);
    const total_pages = Math.ceil(items.length / per_page);

    return resolve( {
      page: page,
      per_page: per_page,
      pre_page: page - 1 ? page - 1 : null,
      next_page: total_pages > page ? page + 1 : null,
      total: items.length,
      total_pages: total_pages,
      data: paginatedItems
    });

  });
  };

 export const isEmail = (emaill) => {
    // tslint:disable-next-line:max-line-length
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regex.test(emaill);
  };

  export const isValidAccountNo = (accNo) => {
    
    if (!accNo || !Number.isInteger(Number(accNo)) || accNo.length !== 10) {
      return false;
    }

    return true;
  };

  export const isValidPhone = (phoneNo: string): Boolean => {
    if (!phoneNo || !Number.isInteger(Number(phoneNo)) || phoneNo.length !== 11) {
      return false;
    }
    return true;
   };


  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

 export const getCurrentDate = () => {
    const _dt = new Date();
    return `${_dt.getDate()}-${
      months[_dt.getMonth()]
    }-${_dt.getFullYear()}`;
  };

  export const getCurrentMonthStartDate = () => {
    const _dt = new Date();
    return `01-${months[_dt.getMonth()]}-${_dt.getFullYear()}`;
  };

  export const getPastDate = (days = 1) => {
    // get past date...days===1 means yesterday
    const _dt = new Date();
    _dt.setDate(_dt.getDate() - days);

    return `${_dt.getDate()}-${
      months[_dt.getMonth()]
    }-${_dt.getFullYear()}`;
  };



   export const logMessage = (req, user, subject, request, response) => {

      let ipaddress = '';
      if (req) {
        ipaddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      ipaddress = ipaddress.split(':')[0];
      }

      const filename = new Date().toJSON().split('T')[0] + '.txt';
      // const msg = `\r\nLog Entry : \n Date: ${new Date()} \n User IP: ${ipaddress} \n User: ${user} \n ${subject} \n request: ${request} \n response: ${response} \n ------------------------------- \n \n`;
      const msg = `Date=${new Date()}\t UserIP=${ipaddress}\t User=${user}\t ${subject}\t request=${request}\t response=${response}\n`;

      fs.appendFile(path.join(__dirname, '../logs/' + filename), msg, (err) => {
          if (err) {
              console.log('Error occurred while logging to textfile!');
          } else {
              if (process.env.NODE_ENV !== "test") {
                  console.log('Logged successful');
              }
          }
      });

  };



  export const getADErrorMessages = (err: string) => {
    
    let msg = "Authentication failed.";
  
      if (err.includes('525')) {
          msg = `${msg} User not found`;
      } else  if (err.includes('52e')) {
          msg = `${msg} Username/Password invalid`;
      } else  if (err.includes('530')) {
          msg = `${msg} Not permitted to logon at this time`;
      } else  if (err.includes('531')) {
          msg = `${msg} Not permitted to logon from this workstation`;
      } else  if (err.includes('532')) {
          msg = `${msg} Password expired`;
      } else  if (err.includes('533')) {
          msg = `${msg} Account disabled`;
      } else  if (err.includes('701')) {
          msg = `${msg} Account expired`;
      } else  if (err.includes('773')) {
          msg = `${msg} User must reset password`;
      } else  if (err.includes('775')) {
          msg = `${msg} Account locked out`;
      } else {
          msg = `${msg} Unknown Error`;
      }
      
      return msg;
  };

