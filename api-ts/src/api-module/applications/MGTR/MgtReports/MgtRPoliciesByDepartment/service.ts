import { getConnection } from "typeorm";

export const getMgtrByDeptService = async (search): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      let q = ''; // `SELECT * FROM wema360.PolicyDepartmentTable t1 inner join wema360.PolicyTable t2 on t1.policyID = t2.ID  ORDER by t1.Id desc;`;

      if (search === '') {
        q = `SELECT * FROM wema360.PolicyDepartmentTable t1 inner join wema360.PolicyTable t2 on t1.policyID = t2.ID  ORDER by t1.Id desc;`;
      } else {
        q = `SELECT * FROM wema360.PolicyDepartmentTable t1 
        inner join wema360.PolicyTable t2 on t1.policyID = t2.ID  
        WHERE policyName LIKE '%${search}%' 
        OR departmentName LIKE '%${search}%' 
        OR unitName LIKE '%${search}%' 
        OR t2.name LIKE '%${search}%'
        OR t2.description LIKE '%${search}%'
        OR t2.addDate LIKE '%${search}%'
        ORDER by t1.Id desc;`;
      }

      const returnLists = await getConnection().query(q);
      return resolve(returnLists);
    } catch (err) {
      return reject({ err, message: "No favourite link found" });
    }
  });
};

// getMgtrDepartmentService
export const getMgtrDepartmentService = async (): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      let q = `Select * from wema360.PolicyDepartment ORDER by Id desc`;

      const returnLists = await getConnection().query(q);
      return resolve(returnLists);
    } catch (err) {
      return reject({ err, message: "No Records" });
    }
  });
};


export const postByDeptMgtrService = async (
  policyName,
  departmentName,
  unitName,
  policyID
): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      // tslint:disable-next-line:max-line-length
      const q = `INSERT INTO  wema360.PolicyDepartmentTable (policyName, departmentName, unitName, policyID)
      VALUES ( '${policyName}', '${departmentName}', '${unitName}', ${policyID}) ;`;
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

export const updateByDeptMgtrService = async (
  id,
  policyName,
  departmentName,
  unitName
): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      // tslint:disable-next-line:max-line-length
      const q = `UPDATE wema360.PolicyDepartmentTable
      SET policyName = '${policyName}', departmentName= '${departmentName}',  unitName= '${unitName}'
      WHERE ID = ${id};`;
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

export const deleteByDeptMgtrService = async (id): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      // tslint:disable-next-line:max-line-length
      const q = `DELETE FROM wema360.PolicyDepartmentTable WHERE ID=${id};`;
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
