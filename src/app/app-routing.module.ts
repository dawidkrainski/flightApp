import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './core/login/login.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { AuthGuard } from './core/services/auth.guard';
import {WildCardComponent} from "./core/wild-card/wild-card.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'flights', pathMatch: 'full' },
      { path: 'flights', loadChildren: () => import('./flights/flights.module').then(m => m.FlightsModule) },
    ],
  },
  {path: '**', component: WildCardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
