import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { LoggedInGuardService } from './../../shared/guard/logged-in.guard.service';
import { UssdTransComponent } from './ussd-trans/ussd-trans/ussd-trans.component';
import { UssdAirtimeComponent } from './ussd-airtime/ussd-airtime.component';

const routes: Routes = [
  {
    path: 'ussd-trans', component: UssdTransComponent, data: { title: 'DownTime Reports' },
    canActivate: [LoggedInGuardService]
  },
  {
    path: 'ussd-airtime', component: UssdAirtimeComponent, data: { title: 'USSD Airtime Reports' },
    canActivate: [LoggedInGuardService]
  },
];

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [UssdTransComponent, UssdAirtimeComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})

export class OPSReportsModule { }
