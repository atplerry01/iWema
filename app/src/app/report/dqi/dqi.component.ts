import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DataService } from 'src/app/shared/service/data.service';
import { UtilityService } from 'src/app/shared/service/utility.service';
import { ExcelExporterService } from './../../shared/service/excel-exporter.service';

@Component({
  selector: 'app-dqi',
  templateUrl: './dqi.component.html',
  styleUrls: ['./dqi.component.scss']
})

export class DQIComponent implements OnInit {

  isInprogress = false;
  showNotFoundMsg = false;

  page = 1;
  per_page = 15;
  totalRecords = 0;
  total_pages = 0;
  pre_page?: number;
  next_page?: number;

  reportTitle = '';
  reportData: any[] = [];

  reportHeader = [
    {
      name: 'CIF_ID',
      title: 'CIF_ID',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'FORACID',
      title: 'FORACID',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ACCT_NAME',
      title: 'ACCT_NAME',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'SCHM_CODE',
      title: 'SCHM_CODE',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'SCHM_DESC',
      title: 'SCHM_DESC',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ACCT_OPN_DATE',
      title: 'ACCT_OPN_DATE',
      right: false,
      isDate: true,
      isNumber: false
    },
    {
      name: 'SOL_ID',
      title: 'SOL_ID',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'SOL_DESC',
      title: 'SOL_DESC',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ZONE',
      title: 'ZONE',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'PHONENO',
      title: 'PHONENO ',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'BVN',
      title: 'BVN',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'EMAIL',
      title: 'EMAIL',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'OCCUPATION',
      title: 'OCCUPATION',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'RELIGION',
      title: 'RELIGION',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'TIN',
      title: 'TIN',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'CHANNEL',
      title: 'CHANNEL',
      right: false,
      isDate: false,
      isNumber: false
    },

  ];

  selectedReportOption = 'branch';
  selectedZoneOption = '';

  reportTypes = [
    { code: 'all', name: 'All' },
    { code: 'zone', name: 'ZONE' },
    // { code: 'MyBranch', name: 'MY BRANCH' },
    { code: 'branch', name: 'BY BRANCH' },
  ];

  showZone = false;
  showMyBranch = false;
  showBranch = false;

  zoneCollections = [];
  formatedZones: any = [];

  reportType = '';
  reportValue = '';
  startDate = '';

  constructor(
    private dataService: DataService,
    public utilityService: UtilityService,
    private excelExporterService: ExcelExporterService
  ) { }

  ngOnInit() {
    this.reportTitle = 'DQI Report';
    this.getZones();

    /// Initial Setups
    this.showZone = false;
    this.showMyBranch = false;
    this.showBranch = true;
  }

  onSearch(entity) {
    this.per_page = entity.per_page;

    this.reportType = this.selectedReportOption;

    let newStartDate = moment(entity.dateFrom).format('DD-MMM-YYYY');

    if (newStartDate === 'Invalid date') {
      newStartDate = '01-oct-2020';
    }

    this.startDate = newStartDate;
    this.reportValue = '';

    if (this.reportType === 'all') {

    } else if (this.reportType === 'branch') {
      this.reportValue = entity.sText1;
    } else if (this.reportType === 'zone') {
      this.reportValue = this.selectedZoneOption;
    }

    this.getDQIReports();
  }

  onReportTypeChange = (entity) => {
    console.log('###', entity);

    if (entity === 'all') {
      this.showZone = false;
      this.showMyBranch = false;
      this.showBranch = false;
    } else if (entity === 'zone') {
      this.showZone = true;
      this.showMyBranch = false;
      this.showBranch = false;
    } else if (entity === 'MyBranch') {
      this.showZone = false;
      this.showMyBranch = false;
      this.showBranch = false;
    } else if (entity === 'branch') {
      this.showZone = false;
      this.showMyBranch = false;
      this.showBranch = true;
    }

    this.selectedReportOption = entity;
    // this.getTopDepositors(this.selectedReportOption);
  }

  onZoneChange = (entity) => {
    console.log(entity);
    this.selectedZoneOption = entity;
  }

  getDQIReports = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    let endPointUrl = 'report/dqi?';

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}startDate=${this.startDate}&reportType=${this.reportType}&reportValue=${this.reportValue}&page=${this.page}&per_page=${this.per_page}`;

    console.log('===>', url);

    this.dataService.Get(url).subscribe(
      res => {

        console.log(res.data);

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

  getZones = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    let endPointUrl = 'report/dqi/zones?';

    const url = `${endPointUrl}page=${this.page}&per_page=50000`;

    this.dataService.Get(url).subscribe(
      res => {

        if (res.data && res.data.data) {
          const zones = res.data.data;
          const results = Array.from(new Set(zones.map(z => z.SET_DESC)))
            .map(x => {
              return {
                name: x
              };
            });

          results.map(x => {
            this.formatedZones.push({ name: x.name, code: x.name });
          });
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
    this.getDQIReports();
  }

  ExportDataToExcel() {

    this.isInprogress = true;

    const endPointUrl = 'report/dqi?';

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}startDate=${this.startDate}&reportType=${this.reportType}&reportValue=${this.reportValue}&page=${this.page}&per_page=${this.per_page}&_export=1`;

    this.dataService.Get(url)
      .subscribe((res) => {
        const data = res.data;

        if (data && data.length > 0) {
          this.excelExporterService.exportAsExcelFile(data, `dqi-report`);
        }

        this.isInprogress = false;
      },
        error => {
          // console.log(error);
          this.utilityService.showErrorToast(error, 'Something went wrong!');
          this.isInprogress = false;
        });
  }

}
