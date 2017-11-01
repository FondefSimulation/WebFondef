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
  public cant = 1;
  public script = new Script( '', 0, '' );
  public cantEvent = [ new Event( '', '', '', 0, 0, 0, 0, 0, '' )];

  constructor(
    private _consumeRestAPIService: ConsumeRestAPIService,
    private _router: Router
  ) { }

  ngOnInit() {
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
    this.cantEvent[newEvent] = new Event(  '', '', '', 0, 0, 0, 0, 0, ''  )
    this.cant = this.cant + 1;
  }

  saveScript(){
    console.log(this.script)
  }

  saveList(desc){
    this.cant[0].desc = desc;
    console.log(this.cantEvent)
  }

}
