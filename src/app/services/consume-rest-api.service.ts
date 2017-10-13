import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from "@angular/http";
import { Router, CanActivate } from '@angular/router';
import { Observable } from  'rxjs/Rx';
import { GLOBAL } from './global';
import 'rxjs/add/operator/map';
// import { session } from "../models/session";



/*@Injectable()
export class ConsumeRestAPIService{

    constructor(private http:Http){

    }

    getValues(){

        return this.http.get("http://localhost:59292/api/values")
        .map(res=>res.json());

    }

    getPosts(){

    }

}*/

@Injectable()
export class ConsumeRestAPIService{
    public url: string;
    public indetity;
    public token;
    public type;

    constructor(
      private _http: Http
    ){
      this.url = GLOBAL.url;
    }

    signup( user_to_login, gettoken = null ){
     /* if( gettoken != null ){
        user_to_login.gettoken = gettoken;
      }*/
      console.log("paso1");
      //let params = JSON.stringify( user_to_login );
      let params = JSON.stringify({ "Username": user_to_login.name, "Password": user_to_login.password });
      let headers = new Headers({ 'Content-Type': 'application/json' });
      
      return this._http.put( this.url + 'TokenAuth/Login/', params, { headers:headers } )
                       .map( res => res.json() );

    }

    CreateSessionSimulation( session ){
      let params = JSON.stringify({ "nameSession": session.nameSession, "typeSession": session.typeSession , "scriptSession":  session.scriptSession, "profileSession": session.profileSession, "cascadeEffectSession": session.cascadeEffectSession});
      console.log(session.nameSession+"/"+session.typeSession+"/"+session.scriptSession+"/"+session.profileSession+"/"+session.cascadeEffectSession);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this._http.post( this.url + 'SimAPI/CreateSessionSimulation/', params, options )
                       .map( res => res.json() );
    }

    GetRunningSimulation( disaster ){
      let params = JSON.stringify({ "sessionType": disaster });
      let headers = new Headers({ 'Content-Type': 'application/json' });
      
      return  this._http.post( this.url + 'SimAPI/GetRunningSimulations/', params, { headers:headers } )
                        .map( res=> res.json());
      //recive idSession, nameSession
    }

    GetTypeDisaster(){
     /* return  this._http.get( this.url + 'SimAPI/GetTypeDisaster/' )
                        .map(( res:Response ) => res.json());*/
                        return  this._http.get( this.url + 'SimAPI/GetTypeDisaster/' )
                        .map( res => res.json());
    }

    JoinSimulation( idSession ){
      //envia id de la sesion
      let params = JSON.stringify({ "id_session": idSession });
      return  this._http.put( this.url + 'SimAPI/JoinSimulation/', params )
                        .map(( res:Response ) => res.json());
    }

    StartSimulation( idSession ){
      //envia id sesion
      let params = JSON.stringify({ "id_session": idSession });
      return  this._http.put( this.url + 'SimAPI/StartSimulation/', params )
                        .map(( res:Response ) => res.json());
    }

    getIdentity(){
      let identity = JSON.parse( localStorage.getItem( 'identity' ) );

      if ( identity != 'undefined' ) {
        this.indetity = identity;
      }else{
        this.indetity = null;
      }
      return this.indetity;
    }

    getToken(){
      let token = localStorage.getItem( 'token' );

      if ( token != 'undefined' ) {
        this.token = token;
      }else{
        this.token = null;
      }
      return this.token;
    }

    getType(){
      let type = localStorage.getItem( 'type' );
     
      if ( type != 'undefined' ) {
        this.type = type;
      }else{
        this.type = null;
      }
      return this.type;
    }

  }
