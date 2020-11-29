
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Subject } from 'rxjs';
import { DataService } from './../../../shared/service/data.service';
import { UtilityService } from './../../../shared/service/utility.service';

@Component({
  selector: 'app-admin-departments',
  templateUrl: './admin-departments.component.html',
  styleUrls: ['./admin-departments.component.scss']
})

export class AdminDepartmentsComponent implements OnInit, OnDestroy {
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
  departmentData: any = [];

  reportHeader = [
    {
      name: 'Name',
      title: 'Name',
      right: false,
      isDate: false,
      isNumber: false
    },
  ];

  newOptions = [];
  fields: FormlyFieldConfig[] = [];

  selectedFile: File = null;
  appTitle = '';
  allowedExt: any = [];
  isLoading = true;

  constructor(
    private dataService: DataService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    this.getDepartments();
  }

  setForm() {
    this.fields = this.getAdminDepartmentPolicyForm;
  }

  submit() {

    const newModel = {
      name: this.model.name,
    };

    const url = `mgtr/lookups/postDepartments`;

    this.dataService.Post(newModel, url).subscribe(
      res => {
        this.isInprogress = false;
        // this.newOptions = [];
        if (res.success === true) {
          this.getDepartments();
          this.resetForm();
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

  getDepartments = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const endPointUrl = 'mgtr/lookups/departments?';

    this.dataService.Get(endPointUrl).subscribe(
      res => {
        if (res && res.data) {
          this.departmentData = res.data.data;
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
  
  cancel() {
    this.resetForm();
    this.reportData = [];
    this.selectedAccounts = [];
  }

  resetForm() {

    this.reportData = [];
    this.searchText1 = '';
    this.model = {
      // AccountName: '',
      // AccountNumber: '',
      // CifAccount: '',
      // DocFormat: '',
      // Frequency: '',
      // PriaryEmail: '',
      // PrimaryEmail: '',
      // accountList: '',
      // bccEmail: '',
      // ccEmail: ''
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
            key: 'name',
            templateOptions: {
              label: 'Name',
              required: true
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
