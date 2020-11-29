import { getConnection } from "typeorm";

export const getMgtrService = async (search): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {

      let q = '';

      if (search === '' || search === undefined) {
        q = `SELECT * FROM wema360.Policy ORDER BY Id desc`;
      } else {
        // tslint:disable-next-line: max-line-length
        q = `Select * from wema360.Policy WHERE Name LIKE '%${search}%' OR Description LIKE '%${search}%' OR department LIKE '%${search}%' OR refnumber LIKE '%${search}%' OR Unit LIKE '%${search}%' OR name LIKE '%${search}%' OR description LIKE '%${search}%' ORDER by Id desc`;

        // const date = moment(search).format('YYYY-MM-DD');
        
        // if (date === 'Invalid date') {
        //   q = `Select * from wema360.Policy WHERE Name LIKE '%${search}%' OR department LIKE '%${search}%' OR Unit LIKE '%${search}%' OR name LIKE '%${search}%' OR description LIKE '%${search}%' OR addDate LIKE '%${date}%' ORDER by Id desc`;
        // } else {
        //   q = `Select * from wema360.Policy WHERE addDate LIKE '%${date}%' OR ExpiryDate like '%${date}%' ORDER by Id desc`;
        // }

      }

      const returnLists = await getConnection().query(q);

      return resolve(returnLists);
    } catch (err) {
      return reject({ err, message: "No Records" });
    }
  });
};

export const postMgtrService = async (Name, Description, RefNumber, Department, Unit, AddDate, ExpiryDate, FilePath, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      // tslint:disable-next-line:max-line-length
      const q = `INSERT INTO  wema360.Policy (Name, Description, RefNumber, Department, Unit, AddDate, ExpiryDate, FilePath, IsActive, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn)
      VALUES ('${Name}', '${Description}', '${RefNumber}', '${Department}', '${Unit}', '${AddDate}', '${ExpiryDate}','${FilePath}', 1, '${CreatedBy}', '${CreatedOn}', '${ModifiedBy}', '${ModifiedOn}');`;
      const returnLists = await getConnection().query(q);
      return resolve(returnLists);
    } catch (err) {
      return reject({
        err: err,
        message: "Could Not Complete Request",
      });
    }
  });
};

export const updateMgtrService = async (Id, Name, Description, RefNumber, Department, Unit, AddDate, ExpireDate, FilePath, _Active, ModifiedBy): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      // tslint:disable-next-line:max-line-length
      const q = `UPDATE wema360.Policy SET Name = '${Name}', Description= '${Description}',  RefNumber= '${RefNumber}', Department = '${Department}', Unit = '${Unit}', AddDate= '${AddDate}', ExpiryDate= '${ExpireDate}', FilePath = '${FilePath}', IsActive = 1, ModifiedBy= '${ModifiedBy}' WHERE Id = ${Id};`;

      const returnLists = await getConnection().query(q);
      return resolve(returnLists);
    } catch (err) {
      return reject({
        err: err,
        message: "Could Not Complete Request",
      });
    }
  });
};

export const deleteMgtrService = async (id): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      // tslint:disable-next-line:max-line-length
      const q = `DELETE FROM wema360.Policy WHERE Id=${id};`;
      const returnLists = await getConnection().query(q);
      return resolve(returnLists);
    } catch (err) {
      return reject({
        err: err,
        message: "Could Not Complete Request",
      });
    }
  });
};
