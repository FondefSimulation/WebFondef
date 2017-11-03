import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { TypeComponent } from './components/type/type.component';
import { SessionsComponent } from './components/sessions/sessions.component';
import { NewsessionsComponent } from './components/newsessions/newsessions.component';
import { ResultsComponent } from './components/results/results.component';
import { ScriptsComponent } from './components/scripts/scripts.component';
import { ConditionComponent } from './components/condition/condition.component';
import { SimulationComponent } from './components/simulation/simulation.component';
import { ViewComponent } from './components/view/view.component';
import { EditComponent } from './components/edit/edit.component';
import { TestComponent } from './components/test/test.component';
import { DesingComponent } from './components/desing/desing.component';
import { UsersComponent } from './components/users/users.component';


const APP_ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'type', component: TypeComponent },
  { path: 'sessions', component: SessionsComponent },
  { path: 'newsessions', component: NewsessionsComponent },
  { path: 'scripts', component: ScriptsComponent },
  { path: 'condition', component: ConditionComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'simulation/:idSimulation', component: SimulationComponent },
  { path: 'view', component: ViewComponent },
  { path: 'edit', component: EditComponent },
  { path: 'test', component: TestComponent },
  { path: 'desing', component: DesingComponent },
  { path: 'users', component: UsersComponent },
  { path: '**', pathMatch: 'full', component: HomeComponent },
];

export const ROUTINGPROVIDERS: any[] = [];
export const APP_ROUTING: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
