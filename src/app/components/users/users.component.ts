import { Component, OnInit } from '@angular/core';
import {Car} from '../domain/car';
import {CarService} from '../../services/carservice';

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

//   public identity;
//   public type;
//   public users = [
//     {'id': 0, 'nombre': 'test1', 'rol': 'admin'},
//     {'id': 1, 'nombre': 'test2', 'rol': 'admin'},
//     {'id': 2, 'nombre': 'test3', 'rol': 'admin'},
//     {'id': 3, 'nombre': 'test4', 'rol': 'admin'}
//   ]
//
//   constructor(
//     private _consumeRestAPIService: ConsumeRestAPIService,
//     private _router: Router
//   ) { }
//
//   ngOnInit() {
//     this.identity = this._consumeRestAPIService.getIdentity();
//     this.type = this._consumeRestAPIService.getType();
//   }
//
//   ngDoCheck(){
//     this.identity = this._consumeRestAPIService.getIdentity();
//   }
//
//   logout(){
//     localStorage.clear();
//     this.identity = null;
//     this._router.navigate([ '/' ]);
//   }
// }

  displayDialog: boolean;

  car: Car = new PrimeCar();

  selectedCar: Car;

  newCar: boolean;

  cars: Car[];

  constructor(private carService: CarService) { }

  ngOnInit() {
      this.carService.getCarsSmall().then(cars => this.cars = cars);
  }

  showDialogToAdd() {
      this.newCar = true;
      this.car = new PrimeCar();
      this.displayDialog = true;
  }

  save() {
      let cars = [...this.cars];
      if(this.newCar)
          cars.push(this.car);
      else
          cars[this.findSelectedCarIndex()] = this.car;

      this.cars = cars;
      this.car = null;
      this.displayDialog = false;
  }

  delete() {
      let index = this.findSelectedCarIndex();
      this.cars = this.cars.filter((val,i) => i!=index);
      this.car = null;
      this.displayDialog = false;
  }

  onRowSelect(event) {
      this.newCar = false;
      this.car = this.cloneCar(event.data);
      this.displayDialog = true;
  }

  cloneCar(c: Car): Car {
      let car = new PrimeCar();
      for(let prop in c) {
          car[prop] = c[prop];
      }
      return car;
  }

  findSelectedCarIndex(): number {
      return this.cars.indexOf(this.selectedCar);
  }
}

class PrimeCar implements Car {
  constructor(public vin?, public year?, public brand?, public color?) {}
}
