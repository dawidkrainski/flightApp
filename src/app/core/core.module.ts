import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../material/material.module';
import {FormsModule} from "@angular/forms";
import { WildCardComponent } from './wild-card/wild-card.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
  ],
  declarations: [DashboardComponent, LoginComponent, WildCardComponent]
})
export class CoreModule { }
