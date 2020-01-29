import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { PopoverPageComponent } from './popover-page/popover-page';
@NgModule({
	declarations: [PopoverPageComponent],
	imports: [
		IonicPageModule.forChild(PopoverPageComponent),
	],
	exports: [PopoverPageComponent]
})
export class ComponentsModule {}
