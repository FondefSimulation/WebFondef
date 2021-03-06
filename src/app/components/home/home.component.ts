import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

//import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConsumeRestAPIService } from '../../services/consume-rest-api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ ConsumeRestAPIService ]
})
export class HomeComponent implements OnInit {

  public identity;
  public type;
  public nameDisaster;

  disasters = [];

  constructor(
    private _consumeRestAPIService: ConsumeRestAPIService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.identity = this._consumeRestAPIService.getIdentity();
    this.type = this._consumeRestAPIService.getType();
    // document.getElementById( 'tD' ).hidden = true;
    this._consumeRestAPIService.GetTypeDisaster().subscribe( response => { this.disasters=response.data; });
    let element;
    if (this.type == 'incendio') {
      element = <HTMLInputElement> document.getElementById("incendio");
      element.disabled = true;
    }
    if (this.type == 'inundacion') {
      element = <HTMLInputElement> document.getElementById("inundacion");
      element.disabled = true;
    }
    if (this.type == 'terremoto') {
      element = <HTMLInputElement> document.getElementById("terremoto");
      element.disabled = true;
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

  getType(disaster){
    if ( disaster == 1 ) {
      localStorage.setItem( 'type', 'incendio' );
      this._router.navigate([ '/sessions' ]);
    }else if ( disaster == 2 ) {
      localStorage.setItem( 'type', 'inundacion' );
      this._router.navigate([ '/sessions' ]);
    }else if ( disaster == 3 ) {
      localStorage.setItem( 'type', 'terremoto' );
      this._router.navigate([ '/sessions' ]);
    }

  }

}
