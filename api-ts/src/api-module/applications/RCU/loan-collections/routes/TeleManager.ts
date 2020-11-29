import * as _ from "lodash";
import { isAuthenticated } from '../../../../../util/isAuthenticated';
import { redis } from '../../../../../util/redis';
import { checkAccess, logMessage, Paginator } from '../../../../../util/utility';
import { createActionLogService } from "../services/ActionLog";
import { getAgentId, getEscalatedAgentWithZoneService, updateAgentCaseCountService } from "../services/Agent";
import { getCaseById, updateCaseService } from "../services/Case";
import { getCaseCollectorByCaseId, getCollectionSevices, getTeleCloseCases, updateCaseCollectorService } from "../services/Collector";

export const getTeleManagerCaseCollections = (req, res, jwt) => {
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
      const forceRemote = _.get(req.query, "forceRemote", false);
      const dateRange = `updatedAt >= '${dateFrom}' AND updatedAt <= '${dateTo}'`;

      //#region SecurityChecks
      const { accessLevels } = decoded_token;

      try {
        await checkAccess("RC-Loan Followup Manager", accessLevels);
      } catch (error) {
        logMessage(
          req,
          decoded_token.data.sAMAccountName,
          "getTeleManagerCaseCollections",
          JSON.stringify(req.body),

          JSON.stringify(error)
        );
        return res.status(401).json({ err: null, message: "Access Denied. Unauthorized User" });
      }
      //#endregion

      const key = `${'getTeleManagerCaseCollections'}&${selectedCase}&${agentId}&${page}&${per_page}&${queryType}&${searchText}`;
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

export const getTeleManagerCaseCloseCollections = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (decoded_token: any) => {
      const page = _.get(req.query, "page", 1);
      const per_page = _.get(req.query, "per_page", 50);
      // const queryType = _.get(req.query, "searchType");
      // const searchText = _.get(req.query, "searchText");
      // const forceRemote = _.get(req.query, "forceRemote", false);

      //#region SecurityChecks
      const { accessLevels } = decoded_token;

      try {
        await checkAccess("RC-Loan Followup Manager", accessLevels);
      } catch (error) {
        logMessage(
          req,
          decoded_token.data.sAMAccountName,
          "getTeleManagerCaseCollections",
          JSON.stringify(req.body),

          JSON.stringify(error)
        );
        return res.status(401).json({ err: null, message: "Access Denied. Unauthorized User" });
      }
      //#endregion

      // const key = `${'getTeleManagerCaseCollections'}&${selectedCase}&${agentId}&${page}&${per_page}&${queryType}&${searchText}`;
      // const getFromCatch = await redis.get(key);

      // if (getFromCatch && !forceRemote) {
      //   console.log('from cache........');
      //   const data = JSON.parse(getFromCatch);
      //   const result = await Paginator(data, page, per_page);

      //   return res.status(200).json({
      //     data: result
      //   });
      // }

      try {
        const entity = await getTeleCloseCases();

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

export const postTeleManagerEscalateCaseActions = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (_decoded_token: any) => {
      
      const AgentId = _.get(req.body, "AgentId");
      const CaseId = _.get(req.body, "CaseId");
      const Comment = _.get(req.body, "Comment");
      const State = _.get(req.body, "State");
      
      //#region SecurityChecks
      // const { accessLevels } = decoded_token;

      // try {
      //   await checkAccess("RC-Loan Followup Manager", accessLevels);
      // } catch (error) {
      //   logMessage(
      //     req,
      //     decoded_token.data.sAMAccountName,
      //     "postTeleManagerCaseActions",
      //     JSON.stringify(req.body),

      //     JSON.stringify(error)
      //   );
      //   return res.status(401).json({ err: null, message: "Access Denied. Unauthorized User" });
      // }
      //#endregion

      try {

        const agent = await getAgentId(AgentId);
        const caseEntity = await getCaseCollectorByCaseId(CaseId);

        // TODO: 
        const caseState = State;
        const escalatedAgent = await getEscalatedAgentWithZoneService('Field Collector', caseState);

        if (escalatedAgent === undefined || escalatedAgent === null) {
          return res.status(400).json(
            { 
              error: `There is no Agent within the Case Zone (${State})`, 
              message: `There is no Agent within the Case Zone (${State})` 
            });
        }

        if (caseEntity && agent && escalatedAgent) {
          // Approved Escalations
          caseEntity.MarkEscalated = false;
          caseEntity.IsFlaged = false;
          caseEntity.MarkClosed = false;
          caseEntity.IsTreated = false;
          caseEntity.CaseStage = 'Field Collector';
          caseEntity.AgentId = escalatedAgent.Id;

          agent.ActiveCount -= 1;
          escalatedAgent.ActiveCount += 1;


          await updateCaseCollectorService(caseEntity);

          await createActionLogService(CaseId, AgentId, 'Approve Escalation', 'Tele Collector', Comment, agent.Name);
          await createActionLogService(CaseId, escalatedAgent.Id, 'EscalationAssignment', 'Field Collector', Comment, escalatedAgent.Name);

          await updateAgentCaseCountService(agent);
          await updateAgentCaseCountService(escalatedAgent);
        } else {
          // TODO
          // return res.status(404).json({ error: 'No Agent in the selected Zone' });
          return res.status(400).json({ error: `There is no Agent within the Case Zone (${State})`, message: `There is no Agent within the Case Zone (${State})` });
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

export const postTeleManagerCloseCaseActions = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (_decoded_token: any) => {
      // try {
      //   await createManagerActionCaseSchema.validate(req.body, {abortEarly: false});
      // } catch (err) {
      //   return res.status(400).json({ err: formatYupError(err), message: "Validation Error" });
      // }

      const AgentId = _.get(req.body, "AgentId");
      const AgentName = _.get(req.body, "AgentName");
      const CaseId = _.get(req.body, "Id");
      const Stage = _.get(req.body, "Stage");
      let Comment = _.get(req.body, "Comment");

      //#region SecurityChecks
      // const { accessLevels } = decoded_token;

      // try {
      //   await checkAccess("RC-Loan Followup Manager", accessLevels);
      // } catch (error) {
      //   logMessage(
      //     req,
      //     decoded_token.data.sAMAccountName,
      //     "postTeleManagerCaseActions",
      //     JSON.stringify(req.body),

      //     JSON.stringify(error)
      //   );
      //   return res.status(401).json({ err: null, message: "Access Denied. Unauthorized User" });
      // }
      //#endregion

      try {

        const agent = await getAgentId(AgentId);
        const caseEntity = await getCaseCollectorByCaseId(CaseId);

        if (caseEntity && agent) {
          Comment = 'Close Case';

          // update case
          const c = await getCaseById(CaseId);

          if (c) {
            c.IsClosed = true;
            await updateCaseService(c);
          }

          agent.ActiveCount -= 1;
          await createActionLogService(CaseId, 'Approve Close', Stage, AgentId, Comment, AgentName);
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

export const postTeleManagerReAssignCaseActions = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (_decoded_token: any) => {

      // try {
      //   await createManagerReAssignCaseSchema.validate(req.body, {abortEarly: false});
      // } catch (err) {
      //   return res.status(400).json({ err: formatYupError(err), message: "Validation Error" });
      // }

      const AgentId = _.get(req.body, "AgentId");
      const CaseId = _.get(req.body, "CaseId");
      const Comment = _.get(req.body, "Comment");
      const ReAssignAgentId = _.get(req.body, "ReAssignAgentId");

      //#region SecurityChecks
      // const { accessLevels } = decoded_token;

      // try {
      //   await checkAccess("RC-Loan Followup Manager", accessLevels);
      // } catch (error) {
      //   logMessage(
      //     req,
      //     decoded_token.data.sAMAccountName,
      //     "postTeleManagerCaseActions",
      //     JSON.stringify(req.body),

      //     JSON.stringify(error)
      //   );
      //   return res.status(401).json({ err: null, message: "Access Denied. Unauthorized User" });
      // }
      //#endregion

      try {

        const agent = await getAgentId(AgentId);
        const caseEntity = await getCaseCollectorByCaseId(CaseId);

        if (caseEntity && agent) {
          // Case ReAssignment
          const reAssignAgent = await getAgentId(ReAssignAgentId);

          caseEntity.MarkEscalated = false;
          caseEntity.IsFlaged = false;
          caseEntity.IsTreated = false;
          caseEntity.MarkClosed = false;
          caseEntity.AgentId = ReAssignAgentId;
          caseEntity.AgentName = reAssignAgent ? reAssignAgent.Name : '';

          agent.ActiveCount -= 1;

          if (reAssignAgent) {
            reAssignAgent.ActiveCount += 1;
          }

          await updateCaseCollectorService(caseEntity);
          await createActionLogService(CaseId, ReAssignAgentId, 'Case ReAssignment', 'Tele Collector', Comment, caseEntity.AgentName);
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
