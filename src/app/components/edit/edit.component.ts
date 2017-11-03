import { Component, OnInit } from '@angular/core';

// import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConsumeRestAPIService } from '../../services/consume-rest-api.service';
import { Event, Script } from '../../models/user';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ ConsumeRestAPIService ]
})
export class EditComponent implements OnInit {

  public identity;
  public type;
  public lat: number;
  public lng: number;
  public latitudeMark: number;
  public longitudeMark: number;
  public cant = 1;
  public script = new Script( '', 0, '' );
  public cantEvent;

  constructor(
    private _consumeRestAPIService: ConsumeRestAPIService,
    private _router: Router
  ) {
    this.cantEvent = [new Event( '', '', '', { longitude: 0, latitude: 0}, 0, 0, 0, 0, '' )];
  }

  ngOnInit() {
    this.lat = -38.735222;
    this.lng = -72.586267;
    this.identity = this._consumeRestAPIService.getIdentity();
    this.type = this._consumeRestAPIService.getType();
  }

  ngDoCheck(){
    this.identity = this._consumeRestAPIService.getIdentity();
  }

  logout(){
    localStorage.clear();
    this.identity = null;
    this._router.navigate([ '/' ]);
  }

  moreEvents(){
    var newEvent = '' + this.cant;
    this.cantEvent[newEvent] = new Event(  '', '', '', { longitude: 0, latitude: 0}, 0, 0, 0, 0, ''  )
    this.cant = this.cant + 1;
  }

  placeMarker( $event, data){
    this.latitudeMark = $event.coords.lat;
    this.longitudeMark = $event.coords.lng;
    this.cantEvent[0].values.latitude = this.latitudeMark;
    this.cantEvent[0].values.longitude = this.longitudeMark;
    console.log(this.cantEvent[0])
  }

  saveScript(){
    console.log(this.script)
  }

  saveList(desc){
    this.cant[0].desc = desc;
    console.log(this.cantEvent)
  }

}
