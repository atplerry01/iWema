import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuardService } from '../../shared/guard/logged-in.guard.service';
import { SharedModule } from '../../shared/shared.module';
import { AlatDocComponent } from './alat-doc/alat-doc.component';
import { AlatGoalComponent } from './alat-goal/alat-goal.component';
import { AlatTransComponent } from './alat-trans/alat-trans.component';
import { GeneralComponent } from './general/general.component';
import { InducedTransactionComponent } from './induced-transaction/induced-transaction.component';
import { LoanTransComponent } from './loan-trans/loan-trans.component';
import { LoanComponent } from './loan/loan.component';

const routes: Routes = [
  {
    path: 'alat-doc', component: AlatDocComponent, data: { title: 'ALAT Doc' },
    canActivate: [LoggedInGuardService]
  },
  {
    path: 'alat-goal', component: AlatGoalComponent, data: { title: 'ALAT GOAL' },
    canActivate: [LoggedInGuardService]
  },
  {
    path: 'alat-trans', component: AlatTransComponent, data: { title: 'ALAT Trans' },
    canActivate: [LoggedInGuardService]
  },
  {
    path: 'general', component: GeneralComponent, data: { title: 'General' },
    canActivate: [LoggedInGuardService]
  },
  {
    path: 'induced-transaction', component: InducedTransactionComponent, data: { title: 'Induced Transaction' },
    canActivate: [LoggedInGuardService]
  },
  {
    path: 'loan', component: LoanComponent, data: { title: 'Loan' },
    canActivate: [LoggedInGuardService]
  },
  {
    path: 'loan-trans', component: LoanTransComponent, data: { title: 'Loan Transaction' },
    canActivate: [LoggedInGuardService]
  },
];

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [AlatDocComponent, AlatGoalComponent, AlatTransComponent, GeneralComponent, InducedTransactionComponent, LoanComponent, LoanTransComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})

export class INUReportsModule { }
