import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../shared/service/data.service';
import { ExcelExporterService } from './../../../shared/service/excel-exporter.service';
import { UtilityService } from './../../../shared/service/utility.service';

@Component({
  selector: 'app-all-female-accounts',
  templateUrl: './all-female-accounts.component.html',
  styleUrls: ['./all-female-accounts.component.scss'],
})
export class AllFemaleAccountsComponent implements OnInit {
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
      name: 'FORACID',
      title: 'FORACID',
      right: false,
      isDate: false,
      isNumber: false,
    },
    {
      name: 'ACCT_NAME',
      title: 'ACCT_NAME',
      right: false,
      isDate: false,
      isNumber: false,
    },
    {
      name: 'ACCT_OPN_DATE',
      title: 'ACCT_OPN_DATE',
      right: false,
      isDate: true,
      isNumber: false,
    },
    {
      name: 'CUST_DOB',
      title: 'CUST_DOB',
      right: false,
      isDate: false,
      isNumber: false,
    },
    {
      name: 'AGE',
      title: 'AGE',
      right: false,
      isDate: false,
      isNumber: false,
    },
    {
      name: 'PHONE',
      title: 'PHONE',
      right: false,
      isDate: false,
      isNumber: false,
    },
    {
      name: 'EMAIL',
      title: 'EMAIL',
      right: false,
      isDate: false,
      isNumber: false,
    },
    {
      name: 'ADDRESS',
      title: 'ADDRESS',
      right: false,
      isDate: false,
      isNumber: false,
    },
    {
      name: 'SCHM_TYPE',
      title: 'SCHM_TYPE',
      right: false,
      isDate: false,
      isNumber: false,
    },
    {
      name: 'CLR_BAL_AMT',
      title: 'CLR_BAL_AMT',
      right: false,
      isDate: false,
      isNumber: true,
    },
  ];

  constructor(
    private dataService: DataService,
    public utilityService: UtilityService,
    private excelExporterService: ExcelExporterService
  ) { }

  ngOnInit() {
    this.reportTitle = 'All Female Accounts Reports';
    // this.getAllFemaleAccounts();
  }

  onSearch(entity) {
    this.startDate = entity.dateFrom;
    this.endDate = entity.dateTo;

    if (entity.dateFrom === '' || entity.dateTo === '') {
      this.utilityService.showErrorToast('Error', 'Something went wrong!');
    } else {
      console.log(this.startDate);

      this.getAllFemaleAccounts();
    }

  }

  getAllFemaleAccounts = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const endPointUrl = 'female-reports/all-accounts?';

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}&startDate=${this.startDate}&endDate=${this.endDate}&page=${this.page}&per_page=${this.per_page}`;
    console.log(url);

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

  getAllFemaleAccounts2 = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const url = `http://172.27.4.17/DBConn.API/api/v1/DB/fetchdata`;
    const model = {
      dbconn: 'FINPROD',
      // tslint:disable-next-line: max-line-length
      query: `select foracid,acct_name,acct_opn_date,cust_dob,to_char(sysdate,'YYYY') -birth_year Age,(select phoneno from tbaadm.cphone where phone_b2kid=a.cif_id and rownum=1) Phone, (select email from tbaadm.cemail where email_b2kid=a.cif_id and rownum=1) Email, (select Address_Line1||' '||Address_Line2||' '||Address_Line3
      from crmuser.address where orgkey=a.cif_id And Addresscategory
      <>'Swift' and rownum=1) Address ,schm_type,clr_bal_amt from tbaadm.gam a,crmuser.accounts b where a.cif_id=b.orgkey --and acct_opn_date between '2020-02-01' and '2020-02-01' and gender='F'
      and acct_cls_flg='N'`,
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

    const endPointUrl = 'female-reports/all-accounts?';

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}&startDate=${this.startDate}&endDate=${this.endDate}&_export=1`;

    this.dataService.Get(url).subscribe(
      (res) => {
        const data = res.data;

        if (data && data.length > 0) {
          this.excelExporterService.exportAsExcelFile(
            data,
            `All-Female-Accounts`
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
    this.getAllFemaleAccounts();
  }
}
