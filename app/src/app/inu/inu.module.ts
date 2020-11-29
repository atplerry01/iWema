import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { INURoutingModule } from './inu.routing';

@NgModule({
  imports: [
    SharedModule, INURoutingModule
  ],
  declarations: []
})

export class INUModule { }
