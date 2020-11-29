import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Subject } from 'rxjs';
import { DataService } from './../../../shared/service/data.service';
import { UtilityService } from './../../../shared/service/utility.service';

@Component({
  selector: 'app-department-policy',
  templateUrl: './department-policy.component.html',
  styleUrls: ['./department-policy.component.scss']
})

export class DepartmentPolicyComponent implements OnInit, OnDestroy {
  onDestroy$ = new Subject<void>();

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
  model: any = { };
  accountModel: any = {};

  reportData: any[] = [];

  reportHeader = [
    {
      name: 'policyName',
      title: 'Policy Name',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'departmentName',
      title: 'Department',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'unitName',
      title: 'Unit',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'description',
      title: 'description',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'policyName',
      title: 'policyName',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'filepath',
      title: 'filepath',
      right: false,
      isDate: false,
      isNumber: false
    }
  ];
  
  newOptions = [];
  fieldLists: FormlyFieldConfig[] = [];

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'input',
          key: 'Name',
          templateOptions: {
            label: 'Name',
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'Description',
          templateOptions: {
            label: 'Description',
          }
        },
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'input',
          key: 'AddDate',
          templateOptions: {
            label: 'AddDate',
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'ExpireDate',
          templateOptions: {
            label: 'ExpireDate',
          }
        },
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-8',
          type: 'input',
          key: 'filePath',
          templateOptions: {
            label: 'filePath',
          }
        }
      ]
    },
  ];

  constructor(
    private dataService: DataService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    this.currentUser = this.dataService.getCurrentUser();
    this.getDepartmentalPolicy();
  }

  onMenuEdit(event) {
    window.open(event.filepath, "_blank");
  }
  
  // get users request logs
  getDepartmentalPolicy = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const endPointUrl = 'mgtr/get-policies-by-department?';

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}requestType=${this.requestType}&startDate=${this.startDate}&endDate=${this.endDate}&page=${this.page}&per_page=${this.per_page}`;

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

        console.log('this.reportData: ', this.reportData);
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


  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
