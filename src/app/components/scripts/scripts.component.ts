import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

//import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConsumeRestAPIService } from '../../services/consume-rest-api.service';
// import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-scripts',
  templateUrl: './scripts.component.html',
  styleUrls: ['./scripts.component.css'],
  providers: [ ConsumeRestAPIService ]
})
export class ScriptsComponent implements OnInit {

  public identity;
  public type;
  message: string;
  // @Output() messageEvent = new EventEmitter<string>();

  constructor(
    private _consumeRestAPIService: ConsumeRestAPIService,
    private _router: Router,
    // private _data: DataService
  ) { }

  ngOnInit() {
    this.identity = this._consumeRestAPIService.getIdentity();
    this.type = this._consumeRestAPIService.getType();
    // this._data.currectMessage.subscribe( message => this.message);
  }

  ngDoCheck(){
    this.identity = this._consumeRestAPIService.getIdentity();
  }

  logout(){
    localStorage.clear();
    this.identity = null;
    this._router.navigate([ '/' ]);
  }

  editScript(){
    // this.messageEvent.emit(this.message);
  }

}
