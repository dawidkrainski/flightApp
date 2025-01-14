import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightsComponent } from './flights.component';
import { FlightCardComponent } from './flight-card/flight-card.component';
import { NewFlightComponent } from './new-flight/new-flight.component';
import { FlightFormComponent } from './flight-form/flight-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../material/material.module";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { DetailsComponent } from './details/details.component';
import { EditFlightComponent } from './edit-flight/edit-flight.component';
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {FlightsRoutingModule} from "./flights-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    MatDatepickerModule,
    FlightsRoutingModule,
  ],
  declarations: [
    FlightsComponent,
    FlightCardComponent,
    NewFlightComponent,
    FlightFormComponent,
    DetailsComponent,
    EditFlightComponent,
  ],
  exports: [FlightsComponent],
})
export class FlightsModule {

}
