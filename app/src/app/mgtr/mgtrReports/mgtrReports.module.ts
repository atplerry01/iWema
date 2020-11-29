import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuardService } from '../../shared/guard/logged-in.guard.service';
import { SharedModule } from '../../shared/shared.module';
import { AdminAuditComponent } from './admin-audit/admin-audit.component';
import { AdminDepartmentsComponent } from './admin-departments/admin-departments.component';
import { AdminNotificationComponent } from './admin-notification/admin-notification.component';
import { AdminPolicyComponent } from './admin-policy/admin-policy.component';
import { AdminRegNotificationComponent } from './admin-reg-notification/admin-reg-notification.component';
import { AdminRegulatoryComponent } from './admin-regulatory/admin-regulatory.component';
import { DepartmentPolicyComponent } from './department-policy/department-policy.component';
import { PoliciesComponent } from './policies/policies.component';
import { RegulationComponent } from './regulation/regulation.component';

const routes: Routes = [
  {
    path: 'admin-policy', component: AdminPolicyComponent, data: { title: 'Admin Policy' },
    canActivate: [LoggedInGuardService]
  }, {
    path: 'admin-regulatory', component: AdminRegulatoryComponent, data: { title: 'Admin Regulatory' },
    canActivate: [LoggedInGuardService]
  }, {
    path: 'admin-departments', component: AdminDepartmentsComponent, data: { title: 'Admin Departments' },
    canActivate: [LoggedInGuardService]
  }, {
    path: 'admin-policy-notifications', component: AdminNotificationComponent, data: { title: 'Admin Notifications' },
    canActivate: [LoggedInGuardService]
  }, {
    path: 'admin-regulation-notifications', component: AdminRegNotificationComponent, data: { title: 'Admin Notifications' },
    canActivate: [LoggedInGuardService]
  }, {
    path: 'admin-audits', component: AdminAuditComponent, data: { title: 'Admin Audits' },
    canActivate: [LoggedInGuardService]
  }, {
    path: 'regulations', component: RegulationComponent, data: { title: 'Regulatory Policies' },
    canActivate: [LoggedInGuardService]
  }, {
    path: 'departmental-policies', component: DepartmentPolicyComponent, data: { title: 'Departmental Policies' },
    canActivate: [LoggedInGuardService]
  }, {
    path: 'policies', component: PoliciesComponent, data: { title: 'Policies' },
    canActivate: [LoggedInGuardService]
  }
];

@NgModule({
  declarations: [DepartmentPolicyComponent, PoliciesComponent, RegulationComponent, AdminPolicyComponent, AdminRegulatoryComponent, AdminDepartmentsComponent, AdminNotificationComponent, AdminRegNotificationComponent, AdminAuditComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class MgtrReportsModule { }
