import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PortalRoutingModule } from './Portal.routing';
import { ReportListsComponent } from './report-lists/report-lists.component';
import { ReportManagerComponent } from './report-manager/report-manager.component';
import { FormMComponent } from './form-m/form-m.component';

@NgModule({
  imports: [
    SharedModule, PortalRoutingModule
  ],
  declarations: [ReportManagerComponent, ReportListsComponent, FormMComponent]
})

export class PortalModule { }
