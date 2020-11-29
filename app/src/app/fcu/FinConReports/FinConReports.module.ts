import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { LoggedInGuardService } from './../../shared/guard/logged-in.guard.service';
import { ExpenseAlertHqComponent } from './expense-alert-hq/expense-alert-hq.component';
import { ExpenseAlertComponent } from './expense-alert/expense-alert.component';

const routes: Routes = [
  {
    path: 'expense-alert', component: ExpenseAlertComponent, data: { title: 'Account Mandate' },
    canActivate: [LoggedInGuardService]
  },
  {
    path: 'hq-expense-alert', component: ExpenseAlertHqComponent, data: { title: 'Account Mandate' },
    canActivate: [LoggedInGuardService]
  }
];

@NgModule({
  declarations: [ExpenseAlertComponent, ExpenseAlertHqComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})

export class FinConReportsModule { }
