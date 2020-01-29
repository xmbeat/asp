import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuardEditPage } from './guard-edit';

@NgModule({
  declarations: [
    GuardEditPage,
  ],
  imports: [
    IonicPageModule.forChild(GuardEditPage),
  ],
})
export class GuardEditPageModule {}
