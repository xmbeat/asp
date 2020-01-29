import { Platform } from 'ionic-angular';
import { HTTP, HTTPResponse } from '@ionic-native/http';
import { UserModel } from './../../models/UserModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ORM } from './ORM';
import 'rxjs/add/operator/timeout';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class DataProvider {
  listener:any = null;
  timeout:number = 10000;
  token:string = null;
  restApi:string = "http://localhost/asp/rest_api.php?action=";
  orm:ORM;
  
  constructor(public http: HttpClient, public platform: Platform) {
    console.log('Hello DataProvider Provider');
  }
  
  setSessionToken(token:string){
    this.token = token;
  }

  
  login(email:string, password:string, type:string):Promise<any>{
    let options:any = {
      //headers: headers,
      observe: "response" as 'body', // to display the full response & as 'body' for type cast
      responseType: "json"
    };
    let body = {email:email, password:password, type};
    return new Promise((resolve, reject)=>{
      this.http.post(this.restApi + "login", body, options).timeout(this.timeout)
      .subscribe(
        (response:any) =>{
          if (response.headers.has('auth_token')){
            this.token = response.headers.get('auth_token');
          }
          let data = response.body;
          if (data.code == 0){
            resolve(data.result);
          }
          else{
            reject(data);
          }
        },
        error => {
          reject(error);
        }
      )
    });
  }

  loginFacebook(token:string):Promise<any>{
    let options:any = { 
      observe: "response" as 'body', // to display the full response & as 'body' for type cast
      responseType: "json"
    };
    let body = {
      token:token
    };

    return new Promise((resolve, reject)=>{
      this.http.post(this.restApi + "loginFacebook", body, options).timeout(this.timeout)
      .subscribe(
        (response:any) =>{
          if (response.headers.has('auth_token')){
            this.token = response.headers.get('auth_token');
          }
          let data = response.body;
          if (data.code == 0){
            resolve(data.result);
          }
          else{
            reject(data.code);
          }
        },
        error => {
          reject(error);
        }
      )
    });
  }

  get(params:{model:any, filter:any, offset:number, limit:number, order_by:Array<{column:string, sort:number} | string> | string, columns:Array<string>}){
    let options:any = { 
      observe: "response" as 'body', // to display the full response & as 'body' for type cast
      responseType: "json"
    };

    return new Promise((resolve, reject)=>{
      this.http.post(this.restApi + "get", params, options).timeout(this.timeout)
      .subscribe(
        (response:any) =>{
          let data = response.body;
          if (data.code == 0){
            resolve(data.result);
          }
          else{
            reject(data.code);
          }
        },
        error => {
          reject(error);
        }
      )
    });
  }

  save(params:any){
    let options:any = { 
      observe: "response" as 'body', // to display the full response & as 'body' for type cast
      responseType: "json"
    };
    return new Promise((resolve, reject) =>{
      this.http.post(this.restApi + "save", params, options).timeout(this.timeout)
      .subscribe(
        (response:any) =>{
          let data = response.body;
          if (data.code == 0){
            resolve(data.result);
          }
          else{
            reject(data.code);
          }
        },
        error => {
          //Error de conexion, de server o algo asociado a la infraestructura de red
          reject(error);
        }
      )
    });
  }
  
  getUsers(params:{filter:any, offset:number, limit:number, order_by:Array<{column:string, sort:number} | string> | string, columns:Array<string>}){
    let options:any = { 
      observe: "response" as 'body', // to display the full response & as 'body' for type cast
      responseType: "json"
    };

    return new Promise((resolve, reject)=>{
      this.http.post(this.restApi + "getUsers", params, options).timeout(this.timeout)
      .subscribe(
        (response:any) =>{
          let data = response.body;
          if (data.code == 0){
            resolve(data.result);
          }
          else{
            reject(data.code);
          }
        },
        error => {
          reject(error);
        }
      )
    });
  }

  saveUser(user){
    let options:any = { 
      observe: "response" as 'body', // to display the full response & as 'body' for type cast
      responseType: "json"
    };
    return new Promise((resolve, reject) =>{
      this.http.post(this.restApi + "saveUser", user, options).timeout(this.timeout)
      .subscribe(
        (response:any) =>{
          let data = response.body;
          if (data.code == 0){
            resolve(data.result);
          }
          else{
            reject(data.code);
          }
        },
        error => {
          reject(error);
        }
      )
    });
  }

  getGuards(params:{filter:any, offset:number, limit:number, order_by:Array<{column:string, sort:number} | string> | string, columns:Array<string>}){
    let options:any = { 
      observe: "response" as 'body', // to display the full response & as 'body' for type cast
      responseType: "json"
    };

    return new Promise((resolve, reject)=>{
      this.http.post(this.restApi + "getGuards", params, options).timeout(this.timeout)
      .subscribe(
        (response:any) =>{
          let data = response.body;
          if (data.code == 0){
            resolve(data.result);
          }
          else{
            reject(data.code);
          }
        },
        error => {
          reject(error);
        }
      )
    });
  }

  saveGuard(guard){
    let options:any = { 
      observe: "response" as 'body', // to display the full response & as 'body' for type cast
      responseType: "json"
    };
    return new Promise((resolve, reject) =>{
      this.http.post(this.restApi + "saveGuard", guard, options).timeout(this.timeout)
      .subscribe(
        (response:any) =>{
          let data = response.body;
          if (data.code == 0){
            resolve(data.result);
          }
          else{
            reject(data.code);
          }
        },
        error => {
          reject(error);
        }
      )
    });
  }

  saveVisit(visit){
    let options:any = { 
      observe: "response" as 'body', // to display the full response & as 'body' for type cast
      responseType: "json"
    };
    return new Promise((resolve, reject) =>{
      this.http.post(this.restApi + "saveVisit", visit, options).timeout(this.timeout)
      .subscribe(
        (response:any) =>{
          let data = response.body;
          if (data.code == 0){
            resolve(data.result);
          }
          else{
            reject(data.code);
          }
        },
        error => {
          reject(error);
        }
      )
    });
  }

  getUserFBData(token:string){
    let url =  "https://graph.facebook.com/v3.2/me"  + "?fields=id,name,email,first_name,last_name&access_token=" + token;
    this.http.get(url).subscribe((data)=>{
      console.log(data);
    });
  }

  getUserFBImage(userId){
    let url = "https:///graph.facebook.com/v3.2/" + userId + "/picture?type=square";
    this.http.get(url).subscribe(data=>{
      console.log
    })
  }

  setOnErrorListener(listener:any){
    this.listener = listener;
  }
}

