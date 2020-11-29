
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Subject } from 'rxjs';
import { DataService } from './../../../shared/service/data.service';
import { UtilityService } from './../../../shared/service/utility.service';

@Component({
  selector: 'app-admin-regulatory',
  templateUrl: './admin-regulatory.component.html',
  styleUrls: ['./admin-regulatory.component.scss']
})

export class AdminRegulatoryComponent implements OnInit, OnDestroy {
  onDestroy$ = new Subject<void>();
  @ViewChild('fileInput') fileInput: ElementRef;

  showNotFoundMsg = false;
  isInprogress = false;
  submitLabel = 'Submit Record';

  currentUser = {};

  page = 1;
  per_page = 50;
  totalRecords = 0;
  total_pages = 0;
  pre_page?: number;
  next_page?: number;

  startDate = '';
  endDate = '';

  searchText1 = '';
  searchAccount = '';
  accno = '';
  selectedAccounts: string[] = [];
  requestType = '';

  form = new FormGroup({});
  options: FormlyFormOptions = {};
  model: any = {};
  accountModel: any = {};

  reportData: any[] = [];
  departmentData: any[] = [];
  frequencyData: any[] = [];

  reportHeader = [
    {
      name: 'Title',
      title: 'Title',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Source',
      title: 'Source',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'RefNumber',
      title: 'REG Ref NO',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'IssuanceDate',
      title: 'IssuanceDate',
      right: false,
      isDate: true,
      isNumber: false
    },
    {
      name: 'ImplementationDate',
      title: 'ImplementationDate',
      right: false,
      isDate: true,
      isNumber: false
    },
    {
      name: 'ConcernedUnit',
      title: 'ConcernedUnit',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'PolicyType',
      title: 'Type',
      right: false,
      isDate: false,
      isNumber: false
    }
  ];

  newOptions = [];
  fieldLists: FormlyFieldConfig[] = [];

  fields: FormlyFieldConfig[] = [];

  updateFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'input',
          key: 'Title',
          templateOptions: {
            label: 'Title',
          }
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'Source',
          templateOptions: {
            label: 'Source',
          }
        },
        {
          className: 'col-5',
          type: 'input',
          key: 'Description',
          templateOptions: {
            label: 'Description',
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
          key: 'RegulatoryReturns',
          templateOptions: {
            label: 'RegulatoryReturns',
          }
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'RefNumber',
          templateOptions: {
            label: 'Reference Number',
          }
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'IssuanceDate',
          templateOptions: {
            label: 'Issuance Date',
            type: 'date',
            required: true
          }
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'ImplementationDate',
          templateOptions: {
            label: 'Implementation Date',
            type: 'date',
            required: true
          }
        },
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'select',
          key: 'ConcernedUnit',
          templateOptions: {
            label: 'ConcernedUnit',
            required: true,
            options: this.departmentData
          }
        },
        {
          className: 'col-4',
          type: 'select',
          key: 'NotificationFrequency',
          templateOptions: {
            label: 'NotificationFrequency',
            required: true,
            options: this.frequencyData
          }
        },
        {
          className: 'col-4',
          type: 'select',
          key: 'PolicyType',
          templateOptions: {
            label: 'Type',
            required: true,
            options: [
              // { label: 'Internal', value: 'Internal' },
              // { label: 'External', value: 'External' },
              { label: 'Circulars', value: 'Circulars' },
              { label: 'Guidelines', value: 'Guidelines' },
              { label: 'Framework', value: 'Framework' },
              { label: 'Other publications', value: 'Other publications' }
            ],
          }
        }
      ]
    }
  ];

  selectedFile: File = null;
  appTitle = '';
  allowedExt: any = [];
  isLoading = true;

  showForm = false;
  updateButton = false;
  pageTitle = 'Create New Regulation';
  hasFile = false;

  constructor(
    private dataService: DataService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    this.currentUser = this.dataService.getCurrentUser();
    this.getDepartments();
    this.getPolicyFrequency();
    this.getRegulatoryPolicy();
  }

  setForm() {
    this.fields = this.getAdminDepartmentPolicyForm;
  }

  // get users request logs
  getRegulatoryPolicy = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const endPointUrl = 'mgtr/getRegulations?';

    // tslint:disable-next-line: max-line-length
    this.dataService.Get(endPointUrl).subscribe(
      res => {
        if (res.data) {
          this.reportData = res.data.data;
          this.pre_page = res.data.pre_page;
          this.next_page = res.data.next_page;
          this.totalRecords = res.data.total;
          this.total_pages = res.data.total_pages;
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

  onFileSelected(event) {
    this.selectedFile = event[0]; // .target.files[0];
    this.hasFile = true;
  }

  updateRecord(model) {

    const url = `mgtr/updateRegulations`;

    this.dataService.Post(model, url).subscribe(
      res => {

        this.isInprogress = false;
        // this.newOptions = [];
        if (res.success === true) {
          this.getRegulatoryPolicy();
          this.resetForm();
          this.showForm = false;
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

  updateRecordRequestWithOutFile() {
    const newModel = {
      Id: this.model.Id,
      Title: this.model.Title,
      Source: this.model.Source,
      Description: this.model.Description,
      Obligation: this.model.Obligation,
      RefNumber: this.model.RefNumber,
      IssuanceDate: this.model.IssuanceDate,
      FilePath: this.model.FilePath,
      RegulatoryReturns: this.model.RegulatoryReturns,
      ConcernedUnit: this.model.ConcernedUnit,
      NotificationFrequency: this.model.NotificationFrequency,
      NotificationDayDiff: this.model.NotificationFrequency,
      PolicyType: this.model.PolicyType,
      ImplementationDate: this.model.ImplementationDate
    };

    this.updateRecord(newModel);
  }

  updateRecordRequest() {

    // this.reportdetails
    // check the allowedExt
    const url = `http://172.27.4.135/FileUploadApi/api/FileUploads/policy`;

    const formData: FormData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);

    this.dataService.PostExtFiles(this.selectedFile, url).subscribe(
      res => {
        this.fileInput.nativeElement.value = "";

        const newModel = {
          Id: this.model.Id,
          Title: this.model.Title,
          Source: this.model.Source,
          Obligation: this.model.Obligation,
          RefNumber: this.model.RefNumber,
          IssuanceDate: this.model.IssuanceDate,
          FilePath: res.fileUrl,
          RegulatoryReturns: this.model.RegulatoryReturns,
          ConcernedUnit: this.model.ConcernedUnit,
          NotificationFrequency: this.model.NotificationFrequency,
          NotificationDayDiff: this.model.NotificationFrequency,
          PolicyType: this.model.PolicyType,
          ImplementationDate: this.model.ImplementationDate
        };

        console.log('====>', newModel);

        this.updateRecord(newModel);

        this.isInprogress = false;
        this.utilityService.showSuccessToast(res.message, 'File Upload Success');
        // window.location.reload();
      },
      error => {
        this.utilityService.showErrorToast(error, 'Something went wrong!');
      }
    );

  }

  submit() {

    if (this.updateButton && !this.hasFile) {
      this.updateRecordRequestWithOutFile();
    } else if (this.updateButton && this.hasFile) {
      this.updateRecordRequest();
    } else {

      console.log(this.model);

      if (!this.selectedFile) {
        this.utilityService.showInfoToast(
          'Please select a valid file!',
          'Valid File Format Required'
        );
        return;
      }

      // this.reportdetails
      // check the allowedExt
      const url = `http://172.27.4.135/FileUploadApi/api/FileUploads/policy`;

      const formData: FormData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      this.dataService.PostExtFiles(this.selectedFile, url).subscribe(
        res => {
          this.fileInput.nativeElement.value = "";

          const newModel = {
            Title: this.model.Title,
            Source: this.model.Source,
            Description: this.model.Description,
            Obligation: this.model.Obligation,
            RefNumber: this.model.RefNumber,
            IssuanceDate: this.model.IssuanceDate,
            FilePath: res.fileUrl,
            RegulatoryReturns: this.model.RegulatoryReturns,
            ConcernedUnit: this.model.ConcernedUnit,
            NotificationFrequency: this.model.NotificationFrequency,
            NotificationDayDiff: this.model.NotificationFrequency, // TODO
            PolicyType: this.model.PolicyType,
            ImplementationDate: this.model.ImplementationDate
          };

          this.handleSubmit(newModel);

          this.isInprogress = false;
          this.utilityService.showSuccessToast(res.message, 'File Upload Success');
          // window.location.reload();
        },
        error => {
          this.utilityService.showErrorToast(error, 'Something went wrong!');
        }
      );

    }

  }

  handleSubmit(model) {
    const url = `mgtr/postRegulations`;

    this.dataService.Post(model, url).subscribe(
      res => {
        this.isInprogress = false;
        // this.newOptions = [];
        if (res.success === true) {
          // this.getPolicyData();
          this.getRegulatoryPolicy();
          this.resetForm();
          this.utilityService.showSuccessToast('Request Created', 'File Request Successfully Submitted');
        } else {
          this.utilityService.showErrorToast('Invalid StaffID', 'Something went wrong!');
        }
      },
      error => {
        this.utilityService.showErrorToast(error, 'Something went wrong!');
        this.isInprogress = false;
      }
    );
  }

  getDepartments = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const endPointUrl = 'mgtr/lookups/departments?';

    this.dataService.Get(endPointUrl).subscribe(
      res => {
        if (res && res.data) {
          res.data.data.map(x => {
            this.departmentData.push({ label: x.Name, value: x.Name });
          });

          // this.departmentData = res.data.data;
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

  getPolicyFrequency = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const endPointUrl = 'mgtr/lookups/getFrequency?';

    this.dataService.Get(endPointUrl).subscribe(
      res => {
        if (res && res.data) {
          res.data.data.map(x => {
            this.frequencyData.push({ label: x.Frequency, value: x.NoOfDays });
          });

          // this.departmentData = res.data.data;
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


  onDownloadRow(event) {
    window.open(event.FilePath, "_blank");
  }

  onRowSelected(event) {
    window.open(event.FilePath, "_blank");
  }

  onMenuEdit(event) {
    // this.showForm = true;
    this.model = event;
    this.updateButton = true;
    this.pageTitle = 'Update Regulation';
    this.submitLabel = 'Update Record';
    this.setUpdateForm();
  }

  onSubMenuDelete(event) {
    this.deleteSelected(event);
  }

  deleteSelected(model) {

    const url = `mgtr/deleteRegulations`;

    this.dataService.Post(model, url).subscribe(
      res => {
        this.isInprogress = false;
        // this.newOptions = [];
        if (res.success === true) {
          this.getRegulatoryPolicy();
          this.resetForm();
          this.utilityService.showSuccessToast('Regulation Deleted', 'Delete Request Successful');
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

  setUpdateForm() {
    this.fields = this.updateFields;
  }

  cancel() {
    this.resetForm();
    this.reportData = [];
    this.selectedAccounts = [];
    this.getRegulatoryPolicy();
    this.setForm();
  }

  resetForm() {

    this.reportData = [];
    this.searchText1 = '';
    this.model = {
      AccountName: '',
      AccountNumber: '',
      CifAccount: '',
      DocFormat: '',
      Frequency: '',
      PriaryEmail: '',
      PrimaryEmail: '',
      accountList: '',
      bccEmail: '',
      ccEmail: ''
    };

  }

  onReportTypeChange(event) {

  }

  get getAdminDepartmentPolicyForm() {
    return [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-4',
            type: 'input',
            key: 'Title',
            templateOptions: {
              label: 'Title',
            }
          },
          {
            className: 'col-3',
            type: 'input',
            key: 'Source',
            templateOptions: {
              label: 'Source',
            }
          },
          {
            className: 'col-5',
            type: 'input',
            key: 'Description',
            templateOptions: {
              label: 'Description',
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
            key: 'RefNumber',
            templateOptions: {
              label: 'REG Ref Number',
            }
          },
          {
            className: 'col-3',
            type: 'input',
            key: 'RegulatoryReturns',
            templateOptions: {
              label: 'RegulatoryReturns',
            }
          },
          {
            className: 'col-3',
            type: 'input',
            key: 'IssuanceDate',
            templateOptions: {
              label: 'Issuance Date',
              type: 'date',
              required: true
            }
          },
          {
            className: 'col-3',
            type: 'input',
            key: 'ImplementationDate',
            templateOptions: {
              label: 'Implementation Date',
              type: 'date',
              required: true
            }
          },
        ]
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-3',
            type: 'input',
            key: 'Obligation',
            templateOptions: {
              label: 'Compliance Obligation',
            }
          },
          {
            className: 'col-3',
            type: 'select',
            key: 'ConcernedUnit',
            templateOptions: {
              label: 'ConcernedUnit',
              required: true,
              options: this.departmentData
            }
          },
          {
            className: 'col-3',
            type: 'select',
            key: 'NotificationFrequency',
            templateOptions: {
              label: 'NotificationFrequency',
              required: true,
              options: this.frequencyData
            }
          },
          {
            className: 'col-3',
            type: 'select',
            key: 'PolicyType',
            templateOptions: {
              label: 'Type',
              required: true,
              options: [
                // { label: 'Internal', value: 'Internal' },
                // { label: 'External', value: 'External' },
                { label: 'Circulars', value: 'Circulars' },
                { label: 'Guidelines', value: 'Guidelines' },
                { label: 'Framework', value: 'Framework' },
                { label: 'Other publications', value: 'Other publications' }
              ],
            }
          }
        ]
      }
    ];
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
