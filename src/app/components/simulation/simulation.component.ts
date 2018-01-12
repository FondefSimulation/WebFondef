import { Component, OnInit, Inject } from '@angular/core';
//import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, NavigationCancel, ActivatedRouteSnapshot } from '@angular/router';
import { ConsumeRestAPIService } from '../../services/consume-rest-api.service';
import { WebSocket } from '../../services/websocket.service';
import { URLSearchParams } from '@angular/http';
import { first } from 'rxjs/operator/first';


interface marker {
	lat: number;
  lng: number;
  id: number;
  draggable: boolean;
}

const PLAYER_CURRENT: number = 0;
const PLAYER_GROUP: number = 1;

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.css'],
  providers: [ ConsumeRestAPIService, WebSocket ]
})
export class SimulationComponent implements OnInit {

  public identity;
  public type;
  private idSimulation;
  lat: number = -35.416;
  lng: number = -72.231;
  zoom: number = 12;
  players: marker[] = [];
  webSocket: WebSocket;
  map: any;

  constructor(
    private _consumeRestAPIService: ConsumeRestAPIService,
    private _activateRouter: ActivatedRoute,
    private _router: Router,
    @Inject('Window') window: Window
  ) {
    // this.idSimulation = _activateRouter.snapshot.paramMap.get('idSimulation')
    this.idSimulation = _router.parseUrl(_router.url).queryParams["idSimulation"];
    this.webSocket = new WebSocket();
    this.webSocket.connectSocket();
    this.webSocket.getValues = data => {
      //recibir datos
      //console.log(data);
      this.processPlayers(data);
    };
  }

  ngOnInit() {
    this.identity = this._consumeRestAPIService.getIdentity();
    this.type = this._consumeRestAPIService.getType();
    this.idSimulation = this._consumeRestAPIService.getSimuId();
    console.log(this.idSimulation)
    if (this.idSimulation == null) {
      this._router.navigate([ '/sessions' ]);
    }else{
      console.log('id Correcto')
    }
  }

  startSimulation(){
    window[ "gameInstance" ] = window[ "UnityLoader"] .instantiate( "gameContainer", "./Build/HTML.json", { onProgress: window[ "UnityProgress" ]});
    var scope = this;
    window[ "WebReceiver" ] = function(args)
    {
      var data = args.split(":");
      switch (data[0])
      {
        case "UpdateFromUnity":
          scope.updateFromUnity(data[1]);
      }

    }
    document.getElementById( "start" ).hidden = true;
    this._consumeRestAPIService.StartSimulation( this.idSimulation ).subscribe( result => console.log( result ) );
  }

  mapReady(map){
    this.map = map;
    console.log(this.map);
  }

  updateFromUnity(args){
    var data = args.split(",");
    // aqui pasare la data y la transformare a longitud y latitud.
    // esto lo hare solo por temas de debug, de que es mas accesible realizar pruebas
    // en javascript que en unity por temas de compilacion.
    var x = parseFloat(data[0]);
    var y = parseFloat(data[1]);
    var bounds = this.getMapBounds(this.map);
    // n = min + n * (maximo - minimo);
    x = bounds[0] + x * (bounds[2] - bounds[0]);
    y = bounds[1] + y * (bounds[3] - bounds[1]);

    // NOTA: latitud es Y, longitud es X
    //var ll = new google.maps.LatLng({lat: y, lng: x});
	  //console.log("latlng: "+ ll);

    this.updatePlayerMap({lat: y, lng: x});

  }


  updatePlayerMap(pos){
    var currentPlayer: any;
    for(let m of this.players){
      if(m.draggable){
        currentPlayer = m;
        break;
      }
    }
    if(currentPlayer){
      currentPlayer.lat = pos.lat;
      currentPlayer.lng = pos.lng;
    }else{
      var obj = {
        lat: pos.lat,
        lng: pos.lng,
        draggable: true,
        id: (new Date()).getTime()
      };
      this.players.push(obj);
    }
    this.webSocket.setValues({type:4, players: this.getCurrent()}).subscribe();
  }

  getCurrent(){
    var obj = {};
    obj[this.webSocket.id] = [];
    for(let m of this.players){
      if(m.draggable){
        obj[this.webSocket.id].push({lat: m.lat, lng: m.lng, id:m.id});
      }
    }
    return obj;
  }

  getMapBounds(m){
    var bounds = m.getBounds();
    var end = bounds.getNorthEast();
    var initial = bounds.getSouthWest();

    // organize values
    var yInit = initial.lat();
    var yFinal = end.lat();
    var xInit = initial.lng();
    var xFinal = end.lng();

    var data = [xInit, yInit, xFinal, yFinal];
    return data;
  }

  markerDragEnd(m: marker, $event: any) {
    m.lat = $event.coords.lat;
    m.lng = $event.coords.lng;
    this.updateUnityPosition(m);
    this.webSocket.setValues({type:4, players: this.getCurrent()}).subscribe();
  }

  updateUnityPosition(m){
    // obtengo posicion del mouse, y coordenadas de las esquinas
    // var data = args.split(',');
    var bounds = this.getMapBounds(this.map);
    var x = m.lng;
    var y = m.lat;
    console.log("x: "+ x+" y: "+ y);

    // uso la normalizacion para llevarlos a valores entre 1 y 0
    x = (x - bounds[0]) / (bounds[2] - bounds[0]);
    y = (y - bounds[1]) / (bounds[3] - bounds[1]);

    var objName = "HelicopterModel";

    this.WebSender(["changePosition", objName, x, y]);
  }

  WebSender(args){
    // si hay argumentos
    if(args.length > 0)
    {
      var msgToUnity = args[0]+":";
      // si hay mas de un argumento
      if(args.length > 1)
      {

        // empieza de 1 ya que 0 ya se incluyo
        for(var i = 1; i < args.length; i++)
        {
          msgToUnity += args[i].toString();
          // si i no es el valor final del array
          if(i+1 < args.length)
          {
            msgToUnity += ",";
          }
        }
      }
      console.log(msgToUnity);
      window["gameInstance"].SendMessage("UnityCOM", "UnityReceiver", msgToUnity);
    }
  }


  ngDoCheck(){
    this.identity = this._consumeRestAPIService.getIdentity();
  }

  logout(){
    localStorage.clear();
    this.identity = null;
    this._router.navigate([ '/' ]);
  }


  open(evt, Name) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(Name).style.display = "block";
    evt.currentTarget.className += " active";
  }

  processPlayers(data){
    var all = [];
    for(var id in data.players){
      if(id === this.webSocket.id){
        console.log("own by ",id);
        for(let m of data.players[id]){
          all.push(Number(m.id));
          for(var c in this.players){
            if(this.players[c].id == Number(m.id)){
              console.log(this.players[c]);
              this.players[c].draggable = true;
              break;
            }
          }
        }
        console.log("end");
      }else{
        for(let m of data.players[id]){
          all.push(Number(m.id));
          var isNew = true;
          for(var c in this.players){
            if(this.players[c].id == Number(m.id)){
              this.players[c].lat = m.lat;
              this.players[c].lng = m.lng;
              isNew = false;
              break;
            }
          }
          if(isNew){
            this.players.push({
              lat: m.lat,
              lng: m.lng,
              draggable: false,
              id: m.id
            });
          }
        }
      }
    }
    var toDelete = [];
    for(let m of this.players){
      if(all.indexOf(m.id) == -1){
        toDelete.push(m.id);
      }
    }
    for(let id of toDelete){
      for(var i=0;i<this.players.length;i++){
        if(this.players[i].id == id){
          this.players.splice(i, 1);
          break;
        }
      }
    }
  }
}
