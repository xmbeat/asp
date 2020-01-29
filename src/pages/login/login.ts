import { DataProvider } from './../../providers/data/data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , MenuController, AlertController, LoadingController} from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Md5 } from 'ts-md5';
import { ConfigurationProvider } from '../../providers/configuration/configuration';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  counter = 0;
  model = {email:'', password:'', type:'0'};
  options = {
    onLoginEvent: null,
    canGoBack: true
  };
  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, 
    public loadCtrl: LoadingController, public alertCtrl: AlertController, public configuration: ConfigurationProvider,
    private fb: Facebook, private dataProvider: DataProvider) {
    this.options.onLoginEvent = this.navParams.get('onLoginEvent');
  }

  ionViewDidEnter(){
		//this.menuCtrl.swipeEnable(this.navParams.get('swipeEnable'), "mainMenu");
	}


  onlineLogin(){
    if (this.model.email != "" && this.model.password != "" && this.model.type != null){
      let loader = this.loadCtrl.create({content: 'Cargando...'});
      loader.present().then(()=>{
        let password = Md5.hashAsciiStr(this.model.password);
        this.dataProvider.login(this.model.email, password as string, this.model.type as string)
        .then((user)=>{
          console.log(user);
          user.type = parseInt(this.model.type);
          if (this.options.onLoginEvent){
            this.options.onLoginEvent(user);
          }
          else{
            this.configuration.set('user', user);           
            this.navCtrl.setRoot('HomePage', null, {animate:true})
          }
        })
        .catch(error=>{
          let alert = this.alertCtrl.create({
						title: 'Error',
						message: error.message,
						buttons: ['Aceptar']
					});
					alert.present();
        })
        .then(()=>{
          loader.dismiss();
        });
      });     
    }
  }

  facebookLogin(){
    this.fb.login(['public_profile', 'email']).then((result: FacebookLoginResponse)=>{
      console.log(result);
      if (result.status == "connected"){
        // this.dataProvider.getUserFBData(result.authResponse.userID, result.authResponse.accessToken);
        // this.dataProvider.getUserFBImage(result.authResponse.userID);
        let loader = this.loadCtrl.create({content: 'Iniciando sesión...'});
        loader.present().then(()=>{
          this.dataProvider.loginFacebook(result.authResponse.accessToken)
          .then((user)=>{
            console.log(user);
            this.navCtrl.setRoot('HomePage', {}, {animate:true});
          })
          .catch(error=>{
            let alert = this.alertCtrl.create({
              title: 'Error',
              message: error.message,
              buttons: ['Aceptar']
            });
            alert.present();
          })
          .then(()=>{
            loader.dismiss();
          });
        });  
      }
      else{
        
      }
    })
    .catch(error=>{
      console.log(error);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
