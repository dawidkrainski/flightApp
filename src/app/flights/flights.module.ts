import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightsComponent } from './flights.component';
import { FlightCardComponent } from './flight-card/flight-card.component';
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  imports: [
    CommonModule,
    MatIconModule
  ],
  declarations: [FlightsComponent, FlightCardComponent],
  exports: [FlightsComponent]
})
export class FlightsModule { }
