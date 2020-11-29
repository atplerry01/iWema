import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/service/data.service';
import { ExcelExporterService } from './../../../shared/service/excel-exporter.service';
import { UtilityService } from './../../../shared/service/utility.service';

@Component({
  selector: 'app-top-depositors',
  templateUrl: './top-depositors.component.html',
  styleUrls: ['./top-depositors.component.scss']
})

export class TopDepositorsComponent implements OnInit {

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
      name: 'PRODUCTTYPE',
      title: 'PRODUCTTYPE',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'BRANCH',
      title: 'BRANCH',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'CURRENCY',
      title: 'CURRENCY',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ACCOUNTNUMBER',
      title: 'ACCOUNT NUMBER',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'CUSTOMERNAME',
      title: 'CUSTOMERNAME',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'CLEAREDBALANCE',
      title: 'CLEAREDBALANCE',
      right: false,
      isDate: false,
      isNumber: true
    },
    {
      name: 'CUSTOMERID',
      title: 'CUSTOMER ID',
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
    }
  ];

  selectedReportOption = '50000000';

  reportTypes = [
    { code: '5000000', name: '5, 000, 000' },
    { code: '10000000', name: '10, 000, 000' },
    { code: '20000000', name: '20, 000, 000' },
    { code: '50000000', name: '50, 000, 000' }
  ];

  constructor(
    private dataService: DataService,
    public utilityService: UtilityService,
    private excelExporterService: ExcelExporterService
  ) { }

  ngOnInit() {
    this.reportTitle = 'Top Depositors Report';
    this.getTopDepositors(this.selectedReportOption);
    // this.getTopDepositorsV2(this.selectedReportOption);
  }

  onSearch(entity) {
    this.per_page = entity.per_page;
    this.getTopDepositors(this.selectedReportOption);
  }

  onReportTypeChange = (entity) => {
    this.selectedReportOption = entity;
    this.getTopDepositors(this.selectedReportOption);
  }

  getTopDepositorsV1 = (amount) => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    let endPointUrl = 'top-depositors/reports?';

    const url = `${endPointUrl}amount=${amount}&page=${this.page}&per_page=${this.per_page}`;

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

  getTopDepositors = (amount) => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const url = `http://172.27.4.17/DBConn.API/api/v1/DB/fetchdata`;
    const model = {
      dbconn: 'FINPROD',
      // tslint:disable-next-line: max-line-length
      query: `select ProductType, branch, currency, accountnumber, customername, clearedbalance, customerId, bvn
      from (select case schm_type when 'ODA' then 'Current Account' end as ProductType,  sol_desc branch,
      foracid accountnumber, acct_name customername,clr_bal_amt clearedbalance,  acct_crncy_code currency,cif_id customerId, custom.getbvn(foracid) bvn
      from tbaadm.gam g, tbaadm.sol s where g.del_flg='N' and g.sol_id=s.sol_id and schm_type = 'ODA'
      and clr_bal_amt >=${amount} order by clr_bal_amt desc)
      union all
  select ProductType, branch, currency, accountnumber, customername, clearedbalance, customerId, bvn
      from (select case schm_type when 'SBA' then 'Savings Account' end as ProductType,  sol_desc branch,
      foracid accountnumber, acct_name customername,clr_bal_amt clearedbalance,  acct_crncy_code currency, cif_id customerId, custom.getbvn(foracid) bvn
      from tbaadm.gam g, tbaadm.sol s where g.del_flg='N' and g.sol_id=s.sol_id and schm_type = 'SBA'
      and clr_bal_amt >=${amount} order by clr_bal_amt desc)
      union all
  select ProductType, branch, currency, accountnumber, customername, clearedbalance, customerId, bvn
      from (select case schm_type when 'TUA' then 'Term Deposits' end as ProductType,  sol_desc branch,
      foracid accountnumber, acct_name customername,clr_bal_amt clearedbalance,  acct_crncy_code currency, cif_id customerId, custom.getbvn(foracid) bvn
      from tbaadm.gam g, tbaadm.sol s where g.del_flg='N' and g.sol_id=s.sol_id and schm_type in ('TUA', 'TDA')
      and clr_bal_amt >=${amount} order by clr_bal_amt desc)
      union all
  select ProductType, branch, currency, accountnumber, customername, clearedbalance, customerId, bvn
      from (select case schm_type when 'CAA' then 'Call Deposits' end as ProductType,  sol_desc branch,
      foracid accountnumber, acct_name customername,clr_bal_amt clearedbalance,  acct_crncy_code currency, cif_id customerId, custom.getbvn(foracid) bvn
      from tbaadm.gam g, tbaadm.sol s where g.del_flg='N' and g.sol_id=s.sol_id and schm_type = 'CAA'
      and clr_bal_amt >=${amount} order by clr_bal_amt desc)`,
      parameters: []
    };

    this.dataService.Post_JSON(model, url).subscribe(
      res => {
        if (res.responseData && res.responseData.length > 0) {
          this.reportData = res.responseData;
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
    this.getTopDepositors(this.selectedReportOption);
  }

  ExportDataToExcel() {

    this.isInprogress = true;

    if (this.reportData) {
      this.excelExporterService.exportAsExcelFile(this.reportData, `top-depositors-report`);
      this.isInprogress = false;
    } else {
      this.utilityService.showErrorToast('Error', 'Something went wrong!');
      this.isInprogress = false;
    }
  }
}
