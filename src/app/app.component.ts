import { Component, DoCheck, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConsumeRestAPIService } from './services/consume-rest-api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ UserService ]
})
export class AppComponent implements OnInit, DoCheck {
  public title:string;
  public identity;

  constructor(
    private _consumeRestAPIService: ConsumeRestAPIService,
    private _router: Router
  ){
    this.title = 'app';
  }

  ngOnInit(){
    this.identity = this._consumeRestAPIService.getIdentity();
  }

  ngDoCheck(){
    this.identity = this._consumeRestAPIService.getIdentity();
  }

}
