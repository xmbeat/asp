import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkShiftListPage } from './work-shift-list';

@NgModule({
  declarations: [
    WorkShiftListPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkShiftListPage),
  ],
})
export class WorkShiftListPageModule {}
