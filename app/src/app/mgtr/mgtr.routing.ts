import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'mgtr-reports', loadChildren: './mgtrReports/mgtrReports.module#MgtrReportsModule'
      }
    ])
  ],

  exports: [RouterModule]
})
export class MGTRRoutingModule {}
