import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FlightsComponent } from './flights.component';
import { EditFlightComponent } from './edit-flight/edit-flight.component';

const routes: Routes = [
  { path: '', component: FlightsComponent },
  { path: ':key', component: EditFlightComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlightsRoutingModule {}

