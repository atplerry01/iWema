import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuardService } from '../../shared/guard/logged-in.guard.service';
import { SharedModule } from '../../shared/shared.module';
import { AccountsOpenedComponent } from './accounts-opened/accounts-opened.component';
import { AllFemaleAccountsComponent } from './all-female-accounts/all-female-accounts.component';
import { DormantAccountsComponent } from './dormant-accounts/dormant-accounts.component';
//import { CorporateBorrowerComponent } from './corporate-borrower/corporate-borrower.component';

const routes: Routes = [
  {
    path: 'dormant-accounts',
    component: DormantAccountsComponent,
    data: { title: 'Female Dormant Accounts' },
    canActivate: [LoggedInGuardService],
  },
  {
    path: 'female-accounts',
    component: AccountsOpenedComponent,
    data: { title: 'Female Accounts' },
    canActivate: [LoggedInGuardService],
  },
  {
    path: 'all-female-accounts',
    component: AllFemaleAccountsComponent,
    data: { title: 'All Female Accounts' },
    canActivate: [LoggedInGuardService],
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],

  declarations: [
    DormantAccountsComponent,
    AccountsOpenedComponent,
    AllFemaleAccountsComponent,
  ],
})
export class FemaleReportsModule { }
