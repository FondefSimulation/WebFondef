import { Component, OnInit } from '@angular/core';

//import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConsumeRestAPIService } from '../../services/consume-rest-api.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css'],
  providers: [ ConsumeRestAPIService ]
})
export class SessionsComponent implements OnInit {

  public identity;
  public type;
  public simulationOn;
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
    private _router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.identity = this._consumeRestAPIService.getIdentity();
    this.type = this._consumeRestAPIService.getType();
    this.simulationOn = this._consumeRestAPIService.getSimuId();
    //GetRunningSimulation

    //this._consumeRestAPIService.GetRunningSimulation( this.type ).subscribe( data => this.sessions = data );
    this._consumeRestAPIService.GetRunningSimulation( this.type ).subscribe( response => { this.sessions=response.data; });
    //console.log( this.sessions );

  }

  ngDoCheck(){
    this.identity = this._consumeRestAPIService.getIdentity();
    // this._consumeRestAPIService.GetRunningSimulation( this.type ).subscribe( response => { this.sessions=response.data; });
  }

  logout(){
    localStorage.clear();
    this.identity = null;
    this._router.navigate([ '/' ]);
  }

  Simulation(idS){
    this.simulationOn = this.sessions[idS].id;
    console.log(this.simulationOn)
    localStorage.setItem( 'simulationOn', JSON.stringify( this.simulationOn ) );
    this._router.navigate([ '/simulation' ]);
    //this._consumeRestAPIService.JoinSimulation( id ).subscribe( result => console.log( result ) );
  }

}
