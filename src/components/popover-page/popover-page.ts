import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PopoverPageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popover-page',
  templateUrl: 'popover-page.html'
})
export class PopoverPageComponent {
  onChangeModeListener:any;
  options:any = {};
  constructor(public viewCtrl: ViewController, public navParams: NavParams)  {
    if (this.navParams.data){
      this.options = this.navParams.data;
    }
  }

  createRange(rng){
    var list = [];
    for (let i = rng[0]; i < rng[1]; i++){
      list.push(i);
    }
    return list;
  }
  onChange(item, event){
    if (this.options.onChangeListener){
      this.options.onChangeListener(item, event);
    }
    console.log(event);
  }
  onClick(item){
    if (this.options.onClickListener){
      this.options.onClickListener(item);
    }
    if (this.options.dismissOnClick){
      this.viewCtrl.dismiss();
    }
  }
  dismiss():Promise<any>{
    return this.viewCtrl.dismiss();
  }
  
}
