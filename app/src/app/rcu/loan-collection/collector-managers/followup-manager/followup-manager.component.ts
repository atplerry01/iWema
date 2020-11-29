import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import * as moment from 'moment';
import { DataService } from '../../../../shared/service/data.service';
import { UtilityService } from '../../../../shared/service/utility.service';
import { caseEndpoint, entityTypes, modelTabs, searchType } from '../../shared/constant';
import { agentHeader, collectionHeader } from '../../shared/tableHeader';

@Component({
  selector: 'app-followup-manager',
  templateUrl: './followup-manager.component.html',
  styleUrls: ['./followup-manager.component.scss']
})
export class FollowupManagerComponent implements OnInit {
  isInprogress = false;
  showNotFoundMsg = false;

  page = 1;
  per_page = 100;
  totalRecords = 0;
  total_pages = 0;
  pre_page?: number;
  next_page?: number;

  currentUser = '';
  reportTitle = 'Case Collections';
  reportHeaders = [];
  reportData: any = [];

  loanDetails = {
    AgentId: '',
    CLSIN_BAL: 0,
    APPROV_DATE: '',
    CREDIT_TRAN_DATE: '',
    EXPIRY_DATE: '',
    NEXT_DMD_DATE: '',
    PAST_DUE_DATE: '',
    INT_IN_SUSP: 0,
    INT_PAST_DUE: 0,
    LAST_CR_AMT: 0,
    MGT_FEES: 0,
    NORMAL_INT: 0,
    PD: 0,
    PDO: 0,
    PENAL_INT: 0,
    PENAL_PAST_DUE: 0,
    PLR: 0,
    PRI_PAST_DUE: 0,
    REPAYMNT_AMOUNT: 0,
    REPAY_ACCT_BAL: 0,
    SANCT_LIMIT: 0,
    TOT_INT_AMT: 0,
  };

  selectedCase = {
    Id: '', 
    LoanAccountNumber: '',
    AccountName: '',
    OperatingAccNumber: '',
    selectedCaseId: '',
    caseId: '',
    AgentId: ''
  };

  followUpHeader = [
    {
      name: 'AmountCollected',
      title: 'AmountCollected',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ContactName',
      title: 'ContactName',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ContactPlace',
      title: 'ContactPlace',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ContactType',
      title: 'ContactType',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'FollowUpDate',
      title: 'FollowUpDate',
      right: false,
      isDate: true,
      isNumber: false
    },
    {
      name: 'NextAction',
      title: 'NextAction',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'NextContactDate',
      title: 'NextContactDate',
      right: false,
      isDate: true,
      isNumber: false
    },
    {
      name: 'Outcome',
      title: 'Outcome',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'PromisedToPay',
      title: 'PromisedToPay',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Remarks',
      title: 'Remarks',
      right: false,
      isDate: false,
      isNumber: false
    }
  ];

  contactDetailHeader = [
    {
      name: 'Name',
      title: 'Name',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Address',
      title: 'Address',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Location',
      title: 'Location',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Telephone1',
      title: 'Telephone1',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Telephone2',
      title: 'Telephone2',
      right: false,
      isDate: false,
      isNumber: false
    }
  ];
  
  collectorHeader = [
    {
      name: 'Stage',
      title: 'Stage',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Action',
      title: 'Action',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Comment',
      title: 'Comment',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'AgentName',
      title: 'AgentName',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'createdAt',
      title: 'createdAt',
      right: false,
      isDate: true,
      isNumber: false
    }
  ];

  selectedCaseCode = 'TeleCollector';
  
  caseTypes = [
    { code: 'Finacle', name: 'Finacle Loan Cases' },
    { code: 'TeleCollector', name: 'TeleCollector' },
    { code: 'FieldCollector', name: 'FieldCollector' },
    { code: 'MarkedClosedCases', name: 'MarkedClosedCases' },
    { code: 'FlagedCases', name: 'FlagedCases' },
    { code: 'ClosedCases', name: 'ClosedCases' },
    { code: 'agents', name: 'agents' }
  ];

  selectedEndpoint = '';
  selectedSearchQuery = '';

  maintainModal = false;
  showModalSubmit = false;
  showForm = false;
  showEscalationButton = false;
  showCloseButton = false;
  showAgentReassignment = false;
  showFlagAssignButton = false;
  onAgentPage = false;
  showAgentModal = false;
  currentModalTab = '';
  currentAction = '';
  selectedCaseId = '';
  selectedModel = '';

  submitLabel = 'Submit';
  formTitle = '';

  model: any = {};
  fields: any[] = [];
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  
  contactOptions: any[] = [];
  caseCallHistory: any[] = [];
  caseFollowUpDetails: any[] = [];
  actionLogs: any[] = [];
  casesFiltered: any[] = [];
  customerCaseDetail: any = [];
  caseCustomerDetail: any = [];
  caseCollectionHistory: any = [];
  reAssignAgents: any = [];
  
  outcomeLists: any = [];
  contactTypeLists: any = [];
  nextActionLists: any = [];
  followUpStatusLists: any = [];
  reminderTypeLists: any = [];
  lookupCollections: any = [];

  showFollowUpLists: boolean = true;
  showCustomerDetailLists: boolean = true;

  actionFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-12',
          type: 'input',
          key: 'Comment',
          templateOptions: {
            label: 'Reason for Action',
            required: true
          }
        }
      ]
    }
  ];

  flagCaseReAssignmentFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-12',
          type: 'select',
          key: 'ReAssignStage',
          templateOptions: {
            required: true, label: 'ReAssign Agent',
            options: this.reAssignAgents
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-12',
          type: 'select',
          key: 'ReAssignAgentId',
          templateOptions: {
            required: true, label: 'ReAssign Agent',
            options: this.reAssignAgents
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-12',
          type: 'input',
          key: 'Comment',
          templateOptions: {
            label: 'Reason for Re-Assignment',
            required: true
          }
        }
      ]
    }
  ];

  caseReAssignmentFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-12',
          type: 'select',
          key: 'ReAssignAgentId',
          templateOptions: {
            required: true, label: 'ReAssign Agent',
            options: this.reAssignAgents
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-12',
          type: 'input',
          key: 'Comment',
          templateOptions: {
            label: 'Reason for Re-Assignment',
            required: true
          }
        }
      ]
    }
  ];

  casefields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-3',
          type: 'input',
          key: 'CIF_ID',
          templateOptions: {
            label: 'CIF_ID',
            disabled: true
          }
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'REPAYMNT_ACCT',
          templateOptions: {
            label: 'REPAYMNT_ACCT',
            disabled: true
          }
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'ACCT_NAME',
          templateOptions: {
            label: 'ACCT_NAME',
            disabled: true
          }
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'APPROV_DATE',
          templateOptions: {
            label: 'APPROV_DATE',
            disabled: true
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-3',
          type: 'input',
          key: 'CLSIN_BAL',
          templateOptions: {
            type: 'number',
            label: 'CLSIN_BAL',
            disabled: true
          }
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'CREDIT_TRAN_DATE',
          templateOptions: {
            label: 'CREDIT_TRAN_DATE',
            disabled: true
          }
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'EXPIRY_DATE',
          templateOptions: {
            label: 'EXPIRY_DATE',
            disabled: true
          }
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'INTEREST_RATE',
          templateOptions: {
            type: 'number',
            label: 'INTEREST_RATE',
            disabled: true
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-3',
          type: 'input',
          key: 'INT_IN_SUSP',
          templateOptions: {
            label: 'INT_IN_SUSP',
            disabled: true
          }
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'INT_PAST_DUE',
          templateOptions: {
            label: 'INT_PAST_DUE',
            disabled: true
          }
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'INTEREST_DUE',
          templateOptions: {
            label: 'InterestDue',
            disabled: true
          }
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'LAST_CR_AMT',
          templateOptions: {
            label: 'LAST_CR_AMT',
            disabled: true
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-3',
          type: 'input',
          key: 'LAST_INT_AMT',
          templateOptions: {
            label: 'LAST_INT_AMT',
            disabled: true
          }
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'NEXT_DMD_DATE',
          templateOptions: {
            label: 'NEXT_DMD_DATE',
            disabled: true
          }
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'PAST_DUE_DATE',
          templateOptions: {
            type: 'number',
            label: 'PAST_DUE_DATE',
            disabled: true
          }
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'PDO',
          templateOptions: {
            type: 'number',
            label: 'PDO',
            disabled: true
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-3',
          type: 'input',
          key: 'PENAL_PAST_DUE',
          templateOptions: {
            label: 'PENAL_PAST_DUE',
            disabled: true
          }
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'PRI_PAST_DUE',
          templateOptions: {
            label: 'PRI_PAST_DUE',
            disabled: true
          }
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'SANCT_LEVEL_AUTH',
          templateOptions: {
            type: 'number',
            label: 'SANCT_LEVEL_AUTH',
            disabled: true
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-3',
          type: 'input',
          key: 'TENOR_MONTHS',
          templateOptions: {
            label: 'TENOR_MONTHS',
            disabled: true
          }
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'TOT_INT_AMT',
          templateOptions: {
            label: 'TOT_INT_AMT',
            disabled: true
          }
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'ZONE_DESC',
          templateOptions: {
            type: 'number',
            label: 'ZONE_DESC',
            disabled: true
          }
        }
      ]
    },
  ];

  agentfields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-12',
          type: 'input',
          key: 'Name',
          templateOptions: {
            label: 'Agent Name',
            required: true
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-12',
          type: 'input',
          key: 'Email',
          templateOptions: {
            label: 'Agent Email',
            required: true
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-12',
          type: 'select',
          key: 'AgentCategory',
          templateOptions: {
            required: true,
            label: 'AgentCategory',
            options: [
              { label: 'Tele Collector', value: 'Tele Collector' },
              { label: 'Field Collector', value: 'Field Collector' },
              { label: 'Reposession', value: 'Reposession' },
              { label: 'Litigation', value: 'Litigation' }
            ]
          }
        }
      ]
    },
    // {
    //   fieldGroupClassName: 'row',
    //   fieldGroup: [
    //     {
    //       className: 'col-12',
    //       type: 'select',
    //       key: 'ManagerId',
    //       templateOptions: {
    //         required: true,
    //         label: 'Agent Manager',
    //         options: [] // this.agentManagers
    //       }
    //     }
    //   ]
    // },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-12',
          type: 'select',
          key: 'Zone',
          templateOptions: {
            required: true,
            label: 'Agent Zone',
            options: [] // this.branchZones
          }
        }
      ]
    }
  ];

  constructor(
    private dataService: DataService,
    public utilityService: UtilityService
  ) {}

  ngOnInit() {
    const myAccess = this.utilityService.getAccessInfo('RC-Loan Followup Manager');
    if (myAccess.name === 'No Access') {
      this.utilityService.goBack();
    }

    this.currentUser = '';
    this.reportTitle = 'All Finacle Cases';
    this.reportHeaders = collectionHeader;
    this.reportData = [];

    this.selectedEndpoint = caseEndpoint.openCases;
    this.getCaseCollections(this.selectedEndpoint);

    this.getAgents();
    // this.getFieldCollectorAgent();
    this.getLookups();
  }

  formatCurrency(value: any) : any {
    const x = parseFloat(value);
    const c = value !== null || value !== undefined || value !== '' ? (x).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : '';  // 12,345.67
    return c;
  }

  formatDate(value) {
    const c = moment(value).format('DD-MMM-YYYY');
    return c;
  }

  
  onCaseTypeChange (entity) {
    this.showEscalationButton = false;
    this.showCloseButton = false;
    this.showAgentReassignment = false;
    this.showFlagAssignButton = false;
    this.selectedSearchQuery = '';

    this.reportHeaders = collectionHeader;

    if (entity === entityTypes.finacleCases) {
      this.reportTitle = 'Finacle Cases';
      this.reportData = [];
      this.selectedEndpoint = caseEndpoint.openCases;
      this.getCaseCollections(this.selectedEndpoint);

    } else if (entity === entityTypes.teleCollectorCases) {
      this.reportTitle = 'Tele Collector Cases';
      this.reportData = [];
      this.selectedEndpoint = caseEndpoint.teleCollectorCases;
      this.getCaseCollections(this.selectedEndpoint);

    } else if (entity === entityTypes.fieldCollectorCases) {
      this.showCloseButton = false;
      this.showEscalationButton = false;
      this.showAgentReassignment = false;

      this.reportTitle = 'Field Collector Cases';
      this.reportData = [];
      this.selectedEndpoint = caseEndpoint.fieldCollectorCases;
      this.getCaseCollections(this.selectedEndpoint);

    } else if (entity === entityTypes.markedEscalationCases) {
      this.showEscalationButton = true;
      this.showCloseButton = false;
      this.showAgentReassignment = false;

      this.reportTitle = 'Mark Escalated Cases';
      this.reportData = [];
      this.selectedEndpoint = caseEndpoint.markEscalatedCases;
      this.getCaseCollections(this.selectedEndpoint);

    } else if (entity === entityTypes.markedClosedCases) {
      this.showCloseButton = true;
      this.showEscalationButton = false;
      this.showAgentReassignment = false;

      this.reportTitle = 'Marked Closed Cases';
      this.reportData = [];
      this.selectedEndpoint = caseEndpoint.markClosedCases;
      this.getCaseCollections(this.selectedEndpoint);

    } else if (entity === entityTypes.flagedCases) {
      this.showCloseButton = true;
      this.showEscalationButton = false;
      this.showFlagAssignButton = false;

      this.reportTitle = 'Flagged Cases';
      this.reportData = [];
      this.selectedEndpoint = caseEndpoint.flagedCases;
      this.getCaseCollections(this.selectedEndpoint);

    } else if (entity === entityTypes.closedCases) {
      this.showCloseButton = false;
      this.showEscalationButton = false;
      this.showAgentReassignment = false;

      this.reportHeaders  = collectionHeader;
      this.reportTitle = 'Closed Cases';
      this.reportData = [];
      this.selectedEndpoint = caseEndpoint.closedCases;
      this.getClosedCases();

    } else if (entity === 'agents') {
      this.reportTitle = 'Agents';
      this.reportHeaders  = agentHeader;
      this.reportData = [];
      this.selectedEndpoint = 'Agents';
      this.onAgentPage = true;
      this.getAgents();
    }
  }


  getCaseCollections = (caseEndPoint, forceRefresh: boolean = false) => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    let endPointUrl;
    endPointUrl = `manager/loanCollections?selectedCase=${caseEndPoint}`;
    const url = `${endPointUrl}&forceRemote=${forceRefresh}&page=${this.page}&per_page=${this.per_page}&${this.selectedSearchQuery}`;

    this.dataService.Get(url).subscribe(
      res => {
        const entity: any = res.data;

        if (entity && entity.data.length) {
          this.reportData = entity.data;
          this.pre_page = entity.pre_page;
          this.next_page = entity.next_page;
          this.totalRecords = entity.total;
          this.total_pages = entity.total_pages;
        } else {
          this.showNotFoundMsg = true;
        }

        this.isInprogress = false;
      },
      error => {
        this.reportData = [];
        this.totalRecords = 0;
        this.total_pages = 0;

        this.utilityService.showErrorToast(error, 'Something went wrong!');
        this.isInprogress = false;
        this.showNotFoundMsg = true;
      }
    );
  }

  onPageChange(offset) {
    this.page = offset / this.per_page + 1;

    if (this.selectedEndpoint === caseEndpoint.openCases) {
      this.getCaseCollections(caseEndpoint.openCases);
    } else if (this.selectedEndpoint === caseEndpoint.escalatedCases) {
      this.getCaseCollections(caseEndpoint.escalatedCases);
    } else if (this.selectedEndpoint === caseEndpoint.markEscalatedCases) {
      this.getCaseCollections(caseEndpoint.markEscalatedCases);
    } else if (this.selectedEndpoint === caseEndpoint.markClosedCases) {
      this.getCaseCollections(caseEndpoint.markClosedCases);
    } else if (this.selectedEndpoint === caseEndpoint.closedCases) {
      this.getCaseCollections(caseEndpoint.closedCases);
    }
  }

  onRowSelected($event) {

    console.log($event);

    this.selectedCase = $event;
    this.selectedCaseId = $event.Id;

    this.selectedCase = { ...this.selectedCase, selectedCaseId: this.selectedCase.Id, caseId: this.selectedCase.Id }

    this.formTitle = 'Loan Details';
    this.currentModalTab = modelTabs.loanDetail;
    this.currentAction = modelTabs.loanDetail;
    this.showModalSubmit = false;
    this.showForm = true;
    this.setForm();

    this.getLoanDetails($event.LoanAccountNumber);

  }

  /// Additional Genric Task
  onMenuEdit(event) {
    if (this.showAgentReassignment) {
      this.formTitle = 'Agent ReAssignment';
      this.submitLabel = 'ReAssignment Case';
      this.currentAction = modelTabs.caseReAssignment;
      this.currentModalTab = modelTabs.caseReAssignment;

    } else if (this.showFlagAssignButton) {
      this.formTitle = 'Flag ReAssignment';
      this.submitLabel = 'ReAssignment Case';
      this.currentAction = modelTabs.caseReAssignment;
      this.currentModalTab = modelTabs.caseReAssignment;

    } else {
      this.formTitle = 'Escalate Loan Case';
      this.submitLabel = 'Escalate Case';
      this.currentAction = modelTabs.escalate;
      this.currentModalTab = modelTabs.escalate;

    }

    this.showModalSubmit = true;
    this.showForm = true;

    this.setForm();
    this.model = event;
  }

  onSubMenuDelete(event) {
    this.currentAction = modelTabs.closeCase;
    this.currentModalTab = modelTabs.closeCase;
    this.showModalSubmit = true;
    this.showForm = true;

    this.formTitle = 'Close Loan Record';
    this.submitLabel = 'Close Case';
    this.setForm();
    this.model = event;
  }

  submit($event) {
    this.onSubmit($event, this.currentAction);
  }

  onSubmit(model: any, type: string) {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    let url;
    
    console.log('aaaaaa', model);

    if (type === 'escalate' || type === 'closeCase') {
      model = {
        AgentId: model.AgentId,
        AgentName: model.AgentName,
        CaseId: model.Id,
        Comment: model.Comment
      };
    }

    console.log('####', model);

    if (type === 'escalate') {
      model = {...model, ActionType: 'ApproveEscalateCase'};
      url = `manager/escalate-case`;
    } else if (type === 'closeCase' || type === 'flagedCases') {
      model = {...model, ActionType: 'ApproveCloseCase'};
      url = `manager/close-case`;
    } else if (type === 'caseReAssignment') {
      model = {...model, ActionType: 'CaseReAssignment'};
      url = `manager/reassign-case`;
    } else if (type === 'createAgent') {
      url = '';
    }

    this.dataService.Post(model, url).subscribe(
      res => {
        this.isInprogress = false;
        this.utilityService.showSuccessToast('Ok', 'Success!');
        this.showForm = false;
        this.getCaseCollections(this.selectedEndpoint);
      },
      error => {
        this.utilityService.showErrorToast(error, 'Something went wrong!');
        this.isInprogress = false;
        this.showForm = false;
      }
    );
  }
  
  onSearch($event) {

    if ($event.dateFrom && $event.dateTo && $event.sText1) {
      this.selectedSearchQuery = `searchType=${searchType.searchAll}&dateFrom=${$event.dateFrom}&dateTo=${$event.dateTo}&searchText=${$event.sText1}`;
    } else if ($event.dateFrom && $event.dateTo && !$event.sText1) {
      this.selectedSearchQuery = `searchType=${searchType.dateRangeOnly}&dateFrom=${$event.dateFrom}&dateTo=${$event.dateTo}`;
    } else if (!$event.dateFrom && !$event.dateTo && $event.sText1) {
      this.selectedSearchQuery = `searchType=${searchType.searchTextOnly}&searchText=${$event.sText1}`;
    }

    this.getCaseCollections(this.selectedEndpoint);
  }

  setForm() {
    switch (this.currentAction) {
      case modelTabs.loanDetail:
        this.fields = this.casefields;
        break;
      case modelTabs.callHistory:
        this.fields = [];
        break;
      case modelTabs.collectorHistory:
        this.fields = [];
        break;
      case modelTabs.customerDetail:
        this.fields = []; // this.customerfields;
        break;
      case modelTabs.followUpDetail:
        this.fields = []; // this.followUpfields;
        break;
      case modelTabs.caseReAssignment:
        this.fields = this.caseReAssignmentFields;
        break;
      case modelTabs.flagedReAssignment:
        this.fields = this.flagCaseReAssignmentFields;
        break;
      case modelTabs.revertAction:
        this.fields = this.actionFields;
        break;
      case modelTabs.closeCase:
        this.fields = this.actionFields;
        break;
      case 'followUpTableRecord':
        this.fields = [];
        break;
      case 'customerDetailTableRecord':
        this.fields = [];
        break;
      case 'AddAgent':
        this.fields = this.agentfields;
        break;
    }
  }

  
  onAddNewAgent() {
    this.showForm = true;
    this.currentAction = 'AddAgent';
    this.submitLabel = 'Create Agent';
    this.setForm();
    // this.model = $event;

    // get the init form
    this.formTitle = 'Add New Agent';
    this.currentModalTab = modelTabs.loanDetail;
    this.showModalSubmit = true;
  }


  loanDetail() {
    this.formTitle = 'Loan Details';
    this.showModalSubmit = false;
    this.currentModalTab = modelTabs.loanDetail;
    this.currentAction = modelTabs.loanDetail;
    this.setForm();
  }

  getLoanDetails(id) {
    this.showNotFoundMsg = false;
    this.isInprogress = true;
    const url = `getLoanDetails?LoanAcc=${id}`;

    this.dataService.Get(url).subscribe(
      res => {
        this.loanDetails = res.data[0];

        
        if (this.loanDetails) {
          this.loanDetails.PDO = this.loanDetails.PENAL_PAST_DUE + this.loanDetails.INT_PAST_DUE + this.loanDetails.PRI_PAST_DUE;
          this.loanDetails.CLSIN_BAL = this.formatCurrency(this.loanDetails.CLSIN_BAL);

          this.loanDetails.APPROV_DATE = this.formatDate(this.loanDetails.APPROV_DATE);
          this.loanDetails.CREDIT_TRAN_DATE = this.formatDate(this.loanDetails.CREDIT_TRAN_DATE);
          this.loanDetails.EXPIRY_DATE = this.formatDate(this.loanDetails.EXPIRY_DATE);
          this.loanDetails.NEXT_DMD_DATE = this.formatDate(this.loanDetails.NEXT_DMD_DATE);
          this.loanDetails.PAST_DUE_DATE = this.formatDate(this.loanDetails.PAST_DUE_DATE);

          this.loanDetails.CLSIN_BAL = this.formatCurrency(this.loanDetails.CLSIN_BAL);
          this.loanDetails.INT_IN_SUSP = this.formatCurrency(this.loanDetails.INT_IN_SUSP);
          this.loanDetails.INT_PAST_DUE = this.formatCurrency(this.loanDetails.INT_PAST_DUE);
          this.loanDetails.LAST_CR_AMT = this.formatCurrency(this.loanDetails.LAST_CR_AMT);
          this.loanDetails.MGT_FEES = this.formatCurrency(this.loanDetails.MGT_FEES);
          this.loanDetails.NORMAL_INT = this.formatCurrency(this.loanDetails.NORMAL_INT);
          this.loanDetails.PD = this.formatCurrency(this.loanDetails.PD);
          this.loanDetails.PDO = this.formatCurrency(this.loanDetails.PDO);
          this.loanDetails.PENAL_INT = this.formatCurrency(this.loanDetails.PENAL_INT);
          this.loanDetails.PENAL_PAST_DUE = this.formatCurrency(this.loanDetails.PENAL_PAST_DUE);
          this.loanDetails.PLR = this.formatCurrency(this.loanDetails.PLR);
          this.loanDetails.PRI_PAST_DUE = this.formatCurrency(this.loanDetails.PRI_PAST_DUE);
          this.loanDetails.REPAYMNT_AMOUNT = this.formatCurrency(this.loanDetails.REPAYMNT_AMOUNT);
          this.loanDetails.REPAY_ACCT_BAL = this.formatCurrency(this.loanDetails.REPAY_ACCT_BAL);
          this.loanDetails.SANCT_LIMIT = this.formatCurrency(this.loanDetails.SANCT_LIMIT);
          this.loanDetails.TOT_INT_AMT = this.formatCurrency(this.loanDetails.TOT_INT_AMT);

          console.log('$$$$$$$', this.loanDetails);

          this.model = this.loanDetails;
          this.isInprogress = false;
        }

        // this.model = this.loanDetails;
        // this.isInprogress = false;
      },
      error => {
        this.reportData = [];
        this.totalRecords = 0;
        this.total_pages = 0;

        this.utilityService.showErrorToast(error, 'Something went wrong!');
        this.isInprogress = false;
        this.showNotFoundMsg = true;
      }
    );
  }

  
  followUpDetail() {
    this.formTitle = 'Followup History';
    this.currentModalTab = modelTabs.followUpDetail;
    this.currentAction = modelTabs.followUpDetail;
    this.showModalSubmit = true;
    this.submitLabel = 'Submit Detail';
    const caseId = this.selectedCaseId =  this.model.Id;

    if (this.showFollowUpLists) {
      this.showModalSubmit = false;
      this.currentAction = 'followUpTableRecord';
      this.getFollowUpDetail(caseId);
    }

    this.setForm();
  }

  followUpDetailLists() {
    this.formTitle = 'Followup History';

    this.showModalSubmit = false;
    this.currentModalTab = modelTabs.followUpDetail;
    this.currentAction = modelTabs.followUpDetail;
    this.showModalSubmit = true;
    this.submitLabel = 'Submit Detail';
    const caseId = this.selectedCaseId =  this.model.Id;

    this.setForm();
    this.getFollowUpDetail(caseId);
  }


  collectorHistory() {
    this.formTitle = 'Collection History';
    this.showModalSubmit = false;
    this.currentModalTab = modelTabs.collectorHistory;
    this.currentAction = modelTabs.collectorHistory;
    const caseId = this.model.Id;

    this.setForm();
    this.getActionLogs(caseId);
  }

  contactHistory() {
    this.formTitle = 'Contact History';
    this.showModalSubmit = false;
    this.showCloseButton = true;
    this.currentModalTab = modelTabs.callHistory;
    this.currentAction = modelTabs.callHistory;

    this.setForm();
  }

  customerDetail() {
    this.formTitle = 'Customer Details';
    this.showModalSubmit = true;
    this.currentModalTab = modelTabs.customerDetail;
    this.currentAction = modelTabs.customerDetail;
    const caseId =  this.selectedCaseId = this.model.Id;
    this.selectedModel = this.model;

    if (this.showCustomerDetailLists) {
      this.showModalSubmit = false;
      this.currentAction = 'customerDetailTableRecord';
      this.getOtherCustomerDetails(this.selectedCaseId);
    }

    this.setForm();
  }

  getFollowUpDetail = (caseId, _forceRemote: boolean = false) => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;
    const url = `getCaseFollowUpHistory?caseId=${caseId}`;

    this.dataService.Get(url).subscribe(
      res => {
        this.caseFollowUpDetails = res.data;
        this.isInprogress = false;
      },
      error => {
        this.reportData = [];
        this.totalRecords = 0;
        this.total_pages = 0;

        this.utilityService.showErrorToast(error, 'Something went wrong!');
        this.isInprogress = false;
        this.showNotFoundMsg = true;
      }
    );
  }

  getActionLogs = (caseId, _forceRemote: boolean = false) => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;
    const url = `getCaseActionLogs?caseId=${this.model.Id}`;

    this.dataService.Get(url).subscribe(
      res => {
        this.actionLogs = res.data;
        this.isInprogress = false;
      },
      error => {
        this.reportData = [];
        this.totalRecords = 0;
        this.total_pages = 0;

        this.utilityService.showErrorToast(error, 'Something went wrong!');
        this.isInprogress = false;
        this.showNotFoundMsg = true;
      }
    );
  }

  getOtherCustomerDetails = (caseId, _forceRemote: boolean = false) => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;
    const url = `getCaseCustomerDetail?caseId=${this.model.Id}`;

    this.dataService.Get(url).subscribe(
      res => {
        this.caseCustomerDetail = res.data;
        this.isInprogress = false;
      },
      error => {
        this.reportData = [];
        this.totalRecords = 0;
        this.total_pages = 0;

        this.utilityService.showErrorToast(error, 'Something went wrong!');
        this.isInprogress = false;
        this.showNotFoundMsg = true;
      }
    );
  }

  getAgents = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const url = `getAgentCollector?AgentCategory=all`;

    this.dataService.Get(url).subscribe(
      res => {
        const entity: any = res.data;
        if (entity) {
          this.reportData = entity.data;

          this.pre_page = entity.pre_page;
          this.next_page = entity.next_page;
          this.totalRecords = entity.total;
          this.total_pages = entity.total_pages;
        } else {
          this.showNotFoundMsg = true;
        }

        this.isInprogress = false;
      },
      error => {
        this.reportData = [];
        this.totalRecords = 0;
        this.total_pages = 0;

        this.utilityService.showErrorToast(error, 'Something went wrong!');
        this.isInprogress = false;
        this.showNotFoundMsg = true;
      }
    );
  }

  getFieldCollectorAgent = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;
    const url = `getAvailableAgentCollector?AgentCategory=Field Collector`;

    this.dataService.Get(url).subscribe(
      res => {
        res.data.map(x => {
          this.reAssignAgents.push({label: `${x.Name}, ${x.Email}`, value: x.Id});
        });

        this.isInprogress = false;
      },
      error => {
        this.reportData = [];
        this.totalRecords = 0;
        this.total_pages = 0;

        this.utilityService.showErrorToast(error, 'Something went wrong!');
        this.isInprogress = false;
        this.showNotFoundMsg = true;
      }
    );
  }

  getClosedCases = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const url = `manager/closed-case`;

    this.dataService.Get(url).subscribe(
      res => {
        const entity: any = res.data;

        if (entity) {
          this.reportData = entity.data;

          this.pre_page = entity.pre_page;
          this.next_page = entity.next_page;
          this.totalRecords = entity.total;
          this.total_pages = entity.total_pages;
        } else {
          this.showNotFoundMsg = true;
        }

        this.isInprogress = false;
      },
      error => {
        this.reportData = [];
        this.totalRecords = 0;
        this.total_pages = 0;

        this.utilityService.showErrorToast(error, 'Something went wrong!');
        this.isInprogress = false;
        this.showNotFoundMsg = true;
      }
    );
  }

  getLookups = async () => {
    const url = `getLookUps`;
    
    this.dataService.Get(url).subscribe(
      res => {
        if (res && res.data) {
          this.lookupCollections = res.data;

          this.lookupCollections = res.data.map(x => {
            if (x.Category === 'Outcome') {
              this.outcomeLists.push({label: x.Name, value: x.Name});
            }

            if (x.Category === 'ContactType') {
              this.contactTypeLists.push({label: x.Name, value: x.Name });
            }

            if (x.Category === 'NextAction') {
              this.nextActionLists.push({label: x.Name, value: x.Name });
            }

            if (x.Category === 'FollowUpStatus') {
              this.followUpStatusLists.push({label: x.Name, value: x.Name });
            }

            if (x.Category === 'ReminderType') {
              this.reminderTypeLists.push({label: x.Name, value: x.Name });
            }

            return x;
          });



          // const currentUser = this.dataService.getCurrentUser();
          // this.agentEmail = currentUser.mail;
          // this.agentId = res.data.Id;
          // localStorage.setItem(`TeleAgent_${this.agentEmail}`, this.agentId.toString());
          // this.agentId = localStorage.getItem(`TeleAgent_${this.agentEmail}`);
        }
        return res.data.Id;
      },
      error => {
        this.utilityService.showErrorToast(error, 'Something went wrong!');
      }
    );
  }

}
