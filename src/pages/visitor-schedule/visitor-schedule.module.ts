import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisitorSchedulePage } from './visitor-schedule';

@NgModule({
  declarations: [
    VisitorSchedulePage,
  ],
  imports: [
    IonicPageModule.forChild(VisitorSchedulePage),
  ],
})
export class VisitorSchedulePageModule {}
