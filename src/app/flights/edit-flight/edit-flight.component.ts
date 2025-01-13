import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Observable, tap} from "rxjs";
import {Flight} from "../../models/flightModel";
import {FlightsService} from "../../core/services/flights.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FlightFormComponent} from "../flight-form/flight-form.component";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Component({
  selector: 'app-edit-flight',
  templateUrl: './edit-flight.component.html',
  styleUrls: ['./edit-flight.component.scss']
})
export class EditFlightComponent implements AfterViewInit {
  @ViewChild('flightForm') flightForm!: FlightFormComponent;

  flight!: Flight;
  constructor(
    private route: ActivatedRoute,
    private toast: MatSnackBar,
    private flightsService: FlightsService,
    private router: Router
  ) {}

  ngAfterViewInit() {
    this.loadFlight();
  }

  editFlight() {
    try {
      const formattedValues = this.flightForm.formatFormValues();

      console.log('Formatted Values:', formattedValues);

      this.flightsService.editFlight(this.flight.key, formattedValues)
        .then(this.onEditSuccess.bind(this), this.onEditError.bind(this));
    } catch (error) {
      console.error('Error while formatting date and time:', error);
      this.toast.open('Failed to save flight. Check date and time fields.', '', {
        panelClass: ['toast-error'],
      });
    }
  }

  removeFlight() {
    this.flightsService.removeFlight(this.flight.key)
      .then(this.onRemoveSuccess.bind(this), this.onRemoveError.bind(this));
  }


  private onRemoveSuccess() {
    let config: MatSnackBarConfig = {
      panelClass: ['toast-error'],
    };
    this.router.navigate(['/dashboard/flights']);
    this.toast.open('Flight removed successfully', '', config)
  }

  private onRemoveError(error: Error) {
    let config: MatSnackBarConfig = {
      panelClass: ['toast-error'],
    };
    this.toast.open(error.message, '', config)
  }


  private onEditSuccess() {
    let config: MatSnackBarConfig = {
      panelClass: ['toast-success'],
    };
    this.router.navigate(['/dashboard/flights']);
    this.toast.open('Flight edited successfully', '', config)
  }

  private onEditError(error: Error) {
    let config: MatSnackBarConfig = {
      panelClass: ['toast-error'],
    };
    this.toast.open(error.message, '', config)
  }


  private loadFlight() {
    const key = this.route.snapshot.params['key'];
  this.flightsService.getFlight(key)
    .pipe(
    tap(flight => this.flightForm.setFlight(flight)))
      .subscribe(flight => this.flight = flight)
  }

}
