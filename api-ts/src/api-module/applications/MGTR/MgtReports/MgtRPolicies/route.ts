import * as _ from "lodash";
import * as moment from 'moment';
import { isAuthenticated } from "../../../../../util/isAuthenticated";
import { Paginator } from "../../../../../util/utility";
import { createAuditTrailService } from './../Lookups/service';
import {
  deleteMgtrService, getMgtrService,
  postMgtrService,
  updateMgtrService
} from "./service";


export const getMgtrRoutes = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (decoded_token: any) => {
      const page = _.get(req.query, "page", 1);
      const per_page = _.get(req.query, "per_page", 50);
      const search = _.get(req.query, "search");
      const _export = _.get(req.query, "_export", 0);

      try {
        const Ip = '';
        const ActivityType = 'Get Policy Lists';

        const CreatedBy2 = decoded_token.data.sAMAccountName;
        const ModifiedBy2 = decoded_token.data.sAMAccountName;

        const CreatedOn2 = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
        const ModifiedOn2 = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');

        createAuditTrailService(Ip, ActivityType, CreatedBy2, CreatedOn2, ModifiedBy2, ModifiedOn2);

        const entity = await getMgtrService(search);
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

export const postPolicies = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (decoded_token: any) => {
      const Name = _.get(req.body, "Name");
      const Description = _.get(req.body, "Description");
      const RefNumber = _.get(req.body, "RefNumber");
      const Department = _.get(req.body, "Department");
      const Unit = _.get(req.body, "Unit");
      let ExpireDate = _.get(req.body, "ExpiryDate");
      const FilePath = _.get(req.body, "FilePath");

      const CreatedBy = decoded_token.data.sAMAccountName;
      const ModifiedBy = decoded_token.data.sAMAccountName;

      const AddDate = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
      const CreatedOn = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
      const ModifiedOn = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');

      ExpireDate = ExpireDate === undefined ? 'NULL' : ExpireDate;

      postMgtrService(Name, Description, RefNumber, Department, Unit, AddDate, ExpireDate, FilePath, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn)
        .then(() => {

          const Ip = '';
          const ActivityType = 'Create Policy - ' + Name;

          const CreatedBy2 = decoded_token.data.sAMAccountName;
          const ModifiedBy2 = decoded_token.data.sAMAccountName;

          const CreatedOn2 = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
          const ModifiedOn2 = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');

          createAuditTrailService(Ip, ActivityType, CreatedBy2, CreatedOn2, ModifiedBy2, ModifiedOn2);

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

export const updatePoliciesRoute = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then((decoded_token: any) => {
      const Id = _.get(req.body, "Id");
      const Name = _.get(req.body, "Name");
      const Department = _.get(req.body, "Department");
      const RefNumber = _.get(req.body, "RefNumber");
      const Unit = _.get(req.body, "Unit");
      const Description = _.get(req.body, "Description");
      const AddDate1 = _.get(req.body, "AddDate");
      const ExpireDate1 = _.get(req.body, "ExpiryDate");
      const Active = _.get(req.body, "Active");
      const FilePath = _.get(req.body, "FilePath");

      const ModifiedBy = decoded_token.data.sAMAccountName;
      const AddDate = moment(AddDate1).format('YYYY-MM-DD hh:mm:ss');
      const ExpireDate = moment(ExpireDate1).format('YYYY-MM-DD hh:mm:ss');

      const Ip = '';
      const ActivityType = 'Update Policy with Id - ' + Id;

      const CreatedBy2 = decoded_token.data.sAMAccountName;
      const ModifiedBy2 = decoded_token.data.sAMAccountName;

      const CreatedOn2 = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
      const ModifiedOn2 = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');

      createAuditTrailService(Ip, ActivityType, CreatedBy2, CreatedOn2, ModifiedBy2, ModifiedOn2);

      updateMgtrService(Id, Name, Description, RefNumber, Department, Unit, AddDate, ExpireDate, FilePath, Active, ModifiedBy)
        .then((report) => {
          return res.status(201).json({
            success: true,
            data: report
          });
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

export const deletePoliciesRoute = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then((decoded_token: any) => {
      const id = _.get(req.body, "Id");

      const Ip = '';
      const ActivityType = 'Delete Policy with Id - ' + id;

      const CreatedBy2 = decoded_token.data.sAMAccountName;
      const ModifiedBy2 = decoded_token.data.sAMAccountName;

      const CreatedOn2 = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
      const ModifiedOn2 = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');

      createAuditTrailService(Ip, ActivityType, CreatedBy2, CreatedOn2, ModifiedBy2, ModifiedOn2);


      deleteMgtrService(id)
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
