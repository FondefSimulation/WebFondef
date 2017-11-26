import { Component, OnInit, ElementRef, ViewChild, NgModule } from '@angular/core';

//import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConsumeRestAPIService } from '../../services/consume-rest-api.service';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css'],
  providers: [ ConsumeRestAPIService ]
})
export class TypeComponent implements OnInit {

  public identity;
  public nameDisaster;
  /*disasters = [
    { id: 1, name: 'incendio' },
    { id: 2, name: 'inundacion' },
    { id: 3, name: 'terremoto' }
  ];*/

  public disasters =[];

  constructor(
    private _consumeRestAPIService: ConsumeRestAPIService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.identity = this._consumeRestAPIService.getIdentity();
    // document.getElementById( 'tD' ).hidden = true;
    //añadir metodo getTypeDisaster
    //this._consumeRestAPIService.GetTypeDisaster().subscribe( data => { this.disasters = data.data['disasters'] });
    this._consumeRestAPIService.GetTypeDisaster().subscribe( response => { this.disasters=response.data; });
  }

  ngDoCheck(){
    this.identity = this._consumeRestAPIService.getIdentity();
  }

  logout(){
    localStorage.clear();
    this.identity = null;
    this._router.navigate([ '/' ]);
  }

  // @ViewChild('typeDisaster') typeDisaster;
  //
  // showDisaster(){
  //   var disaster = this.typeDisaster.nativeElement.value;
  //   this.nameDisaster = this.disasters[ disaster - 1 ].name;
  //   document.getElementById( 'tD' ).hidden = false;
  // }

  getType(disaster){
    // var disaster = this.typeDisaster.nativeElement.value;
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
