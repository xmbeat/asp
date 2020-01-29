import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyVisitsPage } from './my-visits';

@NgModule({
  declarations: [
    MyVisitsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyVisitsPage),
  ],
})
export class MyVisitsPageModule {}
