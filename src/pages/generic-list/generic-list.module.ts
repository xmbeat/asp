import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GenericListPage } from './generic-list';

@NgModule({
  declarations: [
    GenericListPage,
  ],
  imports: [
    IonicPageModule.forChild(GenericListPage),
  ],
})
export class GenericListPageModule {}
