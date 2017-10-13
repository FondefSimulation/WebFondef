import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

//import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { ConsumeRestAPIService } from '../../services/consume-rest-api.service';
//import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ],
  //providers:[ConsumeRestAPIService]
  providers: [ ConsumeRestAPIService ]
})
export class LoginComponent implements OnInit {
  public title: String;
  public user: User;
  public identity;
  public token;
  public status: string;

  //private userName: string;
  //private password: string;
  //private postStream$: Subscription;


  constructor(

    private _route: ActivatedRoute,
    private _router: Router,
    private _consumeRestAPIService: ConsumeRestAPIService,
    //private authService: ConsumeRestAPIService,

  ) {
    this.title = 'Identificate';
    this.user = new User( '', '', '', '', '', 'ROLE_ADMIN' );
  }

  ngOnInit() {
    //console.log( 'login.component cargado!!!' );
  }

  onSubmit(){

      //Loguear al usuario y obtener el objeto + token

    this._consumeRestAPIService.signup(this.user).subscribe(
      response => {
        this.identity = response.userInfo;
        this.token = response.data;
        console.log(this.identity);
        console.log(this.token);

        if ( !this.identity || !this.identity._id ) {
          alert( 'El usuario no se ha logueado correctamente' );
        }else{
          this.identity.password = '';
          localStorage.setItem( 'identity', JSON.stringify( this.identity ) );

          localStorage.setItem( 'token', this.token );
          this.status = 'success';

          this._router.navigate([ '/type' ]);
          //Obtener Token
          /*this._userService.signup( this.user, 'true' ).subscribe(
            response => {
              this.token = response.token;
              if ( this.token.length <= 0 ) {
                  alert( 'El token no se ha generado' );
              }else{
                localStorage.setItem( 'token', this.token );
                this.status = 'success';

                this._router.navigate([ '/type' ]);
              }
            },
            error => {
              console.log( <any>error );
            }
          );*/
        }
      },
      error => {
        var errorMessage = <any>error ;

        if ( errorMessage != null ) {
            var body = JSON.parse( error._body );
            this.status = 'error';
        }
      }
    );

   }

}
