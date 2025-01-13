import {Component, Inject, Input, OnInit} from '@angular/core';
import {Flight} from "../../models/flightModel";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent{
@Input() flight!: Flight;

  constructor( private dialogRef: MatDialogRef<DetailsComponent>,
               @Inject(MAT_DIALOG_DATA) private data: Flight,
               private router: Router) {
    this.flight = data;
  }

  onClose() {
    this.dialogRef.close();
  }

  goToEditFlight(){
    this.dialogRef.close(this.router.navigate(['dashboard/flights', this.flight.key]));
  }
}
