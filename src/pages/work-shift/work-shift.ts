import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the WorkShiftPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-work-shift',
  templateUrl: 'work-shift.html',
})
export class WorkShiftPage {
  availableDays = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
  model = {
    name: 'Concierto Coldplay',
    location:'Test',
    locationList: [{name: 'Lomas de la virgen'}, {name:'Sierra madre'}, {name:'La encantada'}],
    shifts: [
      {
        days:[],
        startTime:0,
        endTime:0,
        guards:[]
      },
    ]
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  addShift(){
    this.model.shifts.push(
      {
        days:[],
        startTime:0,
        endTime:0,
        guards:[]
      }
    );
  }
  removeShift(index){
    this.model.shifts.splice(index, 1);
  }

  addGuardToShift(shift){
    shift.guards.push({name:'Matute'})
  }
  
  removeGuardToShift(shift){

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WorkShiftPage');
  }

}
