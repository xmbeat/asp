import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the GuardEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-guard-edit',
  templateUrl: 'guard-edit.html',
})
export class GuardEditPage {
  objectKeys = Object.keys;
  imageKey = null;
  showPassword: boolean = false;

  listErrors = {};
  
  options = {
    title: 'Editar registro',
    emptyImage: 'xm-user',
    goBackOnSave: false,
    onSavePromise:null,
    onSaveListener: null
  };
  
  //Contenido prellenado
  prefill = {};
  //El modelo que describe los datos a mostrar
  model:any = {};

  //El binding de los datos con los elementos renderizados 
  data:any = {};

  //Los fuente de datos original
  source:any = {
  };
  
  imageRequired(){
    return this.model[this.imageKey].required;
  }
  getImageKey(){
    for (let key in this.model){
      if (this.model[key].type == 'imageb64'){
        return key;
      }
    }
    return null;
  }
  
  createRange(rng){
    var list = [];
    for (let i = rng[0]; i < rng[1]; i++){
      list.push(i);
    }
    return list;
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public camera:Camera, 
    public alertCtrl: AlertController, public loadCtrl:LoadingController) {
    
    if (this.navParams.get('model')){
      this.model = this.navParams.get('model');
      this.imageKey = this.getImageKey();
    }
    if (this.navParams.get('source')){
      this.source = this.navParams.get('source');
      Object.assign(this.data, this.source);
    }
    if (this.navParams.get('prefill')){
      this.prefill = this.navParams.get('prefill');
      Object.assign(this.data, this.prefill);
    }
    if (this.navParams.get('title')){
      this.options.title = this.navParams.get('title');
    }
    if (this.navParams.get('emptyImage')){
      this.options.emptyImage = this.navParams.get('emptyImage');
    }
    if (this.navParams.get('onSavePromise')){
      this.options.onSavePromise = this.navParams.get('onSavePromise');
    }
    if (this.navParams.get('onSaveListener')){
      this.options.onSaveListener = this.navParams.get('onSaveListener');
    }
    if (this.navParams.get('goBackOnSave')){
      this.options.goBackOnSave = true;
    }
    this.data = this.convert(this.data, false);
  }

  extractIds(model, object, notIn = null){
    let result = {};
    for (let attr in model){
      if (model[attr].type == 'id'){
        if (object[attr]){
          if (notIn){
            if (!notIn[attr]){
              result[attr] = object[attr];
            }
          }
          else{              
            result[attr] = object[attr];
          }
        }
      }
    }
    return result;
  }

  //funcion para obtener unicamente los campos que cambiaron
  getObjectDiff(initial, actual, output): number{
    let size = 0;
		for (let attr in actual){
			if (actual[attr] != initial[attr]){
				if (output){
					output[attr] = actual[attr];	
				}
				size += 1;
			}
		}
		return size;
  }

   /**
   * Regresa los datos convertidos
   * 
   * @param data - Los datos a convertir
   * @param toRaw - Indica si los datos se convertiran a los tipo de datos fundamentales o a los que se muestran en pantallag
   * @returns Los datos convertidos
   */
  convert(data, toRaw){
    let result = {};
    for(let key in data){
      if (data[key] != null && this.model[key].type == 'date'){
        if (toRaw){
          result[key] = Math.ceil(new Date(data[key]).getTime() / 1000);
        }
        else{
          result[key] = new Date(data[key] * 1000).toISOString();
        }
      }
      else if (data[key] != null && this.model[key].type == 'multiple'){
        if (toRaw){
          let len = this.model[key].values.length;
          let multiple = new Array(len).fill(0, 0, len);
          for (let value of data[key]){
            let index = parseInt(value);
            multiple[index] = 1; 
          }
          result[key] = multiple.join('');
        }
        else{
          let multiple = [];
          for (let i = 0; i < data[key].length;i++){
            if (data[key].charAt(i)){
              multiple.push(i);
            }
          }
          result[key] = multiple;
        }
      }
      else{
        result[key] = data[key];
      }
    }
    return result;
  }

  ionViewDidLoad() {
    //Se podria cargar el contenido completo aqui pero nel

  }

  onClickCamera(){

    const options: CameraOptions = {
      quality: 90,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1024,
      correctOrientation: true
    }
    
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let win: any = window; // hack compilator
      let safeURL = win.Ionic.WebView.convertFileSrc(imageData);
      console.log(safeURL);
      console.log(imageData);
      if (this.imageKey){
        this.source[this.imageKey] = safeURL;
      }
    }, (err) => {
      console.log(err);
    });
  }

  onClickSave(){
    console.log(this.data);

    this.listErrors = {};
    let fields = this.model.fields;
    for(let key in fields){
      //El campo es obligatorio
      if (fields[key].required){
        if (!this.data[key]){
          this.listErrors[key] = true;
        }
      }
    }
    //Si aun faltan campos por ingresar
    if (Object.keys(this.listErrors).length > 0){
      this.alertCtrl.create({
        title: '¡Error!',
        message: 'Parece ser que aun no has ingresado todos los campos obligatorios',
        buttons: ['Aceptar']
      }).present();
    }
    else{
      //Convertimos primero los datos
      let converted = this.convert(this.data, true);
      //Checamos si hay cambios
      let changes = {};
      let size = this.getObjectDiff(this.source, converted, changes);
      //Hay cambios, procedemos
      if (size > 0){
        let loader = this.loadCtrl.create({
          content: 'Guardando registro...'
        });
        //Existe una funcion que guarda los datos y regresa una promesa
        if (this.options.onSaveListener){
          //Asignamos los ids de la fuente a los cambios para que se pueda actualizar en caso de ser necesario
          Object.assign(changes, this.extractIds(this.model, this.source));
          loader.present().then(()=>{
            return this.options.onSaveListener.save(changes);  
          })
          .then((result:any)=>{
            //Si se pudo guardar, asignamos los valores cambiados al source
            Object.assign(this.source, converted);
            //result deberia contener un objeto que contenga los ids generados
            if (result.identifiers){
              Object.assign(this.source, result.identifiers);
            }
            if (this.options.goBackOnSave){
              this.navCtrl.pop();
            }
          })
          .catch(error=>{
            console.error(error);
          })
          .then(()=>{
            loader.dismiss();
          });
        }
      }
      console.log(converted);
    }
  }
  
}
