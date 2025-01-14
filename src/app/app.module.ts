import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environments";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {MaterialModule} from "./material/material.module";
import {CoreModule} from "./core/core.module";
import {FlightsModule} from "./flights/flights.module";
import {FlightsService} from "./core/services/flights.service";
import {AuthService} from "./core/services/auth.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
  ],
  providers: [FlightsService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
