import { Camera, CameraOptions } from '@ionic-native/camera';
import { DataProvider } from './../../providers/data/data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Platform } from 'ionic-angular';
import { Md5 } from 'ts-md5/dist/md5';
import { PhotoViewer } from '@ionic-native/photo-viewer';
/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  private source:any = {};
  model:any = {};
  password:string = ""; //Unico campo que se debe transformar antes de pasar al modelo.
  editMode:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public remoteData: DataProvider, public photoViewer: PhotoViewer,
    public loadCtrl: LoadingController, public alertCtrl: AlertController, public camera: Camera, public platform:Platform) {
    if (this.navParams.get('source')){
      this.source = this.navParams.get('source');
    }
    if (this.navParams.get('editMode')){
      this.editMode = this.navParams.get('editMode');
    }
  }

  ionViewDidLoad() {
    //Si tiene ID recuperamos la fuente completa
    if (this.source.id){
      let loader = this.loadCtrl.create({content: 'Cargando...'});
      loader.present().then(()=>{
        let params:any = {
          filter: {id: this.source.id}
        }
        return this.remoteData.getUsers(params)
        .then((result:Array<any>)=>{
          if (result.length > 0){
            this.source = result[0];
            Object.assign(this.model, this.source);
          }          
        });
      })
      .catch(reason=>{
        let alert = this.alertCtrl.create({
          title:'Error', 
          message: 'No se pudo recuperar el registro', 
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
    else{
      Object.assign(this.model, this.source);
    }
    
  }

  getObjectDiff(base, modified, output = null){
		let size = 0;
		for (let attr in modified){
			if (modified[attr] != base[attr]){
				if (output){
					output[attr] = modified[attr];	
				}
				size += 1;
			}
		}
		return size;
	}

  save(){
    let loader = this.loadCtrl.create({content: 'Guardando...'});
    loader.present().then(()=>{
      let diffs:any = {};
      //Se codifica la contrasena desde aqui
      if (this.password){
        this.model.password = Md5.hashAsciiStr(this.password);
      }
      //Obtenemos los campos que han cambiado.
      if (this.getObjectDiff(this.source, this.model, diffs)){
        //Agregamos el id a los cambios para que pueda actualizar si es necesario
        if (this.source.id){
          diffs.id = this.source.id;
        }
        //Guardamos el usuario
        return this.remoteData.saveUser(diffs)
        .then((result:any)=>{
          //Recuperamos el identificador del usuario generado y lo agregamos al modelo y la fuente
          if (result.identifiers){
            Object.assign(this.model, result.identifiers);
          }
          Object.assign(this.source, this.model);
          //Regresamos al modo visualizacion
          this.editMode = false;
        })
      }
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

  viewPhoto(){
    if (this.model.image){
			if (this.platform.is('android') || this.platform.is('ios')){
				let title = this.model.first_name;
				if (!title){
					title = "";
				}
				let image = "data:image," + this.model.image;
				this.photoViewer.show(image, title);
			}
			else{

			}
		}	
  }
  takePhoto(){
    const options: CameraOptions = {
      quality: 90,
      allowEdit: true,
      targetHeight: 720,
      targetWidth: 720,
			correctOrientation: true,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE
		}
    this.camera.getPicture(options).then(ImageData=>{
      this.model.image = ImageData;
    })
    .catch(error=>{
      console.log(error);
    });
  }

}
