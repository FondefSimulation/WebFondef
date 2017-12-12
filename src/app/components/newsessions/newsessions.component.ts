import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Session } from '../../models/session';
import { Session } from '../../models/user';

//import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConsumeRestAPIService } from '../../services/consume-rest-api.service';

@Component({
  selector: 'app-newsessions',
  templateUrl: './newsessions.component.html',
  styleUrls: ['./newsessions.component.css'],
  providers: [ ConsumeRestAPIService ]
})
export class NewsessionsComponent implements OnInit {

  public identity;
  public type;
  public session: Session;
  public data;

  constructor(
    private _consumeRestAPIService: ConsumeRestAPIService,
    private _router: Router,
  ) {
    this.session = new Session( '', this._consumeRestAPIService.getType(),'G10min', '', 0, '' );
  }

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

  onSubmit(){
    console.log(this.session)
    this.session.scriptSession = 'G10min';
    this._consumeRestAPIService.CreateSessionSimulation( this.session ).subscribe();
    // this._router.navigate([ '/sessions' ]);
    // recive la id y pasa a la simulación
  }

}
