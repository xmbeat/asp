import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GenericEditPage } from './generic-edit';

@NgModule({
  declarations: [
    GenericEditPage,
  ],
  imports: [
    IonicPageModule.forChild(GenericEditPage),
  ],
})
export class GenericEditPageModule {}
