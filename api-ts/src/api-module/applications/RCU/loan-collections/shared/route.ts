import * as _ from "lodash";
import { createActionLogService, getCaseActionLogService } from "../services/ActionLog";
import { getAgentCategoryService, getAgentDetailService, getAvailableAgentCategoryService } from "../services/Agent";
import { getCaseCollectorByCaseId, updateCaseCollectorService } from "../services/Collector";
import { createCaseCustomerService, getCaseCustomerDetailService } from "../services/CustomerDetail";
import { createFollowUpDetailService, getFollowUpDetailService } from "../services/FollowupDetail";
import { getLoanDetailService } from "../services/Loan";
import { isAuthenticated } from "./../../../../../util/isAuthenticated";
import { Paginator } from './../../../../../util/utility';
// tslint:disable-next-line: max-line-length


export const getLoanDetails = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async () => {
      const LoanAcc = _.get(req.query, "LoanAcc");

      try {
        const entity = await getLoanDetailService(LoanAcc);

        return res.status(200).json({
          data: entity
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


//#region Seed Sections


//#endregion

//#region Genrric Case Data

export const getCaseFollowUpDetail = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async () => {
      const CaseId = _.get(req.query, "caseId");

      try {
        const entity = await getFollowUpDetailService(CaseId);

        return res.status(200).json({
          data: entity
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

export const createCaseFollowUpHistory = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async () => {
      const FollowUpDate = _.get(req.body, "FollowUpDate");
      const Outcome = _.get(req.body, "Outcome");
      const ContactType = _.get(req.body, "ContactType");
      const ContactName = _.get(req.body, "ContactName");
      const ContactPlace = _.get(req.body, "ContactPlace");
      const AmountCollected = _.get(req.body, "AmountCollected");
      const NextAction = _.get(req.body, "NextAction");
      const NextContactDate = _.get(req.body, "NextContactDate");
      const Remarks = _.get(req.body, "Remarks");

      const PromisedToPay = _.get(req.body, "PromisedToPay", false);
      const ReminderType = _.get(req.body, "ReminderType");
      const PromisedPayDate = _.get(req.body, "PromisedPayDate");
      const PickUpRequired = _.get(req.body, "PickUpRequired", false);
      const FollowUpStatus = _.get(req.body, "FollowUpStatus");
      const HasFollowUpStatus = _.get(req.body, "HasFollowUpStatus", false);

      const AgentId = _.get(req.body, "AgentId");
      const AgentName = _.get(req.body, "AgentName");
      const CaseId = _.get(req.body, "Id");
      const Comment = _.get(req.body, "Remarks");

      try {
        await createFollowUpDetailService(
          FollowUpDate, Outcome, ContactType, ContactName, ContactPlace,
          AmountCollected, NextAction, NextContactDate, Remarks, PromisedToPay,
          ReminderType, PromisedPayDate, PickUpRequired, FollowUpStatus, AgentId, CaseId);

        const caseEntity = await getCaseCollectorByCaseId(CaseId);

        if (caseEntity) {
          let action = 'FollowUp';

          if (PromisedToPay) {
            action = 'PromiseToPay';
          }

          if (HasFollowUpStatus) {
            caseEntity.IsFlaged = true;
            action = 'InitiateFlag';
          }

          caseEntity.IsTreated = true;
          caseEntity.NextActionDate = NextContactDate;

          await updateCaseCollectorService(caseEntity);
          await createActionLogService(CaseId, AgentId, action, caseEntity.CaseStage, Comment, AgentName);
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

// Customer Details
export const getCaseCustomerDetail = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async () => {
      const CaseId = _.get(req.query, "caseId");

      try {
        const entity = await getCaseCustomerDetailService(CaseId);

        return res.status(200).json({
          data: entity
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

export const createCaseCustomerDetail = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async () => {
      const Name = _.get(req.body, "Name");
      const Address = _.get(req.body, "Address");
      const Location = _.get(req.body, "Location");
      const State = _.get(req.body, "State");
      const Telephone1 = _.get(req.body, "Telephone1");
      const Telephone2 = _.get(req.body, "Telephone2");
      const CaseId = _.get(req.body, "Id");

      try {
        await createCaseCustomerService(Name, Address, Location, State, Telephone1, Telephone2, CaseId);

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

// getCaseActionLogs
export const getCaseActionLogs = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async () => {
      const CaseId = _.get(req.query, "caseId");

      try {
        const entity = await getCaseActionLogService(CaseId);
        return res.status(200).json({
          data: entity
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


// Agent Section
export const getAgentByEmail = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (decoded_token: any) => {
      const category = _.get(req.query, "category");
      const email = decoded_token.data.mail;

      try {
        const result = await getAgentDetailService(email, category);
        return res.status(200).json({
          data: result
        });
      } catch (err) {
        return false;
      }
    })
    .catch(err => {
      return res.status(400).json({
        data: err
      });
    });
};

export const getAgentCollector = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (_decoded_token: any) => {
      const page = _.get(req.query, "page", 1);
      const per_page = _.get(req.query, "per_page", 50);
      const AgentCategory = _.get(req.query, "AgentCategory");

      try {
        const entity = await getAgentCategoryService(AgentCategory);
        const result = await Paginator(entity, page, per_page);

        return res.status(200).json({
          data: result
        });
      } catch (err) {
        return false;
      }
    })
    .catch(err => {
      return res.status(400).json({
        data: err
      });
    });
};

export const getAvailableAgentCollector = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (_decoded_token: any) => {
      const page = _.get(req.query, "page", 1);
      const per_page = _.get(req.query, "per_page", 50);
      const AgentCategory = _.get(req.query, "AgentCategory");

      try {
        const entity = await getAvailableAgentCategoryService(AgentCategory);
        const result = await Paginator(entity, page, per_page);

        return res.status(200).json({
          data: result
        });
      } catch (err) {
        return false;
      }
    })
    .catch(err => {
      return res.status(400).json({
        data: err
      });
    });
};
//#endregion
