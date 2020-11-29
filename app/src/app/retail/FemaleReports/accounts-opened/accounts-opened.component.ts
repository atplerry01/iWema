import { Component, OnInit } from "@angular/core";
import { DataService } from "./../../../shared/service/data.service";
import { ExcelExporterService } from "./../../../shared/service/excel-exporter.service";
import { UtilityService } from "./../../../shared/service/utility.service";

@Component({
  selector: "app-accounts-opened",
  templateUrl: "./accounts-opened.component.html",
  styleUrls: ["./accounts-opened.component.scss"],
})
export class AccountsOpenedComponent implements OnInit {
  isInprogress = false;
  showNotFoundMsg = false;

  page = 1;
  per_page = 50;
  totalRecords = 0;
  total_pages = 0;
  pre_page?: number;
  next_page?: number;

  startDate = "";
  endDate = "";

  reportTitle = "";
  reportData: any[] = [];

  reportHeader = [
    {
      name: "COUNT(1)",
      title: "COUNT",
      right: false,
      isDate: false,
      isNumber: true,
    },
    {
      name: "SUM(CLR_BAL_AMT)",
      title: "SUM(CLR_BAL_AMT)",
      right: false,
      isDate: false,
      isNumber: true,
    },
  ];

  constructor(
    private dataService: DataService,
    public utilityService: UtilityService,
    private excelExporterService: ExcelExporterService
  ) {}

  ngOnInit() {
    this.reportTitle = "Female Accounts Reports";
    // this.getFemaleAccounts();
  }

  onSearch(entity) {
    this.startDate = entity.dateFrom;
    this.endDate = entity.dateFrom;
    console.log(this.startDate);

    this.getFemaleAccounts();
  }

  getFemaleAccounts = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const endPointUrl = "female-reports/opened?";

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}startDate=${this.startDate}&endDate=${this.endDate}&page=${this.page}&per_page=${this.per_page}`;
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

        this.utilityService.showErrorToast(error, "Something went wrong!");
        this.isInprogress = false;
        this.showNotFoundMsg = true;
      }
    );
  };

  ExportDataToExcel() {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const endPointUrl = "female-reports/opened?";

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}&startDate=${this.startDate}&_export=1`;

    this.dataService.Get(url).subscribe(
      (res) => {
        const data = res.data;

        if (data && data.length > 0) {
          this.excelExporterService.exportAsExcelFile(data, `Female-Accounts`);
        }

        this.isInprogress = false;
      },
      (error) => {
        // console.log(error);
        this.utilityService.showErrorToast(error, "Something went wrong!");
        this.isInprogress = false;
      }
    );
  }

  onPageChange = (offset) => {
    this.page = offset / this.per_page + 1;
    this.getFemaleAccounts();
  };
}
