import * as _ from "lodash";
import { isAuthenticated } from "../../../../../util/isAuthenticated";
import { Paginator } from "../../../../../util/utility";
import { deletePolicyNotificationService, deleteRegulationNotificationService, getAllPolicyNotificationService, getAllRegulationNotificationService, getAuditTrailService, getDepartmentService, getFrequencyService, getPolicyNotificationByIdService, getRegulationNotificationByIdService, postDepartmentService, postPolicyNotificationService, postRegulationNotificationService, updatePolicyNotificationService, updateRegulationNotificationService } from "./service";

export const getPolicyDepartments = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (_decoded_token: any) => {
      const page = _.get(req.query, "page", 1);
      const per_page = _.get(req.query, "per_page", 50);

      try {
        const entity = await getDepartmentService();
        const result = await Paginator(entity, page, per_page);

        return res.status(200).json({
          data: result,
        });
      } catch (err) {
        return res.status(400).json({ error: err });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        data: err,
      });
    });
};

export const postDepartments = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (_decoded_token: any) => {
      const Name = _.get(req.body, "name");

      postDepartmentService(Name)
        .then(() => {
          return res.status(201).json({
            success: true
          });
        })
        .catch((err) => {
          return res.status(400).json({
            success: false,
            error: err,
          });
        });
    })
    .catch((err) => {
      return res.status(401).json({
        error: err,
      });
    });
};


// Policy Notification
export const getAllPolicyNotification = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (_decoded_token: any) => {
      const page = _.get(req.query, "page", 1);
      const per_page = _.get(req.query, "per_page", 50);

      try {
        const entity = await getAllPolicyNotificationService();
        const result = await Paginator(entity, page, per_page);

        return res.status(200).json({
          success: true,
          data: result,
        });
      } catch (err) {
        return res.status(400).json({ error: err });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        data: err,
      });
    });
};

export const getPolicyNotificationById = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (_decoded_token: any) => {
      const Id = _.get(req.query, "Id");
      const page = _.get(req.query, "page", 1);
      const per_page = _.get(req.query, "per_page", 50);

      try {
        const entity = await getPolicyNotificationByIdService(Id);
        const result = await Paginator(entity, page, per_page);

        return res.status(200).json({
          data: result,
        });
      } catch (err) {
        return res.status(400).json({ error: err });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        data: err,
      });
    });
};

export const postPolicyNotifications = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (_decoded_token: any) => {
      const PolicyId = _.get(req.body, "PolicyId");
      const To = _.get(req.body, "To");
      const CC = _.get(req.body, "CC");
      const Subject = _.get(req.body, "Subject");
      const Message = _.get(req.body, "Message");
      
      postPolicyNotificationService(PolicyId, To, CC, Subject, Message)
        .then(() => {
          return res.status(201).json({
            success: true
          });
        })
        .catch((err) => {
          return res.status(400).json({
            success: false,
            error: err,
          });
        });
    })
    .catch((err) => {
      return res.status(401).json({
        error: err,
      });
    });
};

export const updatePolicyNotifications = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(() => {
      const Id = _.get(req.body, "Id");
      const PolicyId = _.get(req.body, "PolicyId");
      const To = _.get(req.body, "To");
      const CC = _.get(req.body, "CC");
      const Subject = _.get(req.body, "Subject");
      const Message = _.get(req.body, "Message");
      
      updatePolicyNotificationService(Id, PolicyId, To, CC, Subject, Message)
        .then((report) => {
          return res.status(201).json({
            success: true,
            data: report
          });
        })
        .catch((err) => {
          return res.status(400).json({
            success: false,
            error: err,
          });
        });
    })
    .catch((err) => {
      return res.status(401).json({
        error: err,
      });
    });
};

export const deletePolicyNotifications = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(() => {
      const id = _.get(req.body, "Id");
      
      deletePolicyNotificationService(id)
        .then((report) => {
          return res.status(201).json({
            success: true,
            data: report
          });
        })

        .catch((err) => {
          return res.status(400).json({
            success: false,
            error: err,
          });
        });
    })
    .catch((err) => {
      return res.status(401).json({
        success: false,
        error: err,
      });
    });
};

// Regulation Notification
export const getAllRegulationNotification = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (_decoded_token: any) => {
      const page = _.get(req.query, "page", 1);
      const per_page = _.get(req.query, "per_page", 50);

      try {
        console.log('======> start')
        const entity = await getAllRegulationNotificationService();
        const result = await Paginator(entity, page, per_page);

        console.log('@@@@@@', entity);
        return res.status(200).json({
          success: true,
          data: result,
        });
      } catch (err) {
        return res.status(400).json({ error: err });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        data: err,
      });
    });
};

export const getRegulationNotificationById = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (_decoded_token: any) => {
      const Id = _.get(req.query, "Id");
      const page = _.get(req.query, "page", 1);
      const per_page = _.get(req.query, "per_page", 50);

      try {
        const entity = await getRegulationNotificationByIdService(Id);
        const result = await Paginator(entity, page, per_page);

        return res.status(200).json({
          data: result,
        });
      } catch (err) {
        return res.status(400).json({ error: err });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        data: err,
      });
    });
};

export const postRegulationNotifications = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (_decoded_token: any) => {
      const PolicyId = _.get(req.body, "PolicyId");
      const To = _.get(req.body, "To");
      const CC = _.get(req.body, "CC");
      const Subject = _.get(req.body, "Subject");
      const Message = _.get(req.body, "Message");

      postRegulationNotificationService(PolicyId, To, CC, Subject, Message)
        .then(() => {
          return res.status(201).json({
            success: true
          });
        })
        .catch((err) => {
          return res.status(400).json({
            success: false,
            error: err,
          });
        });
    })
    .catch((err) => {
      return res.status(401).json({
        error: err,
      });
    });
};

export const updateRegulationNotifications = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(() => {
      const Id = _.get(req.body, "Id");
      const PolicyId = _.get(req.body, "PolicyId");
      const To = _.get(req.body, "To");
      const CC = _.get(req.body, "CC");
      const Subject = _.get(req.body, "Subject");
      const Message = _.get(req.body, "Message");
      
      updateRegulationNotificationService(Id, PolicyId, To, CC, Subject, Message)
        .then((report) => {
          return res.status(201).json({
            success: true,
            data: report
          });
        })
        .catch((err) => {
          return res.status(400).json({
            success: false,
            error: err,
          });
        });
    })
    .catch((err) => {
      return res.status(401).json({
        error: err,
      });
    });
};

export const deleteRegulationNotifications = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(() => {
      const id = _.get(req.body, "Id");
      
      deleteRegulationNotificationService(id)
        .then((report) => {
          return res.status(201).json({
            success: true,
            data: report
          });
        })

        .catch((err) => {
          return res.status(400).json({
            success: false,
            error: err,
          });
        });
    })
    .catch((err) => {
      return res.status(401).json({
        success: false,
        error: err,
      });
    });
};

// Frequency
export const getFrequency = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (_decoded_token: any) => {
      const page = _.get(req.query, "page", 1);
      const per_page = _.get(req.query, "per_page", 50);

      try {
        const entity = await getFrequencyService();
        const result = await Paginator(entity, page, per_page);

        return res.status(200).json({
          data: result,
        });
      } catch (err) {
        return res.status(400).json({ error: err });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        data: err,
      });
    });
};

export const postFrequency = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (_decoded_token: any) => {
      const frequency = _.get(req.body, "frequency");

      postDepartmentService(frequency)
        .then(() => {
          return res.status(201).json({
            success: true
          });
        })
        .catch((err) => {
          return res.status(400).json({
            success: false,
            error: err,
          });
        });
    })
    .catch((err) => {
      return res.status(401).json({
        error: err,
      });
    });
};

// Audit Trail

export const getAuditTrails = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (_decoded_token: any) => {
      const page = _.get(req.query, "page", 1);
      const per_page = _.get(req.query, "per_page", 50);

      try {
        const entity = await getAuditTrailService();
        const result = await Paginator(entity, page, per_page);

        return res.status(200).json({
          data: result,
        });
      } catch (err) {
        return res.status(400).json({ error: err });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        data: err,
      });
    });
};

