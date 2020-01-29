import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GuardModel } from '../../providers/data/models';

/**
 * Generated class for the LocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {
  tabIndex = "0";
  availableDays = [
    "Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"
  ];
  model = {
    location: 'Test',
    supervisors: [
      {first_name:'Juan Hebert', phone:'493 1595103'},
      {first_name: 'Alex Valle', phone:'493 1595103'}
    ],
    shifts:[],
    rondines: [
      {
        time_start: 0,
        checkpoint:[
          {latitude:0, longitude: 0}, 
          {latitude: 0, longitude:0}
        ]
      }
    ]
  };
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationPage');
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


  removeSuperVisor(index){
    this.model.supervisors.splice(index, 1);
  }

  addSuperVisor(){
    this.navCtrl.push("GenericListPage", {
      model: new GuardModel,
      canAdd:false,
      searchFields: ['first_name', 'email', 'phone'],
      headerGenerator: (item)=>{
        return item.first_name;
      },
      contentGenerator: (item)=>{
        return item.phone;
      },
      eventListener: {
        onClick: (item)=>{
          this.model.supervisors.push(item);
          this.navCtrl.pop();
        }
      }
    });
  }

  addGuardToShift(shift){
    this.navCtrl.push("GenericListPage", {
      model: new GuardModel,
      canAdd:false,
      searchFields: ['first_name', 'email', 'phone'],
      headerGenerator: (item)=>{
        return item.first_name;
      },
      contentGenerator: (item)=>{
        return item.phone;
      },
      eventListener: {
        onClick: (item)=>{
          shift.guards.push(item);
          this.navCtrl.pop();
        }
      }
    });
  }
  
  removeGuardToShift(shift, index){
    shift.guards.splice(index, 1);
  }
}
