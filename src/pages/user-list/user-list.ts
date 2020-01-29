import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Searchbar } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the UserListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-list',
  templateUrl: 'user-list.html',
})
export class UserListPage {
  protected searchQuery:string = null;
  private filter:any = null;
  private offset:number = 0;
  private limit:number = 20;
  private items:Array<any> = [];
  private shouldUpdate:boolean = true;
  private onSelectListener:any = null;
  private loading:boolean = false;
  private error:any = null;
  @ViewChild('sb') searchbar:Searchbar;

  protected searchEnabled:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadCtrl: LoadingController, 
    public alertCtrl: AlertController, public remoteData: DataProvider) {
      
      if (this.navParams.get('onSelectListener')){
        this.onSelectListener = this.navParams.get('onSelectListener');
        this.searchEnabled = true;
      }
  }

  /**
   * Recupera los siguientes elementos a cargar en la lista.
   */
  loadNextItems(): Promise<any>{
    this.error=null;
    this.loading = true;
    let params:any = {
      filter: this.filter,
      offset: this.offset,
      limit: this.limit,
      columns: ['id', 'first_name', 'last_name', 'email', 'phone', 'street', 'number', 'thumbnail']
    }
    return this.remoteData.getUsers(params)
    .then((users:Array<any>)=>{
      this.offset += users.length;
      for(let user of users){
        this.items.push(user);
      }
      this.loading = false;
    })
    .catch(error=>{
      this.error = error;
      this.loading = false;
    });
  }


  /**
   * Cambia el filtrado de la lista
   * @param filter el filtro a colocar
   * @param force indica si se necesita recuperar el contendio inmediatamente o solo se encola.
   */
  setFilter(filter:any, force:boolean = false){
    this.filter = filter;
    this.items = [];
    this.offset = 0;
    this.shouldUpdate = true;
    if (force){
      this.ionViewDidEnter();
    }
  }

  ionViewDidEnter(){
    if (this.shouldUpdate){
      this.shouldUpdate = false;
      this.loadNextItems().then(()=>{        
      });
    }
    if (this.searchEnabled){
      setTimeout(()=>{
        this.searchbar.setFocus();
      })
    }
  }

  cancel(){
    this.searchEnabled = false;
  }

  clear(){
    this.searchQuery = "";
    this.search();
  }

  search(){
    console.log(this.searchQuery);
    // if the value is an empty string don't filter the items
    if (this.searchQuery && this.searchQuery.trim() != '') {
      this.setFilter({
        __or:{
          first_name__like: '%' + this.searchQuery + '%',
          last_name__like: '%' + this.searchQuery + '%',
          phone__like: '%' + this.searchQuery + '%',
          street__like: '%' + this.searchQuery + '%'
        }
      }, true);
    }
    else{
      this.setFilter(null, true);
    }
  }

  enableSearch(){
    this.searchEnabled = true;
    setTimeout(()=>{
      this.searchbar.setFocus();
    })
  }
  itemTapped(index:number){
    if (this.onSelectListener){
      this.onSelectListener.onSelect(this.items[index]);
      this.navCtrl.pop();
    }
    else{
      this.navCtrl.push('UserPage', {
        source:this.items[index]
      })
      .catch(reason=>{
        console.log(reason);
      })
    }
  }

  addItem(){
    this.navCtrl.push('UserPage', {
      editMode: true
    })
    .catch(reason=>{
      console.log(reason)
    });
  }

}
