import { Component, OnInit } from '@angular/core';
import {ConsumeRestAPIService} from '../services/consume-rest-api.service';


@Component({
  selector: 'app-usera',
  templateUrl: './usera.component.html',
  styleUrls: ['./usera.component.css']
})
export class UseraComponent implements OnInit {

  values:any;
    constructor(private ConsumeRestAPIService:ConsumeRestAPIService) { }

  ngOnInit() {

 /*
this.ConsumeRestAPIService.getValues()
.subscribe((value)=>{
  this.values=value;
}
)*/
}
}
interface Posts{
  id:number;
  title:string;
  body:string;
}
