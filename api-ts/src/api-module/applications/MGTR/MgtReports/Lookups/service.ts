import { getConnection } from "typeorm";

export const getDepartmentService = async (): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      let q = `SELECT Id, Name FROM wema360.PolicyDepartment`;

      const returnLists = await getConnection().query(q);
      return resolve(returnLists);
    } catch (err) {
      return reject({ err, message: "No records found" });
    }
  });
};

export const postDepartmentService = async (Name): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      // tslint:disable-next-line:max-line-length
      const q = `INSERT INTO  wema360.PolicyDepartment (Name) VALUES ('${Name}');`;

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


// Policy Notification
export const getAllPolicyNotificationService = async (): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      let q = `SELECT t1.Id, t1.PolicyId, t1.MsgTo, t1.CC, t1.Subject, t1.Message, t2.Name, t2.Department FROM wema360.PolicyNotification t1 INNER JOIN wema360.Policy t2 on t1.PolicyId = t2.Id`;

      const returnLists = await getConnection().query(q);
      return resolve(returnLists);
    } catch (err) {
      return reject({ err, message: "No records found" });
    }
  });
};

export const getPolicyNotificationByIdService = async (Id): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      let q = `SELECT * FROM wema360.PolicyNotification t1 INNER JOIN wema360.Policy t2 on t1.PolicyId = t2.Id where t1.PolicyId = ${Id}`;

      const returnLists = await getConnection().query(q);
      return resolve(returnLists);
    } catch (err) {
      return reject({ err, message: "No records found" });
    }
  });
};

export const postPolicyNotificationService = async (PolicyId, To, CC, Subject, Message): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      // tslint:disable-next-line:max-line-length
      const q = `INSERT INTO  wema360.PolicyNotification (PolicyId, MsgTo, CC, Subject, Message) VALUES ('${PolicyId}', '${To}', '${CC}', '${Subject}', '${Message}');`;

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

export const updatePolicyNotificationService = async (Id, PolicyId, To, CC, Subject, Message): Promise<any> => {
  return new Promise(async (resolve, reject) => {
      try {
          // tslint:disable-next-line:max-line-length
          const q = `UPDATE wema360.PolicyNotification SET PolicyId = '${PolicyId}', MsgTo = '${To}', CC = '${CC}', Subject = '${Subject}', Message = '${Message}' WHERE ID = ${Id};`;
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

export const deletePolicyNotificationService = async (id): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      // tslint:disable-next-line:max-line-length
      const q = `DELETE FROM wema360.PolicyNotification WHERE Id=${id};`;
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

// Regulation Notification
export const getAllRegulationNotificationService = async (): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      let q = `SELECT t1.Id, t1.PolicyId, t1.MsgTo, t1.CC, t1.Subject, t1.Message, t2.Title, t2.RefNumber FROM wema360.PolicyRegNotification t1 INNER JOIN wema360.PolicyRegulation t2 on t1.PolicyId = t2.Id`;

      const returnLists = await getConnection().query(q);
      return resolve(returnLists);
    } catch (err) {
      return reject({ err, message: "No records found" });
    }
  });
};

export const getRegulationNotificationByIdService = async (Id): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      let q = `SELECT t1.Id, t1.PolicyId, t1.MsgTo, t1.CC, t1.Subject, t1.Message, t2.Title, t2.RefNumber FROM wema360.PolicyRegNotification t1 INNER JOIN wema360.PolicyRegulation t2 on t1.PolicyId = t2.Id where t1.PolicyId = ${Id}`;

      const returnLists = await getConnection().query(q);
      return resolve(returnLists);
    } catch (err) {
      return reject({ err, message: "No records found" });
    }
  });
};

export const postRegulationNotificationService = async (PolicyId, To, CC, Subject, Message): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      // tslint:disable-next-line:max-line-length
      const q = `INSERT INTO  wema360.PolicyRegNotification (PolicyId, MsgTo, CC, Subject, Message) VALUES ('${PolicyId}', '${To}', '${CC}', '${Subject}', '${Message}' );`;

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

export const updateRegulationNotificationService = async (Id, PolicyId, To, CC, Subject, Message): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      // tslint:disable-next-line:max-line-length
      const q = `UPDATE wema360.PolicyRegNotification SET PolicyId = '${PolicyId}', MsgTo = '${To}', CC = '${CC}', Subject = '${Subject}', Message = '${Message}' WHERE ID = ${Id};`;

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

export const deleteRegulationNotificationService = async (id): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      // tslint:disable-next-line:max-line-length
      const q = `DELETE FROM wema360.PolicyRegNotification WHERE Id=${id};`;
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


// getFrequencyService

export const getFrequencyService = async (): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      let q = `SELECT * FROM wema360.PolicyFrequency`;

      const returnLists = await getConnection().query(q);
      return resolve(returnLists);
    } catch (err) {
      return reject({ err, message: "No records found" });
    }
  });
};

export const postFrequencyService = async (frequency): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      // tslint:disable-next-line:max-line-length
      const q = `INSERT INTO  wema360.PolicyFrequency (Frequency) VALUES ('${frequency}');`;

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


/// AuditTrail
export const getAuditTrailService = async (): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      let q = `SELECT * FROM wema360.PolicyAuditTrail`;

      const returnLists = await getConnection().query(q);
      return resolve(returnLists);
    } catch (err) {
      return reject({ err, message: "No records found" });
    }
  });
};

export const createAuditTrailService = async (Ip, ActivityType, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      // tslint:disable-next-line:max-line-length
      const q = `INSERT INTO wema360.PolicyAuditTrail
      (Ip, ActivityType, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn)
      VALUES('${Ip}', '${ActivityType}', '${CreatedBy}', '${CreatedOn}', '${ModifiedBy}', '${ModifiedOn}');`;

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
