import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import * as moment from 'moment';
import { DataService } from '../../../../shared/service/data.service';
import { UtilityService } from '../../../../shared/service/utility.service';
import { caseEndpoint, entityTypes, modelTabs, searchType } from '../../shared/constant';
import { ICaseCollectionWithPagination } from '../../shared/ILoanCollection';
import { collectionHeader } from '../../shared/tableHeader';
import { ICaseCollection } from './../../shared/ILoanCollection';

@Component({
  selector: 'app-field-collector',
  templateUrl: './field-collector.component.html',
  styleUrls: ['./field-collector.component.scss']
})

export class FieldCollectorComponent implements OnInit {
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
  reportData: any[] = [];

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

  callCenterHeader = [
    {
      name: 'Stage.Stage',
      title: 'Stage',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Action.Action',
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
      name: 'Agent.Name',
      title: 'Agent',
      right: false,
      isDate: false,
      isNumber: false
    }
  ];

  selectedCaseCode = 'FieldCollector';
  caseTypes = [
    { code: 'FieldCollector', name: 'FieldCollector' },
    { code: 'MarkedClosedCases', name: 'MarkedClosedCases' },
    { code: 'FlagedCases', name: 'FlagedCases' },
    { code: 'ClosedCases', name: 'ClosedCases' }
  ];

  selectedEndpoint = '';
  selectedSearchQuery = '';

  maintainModal = false;
  showModalSubmit = false;
  showForm = false;
  showEscalationButton = false;
  showCloseButton = false;
  currentModalTab = '';
  currentAction = '';
  selectedCaseId = '';
  selectedModel = '';

  submitLabel = 'Submit';
  formTitle = '';

  agentId: string;
  agentEmail: string;
  agentData: any = {};

  model: any = {};
  fields: any[] = [];
  form = new FormGroup({});
  options: FormlyFormOptions = {};

  contactOptions: any[] = [];
  caseCallHistory: any[] = [];
  caseFollowUpDetails: any[] = [];
  actionLogs: any[] = [];
  casesFiltered: ICaseCollection[] = [];
  customerCaseDetail: any = [];
  caseCustomerDetail: any = [];
  caseCollectionHistory: any = [];

  outcomeLists: any = [];
  contactTypeLists: any = [];
  nextActionLists: any = [];
  followUpStatusLists: any = [];
  reminderTypeLists: any = [];
  lookupCollections: any = [];

  showFollowUpLists = true;
  showCustomerDetailLists = true;

  actionfields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-12',
          type: 'input',
          key: 'Comment',
          templateOptions: {
            label: 'Comment',
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

  followUpfields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'input',
          key: 'FollowUpDate',
          templateOptions: {
            type: 'date',
            label: 'FollowUpDate',
            required: true
          }
        },
        {
          className: 'col-4',
          type: 'select',
          key: 'Outcome',
          templateOptions: {
            label: 'OutCome',
            options: this.outcomeLists
          }
        },
        {
          className: 'col-4',
          type: 'select',
          key: 'ContactType',
          templateOptions: {
            label: 'ContactType',
            required: true,
            options: this.contactTypeLists
          }
        }
      ]
    }, {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'input',
          key: 'ContactName',
          templateOptions: {
            label: 'Contact Name',
            required: true
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'ContactPlace',
          templateOptions: {
            label: 'Contact Place',
            required: true
          }
        },
        {
          className: 'col-4',
          type: 'select',
          key: 'NextAction',
          templateOptions: {
            label: 'Next Action',
            required: true,
            options: this.nextActionLists
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'input',
          key: 'NextContactDate',
          templateOptions: {
            type: 'date',
            label: 'NextContactDate',
            required: true
          }
        },
        {
          className: 'col-4',
          type: 'checkbox',
          key: 'PromisedToPay',
          templateOptions: {
            label: 'Promise To Pay',
            required: false
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'AmountCollected',
          hideExpression: (model) => {
            if (model.PromisedToPay) {
              if (this.form.get('AmountCollected')) {
                this.form.get('AmountCollected').markAsUntouched();
              }
              delete model.AmountCollected;

              return true;
            }

            return false;
          },
          templateOptions: {
            label: 'AmountCollected',
            required: true,
            type: 'number'
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
          key: 'Remarks',
          templateOptions: {
            label: 'Remarks',
            required: true
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'select',
          key: 'ReminderType',
          templateOptions: {
            label: 'ReminderType',
            required: true,
            options: this.reminderTypeLists
          },
          hideExpression: (model) => {
            if (!model.PromisedToPay) {
              if (this.form.get('ReminderType')) {
                this.form.get('ReminderType').markAsUntouched();
              }
              delete model.ReminderType;

              return true;
            }

            return false;
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'PromiseToDate',
          templateOptions: {
            type: 'date',
            label: 'PromiseToDate',
            required: true
          },
          hideExpression: (model) => {
            if (!model.PromisedToPay) {
              if (this.form.get('PromiseToDate')) {
                this.form.get('PromiseToDate').markAsUntouched();
              }
              delete model.PromiseToDate;

              return true;
            }

            return false;
          }
        },
        {
          className: 'col-4',
          type: 'checkbox',
          key: 'PickUpRequired',
          templateOptions: {
            label: 'PickUpRequired',
            required: false
          },
          hideExpression: (model) => {
            if (!model.PromisedToPay) {
              if (this.form.get('PickUpRequired')) {
                this.form.get('PickUpRequired').markAsUntouched();
              }
              delete model.PickUpRequired;

              return true;
            }

            return false;
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-3',
          type: 'checkbox',
          key: 'HasFollowUpStatus',
          templateOptions: {
            label: 'Flag FollowUp Status',
            required: false
          }
        },
        {
          className: 'col-9',
          type: 'select',
          key: 'FollowUpStatus',
          templateOptions: {
            label: 'FollowUpStatus',
            required: false,
            options: this.followUpStatusLists
          },
          hideExpression: (model) => {
            if (!model.HasFollowUpStatus) {
              if (this.form.get('FollowUpStatus')) {
                this.form.get('FollowUpStatus').markAsUntouched();
              }
              delete model.FollowUpStatus;
              return true;
            }
            return false;
          }
        }
      ]
    }
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
    }, {
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
            required: true, label: 'AgentCategory',
            options: [
              { label: 'Tele Collector', value: 'Tele Collector' },
              { label: 'Field Collector', value: 'Field Collector' },
              { label: 'Reposession', value: 'Reposession' },
              { label: 'Litigation', value: 'Litigation' }
            ],
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
          key: 'ManagerId',
          templateOptions: {
            required: true, label: 'Agent Manager',
            options: [] // this.agentManagers
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
          key: 'Zone',
          templateOptions: {
            required: true, label: 'Agent Zone',
            options: [] // this.branchZones
          }
        }
      ]
    }
  ];

  customerfields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'input',
          key: 'Name',
          templateOptions: {
            label: 'Name',
            required: true
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'Telephone1',
          templateOptions: {
            label: 'Telephone1',
            required: true
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'Telephone2',
          templateOptions: {
            label: 'Telephone 2'
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
          key: 'Address',
          templateOptions: {
            label: 'Address',
            required: true
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          type: 'input',
          key: 'Location',
          templateOptions: {
            label: 'Location',
            required: true
          }
        }, {
          className: 'col-6',
          type: 'input',
          key: 'State',
          templateOptions: {
            label: 'State',
            required: true
          }
        }
      ]
    }
  ];

  constructor(
    private dataService: DataService,
    public utilityService: UtilityService
  ) { }

  ngOnInit() {
    // const myAccess = this.utilityService.getAccessInfo('RC-Loan Field Collector');
    // if (myAccess.name === 'No Access') {
    //   this.utilityService.goBack();
    // }

    const currentUser = this.dataService.getCurrentUser();
    this.agentEmail = currentUser.mail;

    this.agentId = this.dataService.getStoredTempData(`FieldAgent_${this.agentEmail.toLowerCase()}`);

    if (this.agentId === '' || this.agentId === undefined || this.agentId === null) {
      this.getAgent();
    }

    this.currentUser = ''; // followUpAgent.followUpManager;
    this.reportTitle = 'Loan Cases';
    this.reportHeaders = collectionHeader;
    this.reportData = [];

    this.showCloseButton = true;
    this.showEscalationButton = false;

    this.selectedEndpoint = caseEndpoint.fieldCollectorCases;
    this.getCaseCollections(this.selectedEndpoint);
    this.getLookups();
  }

  formatCurrency(value: any): any {
    const x = parseFloat(value);
    const c = value !== null || value !== undefined || value !== '' ? (x).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : '';  // 12,345.67
    return c;
  }

  formatDate(value) {
    const c = moment(value).format('DD-MMM-YYYY');
    return c;
  }

  onCaseTypeChange(entity) {
    this.showEscalationButton = false;
    this.showCloseButton = false;
    this.selectedSearchQuery = '';

    this.reportHeaders = collectionHeader;

    if (entity === entityTypes.fieldCollectorCases) {
      this.showCloseButton = true;
      this.showEscalationButton = false;

      this.reportTitle = 'Loan Cases';
      this.reportData = [];
      this.selectedEndpoint = caseEndpoint.fieldCollectorCases;
      this.getCaseCollections(this.selectedEndpoint);

    } else if (entity === entityTypes.markedEscalationCases) {
      this.reportTitle = 'Mark Escalated Cases';
      this.reportData = [];
      this.selectedEndpoint = caseEndpoint.markEscalatedCases;
      this.getCaseCollections(this.selectedEndpoint);

    } else if (entity === entityTypes.escalationCases) {
      this.reportTitle = 'Escalated Cases';
      this.reportData = [];
      this.selectedEndpoint = caseEndpoint.escalatedCases;
      this.getCaseCollections(this.selectedEndpoint);

    } else if (entity === entityTypes.flagedCases) {
      this.reportTitle = 'Flaged Cases';
      this.reportData = [];
      this.selectedEndpoint = caseEndpoint.flagedCases;
      this.getCaseCollections(this.selectedEndpoint);

    } else if (entity === entityTypes.markedClosedCases) {
      this.reportTitle = 'Marked Closed Cases';
      this.reportData = [];
      this.selectedEndpoint = caseEndpoint.markClosedCases;
      this.getCaseCollections(this.selectedEndpoint);

    } else if (entity === entityTypes.closedCases) {
      this.reportTitle = 'Closed Cases';
      this.reportHeaders = collectionHeader;
      this.reportData = [];
      this.selectedEndpoint = caseEndpoint.closedCases;
      this.getCaseCollections(this.selectedEndpoint);
    }
  }

  getCaseCollections = (caseEndPoint, forceRefresh: boolean = false) => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    let endPointUrl;

    if (caseEndPoint === caseEndpoint.fieldCollectorCases) {
      endPointUrl = `field-collector/loanCollections?agentId=${this.agentId}&selectedCase=${caseEndpoint.agentOpenCollectorCases}`;
    } else if (caseEndPoint === caseEndpoint.markEscalatedCases) {
      endPointUrl = `field-collector/loanCollections?agentId=${this.agentId}&selectedCase=${caseEndpoint.agentMarkEscalatedCollectorCases}`;
    } else if (caseEndPoint === caseEndpoint.markClosedCases) {
      endPointUrl = `field-collector/loanCollections?agentId=${this.agentId}&selectedCase=${caseEndpoint.agentMarkClosedCollectorCases}`;
    } else if (caseEndPoint === caseEndpoint.closedCases) {
      endPointUrl = `field-collector/loanCollections?agentId=${this.agentId}&selectedCase=${caseEndpoint.agentClosedCollectorCases}`;
    } else if (caseEndPoint === caseEndpoint.flagedCases) {
      endPointUrl = `field-collector/loanCollections?agentId=${this.agentId}&selectedCase=${caseEndpoint.agentClosedCollectorCases}`;
    }

    const url = `${endPointUrl}&forceRemote=${forceRefresh}&page=${this.page}&per_page=${this.per_page}&${this.selectedSearchQuery}`;

    this.dataService.Get(url).subscribe(
      res => {
        const entity: ICaseCollectionWithPagination = res.data;
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

  /// Additional Genric Task
  setForm() {
    switch (this.currentAction) {
      case modelTabs.escalate:
        this.fields = this.actionfields;
        break;
      case modelTabs.closeCase:
        this.fields = this.actionfields;
        break;
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
        this.fields = this.customerfields;
        break;
      case modelTabs.followUpDetail:
        this.fields = this.followUpfields;
        break;
      case 'followUpTableRecord':
        this.fields = [];
        break;
      case 'customerDetailTableRecord':
        this.fields = [];
        break;
    }
  }

  onRowSelected($event) {

    this.selectedCase = $event;
    this.selectedCaseId = $event.Id;

    this.selectedCase = { ...this.selectedCase, selectedCaseId: this.selectedCase.Id, caseId: this.selectedCase.Id }

    this.showForm = true;
    this.formTitle = 'Approve Record';
    this.currentAction = modelTabs.loanDetail;
    this.setForm();
    this.model = $event;

    // // get the init form
    this.formTitle = 'Loan Details';
    this.currentModalTab = modelTabs.loanDetail;
    this.showModalSubmit = false;

    this.getLoanDetails($event.LoanAccountNumber);
  }

  onMenuEdit($event) {
    this.showForm = true;
    this.formTitle = 'Escalate Loan Case';
    this.submitLabel = 'Escalate Case';
    this.currentAction = modelTabs.escalate;
    this.currentModalTab = modelTabs.escalate;
    this.setForm();
    this.model = $event;
    this.showModalSubmit = true;
  }

  onSubMenuDelete(event) {
    this.currentAction = modelTabs.closeCase;
    this.showModalSubmit = true;
    this.showForm = true;

    this.formTitle = 'Close Loan Record';
    this.submitLabel = 'Close Case';
    this.setForm();
    this.model = event;
    this.currentModalTab = modelTabs.closeCase;
  }


  submit($event) {
    this.onSubmit($event, this.currentAction);
  }

  onSubmit(model: any, action: string) {
    this.showNotFoundMsg = false;
    this.isInprogress = true;
    this.maintainModal = true;

    let url;

    console.log('@@@@@@', model, action);

    if (action === 'escalate' || action === 'closeCase') {

      model = {
        AgentId: this.agentId,
        AgentName: model.AgentName,
        CaseId: model.Id,
        Comment: model.comment
      };

    } else {
      model = { ...model, ...this.selectedCase };

    }


    if (action === 'escalate') {
      model = { ...model, ActionType: 'InitiateEscalationCase' };
      url = `field-collector/escalate-case`;
    } else if (action === 'closeCase') {
      model = { ...model, ActionType: 'InitiateCloseCase' };
      url = `field-collector/close-case`;
    } else if (action === 'flagCase') {
      model = { ...model, ActionType: 'InitiateFlag' };
      url = `field-collector/flag-case`;
    } else if (action === modelTabs.followUpDetail) {
      url = 'createCaseFollowUpHistory';
    } else if (action === modelTabs.customerDetail) {
      url = 'createCaseCustomerDetail';
    }

    this.dataService.Post(model, url).subscribe(
      res => {
        this.isInprogress = false;
        const msg = 'Record succesfully removed';
        this.utilityService.showSuccessToast(msg, 'Success!');

        if (action === 'escalate' || action === 'closeCase') {
          this.maintainModal = false;
          this.getCaseCollections(caseEndpoint.fieldCollectorCases, true);
        } else if (action === modelTabs.followUpDetail) {
          this.showFollowUpLists = false;
          this.onFollowUpToggle();
          this.maintainModal = true;
          this.getFollowUpDetail(this.selectedCase.Id);
        } else if (action === modelTabs.customerDetail) {
          this.onCustomerDetailToggle();
          this.getOtherCustomerDetails(this.selectedCase.Id);
          this.maintainModal = true;
        }

        if (!this.maintainModal) {
          this.showForm = false;
        }
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

  // Modal Forms
  // Client View Display
  loanDetail() {
    this.formTitle = 'Loan Details';
    this.showModalSubmit = false;
    this.currentModalTab = modelTabs.loanDetail;
    this.currentAction = modelTabs.loanDetail;
    this.setForm();
  }

  onAddFollowUpDetails() {
    this.showFollowUpLists = this.showFollowUpLists ? false : true;

    if (this.showFollowUpLists) {
      this.showModalSubmit = false;
      this.currentAction = 'followUpTableRecord';
      this.setForm();
      this.getFollowUpDetail(this.selectedCaseId);
    } else {
      this.showModalSubmit = true;
      this.currentModalTab = modelTabs.followUpDetail;
      this.currentAction = modelTabs.followUpDetail;
      this.setForm();
    }
  }

  onFollowUpToggle() {
    this.showFollowUpLists = this.showFollowUpLists ? false : true;

    if (this.showFollowUpLists) {
      this.showModalSubmit = false;
      this.currentAction = 'followUpTableRecord';
      this.setForm();
      this.getFollowUpDetail(this.selectedCaseId);
    } else {
      this.showModalSubmit = true;
      this.currentModalTab = modelTabs.followUpDetail;
      this.currentAction = modelTabs.followUpDetail;
      this.setForm();
    }
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

        // this.loanDetails.PDO = this.loanDetails.PENAL_PAST_DUE + this.loanDetails.INT_PAST_DUE + this.loanDetails.PRI_PAST_DUE

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
    const caseId = this.selectedCase.Id;

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
    const caseId = this.selectedCase.Id;

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

  onAddCustomerDetails() {
    this.showCustomerDetailLists = this.showCustomerDetailLists ? false : true;

    if (this.showCustomerDetailLists) {
      this.showModalSubmit = false;
      this.currentAction = 'customerDetailTableRecord';
      this.setForm();
      this.getOtherCustomerDetails(this.selectedCase.Id);
    } else {
      this.formTitle = 'Customer Details';
      this.showModalSubmit = true;
      this.currentModalTab = modelTabs.customerDetail;
      this.currentAction = modelTabs.customerDetail;
      this.setForm();
    }
  }

  onCustomerDetailToggle() {
    this.showCustomerDetailLists = this.showCustomerDetailLists ? false : true;

    if (this.showCustomerDetailLists) {
      this.showModalSubmit = false;
      this.currentAction = 'customerDetailTableRecord';
      this.setForm();
      this.getOtherCustomerDetails(this.selectedCaseId);
    } else {
      this.formTitle = 'Customer Details';
      this.showModalSubmit = true;
      this.currentModalTab = modelTabs.customerDetail;
      this.currentAction = modelTabs.customerDetail;
      this.setForm();
    }
  }

  customerDetail() {

    this.formTitle = 'Customer Details';
    this.showModalSubmit = true;
    this.currentModalTab = modelTabs.customerDetail;
    this.currentAction = modelTabs.customerDetail;
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
    const url = `getCaseFollowUpHistory?caseId=${this.model.Id}`;

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


  getAgent = async () => {
    const url = `getAgentByEmail?category=Field Collector`;
    this.dataService.Get(url).subscribe(
      res => {
        if (res && res.data) {
          this.agentId = res.data.Id;
          sessionStorage.setItem(`FieldAgent_${res.data.Email.toLowerCase()}`, res.data.Id);
          // this.dataService.StoreTempData(`TeleAgentX_${res.data.Email}`, JSON.stringify(res.data.Id))
        }
        return;
      },
      error => {
        this.utilityService.showErrorToast(error, 'Something went wrong!');
      }
    );
  }

  getLookups = async () => {
    const url = `getLookUps`;

    this.dataService.Get(url).subscribe(
      res => {
        if (res && res.data) {
          this.lookupCollections = res.data;
          // { label: 'Promise to Pay', value: 'Promise to Pay' },
          this.lookupCollections = res.data.map(x => {

            if (x.Category === 'Outcome') {
              this.outcomeLists.push({ label: x.Name, value: x.Name });
            }

            if (x.Category === 'ContactType') {
              this.contactTypeLists.push({ label: x.Name, value: x.Name });
            }

            if (x.Category === 'NextAction') {
              this.nextActionLists.push({ label: x.Name, value: x.Name });
            }

            if (x.Category === 'FollowUpStatus') {
              this.followUpStatusLists.push({ label: x.Name, value: x.Name });
            }

            if (x.Category === 'ReminderType') {
              this.reminderTypeLists.push({ label: x.Name, value: x.Name });
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

