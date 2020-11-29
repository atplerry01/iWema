import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DataService } from './../../../shared/service/data.service';
import { ExcelExporterService } from './../../../shared/service/excel-exporter.service';
import { UtilityService } from './../../../shared/service/utility.service';

@Component({
  selector: 'app-dormant-accounts',
  templateUrl: './dormant-accounts.component.html',
  styleUrls: ['./dormant-accounts.component.scss'],
})
export class DormantAccountsComponent implements OnInit {
  isInprogress = false;
  showNotFoundMsg = false;

  page = 1;
  per_page = 50;
  totalRecords = 0;
  total_pages = 0;
  pre_page?: number;
  next_page?: number;

  startDate = '';
  endDate = '';

  reportTitle = '';
  reportData: any[] = [];

  reportHeader = [
    {
      name: 'ACCT_NAME',
      title: 'ACCT_NAME',
      right: false,
      isDate: false,
      isNumber: false,
    },
    {
      name: 'FORACID',
      title: 'FORACID',
      right: false,
      isDate: false,
      isNumber: false,
    },
    {
      name: 'ACCT_OPN_DATE',
      title: 'ACCT_OPEN_DATE',
      right: false,
      isDate: true,
      isNumber: false,
    },
    {
      name: 'CUST_SEX',
      title: 'CUST_SEX',
      right: false,
      isDate: false,
      isNumber: false,
    },
    {
      name: 'ACCT_STATUS',
      title: 'ACCT_STATUS',
      right: false,
      isDate: false,
      isNumber: false,
    },
  ];

  constructor(
    private dataService: DataService,
    public utilityService: UtilityService,
    private excelExporterService: ExcelExporterService
  ) {}

  ngOnInit() {
    this.reportTitle = 'Female Dormant Accounts Report';
    // this.getDormantAccount();
  }


  onSearch = (entity) => {
    console.log(entity);

    this.startDate = entity.dateFrom;
    this.endDate = entity.dateTo;

    if (entity.dateFrom === '' || entity.dateTo === '') {
      this.utilityService.showErrorToast('Error', 'Please select valid Date Range');
    } else {
      this.startDate = moment(this.startDate).format('DD-MMM-YYYY');
      this.endDate = moment(this.endDate).format('DD-MMM-YYYY');
  
      console.log(this.startDate, this.endDate);
      this.getDormantAccount(this.startDate, this.endDate);
    }
    
  }

  getDormantAccount = (newStartDate, newEndDate) => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const endPointUrl = 'female-reports/dormant?';

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}startDate=${newStartDate}&endDate=${newEndDate}&page=${this.page}&per_page=${this.per_page}`;

    this.dataService.Get(url).subscribe(
      (res) => {
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
      (error) => {
        this.reportData = [];
        this.totalRecords = 0;
        this.total_pages = 0;

        this.utilityService.showErrorToast(error, 'Something went wrong!');
        this.isInprogress = false;
        this.showNotFoundMsg = true;
      }
    );
  }

  getDormantAccount3 = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    console.log('xxxx');

    const url = `http://172.27.4.17/DBConn.API/api/v1/DB/fetchdata`;
    const model = {
      dbconn: 'FINPROD',
      // tslint:disable-next-line: max-line-length
      query: `select acct_name,foracid,acct_opn_date, b.cust_sex,acct_status from tbaadm.gam a, crmuser.cmg b, (select acid,acct_status,acct_status_date from tbaadm.cam union select acid,acct_status,acct_status_date from tbaadm.smt) c where a.cif_id=b.cif_id and a.acid=c.acid and cust_sex='F' and sol_id <> '900' and schm_type in ('SBA','CAA','ODA') and acct_cls_flg='N' and a.del_flg='N'`,
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

  ExportDataToExcel() {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const endPointUrl = 'female-reports/dormant?';

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}&startDate=${this.startDate}&endDate=${this.endDate}&_export=1`;

    this.dataService.Get(url).subscribe(
      (res) => {
        const data = res.data;

        if (data && data.length > 0) {
          this.excelExporterService.exportAsExcelFile(
            data,
            `Female-dormant-accounts`
          );
        }

        this.isInprogress = false;
      },
      (error) => {
        // console.log(error);
        this.utilityService.showErrorToast(error, 'Something went wrong!');
        this.isInprogress = false;
      }
    );
  }

  onPageChange = (offset) => {
    this.page = offset / this.per_page + 1;
    console.log(this.startDate, this.endDate);
    this.getDormantAccount(this.startDate, this.endDate);
  }
}
