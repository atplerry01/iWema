import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MGTRRoutingModule } from './mgtr.routing';

@NgModule({
  imports: [SharedModule, MGTRRoutingModule],
  declarations: []
})
export class MGTRModule {}
