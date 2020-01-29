import { DataProvider } from './../../providers/data/data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import {Chart} from 'chart.js';

/**
 * Generated class for the VisitorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-visitor',
  templateUrl: 'visitor.html',
})
export class VisitorPage {
  date:string = null;
  time:string = null;
  model:any = {
    user:{
      
    },
    status:0,
  };

  constructor(public navCtrl: NavController, public remoteData:DataProvider, 
    public alertCtrl:AlertController, public loadCtrl:LoadingController,) {

  }

  search(){
    this.navCtrl.push('UserListPage', {
      onSelectListener: this
    })
    .catch(reason=>{
      console.log(reason);
    });
  }

  onSelect(user){
    this.model.user = user;
  }

  save(){
    let loader = this.loadCtrl.create({content: 'Guardando...'});
    loader.present().then(()=>{
      if (this.date){
        this.model.date = new Date(this.date).getTime();
      }

      return this.remoteData.saveVisit(this.model)
      .then(result=>{
        // if (this.model.user.phone && this.sendWhats){
        //   this.sendWhatsApp();
        // }
        console.log(result);
      })
    })
    .catch(reason=>{
      let alert = this.alertCtrl.create({
        title:'Error', 
        message: 'No se pudo guardar el registro', 
        buttons: [{
          text: 'Aceptar'
        }]
      });
      alert.present();
    })
    .then(()=>{
      loader.dismiss();
    })
  }

  ionViewDidEnter() {
    this.date = new Date().toISOString();
    this.time = this.date;
  }

  sendWhatsApp(){
    let phone = "";
    let message = "Visita en camino " + "\n";
    if (this.model.first_name){
      message += "Nombre: " + this.model.first_name + "\n";
    }
    if (this.model.last_name){
      message += "Apellidos: " + this.model.last_name + "\n";
    }
    if (this.model.car_number){
      message += "Matricula: " + this.model.car_number + "\n";
    }

    if (this.model.user.phone){
      phone = "52" + this.model.user.phone;
    }
    message = encodeURI(message);
    window.location.href =  "https://wa.me/"+phone+"?text=" + message;
  }
}