import { FormlyFieldConfig } from "@ngx-formly/core";

  export const caseEndpoint = {
    openCases: 'openCases',
    markClosedCases: 'markClosedCases',
    closedCases: 'closedCases',
    markEscalatedCases: 'markEscalatedCases',
    escalatedCases: 'escalatedCases',
    flagedCases: 'flagedCases',
    teleCollectorCases: 'teleCollectorCases',
    fieldCollectorCases: 'fieldCollectorCases',
    agentOpenCollectorCases: 'agentOpenCollectorCases',
    agentMarkEscalatedCollectorCases: 'agentMarkEscalatedCollectorCases',
    agentMarkClosedCollectorCases: 'agentMarkClosedCollectorCases',
    agentClosedCollectorCases: 'agentClosedCollectorCases',
    agentFlagedCollectorCases: 'agentFlagedCollectorCases',
    caseReAssignment: 'caseReAssignment',
    createAgent: 'createAgent'
  };

export const followUpAgent = {
    followUpManager: 'FollowUpManager',
    teleManager: 'TeleManager',
    telecollector: 'TeleCollector',
    fieldcollector: 'FieldCollector'
};

export const entityTypes = {
    finacleCases: 'Finacle',
    teleCollectorCases: 'TeleCollector',
    fieldCollectorCases: 'FieldCollector',
    escalationCases: 'Escalation',
    markedEscalationCases: 'MarkedEscalationCases',
    flagedCases: 'FlagedCases',
    closedCases: 'ClosedCases',
    markedClosedCases: 'MarkedClosedCases',
};


export const modelTabs = {
    escalate: 'escalate',
    closeCase: 'closeCase',
    loanDetail: 'loanDetail',
    callHistory: 'callHistory',
    collectorHistory: 'collectorHistory',
    followUpDetail: 'followUpDetail',
    customerDetail: 'customerDetail',
    caseReAssignment: 'caseReAssignment',
    flagedReAssignment: 'flagedReAssignment',
    revertAction: 'revertAction'
};

// export const outcomeLists = [
//   { label: 'Promise to Pay', value: 'Promise to Pay' },
//   { label: 'Moved Residence', value: 'Moved Residence' },
//   { label: 'Delayed Salary', value: 'Delayed Salary' },
//   { label: 'Address not Found', value: 'Address not Found' },
//    { label: 'Unwilling to Pay', value: 'Unwilling to Pay' },
//    { label: 'Requires more Time', value: 'Requires more Time' },
//    { label: 'Unable to Pay', value: 'Unable to Pay' }
// ];


// export const contactTypeLists = [
//   { label: 'Telephone', value: 'Telephone' },
//   { label: 'Moved Residence', value: 'Moved Residence' }
// ];

// export const contactPlaceLists = [
//   { label: 'Home', value: 'Home' },
//   { label: 'Office', value: 'Office' },
//   { label: 'Club', value: 'Club' },
//   { label: 'Church', value: 'Church' },
//   { label: 'Mosque', value: 'Mosque' },
//   { label: 'Party', value: 'Party' }
// ];

// export const nextActionLists = [
//   { label: 'Wait for PTP due date', value: 'Wait for PTP due date' },
//   { label: 'Visit Customer', value: 'Visit Customer' },
//   { label: 'Call back', value: 'Call back' },
//   { label: 'Firm out-to Recovery Agent', value: 'Firm out-to Recovery Agent' }
// ];

// export const reminderTypeLists = [
//   { label: 'Email', value: 'Email' },
//   { label: 'Visit', value: 'Visit' },
//   { label: 'SMS', value: 'SMS' }
// ];

export const booleanLists = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' }
];

export const followUpStatusLists = [
  { label: 'Disengaged', value: 'Disengaged' },
  { label: 'Deceased', value: 'Deceased' }
];

export const searchType = {
  noSearch: 'noSearch',
  searchAll: 'searchAll',
  dateRangeOnly: 'dateRange',
  searchTextOnly: 'searchTextOnly',
};

export const ToUppercase = (field: FormlyFieldConfig, event: any) => {
  if (event.target.value && field.formControl) {
    field.formControl.patchValue(event.target.value.toUpperCase());
  }
};