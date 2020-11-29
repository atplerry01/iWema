import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Subject } from 'rxjs';
import { DataService, UtilityService } from 'src/app/shared/service';

@Component({
  selector: 'app-admin-audit',
  templateUrl: './admin-audit.component.html',
  styleUrls: ['./admin-audit.component.scss']
})

export class AdminAuditComponent implements OnInit, OnDestroy {
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
      name: 'ActivityType',
      title: 'ActivityType',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'CreatedBy',
      title: 'CreatedBy',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'CreatedOn',
      title: 'CreatedOn',
      right: false,
      isDate: false,
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
    this.getAuditLogs();
  }

  onSearch(entity) {
    this.per_page = entity.per_page;

    this.searchText = entity.sText1

    this.getAuditLogs();
  }

  onMenuEdit(event) {
    window.open(event.FilePath, "_blank");
  }

  onDownloadRow(event) {
    window.open(event.FilePath, "_blank");
  }

  // get users request logs
  getAuditLogs = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const endPointUrl = 'mgtr/lookups/audit?';

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

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}

