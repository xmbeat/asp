import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Searchbar } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the GenericListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-generic-list',
  templateUrl: 'generic-list.html',
})
export class GenericListPage {

  options = {
    title: 'Lista',
    model: {},
    columnsToShow:[],
    eventListener: null,
    canAdd: true,
    searchFields: [],
    imageField: null,
    iconGenerator: null,
    headerGenerator: null,
    contentGenerator: null,
    imageGenerator: null
  };
  
  protected searchQuery:string = null;
  private filter:any = null;
  private offset:number = 0;
  private limit:number = 20;
  private items:Array<any> = [];
  private shouldUpdate:boolean = true;
  private onSelectListener:any = null;
  private loading:boolean = false;
  private error:any = null;
  protected searchEnabled:boolean = false;
  @ViewChild('sb') searchbar:Searchbar;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider) {
    if (navParams.get('title')){
      this.options.title = navParams.get('title');
    }
    if (navParams.get('model')){
      this.options.model = this.navParams.get('model');
    }
    if (navParams.get('eventListener')){
      this.options.eventListener = this.navParams.get('eventListener');
    }
    if (navParams.get('searchFields')){
      this.options.searchFields = navParams.get('searchFields');
    }
    if (navParams.get('headerGenerator')){
      this.options.headerGenerator = navParams.get('headerGenerator');
    }
    if (navParams.get('contentGenerator')){
      this.options.contentGenerator = navParams.get('contentGenerator');
    }
    if (navParams.get('iconGenerator')){
      this.options.iconGenerator = navParams.get('iconGenerator');
    }
    if (navParams.get('imageGenerator')){
      this.options.imageGenerator = navParams.get('imageGenerator');
    }
  }

  /**
   * Recupera los siguientes elementos a cargar en la lista.
   */
  loadNextItems(): Promise<any>{
    this.error=null;
    this.loading = true;
    let params:any = {
      model: this.options.model['name'],
      filter: this.filter,
      offset: this.offset,
      limit: this.limit,
      columns: this.options.columnsToShow
    }
    return this.dataProvider.get(params)
    .then((result:Array<any>)=>{
      this.offset += result.length;
      for(let data of result){
        this.items.push(data);
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
      let realQuery = '%' + this.searchQuery + '%';
      let filter = {};
      let fields = this.options.searchFields;
      if (fields && fields.length > 0){
        for(let field of fields){
          filter[field + '__like'] = realQuery;
        }
  
        this.setFilter({
          __or:filter
        }, true);
      }
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
    if (this.options.eventListener){
      this.options.eventListener.onClick(this.items[index]);
    }
  }

  addItem(){
    this.navCtrl.push('GenericEditPage', {
      model: this.options.model,
      title: 'Nuevo',
      onSaveListener:{ 
        save:(item)=>{
          return this.dataProvider.save({
            model: this.options.model['name'],
            data: item
          });
        }
      }
    })
    .catch(reason=>{
      console.log(reason)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GenericListPage');
  }

}
