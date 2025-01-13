import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FlightFormComponent} from "../flight-form/flight-form.component";
import {FlightsService} from "../../core/services/flights.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Component({
  selector: 'app-new-flight',
  templateUrl: './new-flight.component.html',
  styleUrls: ['./new-flight.component.scss'],
})
export class NewFlightComponent {
  @ViewChild('flightForm') flightForm!: FlightFormComponent;


  constructor(
    private dialogRef: MatDialogRef<NewFlightComponent>,
    private flightsService: FlightsService,
    private toast: MatSnackBar
  ) {}


  createFlight() {
    const formattedValues = this.flightForm.formatFormValues();

    console.log('Formatted Form Values:', formattedValues);

    this.flightsService.addFlight(formattedValues)
      .then(this.onCreatingSuccess.bind(this), this.onCreatingError.bind(this));
  }

  private onCreatingSuccess() {
    let config: MatSnackBarConfig = {
      panelClass: ['toast-success'],
    };
    this.dialogRef.close();
    this.toast.open('Flight Created Successfully', '', config);
    };


  private onCreatingError(error: any) {
    let errorConfig: MatSnackBarConfig = {
      panelClass: ['toast-error'],
    };
    this.toast.open(error.message, '', errorConfig);
  }

}
