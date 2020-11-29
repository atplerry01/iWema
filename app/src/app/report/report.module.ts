import { NgModule } from '@angular/core';

import {SharedModule} from '../shared/shared.module';

import { AccstatsComponent, PerfmgtComponent, RiskassetComponent, MaturityProfileComponent,
FirstTimeDebitComponent, ChannelMovementComponent,
CallOverComponent, LimitNotificationComponent,
WemaCollectComponent, AccountIntroducerComponent, TopDepositorsComponent,
 RMDashboardComponent, FixedDepositComponent, CarsbidsComponent, BetPerformanceComponent,
AuditReportComponent, FimiReportComponent, ConfidentialComponent, AttestationReportComponent} from './index';
import { ReportRoutingModule } from './report.routing';
import { DQIComponent } from './dqi/dqi.component';


@NgModule({
  imports: [
    SharedModule, ReportRoutingModule
  ],
  declarations: [
    AccstatsComponent,
    PerfmgtComponent,
    RiskassetComponent,
    MaturityProfileComponent,
    FirstTimeDebitComponent,
    ChannelMovementComponent,
    CallOverComponent,
    LimitNotificationComponent,
    WemaCollectComponent,
    AccountIntroducerComponent,
    TopDepositorsComponent,
    RMDashboardComponent,
    FixedDepositComponent,
    CarsbidsComponent,
    BetPerformanceComponent,
    AuditReportComponent,
    FimiReportComponent,
    ConfidentialComponent,
    AttestationReportComponent,
    DQIComponent
  ],
 // exports: [HomeComponent]
})

export class ReportModule { }
