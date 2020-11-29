import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Subject } from 'rxjs';
import { DataService } from './../../../shared/service/data.service';
import { UtilityService } from './../../../shared/service/utility.service';


@Component({
  selector: 'app-admin-policy',
  templateUrl: './admin-policy.component.html',
  styleUrls: ['./admin-policy.component.scss']
})

export class AdminPolicyComponent implements OnInit, OnDestroy {
  onDestroy$ = new Subject<void>();

  @ViewChild('fileInput') fileInput: ElementRef;

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

  startDate = '';
  endDate = '';

  searchText1 = '';
  searchAccount = '';
  accno = '';
  selectedAccounts: string[] = [];
  requestType = '';


  model: any = {};
  fields: any[] = [];
  form = new FormGroup({});
  options: FormlyFormOptions = {};

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
      name: 'Description',
      title: 'Description',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'RefNumber',
      title: 'RefNumber',
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
      name: 'Unit',
      title: 'Unit',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ExpiryDate',
      title: 'ExpiryDate',
      right: false,
      isDate: true,
      isNumber: false
    },
    {
      name: 'CreatedOn',
      title: 'CreatedOn',
      right: false,
      isDate: true,
      isNumber: false
    }
  ];

  newOptions = [];
  // fields: FormlyFieldConfig[] = [];
  updateFields: FormlyFieldConfig[] = [
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
          key: 'Description',
          templateOptions: {
            label: 'Description',
            required: true
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'RefNumber',
          templateOptions: {
            label: 'RefNumber',
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
          key: 'Department',
          templateOptions: {
            label: 'Department',
            required: true,
            options: this.departmentData
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'Unit',
          templateOptions: {
            label: 'Unit Name',
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
          key: 'ExpiryDate',
          templateOptions: {
            label: 'Expiry Date',
            type: 'date',
            required: true
          }
        },
      ]
    },
  ];

  updateButton = false;

  selectedFile: File = null;
  appTitle = '';
  allowedExt: any = [];
  isLoading = true;
  
  showForm = false;
  pageTitle = 'Create New Policy';
  hasFile = false;

  policyDetails = {
    Name: '',
    Description: ''
  }

  constructor(
    private dataService: DataService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    const myAccess = this.utilityService.getAccessInfo('PolicyPortalAdmin');
    if (myAccess.name === 'No Access') {
      if (!this.selectedFile) {
        this.utilityService.showInfoToast(
          'Unauthorized',
          'You do not have access to view this page'
        );
        this.utilityService.goBack();

        return;
      }
    } else {
      console.log('ok');
    }

    this.currentUser = this.dataService.getCurrentUser();

    this.getDepartments();
    this.getPolicyData();
  }

  setForm() {
    this.fields = this.getAdminDepartmentPolicyForm;
    // this.fields = this.updateFields;
  }

  setUpdateForm() {
    this.fields = this.updateFields;
  }

  onFileSelected(event) {
    this.selectedFile = event[0];
    this.setForm();
    this.hasFile = true;
  }

  updateRecord(model) {

    const url = `mgtr/post-policies/update`;

    this.dataService.Post(model, url).subscribe(
      res => {

        this.isInprogress = false;
        // this.newOptions = [];
        if (res.success === true) {
          this.fileInput.nativeElement.value = "";
          this.getPolicyData();
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
      Name: this.model.Name,
      Description: this.model.Description,
      RefNumber: this.model.RefNumber,
      Department: this.model.Department,
      Unit: this.model.Unit,
      AddDate: this.model.AddDate,
      ExpiryDate: this.model.ExpiryDate,
      FilePath: this.model.FilePath,
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
          Name: this.model.Name,
          Description: this.model.Description,
          Department: this.model.Department,
          Unit: this.model.Unit,
          AddDate: this.model.AddDate,
          ExpiryDate: this.model.ExpiryDate,
          FilePath: res.fileUrl,
        };

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
            Name: this.model.Name,
            Description: this.model.Description,
            RefNumber: this.model.RefNumber,
            Department: this.model.Department,
            Unit: this.model.Unit,
            AddDate: this.model.AddDate,
            ExpiryDate: this.model.ExpiryDate,
            FilePath: res.fileUrl,
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
    const url = `mgtr/post-policies`;

    this.dataService.Post(model, url).subscribe(
      res => {
        this.isInprogress = false;
        // this.newOptions = [];

        if (res.success === true) {
          this.getPolicyData();
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

  onRowSelected(event) {
    window.open(event.FilePath, "_blank");
  }

  onMenuEdit(event) {
    // this.showForm = true;
    this.model = event;
    this.updateButton = true;
    this.pageTitle = 'Update Policy';
    this.submitLabel = 'Update Record';
    this.setUpdateForm();
  }

  onDownloadRow(event) {
    window.open(event.FilePath, "_blank");
  }

  onSubMenuDelete(event) {
    this.deleteSelected(event);
  }

  deleteSelected(model) {

    const url = `mgtr/post-policies/delete`;

    this.dataService.Post(model, url).subscribe(
      res => {
        this.isInprogress = false;
        // this.newOptions = [];
        if (res.success === true) {
          this.getPolicyData();
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
  // get users request logs
  getPolicyData = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const endPointUrl = 'mgtr/get-policies?';

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}page=${this.page}&per_page=${this.per_page}`;

    this.dataService.Get(url).subscribe(
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

  cancel() {
    this.resetForm();
    this.reportData = [];
    this.selectedAccounts = [];
    this.getPolicyData();
  }

  resetForm() {

    this.reportData = [];
    this.searchText1 = '';
    this.model = {
    };


  }

  // form sections
  get getAdminDepartmentPolicyForm() {
    return [
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
            key: 'Description',
            templateOptions: {
              label: 'Description',
              required: true
            }
          },
          {
            className: 'col-4',
            type: 'input',
            key: 'RefNumber',
            templateOptions: {
              label: 'RefNumber',
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
            key: 'Department',
            templateOptions: {
              label: 'Department',
              required: true,
              options: this.departmentData
            }
          },
          {
            className: 'col-4',
            type: 'input',
            key: 'Unit',
            templateOptions: {
              label: 'Unit Name',
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
            key: 'ExpiryDate',
            templateOptions: {
              label: 'Expiry Date',
              type: 'date',
              required: false
            }
          },
        ]
      },
    ];
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
