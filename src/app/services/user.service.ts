import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class UserService{
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
    console.log("paso2"+ params);
    return this._http.put( this.url + 'TokenAuth/Login/', params, { headers:headers } )
                     .map( res => res.json() );

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
