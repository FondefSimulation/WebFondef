import { Component, OnInit } from '@angular/core';

//import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConsumeRestAPIService } from '../../services/consume-rest-api.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  providers: [ ConsumeRestAPIService ]
})
export class ResultsComponent implements OnInit {

  public identity;
  public type;
  public busqueda;
  public result = [
    { 'id': 0, 'Simulacion': 'test0', 'Nombre': 'test', 'Fecha': '10-05-2017', 'Hora': '14:29', 'Escenario': '01', 'Usuario': 'Cristofer', 'Tipo': 'Admin', 'Variables': 'test', 'Cascada': 0 },
    { 'id': 1, 'Simulacion': 'test1', 'Nombre': 'test', 'Fecha': '10-05-2017', 'Hora': '14:29', 'Escenario': '01', 'Usuario': 'Cristofer', 'Tipo': 'Admin', 'Variables': 'test', 'Cascada': 0 },
    { 'id': 2, 'Simulacion': 'test2', 'Nombre': 'test', 'Fecha': '10-05-2017', 'Hora': '14:29', 'Escenario': '01', 'Usuario': 'Cristofer', 'Tipo': 'Admin', 'Variables': 'test', 'Cascada': 0 },
    { 'id': 3, 'Simulacion': 'test3', 'Nombre': 'test', 'Fecha': '10-05-2017', 'Hora': '14:29', 'Escenario': '01', 'Usuario': 'Cristofer', 'Tipo': 'Admin', 'Variables': 'test', 'Cascada': 0 },
    { 'id': 4, 'Simulacion': 'test4', 'Nombre': 'test', 'Fecha': '10-05-2017', 'Hora': '14:29', 'Escenario': '01', 'Usuario': 'Cristofer', 'Tipo': 'Admin', 'Variables': 'test', 'Cascada': 0 },
  ];

  constructor(
    private _consumeRestAPIService: ConsumeRestAPIService,
    private _router: Router
  ) { }

  ngOnInit() {
    console.log(this.result)
    this.identity = this._consumeRestAPIService.getIdentity();
    this.type = this._consumeRestAPIService.getType();
  }

  ngDoCheck(){
    this.identity = this._consumeRestAPIService.getIdentity();
  }


  viewResult(){
    this._router.navigate([ '/view' ]);
  }

}
