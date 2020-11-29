import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { DataService } from 'src/app/shared/service/data.service';
import { UtilityService } from 'src/app/shared/service/utility.service';

@Component({
  selector: 'app-report-manager',
  templateUrl: './report-manager.component.html',
  styleUrls: ['./report-manager.component.scss']
})

export class ReportManagerComponent implements OnInit {

  page = 1;
  per_page = 15;
  totalRecords = 0;
  total_pages = 0;
  pre_page?: number;
  next_page?: number;

  showNotFoundMsg = false;
  isInprogress = false;
  projectKey = '';

  reportParameters = null;

  hasDate = false;
  hasDateRange = false;

  hasLists = false;

  hasSearchText = false;
  hasDropDown = false;
  searchText1 = '';
  searchText2 = '';
  searchText3 = '';
  searchText4 = '';

  hasSearchList = false;
  hasExportData = false;
  moduleName = '';

  startDate = '';
  endDate = '';

  reportTitle = '';
  reportHeader = '';

  reportHeaderJson = [];

  reportParamListItems = [];

  reportData = [] = [];

  hasSearchButton = false;
  hasExportButton = false;

  isLoading = true;

  userEmail = '';
  userDepartment = '';
  downloadClick = false;

  constructor(
    private dataService: DataService,
    private utilityService: UtilityService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const currentUser = this.dataService.getCurrentUser();
    this.userEmail = currentUser.mail;
    this.userDepartment = currentUser.department;

    this.reportTitle = 'Account Freeze Report';
    this.getReportDetails();
  }

  getReportDetails() {
    this.route.queryParams.subscribe(map => {
      if (map.key === '') {
        this.utilityService.showErrorToast('', 'Invalid Report Locator');
        this.utilityService.goBack(); // TODO
      }

      this.projectKey = map.key;
      // this.getReportHeaderLocal(`assets/reports/${this.projectKey.toLowerCase()}.json`);
      this.getProjectDetail(this.projectKey);
      // this.getReportHeader();
    });
  }

  getProjectDetail(key) {
    this.showNotFoundMsg = false;
    this.isInprogress = true;
    const endPointUrl = `http://172.27.4.17/reportmanager/api/Report/ReportDetails?reportName=${key}`;

    this.dataService.GetExt(endPointUrl).subscribe(
      res => {
        console.log('###', res);
        this.buildParamTools(res);
        this.isInprogress = false;
        this.isLoading = false;
      },
      error => {
        // this.reportdetails = {};
        this.utilityService.showErrorToast(error, 'Something went wrong!');
        this.isInprogress = false;
        this.showNotFoundMsg = true;
        this.isLoading = false;
      }
    );
  }

  buildParamTools(params) {

    this.reportTitle = params.reportTitle;
    this.moduleName = params.reportName;

    if (params.parameters.map(x => x.parameterName).length > 0) {
      this.hasSearchButton = true;

      this.reportParameters = params;

      const parTypeDate = params.parameters.filter(x => x.parameterType.toLowerCase() === 'date');
      const parTypeText = params.parameters.filter(x => x.parameterType.toLowerCase() === 'string');
      const parTypeList = params.parameters.filter(x => x.parameterType.toLowerCase() === 'list');

      // Search Text
      if (parTypeText.length === 1) {
        this.searchText1 = parTypeText[0].parameterName;
      } else if (parTypeText.length === 2) {
        this.searchText1 = parTypeText[0].parameterName;
        this.searchText2 = parTypeText[1].parameterName;
      } else if (parTypeText.length === 3) {
        this.searchText1 = parTypeText[0].parameterName;
        this.searchText2 = parTypeText[1].parameterName;
        this.searchText3 = parTypeText[2].parameterName;
      } else if (parTypeText.length === 4) {
        this.searchText1 = parTypeText[0].parameterName;
        this.searchText2 = parTypeText[1].parameterName;
        this.searchText3 = parTypeText[2].parameterName;
        this.searchText4 = parTypeText[3].parameterName;
      } else {
        this.searchText1 = '';
        this.searchText2 = '';
        this.searchText3 = '';
        this.searchText4 = '';
      }

      // Date
      if (parTypeDate.length === 1) {
        // single date
        this.hasDate = true;
        this.hasDateRange = false;
      } else if (parTypeDate.length === 2) {
        // date range
        this.hasDate = true;
        this.hasDateRange = true;
      } else {
        // no date
        this.hasDate = false;
        this.hasDateRange = false;
      }

      // Drop
      if (parTypeList.length === 1) {
        this.hasDropDown = true;
      } else if (parTypeList.length === 2) {
        this.hasDropDown = true;
      } else {
        this.hasDropDown = false;
      }

      console.log(this.hasDate, this.hasDateRange);

    }
  }

  onSearch(event) {

    this.downloadClick = false;
    const r = [];
    let nModel: {};

    if (this.reportParameters === null) {
      nModel = {
        email: this.userEmail,
        department: this.userDepartment,
        reportName: this.projectKey,
        Parameters: [],
        limit: 500
      };
    } else {
      // String Setup
      const textBoxParams = this.reportParameters.parameters.filter(a => a.parameterType.toLowerCase() === 'string');

      if (textBoxParams.length === 1) {
        r.push({
          ParameterName: textBoxParams[0].parameterName,
          ParameterValue: event.sText1,
          ParameterType: textBoxParams[0].parameterType
        });
      } else if (textBoxParams.length === 2) {
        r.push({
          ParameterName: textBoxParams[0].parameterName,
          ParameterValue: event.sText1,
          ParameterType: textBoxParams[0].parameterType
        }, {
          ParameterName: textBoxParams[1].parameterName,
          ParameterValue: event.sText2,
          ParameterType: textBoxParams[1].parameterType
        });
      } else if (textBoxParams.length === 3) {
        r.push({
          ParameterName: textBoxParams[0].parameterName,
          ParameterValue: event.sText1,
          ParameterType: textBoxParams[0].parameterType
        }, {
          ParameterName: textBoxParams[1].parameterName,
          ParameterValue: event.sText2,
          ParameterType: textBoxParams[1].parameterType
        }, {
          ParameterName: textBoxParams[2].parameterName,
          ParameterValue: event.sText3,
          ParameterType: textBoxParams[2].parameterType
        });
      } else if (textBoxParams.length === 4) {
        r.push({
          ParameterName: textBoxParams[0].parameterName,
          ParameterValue: event.sText1,
          ParameterType: textBoxParams[0].parameterType
        }, {
          ParameterName: textBoxParams[1].parameterName,
          ParameterValue: event.sText2,
          ParameterType: textBoxParams[1].parameterType
        }, {
          ParameterName: textBoxParams[2].parameterName,
          ParameterValue: event.sText3,
          ParameterType: textBoxParams[2].parameterType
        }, {
          ParameterName: textBoxParams[3].parameterName,
          ParameterValue: event.sText4,
          ParameterType: textBoxParams[3].parameterType
        });
      }

      // Date Setup
      const dateParams = this.reportParameters.parameters.filter(a => a.parameterType.toLowerCase() === 'date');
      console.log('@@@', this.reportParameters.parameters);

      if (dateParams.length === 1) {
        r.push({
          ParameterName: dateParams[0].parameterName,
          ParameterValue: moment(event.dateFrom).format('DD-MMM-YYYY'),
          ParameterType: dateParams[0].parameterType
        });
      } else if (dateParams.length === 2) {
        r.push({
          ParameterName: dateParams[0].parameterName,
          ParameterValue: moment(event.dateFrom).format('DD-MMM-YYYY'),
          ParameterType: dateParams[0].parameterType
        },
          {
            ParameterName: dateParams[1].parameterName,
            ParameterValue: moment(event.dateTo).format('DD-MMM-YYYY'),
            ParameterType: dateParams[1].parameterType
          });
      }

      nModel = {
        email: this.userEmail,
        department: this.userDepartment,
        reportName: this.reportParameters.reportName,
        Parameters: r,
        limit: 500
      };

    }

    console.log('nModel', nModel);

    this.getReportData(nModel);

  }

  onSearchDownload(event) {
    this.downloadClick = false;
    const r = [];
    let dateCount = 0;
    let nModel = {};

    if (this.reportParameters === null) {
      nModel = {
        email: this.userEmail,
        department: this.userDepartment,
        reportName: this.projectKey,
        Parameters: [],
        limit: 500
      };
    } else {
      this.reportParameters.parameters.forEach(x => {
        if (x.parameterType === 'string') {
          r.push({ ParameterName: x.parameterName, ParameterValue: event.sText1, ParameterType: x.parameterType });
        } else if (x.parameterType === 'Date') {
          if (dateCount === 0) {
            r.push({ ParameterName: x.parameterName, ParameterValue: moment(event.dateFrom).format('DD-MMM-YYYY'), ParameterType: x.parameterType });
          } else {
            r.push({ ParameterName: x.parameterName, ParameterValue: moment(event.dateTo).format('DD-MMM-YYYY'), ParameterType: x.parameterType });
          }
          dateCount += 1;
        }
      });

      nModel = {
        email: this.userEmail,
        department: this.userDepartment,
        reportName: this.reportParameters.reportName,
        Parameters: r,
        limit: 0
      };

    }

    this.getReportDataDownload(nModel);
  }

  getReportData(model) {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    // filter parameters
    model.Parameters = model.Parameters.filter(x => x.ParameterValue !== 'Invalid date');
    model.Parameters = model.Parameters.filter(x => x.ParameterValue !== '');

    console.log('model.Parameters', model.Parameters);

    let url = `http://172.27.4.17/reportmanager/api/Report/ReportData`;

    this.dataService.PostExt(model, url).subscribe(
      res => {

        this.isInprogress = false;
        const msg = 'Update Successful';

        console.log('==> ', res);

        this.reportHeaderJson = res.headers;
        this.reportData = res.data;
        this.utilityService.showSuccessToast(msg, 'Success!');
      },
      error => {
        console.log('$$$$', error);
        this.utilityService.showErrorToast(error, 'Something went wrong!');
        this.isInprogress = false;
      }
    );
  }

  getReportDataDownload(model) {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    // filter parameters
    model.Parameters = model.Parameters.filter(x => x.ParameterValue !== 'Invalid date');

    let url = `http://172.27.4.17/reportmanager/api/Report/ReportFileId`;

    this.dataService.PostExt(model, url).subscribe(
      res => {
        this.isInprogress = false;
        const msg = 'Request Successful, You will receive the link to the report via email once completed.';
        this.downloadClick = true;

        this.utilityService.showSuccessToast(msg, 'Success!');

      },
      error => {
        this.utilityService.showErrorToast(error, 'Something went wrong!');
        this.isInprogress = false;
      }
    );
  }

  getDownloadPath(m) {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    let url = `http://172.27.4.17/reportmanager/api/Report/GetFileById?Id=${m}`;

    this.dataService.GetExt(url).subscribe(
      res => {
        this.isInprogress = false;
        const msg = 'Update Successful';

        // this.reportHeaderJson = res.headers; // JSON.parse(this.reportHeader);
        // this.reportData = res.data;
        this.utilityService.showSuccessToast(msg, 'Success!');
      },
      error => {
        this.utilityService.showErrorToast(error, 'Something went wrong!');
        this.isInprogress = false;
      }
    );
  }

  getListsItems(paramName) {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    let url = `http://172.27.4.17/reportmanager/api/Report/GetParameterValues?ParameterName=${paramName}`;

    this.dataService.GetExt(url).subscribe(
      res => {
        this.isInprogress = false;
        const msg = 'Update Successful';

        res.map(x => {
          this.reportParamListItems.push({ code: x.parameterOptionValue, name: x.parameterOptionName });
        });

        this.reportHeaderJson = res.headers;
        this.reportData = res.data;
        this.utilityService.showSuccessToast(msg, 'Success!');
      },
      error => {
        this.utilityService.showErrorToast(error, 'Something went wrong!');
        this.isInprogress = false;
      }
    );
  }






}
