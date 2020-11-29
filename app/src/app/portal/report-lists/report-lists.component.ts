import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/service/data.service';
import { UtilityService } from 'src/app/shared/service/utility.service';

@Component({
  selector: 'app-report-lists',
  templateUrl: './report-lists.component.html',
  styleUrls: ['./report-lists.component.scss']
})
export class ReportListsComponent implements OnInit {
  panelOpenState = false;
  
  showNotFoundMsg = false;
  isInprogress = false;
  isLoading = true;

  reportLists = [];

  userEmail = '';
  userDepartment = '';

  constructor(
    private dataService: DataService,
    private utilityService: UtilityService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const currentUser = this.dataService.getCurrentUser();

    this.userEmail = currentUser.mail;
    this.userDepartment = currentUser.department;

    this.getAllReorts();
  }

  // get all reports
  getAllReorts() {
    this.showNotFoundMsg = false;
    this.isInprogress = true;
    const endPointUrl = `http://172.27.4.17/reportmanager/api/Permission`;

    const model = {
      email: this.userEmail,
      department: this.userDepartment
    };

    console.log(model);

    this.dataService.PostExt(model, endPointUrl).subscribe(
      res => {
        // this.buildParamTools(res);
        console.log('xxxx', res);

        let nn = [];
        // const newRes = res.filter(x => x.groupDescription === null);
        const a = res.filter(x => x.groupName === 'Others');
        let b = res.filter(x => x.groupName !== 'Others');

        b.map(x => {
          nn.push(x);
        });

        nn.push(a[0]);

        this.reportLists = nn; //res;
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
}
