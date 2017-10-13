import { Component, OnInit } from '@angular/core';

//import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConsumeRestAPIService } from '../../services/consume-rest-api.service';


@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css'],
  providers: [ ConsumeRestAPIService ]
})
export class SessionsComponent implements OnInit {

  public identity;
  public type;
  /*sessions = [
    { id: 0, nameSession: "Session 00"},
    { id: 1, nameSession: "Session 01"},
    { id: 2, nameSession: "Session 02"},
    { id: 3, nameSession: "Session 03"},
    { id: 4, nameSession: "Session 04"}
  ];*/

   sessions = [];

  constructor(
    private _consumeRestAPIService: ConsumeRestAPIService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.identity = this._consumeRestAPIService.getIdentity();
    this.type = this._consumeRestAPIService.getType();
    //GetRunningSimulation

    //this._consumeRestAPIService.GetRunningSimulation( this.type ).subscribe( data => this.sessions = data );
    this._consumeRestAPIService.GetRunningSimulation( this.type ).subscribe( response => { this.sessions=response.data; });  
    //console.log( this.sessions );

  }

  ngDoCheck(){
    this.identity = this._consumeRestAPIService.getIdentity();
  }

  logout(){
    localStorage.clear();
    this.identity = null;
    this._router.navigate([ '/' ]);
  }

  Simulation(id){
    console.log(id);
    this._router.navigate([ '/simulation' ], { queryParams: { idSimulation: this.sessions[id].id } });
    this._consumeRestAPIService.JoinSimulation( id ).subscribe( result => console.log( result ) );
  }

}
