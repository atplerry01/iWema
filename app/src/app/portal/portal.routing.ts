import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoggedInGuardService } from './../shared/guard/logged-in.guard.service';
import { FormMComponent } from './form-m/form-m.component';
import { ReportListsComponent } from './report-lists/report-lists.component';
import { ReportManagerComponent } from './report-manager/report-manager.component';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: 'report-lists', component: ReportListsComponent, 
      data: { title: 'Report Portal' },
      canActivate: [LoggedInGuardService]
    },
    {
      path: 'report-manager', component: ReportManagerComponent, 
      data: { title: 'Report Portal' },
      canActivate: [LoggedInGuardService]
    },
    {
      path: 'form-m', component: FormMComponent, 
      data: { title: 'Report Portal' },
      canActivate: [LoggedInGuardService]
    }
  ])],

  exports: [RouterModule]
})
export class PortalRoutingModule { }
