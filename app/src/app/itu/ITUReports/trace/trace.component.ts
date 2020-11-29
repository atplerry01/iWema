
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/service/data.service';
import { ExcelExporterService } from './../../../shared/service/excel-exporter.service';
import { UtilityService } from './../../../shared/service/utility.service';


@Component({
  selector: 'app-trace',
  templateUrl: './trace.component.html',
  styleUrls: ['./trace.component.scss']
})
export class TraceComponent implements OnInit {
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
  accountNumber = '';

  reportTitle = '';
  reportData: any[] = [];

  // selectedBranchOption = 0;
  // branches: IBranch[] = [];
  // objectLists: any[] = [];
  // branchLists: any[] = [];

  reportHeader = [
    {
      name: 'retrieval_reference_nr',
      title: 'retrieval_reference_nr',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'terminal_id',
      title: 'terminal_id',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'pan',
      title: 'pan',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'auth_id_rsp',
      title: 'auth_id_rsp',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'system_trace_audit_nr',
      title: 'system_trace_audit_nr',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'tran_type',
      title: 'tran_type',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'tran_currency_code',
      title: 'tran_currency_code',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'abort_rsp_code',
      title: 'abort_rsp_code',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'datetime_req',
      title: 'datetime_req',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'rsp_code_rsp',
      title: 'rsp_code_rsp',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'card_acceptor_name_loc',
      title: 'card_acceptor_name_loc',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'from_account_id',
      title: 'from_account_id',
      right: false,
      isDate: false,
      isNumber: true
    },
    {
      name: 'to_account_id',
      title: 'to_account_id',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'tran_amount_req',
      title: 'tran_amount_req',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'settle_amount_rsp',
      title: 'settle_amount_rsp',
      right: false,
      isDate: true,
      isNumber: false
    },
    {
      name: 'settle_amount_impact',
      title: 'settle_amount_impact',
      right: false,
      isDate: true,
      isNumber: false
    }
  ];

  constructor(
    private dataService: DataService,
    public utilityService: UtilityService,
    private excelExporterService: ExcelExporterService
  ) {}

  ngOnInit() {
    this.reportTitle = 'Status Report';
  }

  onSearch(entity) {
    console.log(entity);
    this.accountNumber = entity.sText1;
    this.startDate = entity.dateFrom;
    this.endDate = entity.dateTo;
    this.ebillsReports();
  }

  ebillsReports = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;
    const endPointUrl = 'itu/reports/trace?';
    let hasDateRange = false;
    let hasAccount = false;

    if (this.accountNumber !== '') {
      hasAccount = true;
    }

    if (this.startDate !== '') {
      hasDateRange = true;
    }
    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}&hasAccount=${hasAccount}&hasDateRange=${hasDateRange}&accountNumber=${this.accountNumber}startDate=${this.startDate}&endDate=${this.endDate}&page=${this.page}&per_page=${this.per_page}`;
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
  };

  onPageChange(offset) {
    this.page = offset / this.per_page + 1;
    this.ebillsReports();
  }

  ExportDataToExcel() {
    this.isInprogress = true;

    const endPointUrl = 'itu/reports/trace?';

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}&startDate=${this.startDate}&endDate=${this.endDate}&_export=1`;

    this.dataService.Get(url).subscribe(
      res => {
        const data = res.data;

        if (data && data.length > 0) {
          this.excelExporterService.exportAsExcelFile(data, `E-bills-report`);
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
