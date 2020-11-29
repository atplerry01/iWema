import * as _ from "lodash";
import * as path from "path";
import { isAuthenticated } from "../../../../../util/isAuthenticated";
import { Paginator } from "../../../../../util/utility";
import { deleteByDeptMgtrService, getMgtrByDeptService, getMgtrDepartmentService, postByDeptMgtrService, updateByDeptMgtrService } from "./service";
import multer = require("multer");

export const getMgtrByDeptRoutes = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (_decoded_token: any) => {
      const page = _.get(req.query, "page", 1);
      const per_page = _.get(req.query, "per_page", 50);
      const search = _.get(req.query, "search");

      // const serviceType = _.get(req.query, "serviceType");
      // const startDate = _.get(req.query, "startDate");
      // const endDate = _.get(req.query, "endDate");

      // // const _forceRemote = _.get(req.query, "forceRefresh", false);
      const _export = _.get(req.query, "_export", 0);

      try {
        const entity = await getMgtrByDeptService(search);
        const result = await Paginator(entity, page, per_page);

        if (_export === "1" || _export === 1) {
          return res.status(200).json({
            data: entity,
          });
        }

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

export const postByDeptPolicies = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(() => {
      const policyName = _.get(req.body, "policyName");
      const departmentName = _.get(req.body, "departmentName");
      const unitName = _.get(req.body, "unitName");
      const policyID = _.get(req.body, "policyID");

      postByDeptMgtrService(policyName, departmentName, unitName, policyID)
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

export const updateByDeptPoliciesRoute = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(() => {
      const id = _.get(req.body, "id");
      const policyName = _.get(req.body, "policyName");
      const departmentName = _.get(req.body, "departmentName");
      const unitName = _.get(req.body, "unitName");

      updateByDeptMgtrService(id, policyName, departmentName, unitName)
        .then((report) => {
          return res.status(201).json(report);
        })

        .catch((err) => {
          return res.status(400).json({
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

export const deleteByDeptPoliciesRoute = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(() => {
      const id = _.get(req.body, "id");
      deleteByDeptMgtrService(id)
        .then((report) => {
          return res.status(201).json(report);
        })

        .catch((err) => {
          return res.status(400).json({
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

export const fileUpload = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    //const file = _.get(req.body, "file");
    .then(() => {
      const storage = multer.diskStorage({
        destination: function (_req, _file, cb) {
          cb(null, "files");
        },

        // By default, multer removes file extensions so let's add them back
        filename: function (_req, file, cb) {
          cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
          );
        },
      });
      // 'profile_pic' is the name of our file input field in the HTML form
      let upload = multer({ storage: storage }).single("profile_pic");

      upload(req, res, function () {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any
        // const file = _.get(req.body, "file");
        // if (req.fileValidationError) {
        //   return res.send(req.fileValidationError);
        // } else if (!req.file) {
        //   return res.send("Please select file to upload");
        // } else if (err) {
        //   return res.send(err);
        // } else if (err) {
        //   return res.send(err);
        // }

        // Display uploaded image for user validation
        res.send(req.file);
        console.log(res);
      });
    })
    .catch((err) => {
      return res.status(401).json({
        error: err,
      });
    });
};


export const getPolicyDepartments = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (_decoded_token: any) => {
      const page = _.get(req.query, "page", 1);
      const per_page = _.get(req.query, "per_page", 50);

      const _export = _.get(req.query, "_export", 0);

      try {
        const entity = await getMgtrDepartmentService();
        const result = await Paginator(entity, page, per_page);

        if (_export === "1" || _export === 1) {
          return res.status(200).json({
            data: entity,
          });
        }

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
