import { Component, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Nav, Platform, PopoverController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PopoverPageComponent } from '../components/popover-page/popover-page';
import { GuardModel, LocationModel } from '../providers/data/models';
import { ConfigurationProvider } from '../providers/configuration/configuration';
import { DataProvider } from '../providers/data/data';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  darkMode:boolean = false;
  fontSize:number = 0;
  rootPage: any = 'HomePage';
  user = {
    first_name: 'Anónimo',
    image: null,
    type: 0,
    token:null,
  }
  pages = [
    { title: 'Iniciar sesión', component: 'LoginPage', icon: 'log-in', availableFor:[0],
      params:{
        onLoginEvent: this.updateUserFn()
      }
    },
    { title: 'Acerca de ASP', component: 'HomePage', icon: 'home', availableFor:[0,1,2]},
    { title: 'Guardias', component: 'GuardListPage', icon: 'xm-guard', availableFor:[0,2]},
    { title: "Locaciones", component: 'LocationPage', icon: 'compass', availableFor:[2]},
    { title: 'Visitas', component: 'VisitorPage', icon: 'car', availableFor:[1, 2]},
    { title: 'Rondin', component: 'RondinPage', icon: 'compass', availableFor:[1]},
    { title: 'Mis Visitas', component: 'MyVisitsPage', icon: 'list-box', availableFor: [0]},
    { title: 'Usuarios', component: 'UserListPage', icon: 'xm-users', availableFor:[2]},
    { title: 'Estadísticas', component: 'StatsPage', icon: 'stats', availableFor:[0,2]}
  ];

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public dataProvider:DataProvider,
    public popoverCtrl:PopoverController, public configuration: ConfigurationProvider, public loadingCtrl: LoadingController ) {
    this.initializeApp();
  }

  updateUserFn(){
    return (user)=>{
      this.configuration.set('user', user);
      this.user = user;
      this.nav.setRoot('HomePage', null, {animate:true});
    }
  }

  filterPages(){
    let result = [];
    for(let page of this.pages){
      if (page.availableFor.indexOf(this.user.type) >= 0){
        result.push(page);
      }
    }
    return result;
  }


  initializeApp() {
    return this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.backgroundColorByHexString("262626");
      //Cargando las configuraciones del usuario
      return this.configuration.init().then(()=>{
        //Obtenemos el usuario en cache
        let user = this.configuration.get('user');
        if (user && user.token){
          this.user = user;
          this.dataProvider.setSessionToken(this.user.token);
        }
        else{
          //No hay usuario en la base de datos, tratamos de iniciar sesion.
          this.nav.setRoot('LoginPage', {
            onLoginEvent:this.updateUserFn()
          });
        }
      }) 
      .catch(error=>{
        this.configuration.set("user", this.user);
        this.nav.setRoot('LoginPage', {
          onLoginEvent:this.updateUserFn()
        });
        console.error(error)
      })
      .then(()=>{
        return this.splashScreen.hide();
      });
    });
  }

  showOptions(event){
    let popover = this.popoverCtrl.create(PopoverPageComponent,{
      dismissOnClick: true,
      groups:[
        {
          title: 'Apariencia',
          icon: 'xm-gui',
          items:[
            {
              id:1, name: 'Modo obscuro', icon: 'xm-darth', type: 'boolean', value: this.darkMode,
            },
            {
              id: 2, name: 'Tamaño fuente', value:this.fontSize, icon: 'xm-font', type: 'enum', values: ['Sistema', 'Pequeño', 'Mediano', 'Grande']
            },
            {
              id: 3, name: 'Tipo de usuario', value: this.user.type, type:'enum', values: ['Colono', 'Guardia', 'Admin']
            }
          ]
        },
        {
          title: 'Perfil',
          icon: 'person',
          items:[
            { id: 3, name: 'Cambiar foto', icon: 'camera', type: 'button' },
            { id: 4, name: 'Cerrar sesión', icon: 'log-out', type: 'button'}
          ]
        }
      ],
      onChangeListener:(item, event)=>{
        if (item.id === 1){
          this.darkMode = event;
        }
        if (item.id === 2){
          this.fontSize = item.value;
          let sizes = ["30%", "65%", "70%"];
        }
        if (item.id === 3){
          this.user.type = parseInt(item.value);
        }
        
      },
      onClickListener:(item)=>{
        if (item.id === 4){
          this.nav.setRoot('LoginPage', {
            onLoginEvent:this.updateUserFn()
          });
        }
      }
    });
    
    popover.present({ev: event});
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
     this.nav.setRoot(page.component, page.params);
  }
}
