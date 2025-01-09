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
    CoreModule,
    FlightsModule,
  ],
  providers: [FlightsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
