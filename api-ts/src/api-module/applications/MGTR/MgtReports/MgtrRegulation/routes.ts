import * as _ from "lodash";
import * as moment from 'moment';
import { isAuthenticated } from "../../../../../util/isAuthenticated";
import { Paginator } from "../../../../../util/utility";
import { PolicyRegulation } from './../../../../../entity/MGTR/PolicyRegulation';
import { createAuditTrailService } from './../Lookups/service';
import { deleteRegulationService, getRegulationService, postRegulationService, updateRegulationService } from "./service";

export const getRegulationsRoute = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (decoded_token: any) => {
      const page = _.get(req.query, "page", 1);
      const per_page = _.get(req.query, "per_page", 50);
      const search = _.get(req.query, "search");

      // // const _forceRemote = _.get(req.query, "forceRefresh", false);
      const _export = _.get(req.query, "_export", 0);

      try {

        const Ip = '';
        const ActivityType = 'Get Regulations Lists';

        const CreatedBy2 = decoded_token.data.sAMAccountName;
        const ModifiedBy2 = decoded_token.data.sAMAccountName;

        const CreatedOn2 = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
        const ModifiedOn2 = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');

        createAuditTrailService(Ip, ActivityType, CreatedBy2, CreatedOn2, ModifiedBy2, ModifiedOn2);


        const entity = await getRegulationService(search);
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

export const postRegulationsRoute = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then((decoded_token: any) => {
      const title = _.get(req.body, "Title");
      const source = _.get(req.body, "Source");
      const Obligation = _.get(req.body, "Obligation");
      const Description = _.get(req.body, "Description");
      const refNumber = _.get(req.body, "RefNumber");
      const issuanceDate = _.get(req.body, "IssuanceDate");
      const filePath = _.get(req.body, "FilePath");
      const RegulatoryReturns = _.get(req.body, "RegulatoryReturns");
      const ConcernedUnit = _.get(req.body, "ConcernedUnit");
      const NotificationFrequency = _.get(req.body, "NotificationFrequency");
      const NotificationDayDiff = _.get(req.body, "NotificationDayDiff");
      const PolicyType = _.get(req.body, "PolicyType");
      const ImplementationDate = _.get(req.body, "ImplementationDate");

      const NotificationLastUpdated = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');

      const entity = new PolicyRegulation();
      entity.Title = title;
      entity.Source = source;
      entity.Obligation = Obligation;
      entity.Description = Description;
      entity.RefNumber = refNumber;
      entity.IssuanceDate = issuanceDate;
      entity.FilePath = filePath;
      entity.RegulatoryReturns = RegulatoryReturns;
      entity.ConcernedUnit = ConcernedUnit;
      entity.PolicyType = PolicyType;
      entity.ImplementationDate = ImplementationDate;
      entity.NotificationFrequency = NotificationFrequency + ' days interval';
      entity.NotificationDayDiff = NotificationDayDiff;
      entity.NotificationLastUpdated = NotificationLastUpdated;
      entity.ImplementationDate = ImplementationDate;
      
      const Ip = '';
      const ActivityType = 'Create Regulation with Title ' + title;

      const CreatedBy2 = decoded_token.data.sAMAccountName;
      const ModifiedBy2 = decoded_token.data.sAMAccountName;

      const CreatedOn2 = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
      const ModifiedOn2 = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');

      createAuditTrailService(Ip, ActivityType, CreatedBy2, CreatedOn2, ModifiedBy2, ModifiedOn2);

      postRegulationService(entity)
        .then(() => {
          return res.status(201).json({
            success: true
          });
        }).catch((err) => {
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

export const updateRegulationsRoute = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then((decoded_token: any) => {

      const Id = _.get(req.body, "Id");
      const Title = _.get(req.body, "Title");
      const Source = _.get(req.body, "Source");
      const Obligation = _.get(req.body, "Obligation");
      const Description = _.get(req.body, "Description");
      const RefNumber = _.get(req.body, "RefNumber");
      const IssuanceDate2 = _.get(req.body, "IssuanceDate");
      const FilePath = _.get(req.body, "FilePath");
      const RegulatoryReturns = _.get(req.body, "RegulatoryReturns");
      const ConcernedUnit = _.get(req.body, "ConcernedUnit");
      const NotificationFrequency = _.get(req.body, "NotificationFrequency");
      const NotificationDayDiff = _.get(req.body, "NotificationDayDiff");
      const PolicyType = _.get(req.body, "PolicyType");
      const ImplementationDate = _.get(req.body, "ImplementationDate");

      const IssuanceDate = moment(IssuanceDate2).format('YYYY-MM-DD hh:mm:ss');

      // const NotificationLastUpdated = moment(new Date()).add(NotificationDayDiff, 'days').format('YYYY-MM-DD hh:mm:ss');
      const NotificationLastUpdated = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');

      
      const Ip = '';
      const ActivityType = 'Create Regulation with Title ' + Title;

      const CreatedBy2 = decoded_token.data.sAMAccountName;
      const ModifiedBy2 = decoded_token.data.sAMAccountName;

      const CreatedOn2 = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
      const ModifiedOn2 = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');

      createAuditTrailService(Ip, ActivityType, CreatedBy2, CreatedOn2, ModifiedBy2, ModifiedOn2);

      updateRegulationService(Id, ImplementationDate, Title, Source, Obligation, Description, RefNumber, IssuanceDate, FilePath, RegulatoryReturns, ConcernedUnit, NotificationFrequency, NotificationDayDiff, NotificationLastUpdated, PolicyType)
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

export const deleteRegulationsRoute = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then((decoded_token: any) => {
      const id = _.get(req.body, "Id");

      
      const Ip = '';
      const ActivityType = 'Delete Regulation with Id ' + id;

      const CreatedBy2 = decoded_token.data.sAMAccountName;
      const ModifiedBy2 = decoded_token.data.sAMAccountName;

      const CreatedOn2 = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
      const ModifiedOn2 = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');

      createAuditTrailService(Ip, ActivityType, CreatedBy2, CreatedOn2, ModifiedBy2, ModifiedOn2);

      deleteRegulationService(id)
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
