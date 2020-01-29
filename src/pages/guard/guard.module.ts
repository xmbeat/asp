import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuardPage } from './guard';
import { StarRatingModule } from 'ionic3-star-rating';
@NgModule({
  declarations: [
    GuardPage,
  ],
  imports: [
    StarRatingModule,
    IonicPageModule.forChild(GuardPage),
  ],
})
export class GuardPageModule {}
