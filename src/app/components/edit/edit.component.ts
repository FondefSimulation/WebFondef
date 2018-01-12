import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { ConsumeRestAPIService } from '../../services/consume-rest-api.service';
import { Event, Script } from '../../models/user';
import { TimelineElement } from '../../models/timeline';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ ConsumeRestAPIService ]
})
export class EditComponent implements OnInit {

  public identity;
  public type;
  public disasters;
  public lat: number;
  public lng: number;
  public latitudeMark: number;
  public longitudeMark: number;
  public cant = 1;
  public script = new Script( '', 0, '' );
  public cantEvent = new Array();
  marks = [];
  isLinear = false;
  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;

  content = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum praesentium officia, fugit recusandae
    ipsa, quia velit nulla adipisci? Consequuntur aspernatur at, eaque hic repellendus sit dicta consequatur quae,
    ut harum ipsam molestias maxime non nisi reiciendis eligendi! Doloremque quia pariatur harum ea amet quibusdam
    quisquam, quae, temporibus dolores porro doloribus.`;

  timeline: TimelineElement[] = [
    { caption: '29 Jan', date: new Date(2014, 3, 3, 10,50,23), selected: true, title: 'Event title here', content: this.content },
    { caption: '3 Mar', date: new Date(2014, 3, 3, 20,50,23), title: 'Event title here', content: this.content },
    { caption: '3 Mar', date: new Date(2014, 3, 4, 0,50,23), title: 'Event title here', content: this.content },
    { caption: '3 Mar', date: new Date(2014, 3, 4, 2,50,23), title: 'Event title here', content: this.content },
    { caption: '3 Mar', date: new Date(2014, 3, 4, 7,50,23), title: 'Event title here', content: this.content },
    { caption: '3 Mar', date: new Date(2014, 3, 4, 10,50,23), title: 'Event title here', content: this.content },
    { caption: '3 Mar', date: new Date(2014, 3, 4, 19,50,23), title: 'Event title here', content: this.content },
  ]

  constructor(
    private _consumeRestAPIService: ConsumeRestAPIService,
    private _router: Router,
    private _formBuilder: FormBuilder
  ) {
    this.cantEvent.push(new Event( '', '', '', { longitude: 0, latitude: 0}, 0, 0, 0, 0, '' ));
    this._consumeRestAPIService.GetTypeDisaster().subscribe( response => { this.disasters = response.data; });
  }

  ngOnInit() {
    this.lat = -38.735222;
    this.lng = -72.586267;
    this.identity = this._consumeRestAPIService.getIdentity();
    this.type = this._consumeRestAPIService.getType();
    this.firstForm = this._formBuilder.group({
      name: ['', Validators.required],
      time: ['', Validators.required],
      stage: ['', Validators.required]
    });
    this.secondForm = this._formBuilder.group({
      go: ['go', Validators.required],
    });
    this.thirdForm = this._formBuilder.group({
      desc: ['', Validators.required]
    });
  }

  moreEvents(){
    // var newEvent = '' + this.cant;
    // this.cantEvent[newEvent] = new Event(  '', '', '', { longitude: 0, latitude: 0}, 0, 0, 0, 0, ''  )
    this.cantEvent.push(new Event(  '', '', '', { longitude: 0, latitude: 0}, 0, 0, 0, 0, ''  ))
    // this.cant = this.cant + 1;

  }

  deleteEvent( position ){
    var arr = this.cantEvent;
    var removed = arr.splice( position, 1);
    this.cantEvent = this.cantEvent;
  }

  placeMarker( $event, data){
    this.latitudeMark = $event.coords.lat;
    this.longitudeMark = $event.coords.lng;
  }

  mark( index ){
    this.marks[index] = [this.latitudeMark,this.longitudeMark];
    this.cantEvent[0].values.latitude = this.marks[index][0];
    this.cantEvent[0].values.longitude = this.marks[index][1];
  }

  test(){
    this.secondForm.value.go = 'go';
  }

}
