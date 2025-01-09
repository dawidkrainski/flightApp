import { Component, OnInit } from '@angular/core';
import {FlightsService} from '../core/services/flights.service';
import {Flight} from "../models/flightModel";
import {Observable} from "rxjs";

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent {

  constructor(private flightsService: FlightsService) { }
  flights$: Observable<Flight[]> = this.flightsService.getFlights();


}
