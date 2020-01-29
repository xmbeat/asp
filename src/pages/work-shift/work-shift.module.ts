import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkShiftPage } from './work-shift';

@NgModule({
  declarations: [
    WorkShiftPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkShiftPage),
  ],
})
export class WorkShiftPageModule {}
