import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Subject } from 'rxjs';
import { DataService, UtilityService } from 'src/app/shared/service';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss']
})

export class PoliciesComponent implements OnInit, OnDestroy {
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

  searchText = '';

  form = new FormGroup({});
  options: FormlyFormOptions = {};
  model: any = {};
  accountModel: any = {};

  reportData: any[] = [];

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
      title: 'expiryDate',
      right: false,
      isDate: true,
      isNumber: false
    },
    {
      name: 'ModifiedBy',
      title: 'modifiedBy',
      right: false,
      isDate: false,
      isNumber: false
    }
    ,
    {
      name: 'ModifiedOn',
      title: 'ModifiedOn',
      right: false,
      isDate: true,
      isNumber: false
    }
  ];

  newOptions = [];
  fieldLists: FormlyFieldConfig[] = [];

  constructor(
    private dataService: DataService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    this.getPolicy();
  }

  onSearch(entity) {
    this.per_page = entity.per_page;

    this.searchText = entity.sText1

    this.getPolicy();
  }

  onMenuEdit(event) {
    window.open(event.FilePath, "_blank");
  }

  onDownloadRow(event) {
    window.open(event.FilePath, "_blank");
  }

  // get users request logs
  getPolicy = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const endPointUrl = 'mgtr/get-policies?';

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}search=${this.searchText}&page=${this.page}&per_page=${this.per_page}`;

    this.dataService.Get(url).subscribe(
      res => {
        console.log(res.data);

        if (res.data) {
          this.reportData = res.data.data;
          this.pre_page = res.data.pre_page;
          this.next_page = res.data.next_page;
          this.totalRecords = res.data.total;
          this.total_pages = res.data.total_pages;

          console.log('$$$$', this.reportData);

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

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}

