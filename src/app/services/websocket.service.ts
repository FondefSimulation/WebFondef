import { Injectable } from '@angular/core';
import { $WebSocket } from 'angular2-websocket/angular2-websocket'

const FULL_LOADED: number = 3;

@Injectable()
export class WebSocket{
    public id: string;
    loaded: number = 0;
    allLoaded: boolean = false;

    ws: $WebSocket;

    constructor(){

    }

    connectSocket(){
      try{
        this.ws = new $WebSocket("ws://" + document.location.hostname + ":5000/ws", null, {initialTimeout:500, maxTimeout:300000, reconnectIfNotNormalClose:true});
  
        this.ws.onMessage(
          (msg: MessageEvent)=> {
            var data = JSON.parse(msg.data);
            //si es de tipo 1 es el primer dato despues de establecer la conexión
            if(data.type == 1){
              this.loaded++;
              this.id = data.id;
            }
            this.getValues(data);
          }
        );
        this.ws.onClose(()=>{
          this.loaded = FULL_LOADED - 1;
        });
  
      }catch(e){
        setTimeout(()=>{
          this.connectSocket();
        },1000);
      }
    }

    getValues(data){ }

    setValues(data){
      return this.ws.send(JSON.stringify(data));
    }
  }