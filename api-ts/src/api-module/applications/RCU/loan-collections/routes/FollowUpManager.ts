import * as _ from "lodash";
import { createActionLogService } from "../services/ActionLog";
import { createAgentService, getAgentId, updateAgentCaseCountService } from "../services/Agent";
import { getNewCollectionSevices, updateCaseService } from "../services/Case";
import { getCaseCollectorByCaseId, getCollectionSevices, updateCaseCollectorService } from "../services/Collector";
import { isAuthenticated } from './../../../../../util/isAuthenticated';
import { checkAccess, logMessage, Paginator } from './../../../../../util/utility';

export const getFollowUpManagerCaseCollections = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (_decoded_token: any) => {
      const selectedCase = _.get(req.query, "selectedCase");
      const page = _.get(req.query, "page", 1);
      const per_page = _.get(req.query, "per_page", 50);
      const queryType = _.get(req.query, "searchType");
      const searchText = _.get(req.query, "searchText");
      const dateFrom = _.get(req.query, "dateFrom");
      const dateTo = _.get(req.query, "dateTo");

      const dateRange = `updatedAt >= '${dateFrom}' AND updatedAt <= '${dateTo}'`;

      try {
        const entity = await getCollectionSevices(selectedCase, '', queryType, dateRange, searchText);
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

// getFollowUpManagerCaseCloseCollections
export const getFollowUpManagerCaseCloseCollections = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (_decoded_token: any) => {
      const page = _.get(req.query, "page", 1);
      const per_page = _.get(req.query, "per_page", 50);

      try {
        const entity = await getCollectionSevices('closedCases');
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

export const postManagerCloseCaseActions = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (_decoded_token: any) => {

      const AgentId = _.get(req.body, "AgentId");
      const CaseId = _.get(req.body, "CaseId");
      const Comment = _.get(req.body, "Comment");


      //#region SecurityChecks
      // const { accessLevels } = decoded_token;

      // try {
      //   await checkAccess("RC-Loan Followup Manager", accessLevels);
      // } catch (error) {
      //   logMessage(
      //     req,
      //     decoded_token.data.sAMAccountName,
      //     "postManagerCaseActions",
      //     JSON.stringify(req.body),

      //     JSON.stringify(error)
      //   );
      //   return res.status(401).json({ err: null, message: "Access Denied. Unauthorized User" });
      // }
      //#endregion

      try {

        const caseEntity = await getCaseCollectorByCaseId(CaseId);
        const agent = await getAgentId(AgentId);

        if (caseEntity && agent) {
          caseEntity.IsClosed = true;
          caseEntity.IsTreated = true;

          await updateCaseService(caseEntity);

          agent.ActiveCount -= 1;

          await createActionLogService(CaseId, agent.Id, 'Approve Close', caseEntity.CaseStage, Comment, agent.Name);
          await updateAgentCaseCountService(agent);

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


export const getNewCaseCollections = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (_decoded_token: any) => {
      const page = _.get(req.query, "page", 1);
      const per_page = _.get(req.query, "per_page", 50);

      try {
        const entity = await getNewCollectionSevices();
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

export const createAgent = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (_decoded_token: any) => {

      // try {
      //   await createManagerActionCaseSchema.validate(req.body, {abortEarly: false});
      // } catch (err) {
      //   return res.status(400).json({ err: formatYupError(err), message: "Validation Error" });
      // }

      const AgentName = _.get(req.body, "Name");
      const AgentEmail = _.get(req.body, "Email");
      const AgentCategory = _.get(req.body, "AgentCategory");
      const AgentZone = _.get(req.body, "Zone");

      //#region SecurityChecks
      // const { accessLevels } = decoded_token;

      // try {
      //   await checkAccess("RC-Loan Followup Manager", accessLevels);
      // } catch (error) {
      //   logMessage(
      //     req,
      //     decoded_token.data.sAMAccountName,
      //     "postManagerCaseActions",
      //     JSON.stringify(req.body),

      //     JSON.stringify(error)
      //   );
      //   return res.status(401).json({ err: null, message: "Access Denied. Unauthorized User" });
      // }
      //#endregion

      try {
        // get Collector Manager

        if (AgentCategory) {
          await createAgentService(AgentEmail, AgentName, AgentCategory, AgentZone);
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

export const postManagerReAssignCaseActions = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (decoded_token: any) => {

      // try {
      //   await createManagerActionCaseSchema.validate(req.body, {abortEarly: false});
      // } catch (err) {
      //   return res.status(400).json({ err: formatYupError(err), message: "Validation Error" });
      // }

      const AgentId = _.get(req.body, "AgentId");
      const AgentName = _.get(req.body, "AgentName");
      const CaseId = _.get(req.body, "Id");
      const Stage = _.get(req.body, "Stage");
      const Comment = _.get(req.body, "Comment");

      const ReAssignAgentId = _.get(req.query, "ReAssignAgentId");

      //#region SecurityChecks
      const { accessLevels } = decoded_token;

      try {
        await checkAccess("RC-Loan Followup Manager", accessLevels);
      } catch (error) {
        logMessage(
          req,
          decoded_token.data.sAMAccountName,
          "postManagerCaseActions",
          JSON.stringify(req.body),

          JSON.stringify(error)
        );
        return res.status(401).json({ err: null, message: "Access Denied. Unauthorized User" });
      }
      //#endregion

      try {

        const agent = await getAgentId(AgentId);
        const caseEntity = await getCaseCollectorByCaseId(CaseId);

        if (caseEntity && agent) {
          const reAssignAgent = await getAgentId(ReAssignAgentId);

          caseEntity.MarkEscalated = false;
          caseEntity.IsFlaged = false;
          caseEntity.MarkClosed = false;
          caseEntity.AgentId = ReAssignAgentId;

          agent.ActiveCount -= 1;

          if (reAssignAgent) {
            reAssignAgent.ActiveCount += 1;
          }

          await updateCaseCollectorService(caseEntity);
          await createActionLogService(CaseId, 'Case ReAssignment', Stage, ReAssignAgentId, Comment, AgentName);
          await updateAgentCaseCountService(agent);
          await updateAgentCaseCountService(reAssignAgent);
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
