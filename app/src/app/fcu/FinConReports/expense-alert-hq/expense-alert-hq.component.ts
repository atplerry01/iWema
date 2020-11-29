
import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../shared/service/data.service';
import { ExcelExporterService } from './../../../shared/service/excel-exporter.service';
import { UtilityService } from './../../../shared/service/utility.service';

@Component({
  selector: 'app-expense-alert-hq',
  templateUrl: './expense-alert-hq.component.html',
  styleUrls: ['./expense-alert-hq.component.scss']
})

export class ExpenseAlertHqComponent implements OnInit {

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
  reportDivisionData: any[] = [];
  reportDivisionUnitData: any[] = [];

  selectedDivisionOption = 'ByHQ';
  selectedDivisionUnitOption = 'ByHQ';

  reportDivisions = [];
  reportDivisionUnits = [];

  reportHeader = [
    {
      name: 'AccountName',
      title: 'AccountName',
      right: false,
      isDate: false,
      isNumber: false
    }, {
      name: 'AccountNo',
      title: 'AccountNo',
      right: false,
      isDate: false,
      isNumber: false
    }, {
      name: 'GLCode',
      title: 'GLCode',
      right: false,
      isDate: false,
      isNumber: false
    }, {
      name: 'GLSubHeadCode',
      title: 'GLSubHeadCode',
      right: false,
      isDate: false,
      isNumber: false
    }, {
      name: 'Narration',
      title: 'Narration',
      right: false,
      isDate: false,
      isNumber: false
    }, {
      name: 'TranAmt',
      title: 'TranAmt',
      right: false,
      isDate: false,
      isNumber: true
    }, {
      name: 'TranDate',
      title: 'TranDate',
      right: false,
      isDate: true,
      isNumber: false
    }, {
      name: 'InitiatingBrDesc',
      title: 'Initiating Branch',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ValueDate',
      title: 'ValueDate',
      right: false,
      isDate: true,
      isNumber: false
    },
    {
      name: 'EntryUserDesc',
      title: 'EntryUserDesc',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ReportCode',
      title: 'ReportCode',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ReportDesc',
      title: 'ReportDesc',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'AuthorizerDesc',
      title: 'AuthorizerDesc',
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
    this.reportTitle = 'Expense Alert Report';
    this.getDivisions();
  }

  onDivisionChange(entity) {
    console.log('3. ===>', entity);

    this.selectedDivisionOption = entity;
    this.getDivisionUnts(entity);
  }

  onDivisionUnitChange(entity) {
    this.selectedDivisionUnitOption = entity;
    this.getExpenseAlert(this.selectedDivisionUnitOption);
  }

  onSearch(entity) {
    this.startDate = entity.dateFrom;
    this.endDate = entity.dateTo;

    this.getExpenseAlert(this.selectedDivisionUnitOption);
  }

  getDivisions = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const endPointUrl = 'fincon/reports/hq-divisions?';

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}page=${this.page}&per_page=${this.per_page}`;

    this.dataService.Get(url).subscribe(
      res => {
        console.log('===> ', res.data);

        if (res.data) {
          const reportDivisionData = res.data.data;

          // reportDivisionData
          reportDivisionData.forEach(p => {
            this.reportDivisions.push({ code: p.Division, name: p.Division });
          });

          console.log('2. =====>', this.reportDivisions);
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

  getDivisionUnts = (division) => {

    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const endPointUrl = 'fincon/reports/hq-divisions-units?';

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}division=${division}&page=${this.page}&per_page=${this.per_page}`;

    this.dataService.Get(url).subscribe(
      res => {

        if (res.data) {
          const reportDivisionUnitData = res.data.data;

          this.reportDivisionUnits = [];

          reportDivisionUnitData.forEach(p => {
            this.reportDivisionUnits.push({ code: p.Ref_Code, name: p.Ref_Desc });
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

  getExpenseAlert = (division) => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const endPointUrl = 'fincon/reports/hq-expense-alert?';

    // const newStartDate = moment(this.startDate).format('DD-MMM-YYYY');
    // const newEndDate = moment(this.endDate).format('DD-MMM-YYYY');

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}reportCode=${division}&startDate=${this.startDate}&endDate=${this.endDate}&page=${this.page}&per_page=${this.per_page}`;

    console.log('====>cccc', url);

    this.dataService.Get(url).subscribe(
      res => {
        console.log('#####', res.data);

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

  ExportDataToExcel() {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const endPointUrl = 'fincon/reports/hq-expense-alert?';

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}reportCode=${this.selectedDivisionUnitOption}&startDate=${this.startDate}&endDate=${this.endDate}&page=${this.page}&per_page=${this.per_page}&_export=1`;

    this.dataService.Get(url).subscribe(
      res => {
        const data = res.data;

        if (data && data.length > 0) {
          this.excelExporterService.exportAsExcelFile(data, `expense-alert`);
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

  onPageChange = (offset) => {
    this.page = offset / this.per_page + 1;
    this.getExpenseAlert(this.selectedDivisionUnitOption);
  }
}
