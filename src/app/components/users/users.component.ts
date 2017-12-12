import { Component, OnInit } from '@angular/core';

//import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConsumeRestAPIService } from '../../services/consume-rest-api.service';
// import {Car} from '../../components/domain/car';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [ ConsumeRestAPIService ]
})
export class UsersComponent implements OnInit {

  public identity;
  public type;
  public busqueda;
  public users = [
    {'id': 0, 'Nombre': 'test1', 'rol': 'admin'},
    {'id': 1, 'Nombre': 'test2', 'rol': 'admin'},
    {'id': 2, 'Nombre': 'test3', 'rol': 'admin'},
    {'id': 3, 'Nombre': 'test4', 'rol': 'admin'}
  ]

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
}
