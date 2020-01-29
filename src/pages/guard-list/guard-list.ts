import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { GuardModel } from '../../providers/data/models';
import { ConfigurationProvider } from '../../providers/configuration/configuration';

/**
 * Generated class for the GuardListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-guard-list',
  templateUrl: 'guard-list.html',
})
export class GuardListPage {
  guards:Array<any> = [
    {first_name: "Francisco Perez", phone: "423464565"},
    {first_name: "Adrian Gutierrez", phone: "2342342342"},
    {first_name: "Amado ramirez", phone: "3141388587"}
  ];
  guards_inactive:Array<any> = [
    {first_name: "Felipe de Jesus", phone: "423464565"},
    {first_name: "Juan Villa", phone: "2342342342"},
    {first_name: "Ramiro Juarez", phone: "3141388587"}
  ];
  filter:any = null;
  user: any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider, public config: ConfigurationProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GuardListPage');
    this.user = this.config.get('user');
  }

  itemAdd(){
    let model = new GuardModel;
    this.navCtrl.push('GuardEditPage', {
      title: 'Registrar nuevo guardia',
      model: model,
      onSaveListener: {
        save:(data)=>{
          return this.dataProvider.save({
            data:data,
            model:'guard'
          });
        }
      }
    });
  }


  itemTapped(){
    this.navCtrl.push('GuardPage');
  }

}
