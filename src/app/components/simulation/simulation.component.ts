import { Component, OnInit, Inject } from '@angular/core';
//import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, NavigationCancel } from '@angular/router';
import { ConsumeRestAPIService } from '../../services/consume-rest-api.service';
import { URLSearchParams } from '@angular/http';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.css'],
  providers: [ ConsumeRestAPIService ]
})
export class SimulationComponent implements OnInit {

  public identity;
  public type;
  private idSimulation;
  // public start:boolean = false;

  lat: number = -38.735222;
  lng: number = -72.586267;

  constructor(
    private _consumeRestAPIService: ConsumeRestAPIService,
    private _activateRouter: ActivatedRoute,
    private _router: Router,
    @Inject('Window') window: Window
  ) {
    this.idSimulation = _router.parseUrl(_router.url).queryParams["idSimulation"];
   }

  ngOnInit() {
    this.identity = this._consumeRestAPIService.getIdentity();
    this.type = this._consumeRestAPIService.getType();
    // if( this.start ){
    //   window["gameInstance"] = window["UnityLoader"].instantiate("gameContainer", "./Build/TestUJS.json", {onProgress: window["UnityProgress"]});
    //   window["GetFullTxt"] = function(){
    //     window["gameInstance"].SendMessage("Capsule", "SetFullTxt", new Date().toString());
    //   };
    // }
  }

  startSimulation(){
    window[ "gameInstance" ] = window[ "UnityLoader"] .instantiate( "gameContainer", "./Build/TestUJS.json", { onProgress: window[ "UnityProgress" ]});
    window[ "GetFullTxt" ] = function(){
      window[ "gameInstance" ].SendMessage( "Capsule", "SetFullTxt", new Date().toString() );
    };
    document.getElementById( "start" ).hidden = true;
    this._consumeRestAPIService.StartSimulation( this.idSimulation ).subscribe( result => console.log( result ) );

  }

  cylinder(){
    window["gameInstance"].SendMessage("Capsule", "SetUnity3DC", "3");
  }

  sphere(){
    window["gameInstance"].SendMessage("Capsule", "SetUnity3DS", "2");
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

}
