import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConsumeRestAPIService } from '../../services/consume-rest-api.service';

@Component({
  selector: 'app-nav-simu',
  templateUrl: './nav-simu.component.html',
  styleUrls: ['./nav-simu.component.css']
})
export class NavSimuComponent implements OnInit {

  public identity;
  public type;
  public simulationOn;

  constructor(
    private _consumeRestAPIService: ConsumeRestAPIService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.identity = this._consumeRestAPIService.getIdentity();
    this.type = this._consumeRestAPIService.getType();
    this.simulationOn = this._consumeRestAPIService.getSimuId();
  }

  ngDoCheck(){
    this.identity = this._consumeRestAPIService.getIdentity();
    this.type = this._consumeRestAPIService.getType();
  }

  logout(){
    localStorage.clear();
    this.identity = null;
    this.type = null;
    this._router.navigate([ '/' ]);
  }

}
