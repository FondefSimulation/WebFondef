import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule }  from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_ROUTING, ROUTINGPROVIDERS } from './app.routing';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { SelectModule } from 'angular2-select';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatInputModule, MatSnackBarModule, MatStepperModule, MatStepperIntl, MatTableModule, MatPaginatorModule, MatSortModule, MatCheckboxModule } from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule }    from '@angular/common/http';



//Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SessionsComponent } from './components/sessions/sessions.component';
import { ResultsComponent } from './components/results/results.component';
import { ScriptsComponent } from './components/scripts/scripts.component';
import { ConditionComponent } from './components/condition/condition.component';
import { NewsessionsComponent } from './components/newsessions/newsessions.component';
import { UseraComponent } from './usera/usera.component';
import { ConsumeRestAPIService } from './services/consume-rest-api.service';
import { SimulationComponent } from './components/simulation/simulation.component';
import { ViewComponent } from './components/view/view.component';
import { EditComponent } from './components/edit/edit.component';
import { DesingComponent } from './components/desing/desing.component';
import { UsersComponent } from './components/users/users.component';
import { FooterComponent } from './components/footer/footer.component';

//Servicios
import { SearchPipe } from './pipes/search.pipes';
import { EventsComponent } from './components/events/events.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SessionsComponent,
    ResultsComponent,
    ScriptsComponent,
    ConditionComponent,
    NewsessionsComponent,
    UseraComponent,
    SimulationComponent,
    ViewComponent,
    EditComponent,
    DesingComponent,
    UsersComponent,
    FooterComponent,
    SearchPipe,
    EventsComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDOj_zwTIBJl2qPfloo9zhcvebHL1Cg7c0'
    }),
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatInputModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    ChartsModule,
    HttpClientModule,
    ROUTINGPROVIDERS,
    APP_ROUTING
  ],
  //providers: [{provide: LocationStrategy, useClass: HashLocationStrategy,ConsumeRestAPIService:ConsumeRestAPIService}],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},ConsumeRestAPIService, MatStepperIntl,
    { provide: 'Window',  useValue: window } //for unity
  ],
  bootstrap: [AppComponent]
})
export class AppModule implements OnInit {

  ngOnInit(){
  }

}
