import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {map, Observable} from "rxjs";
import {Flight} from "../../models/flightModel";


@Injectable({
  providedIn: 'root'
})
export class FlightsService {
  private API_URL = '/flights';
  constructor(private db: AngularFireDatabase) { }

  getFlights(): Observable<Flight[]> {
    return this.db.list<Flight>(this.API_URL).snapshotChanges().pipe(
      map(response => {
        return response.map(flight => this.assignKey(flight));
      })
    );
  }

  getFlight(key: string): Observable<Flight> {
    return this.db.object<Flight>(`${this.API_URL}/${key}`).snapshotChanges().pipe(
      map(flight => this.assignKey(flight))
    );
  }

  editFlight(key: string, flight: Flight) {
    return this.db.object<Flight>(`${this.API_URL}/${key}`).update(flight);
  }

  removeFlight(key: string) {
    return this.db.object<Flight>(`${this.API_URL}/${key}`).remove();
  }

  addFlight(flight: Flight) {
    return this.db.list(this.API_URL).push(flight);
  }

private assignKey(flight: any) {
  return {...flight.payload.val(), key: flight.key};
}

}
