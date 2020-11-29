import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Subject } from 'rxjs';
import { DataService, UtilityService } from 'src/app/shared/service';

@Component({
  selector: 'app-regulation',
  templateUrl: './regulation.component.html',
  styleUrls: ['./regulation.component.scss']
})

export class RegulationComponent implements OnInit, OnDestroy {
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
      name: 'Title',
      title: 'Title',
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
      name: 'Source',
      title: 'Source',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'RefNumber',
      title: 'REG RefNo',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Obligation',
      title: 'Compliance Obligation',
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

  constructor(
    private dataService: DataService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    this.currentUser = this.dataService.getCurrentUser();
    this.getPolicy();
  }

  onMenuEdit(event) {
    console.log(event)
    window.open(event.FilePath, "_blank");
  }
  
  onDownloadRow(event) {
    window.open(event.FilePath, "_blank");
  }

  onSearch(entity) {
    this.per_page = entity.per_page;

    this.searchText = entity.sText1

    this.getPolicy();
  }

  // get users request logs
  getPolicy = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const endPointUrl = 'mgtr/getRegulations?';

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}search=${this.searchText}&page=${this.page}&per_page=${this.per_page}`;

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
