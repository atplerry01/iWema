import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/service/data.service';
import { ExcelExporterService } from './../../../shared/service/excel-exporter.service';
import { UtilityService } from './../../../shared/service/utility.service';

@Component({
  selector: 'app-alat-goal',
  templateUrl: './alat-goal.component.html',
  styleUrls: ['./alat-goal.component.scss']
})

export class AlatGoalComponent implements OnInit {
  isInprogress = false;
  showNotFoundMsg = false;

  page = 1;
  per_page = 50;
  totalRecords = 0;
  total_pages = 0;
  pre_page?: number;
  next_page?: number;

  accountNumber = '';

  reportTitle = '';
  reportData: any[] = [];

  reportHeader = [
    {
      name: 'CIF',
      title: 'CIF',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'AccountName',
      title: 'AccountName',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'DebitAccount',
      title: 'DebitAccount',
      right: false,
      isDate: false,
      isNumber: false
    },
     {
      name: 'AmountSaved',
      title: 'AmountSaved',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Name',
      title: 'Name',
      right: false,
      isDate: false,
      isNumber: false
    },
      {
      name: 'GoalName',
      title: 'GoalName',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Status',
      title: 'Status',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'DateCreated',
      title: 'DateCreated',
      right: false,
      isDate: false,
      isNumber: false
    },
     {
      name: 'GoalTypeId',
      title: 'GoalTypeId',
      right: false,
      isDate: false,
      isNumber: false
    },
     {
      name: 'goalstatus',
      title: 'goalstatus',
      right: false,
      isDate: false,
      isNumber: false
    }
  ];

  constructor(
    private dataService: DataService,
    public utilityService: UtilityService,
    private excelExporterService: ExcelExporterService
  ) {}

  ngOnInit() {
    this.reportTitle = 'ALAT Goal Report';
    this.getRemoteReports();
  }

  onSearch(entity) {
    this.accountNumber = entity.sText1;
    this.getRemoteReports();
  }

  getRemoteReports = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    // bcs-reports/account-lien/reports
    const endPointUrl = 'inu/alat-goal/reports?';

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}&page=${this.page}&per_page=${this.per_page}`;
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
    this.getRemoteReports();
  }

  ExportDataToExcel() {
    this.isInprogress = true;

    const endPointUrl = 'inu/alat-goal/reports?';

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}&accountNumber=${this.accountNumber}&_export=1`;

    this.dataService.Get(url).subscribe(
      res => {
        const data = res.data;

        if (data && data.length > 0) {
          this.excelExporterService.exportAsExcelFile(data, `Account freeze`);
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
