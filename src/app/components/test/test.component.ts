import { Component, OnInit, Inject } from '@angular/core';
//import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConsumeRestAPIService } from '../../services/consume-rest-api.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  providers: [ ConsumeRestAPIService ]
})
export class TestComponent implements OnInit {

  public identity;
  public type;
  lat: number = -38.735222;
  lng: number = -72.586267;

  constructor(
    private _consumeRestAPIService: ConsumeRestAPIService,
    private _router: Router,
    @Inject('Window') window: Window
  ) { }

  ngOnInit() {
    this.identity = this._consumeRestAPIService.getIdentity();
    this.type = this._consumeRestAPIService.getType();
    window["gameInstance"] = window["UnityLoader"].instantiate("gameContainer", "./Build/TestUJS.json", {onProgress: window["UnityProgress"]});
    window["GetFullTxt"] = function(){
      window["gameInstance"].SendMessage("Capsule", "SetFullTxt", new Date().toString());
    };
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

}
