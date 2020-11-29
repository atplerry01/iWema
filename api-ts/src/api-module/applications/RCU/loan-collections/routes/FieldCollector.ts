import * as _ from "lodash";
import { createActionLogService } from "../services/ActionLog";
import { getCaseCollectorByCaseId, getCollectionSevices, updateCaseCollectorService } from "../services/Collector";
import { isAuthenticated } from './../../../../../util/isAuthenticated';
import { redis } from './../../../../../util/redis';
import { checkAccess, logMessage, Paginator } from './../../../../../util/utility';

export const getFieldCaseCollections = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (decoded_token: any) => {
      const selectedCase = _.get(req.query, "selectedCase");
      const agentId = _.get(req.query, "agentId");
      const page = _.get(req.query, "page", 1);
      const per_page = _.get(req.query, "per_page", 50);
      const queryType = _.get(req.query, "searchType");
      const searchText = _.get(req.query, "searchText");
      const dateFrom = _.get(req.query, "dateFrom");
      const dateTo = _.get(req.query, "dateTo");

      const dateRange = `updatedAt >= '${dateFrom}' AND updatedAt <= '${dateTo}'`;
      const forceRemote = _.get(req.query, "forceRemote", false);

      //#region SecurityChecks
      const { accessLevels } = decoded_token;

      try {
        await checkAccess("RC-Loan Tele Collector", accessLevels);
      } catch (error) {
        logMessage(
          req,
          decoded_token.data.sAMAccountName,
          "getTeleCaseCollections",
          JSON.stringify(req.body),

          JSON.stringify(error)
        );
        return res.status(401).json({ err: null, message: "Access Denied. Unauthorized User" });
      }
      //#endregion

      const key = `${'getTeleCaseCollections'}&${selectedCase}&${agentId}&${page}&${per_page}&${queryType}&${searchText}`;
      const getFromCatch = await redis.get(key);


      if (getFromCatch && !forceRemote) {
        console.log('from cache........');
        const data = JSON.parse(getFromCatch);
        const result = await Paginator(data, page, per_page);

        return res.status(200).json({
          data: result
        });
      }

      try {
        const entity = await getCollectionSevices(selectedCase, agentId, queryType, dateRange, searchText);
        const result = await Paginator(entity, page, per_page);

        return res.status(200).json({
          data: result
        });
      } catch (err) {
        return res.status(400).json({ error: err });
      }
    })
    .catch(err => {
      return res.status(400).json({
        data: err
      });
    });
};

export const postFieldCloseCaseActions = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (_decoded_token: any) => {

      // try {
      //   await createActionCaseSchema.validate(req.body, {abortEarly: false});
      // } catch (err) {
      //   return res.status(400).json({ err: formatYupError(err), message: "Validation Error" });
      // }
      const AgentId = _.get(req.body, "AgentId");
      const AgentName = _.get(req.body, "AgentName");
      const CaseId = _.get(req.body, "CaseId");
      const Comment = _.get(req.body, "Comment");

      //#region SecurityChecks
      // const { accessLevels } = decoded_token;

      // try {
      //   await checkAccess("RC-Loan Field Collector", accessLevels);
      // } catch (error) {
      //   logMessage(
      //     req,
      //     decoded_token.data.sAMAccountName,
      //     "postFieldAgentCaseActions",
      //     JSON.stringify(req.body),

      //     JSON.stringify(error)
      //   );
      //   return res.status(401).json({ err: null, message: "Access Denied. Unauthorized User" });
      // }
      //#endregion

      try {
        const caseEntity = await getCaseCollectorByCaseId(CaseId);

        if (caseEntity) {
          caseEntity.MarkClosed = true;

          await updateCaseCollectorService(caseEntity);
          await createActionLogService(CaseId, AgentId, 'Initiate Close', 'Field Collector', Comment, AgentName);
        }

        return res.status(200).json({
          data: true
        });
      } catch (err) {
        return res.status(400).json({ error: err });
      }
    })
    .catch(err => {
      return res.status(400).json({
        data: err
      });
    });
};





export const postFieldEscalatedCaseActions = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (decoded_token: any) => {

      // try {
      //   await createActionCaseSchema.validate(req.body, {abortEarly: false});
      // } catch (err) {
      //   return res.status(400).json({ err: formatYupError(err), message: "Validation Error" });
      // }

      // const AgentId = _.get(req.body, "AgentId");
      const CaseId = _.get(req.body, "CaseId");
      // const Comment = _.get(req.body, "Comment");

      //#region SecurityChecks
      const { accessLevels } = decoded_token;

      try {
        await checkAccess("RC-Loan Field Collector", accessLevels);
      } catch (error) {
        logMessage(
          req,
          decoded_token.data.sAMAccountName,
          "postFieldAgentCaseActions",
          JSON.stringify(req.body),

          JSON.stringify(error)
        );
        return res.status(401).json({ err: null, message: "Access Denied. Unauthorized User" });
      }
      //#endregion

      try {
        const caseEntity = await getCaseCollectorByCaseId(CaseId);

        if (caseEntity) {
          caseEntity.MarkEscalated = true;
          await updateCaseCollectorService(caseEntity);
          // TODO: 
          // await createActionLogService(CaseId, actionId.initiateEscalation, stageId.fieldCollector, AgentId, Comment);
        }

        return res.status(200).json({
          data: true
        });
      } catch (err) {
        return res.status(400).json({ error: err });
      }
    })
    .catch(err => {
      return res.status(400).json({
        data: err
      });
    });
};
