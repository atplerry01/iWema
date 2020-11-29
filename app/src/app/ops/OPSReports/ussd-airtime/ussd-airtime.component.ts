import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DataService } from './../../../shared/service/data.service';
import { ExcelExporterService } from './../../../shared/service/excel-exporter.service';
import { UtilityService } from './../../../shared/service/utility.service';

@Component({
  selector: 'app-ussd-airtime',
  templateUrl: './ussd-airtime.component.html',
  styleUrls: ['./ussd-airtime.component.scss']
})
export class UssdAirtimeComponent implements OnInit {
  isInprogress = false;
  showNotFoundMsg = false;

  page = 1;
  per_page = 15;
  totalRecords = 0;
  total_pages = 0;
  pre_page?: number;
  next_page?: number;

  startDate = '';
  endDate = '';
  searchText = '';
  selectedSearchQuery = '';

  reportTitle = '';
  reportData: any[] = [];

  selectedReportOption = 'Success';

  reportTypes = [
    // { code: 'All', name: 'All' },
    { code: 'None', name: 'None' },
    { code: 'Success', name: 'Success' },
    { code: 'Failed', name: 'Failed' },
    { code: 'Reversed', name: 'Reversed' },
    { code: 'Unsuccesful', name: 'Unsuccesful' }
  ];

  searchType = {
    noSearch: 'noSearch',
    searchAll: 'searchAll',
    reportOnly: 'reportOnly',
    reportAndTextOnly: 'reportAndTextOnly',
    reportAndDateOnly: 'reportAndDateOnly',
    dateRangeOnly: 'dateRangeOnly',
    searchTextOnly: 'searchTextOnly',
  };

  reportHeader = [
    {
      name: 'CIF',
      title: 'CIF',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'DrAccountNo',
      title: 'DrAccountNo',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'MobileNumber',
      title: 'MobileNumber',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'NetworkType',
      title: 'NetworkType',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'FinacleResponse',
      title: 'FinacleResponse',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Naration',
      title: 'Naration',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'TransactionDate',
      title: 'TransactionDate',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Vendor',
      title: 'Vendor',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'EntryDate',
      title: 'EntryDate',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ResponseCode',
      title: 'ResponseCode',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'RefernceNumber',
      title: 'RefernceNumber',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ResponseCode',
      title: 'ResponseCode',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ResponseDescription',
      title: 'ResponseDescription',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'UniqueIdentifier',
      title: 'UniqueIdentifier',
      right: false,
      isDate: false,
      isNumber: false
    }
  ];

  constructor(
    private dataService: DataService,
    public utilityService: UtilityService,
    private excelExporterService: ExcelExporterService
  ) { }

  ngOnInit() {
    this.reportTitle = 'USSD Airtime Report';
    this.selectedReportOption = 'None';
  }

  onReportTypeChange = (entity) => {
    this.selectedReportOption = entity;
  }

  onSearch(entity) {
    console.log(entity);
    console.log(this.selectedReportOption);

    this.startDate = entity.dateFrom;
    this.endDate = entity.dateTo;
    this.searchText = entity.sText1;

    const newStartDate = moment(this.startDate).format('DD-MMM-YYYY');
    const newEndDate = moment(this.endDate).format('DD-MMM-YYYY');
    
    if (entity.dateFrom && entity.dateTo && entity.sText1 && this.selectedReportOption !== 'None') {
      // All
      this.selectedSearchQuery = `searchType=${this.searchType.searchAll}`;
    } else if (entity.dateFrom === '' && entity.dateTo === '' && (entity.sText1 === '' && entity.sText2 === '') && this.selectedReportOption !== 'None') {
      // ReportOnly
      this.selectedSearchQuery = `searchType=${this.searchType.reportOnly}`;

    } else if (entity.dateFrom === '' && entity.dateTo === '' && (entity.sText1 !== '' || entity.sText2 !== '') && this.selectedReportOption !== 'None') {
      // ReportTextOnly
      this.selectedSearchQuery = `searchType=${this.searchType.reportAndTextOnly}`;

    } else if (entity.dateFrom !== '' && entity.dateTo !== '' && (entity.sText1 === '' && entity.sText2 === '') && this.selectedReportOption !== 'None') {
      // reportAndDateOnly
      this.selectedSearchQuery = `searchType=${this.searchType.reportAndDateOnly}`;

    } else if (entity.dateFrom !== '' && entity.dateTo !== '' && (entity.sText1 === '' && entity.sText2 === '') && this.selectedReportOption === 'None') {
      // dateRangeOnly
      this.selectedSearchQuery = `searchType=${this.searchType.dateRangeOnly}`;

    // tslint:disable-next-line: max-line-length
    }  else if (entity.dateFrom === '' && entity.dateTo === '' && ( entity.sText1 !== '' || entity.sText2 !== '') && this.selectedReportOption === 'None') {
      // searchTextOnly
      this.selectedSearchQuery = `searchType=${this.searchType.searchTextOnly}`;

    } else {
      // no search
      this.selectedSearchQuery = `searchType=${this.searchType.noSearch}`;
    }

    // tslint:disable-next-line: max-line-length
    this.selectedSearchQuery = this.selectedSearchQuery + `&reportType=${this.selectedReportOption}&dateFrom=${newStartDate}&dateTo=${newEndDate}&searchText=${entity.sText1}&searchText2=${entity.sText2}`

    this.getUssdTransReports();
  }

  getUssdTransReports = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    /// api/v1/itu/reports/ussd-trans
    const endPointUrl = 'ops/ussd-airtime/reports?';

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}${this.selectedSearchQuery}&page=${this.page}&per_page=${this.per_page}`;
    console.log(url);
    
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

  onPageChange(offset) {
    this.page = offset / this.per_page + 1;
    this.getUssdTransReports();
  }

  ExportDataToExcel() {
    this.isInprogress = true;

    const endPointUrl = 'ops/ussd-airtime/reports?';

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}${this.selectedSearchQuery}&_export=1`;

    console.log('ExportDataToExcel: ', url);

    this.dataService.Get(url).subscribe(
      res => {
        const data = res.data;
        console.log(res.data);

        if (data && data.length > 0) {
          this.excelExporterService.exportAsExcelFile(
            data,
            `ussd-airtime-report`
          );
        }

        this.isInprogress = false;
      },
      error => {
        // console.log(error);
        this.utilityService.showErrorToast(error, 'Something went wrong!');
        this.isInprogress = false;
      }
    );
  }

}
