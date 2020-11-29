import { getConnection } from "typeorm";

export const getPolicyArchiveService = async (): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      let q = `Select * from wema360.PolicyFileArchive  ORDER by Id desc`;

      const returnLists = await getConnection().query(q);
      return resolve(returnLists);
    } catch (err) {
      return reject({ err, message: "No Records" });
    }
  });
};


export const postPolicyArchiveService = async (title, description, filePath): Promise<any> => {

  return new Promise(async (resolve, reject) => {
    try {
      // tslint:disable-next-line:max-line-length
      const q = `INSERT INTO  wema360.PolicyFileArchive (title, description, path)
        VALUES ('${title}',  '${description}', '${filePath}') ;`;
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