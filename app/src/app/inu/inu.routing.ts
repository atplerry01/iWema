import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: 'reports',
      loadChildren: './INUReports/InuReports.module#INUReportsModule'
    },
  ])],

  exports: [RouterModule]
})
export class INURoutingModule { }
