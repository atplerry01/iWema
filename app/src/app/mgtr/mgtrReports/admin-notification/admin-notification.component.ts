import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Subject } from 'rxjs';
import { DataService } from './../../../shared/service/data.service';
import { UtilityService } from './../../../shared/service/utility.service';

@Component({
  selector: 'app-admin-notification',
  templateUrl: './admin-notification.component.html',
  styleUrls: ['./admin-notification.component.scss']
})

export class AdminNotificationComponent implements OnInit, OnDestroy {
  onDestroy$ = new Subject<void>();

  showNotFoundMsg = false;
  isInprogress = false;
  submitLabel = 'Submit Record';

  currentUser = {
    mail: ''
  };

  page = 1;
  per_page = 50;
  totalRecords = 0;
  total_pages = 0;
  pre_page?: number;
  next_page?: number;

  form = new FormGroup({});
  options: FormlyFormOptions = {};
  model: any = {};
  accountModel: any = {};

  reportData: any[] = [];
  departmentData: any = [];

  reportHeader = [
    {
      name: 'Name',
      title: 'Name',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Department',
      title: 'Department',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'MsgTo',
      title: 'To',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'CC',
      title: 'CC',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Subject',
      title: 'Subject',
      right: false,
      isDate: false,
      isNumber: false
    },
  ];

  newOptions = [];
  fields: FormlyFieldConfig[] = [];

  isLoading = true;

  policyLists = [];
  notifierLists = [];

  updateButton = false;
  pageTitle = 'Create New Notification';

  constructor(
    private dataService: DataService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    this.getPolicy();
    this.getNotifications();
  }

  setForm() {
    this.fields = this.getAdminDepartmentPolicyForm;
  }

  updateRecordRequest() {

    const newModel = {
      Id: this.model.Id,
      PolicyId: this.model.PolicyId,
      To: this.model.MsgTo,
      CC: this.model.CC,
      Subject: this.model.Subject,
      Message: this.model.Message
    };

    this.updateRecord(newModel);
  }

  updateRecord(model) {

    const url = `mgtr/lookups/policy/updateNotification`;

    this.dataService.Post(model, url).subscribe(
      res => {

        this.isInprogress = false;
        // this.newOptions = [];
        if (res.success === true) {
          this.getNotifications();
          this.resetForm();
          this.utilityService.showSuccessToast('Request Updated', 'File Request Successfully Updated');
        } else {
          this.utilityService.showErrorToast('Invalid Request', 'Something went wrong!');
        }
      },
      error => {
        this.utilityService.showErrorToast(error, 'Something went wrong!');
        this.isInprogress = false;
      }
    );


  }

  submit() {

    console.log('XXX', this.model);

    if (this.updateButton) {
      this.updateRecordRequest();
    } else {

      const newModel = {
        PolicyId: this.model.PolicyId,
        To: this.model.MsgTo,
        CC: this.model.CC,
        Subject: this.model.Subject,
        Message: this.model.Message
      };

      const url = `mgtr/lookups/policy/createNotification`;

      console.log('===>', newModel);

      this.dataService.Post(newModel, url).subscribe(
        res => {

          this.isInprogress = false;

          if (res.success === true) {
            this.resetForm();
            this.getNotifications();
            this.utilityService.showSuccessToast('Request Created', 'Request Successfully Submitted');
          } else {
            this.utilityService.showErrorToast('Error', 'Something went wrong!');
          }
        },
        error => {
          this.utilityService.showErrorToast(error, 'Something went wrong!');
          this.isInprogress = false;
        }
      );

    }

  }

  getPolicy = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const endPointUrl = 'mgtr/get-policies?';

    this.dataService.Get(endPointUrl).subscribe(
      res => {
        if (res && res.data) {
          console.log(res);

          res.data.data.map(x => {
            this.policyLists.push({ label: x.Name, value: x.Id });
          });

          this.setForm();
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

  deleteSelected(model) {

    const url = `mgtr/lookups/policy/deleteNotification`;

    this.dataService.Post(model, url).subscribe(
      res => {
        this.isInprogress = false;
        // this.newOptions = [];
        if (res.success === true) {
          this.getNotifications();
          this.resetForm();
          this.utilityService.showSuccessToast('Policy Deleted', 'Policy Deletion Successful');
        } else {
          this.utilityService.showErrorToast('Invalid Request', 'Something went wrong!');
        }
      },
      error => {
        this.utilityService.showErrorToast(error, 'Something went wrong!');
        this.isInprogress = false;
      }
    );
  }

  onRowSelected = (entity) => {
    console.log(entity);
  }

  onMenuEdit = (entity) => {
    console.log(entity);
    this.model = entity;
    this.updateButton = true;
    this.pageTitle = 'Update Notification';
    this.submitLabel = 'Update Record';
    this.setUpdateForm();
  }

  onSubMenuDelete = (entity) => {
    this.deleteSelected(entity);
  }

  getNotifications = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const endPointUrl = 'mgtr/lookups/policy/Notifications?';

    this.dataService.Get(endPointUrl).subscribe(
      res => {
        if (res && res.data) {
          console.log(res.data);
          this.notifierLists = res.data.data;
          this.pre_page = res.data.pre_page;
          this.next_page = res.data.next_page;
          this.totalRecords = res.data.total;
          this.total_pages = res.data.total_pages;

          this.setForm();
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


  setUpdateForm() {
    // this.fields = this.updateFields;
    this.fields = this.getAdminDepartmentPolicyForm;
  }

  cancel() {
    this.updateButton = false;
    this.pageTitle = 'Create New Notification';
    this.submitLabel = 'Submit Record';
    this.resetForm();
    this.reportData = [];
  }

  resetForm() {

    this.reportData = [];
    this.model = {
      // AccountName: '',
    };

  }

  // form sections
  get getAdminDepartmentPolicyForm() {
    return [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-3',
            type: 'select',
            key: 'PolicyId',
            templateOptions: {
              label: 'Policies',
              required: true,
              options: this.policyLists
            }
          },
          {
            className: 'col-9',
            type: 'input',
            key: 'Subject',
            templateOptions: {
              label: 'Subject',
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
            type: 'input',
            key: 'MsgTo',
            templateOptions: {
              label: 'To',
              required: true
            }
          },
          {
            className: 'col-4',
            type: 'input',
            key: 'CC',
            templateOptions: {
              label: 'CC',
              required: true
            }
          },
          {
            className: 'col-4',
            type: 'input',
            key: 'Escalation',
            templateOptions: {
              label: 'Escalation',
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
            type: 'textarea',
            key: 'Message',
            templateOptions: {
              label: 'Message',
              required: true,
              minRows: 2,
              maxRows: 5,
            }
          },
        ]
      }
    ];
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
