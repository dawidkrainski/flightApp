import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Flight} from "../../models/flightModel";
import {Crew} from "../../models/flightModel";
@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.scss']
})
export class FlightFormComponent implements OnInit {
  @Input() editMode = false;
  form!: FormGroup;
  jobs = [
    { label: 'Stewardess', value: 'stewardess' },
    { label: 'Pilot', value: 'pilot' },
    { label: 'Senior cabin crew', value: 'senior-cabin-crew' },
    { label: 'Co-pilot', value: 'co-pilot' },
    { label: 'Flight Dispatcher', value: 'flight-dispatcher' },
    { label: 'Mechanic', value: 'mechanic' },
  ];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

  setFlight(flight: Flight) {
    const { key, ...formData } = flight;

    const parseDateTime = (dateTime: string): { date: Date; time: string } => {
      if (!dateTime || !dateTime.includes(' ')) {
        console.warn(`Invalid dateTime format: ${dateTime}`);
        return { date: new Date(), time: '' };
      }

      const [time, date] = dateTime.split(' ');
      const [day, month, year] = date.split('-').map(Number);

      const formattedDate = new Date(year, month - 1, day);
      return { date: formattedDate, time };
    };

    const { date: departureDate, time: departureTime } = parseDateTime(flight.departureTime);
    const { date: returnDate, time: returnTime } = parseDateTime(flight.returnTime);

    this.form.patchValue({
      ...formData,
      departureDate,
      departureTime,
      returnDate,
      returnTime,
    });

    this.crew.clear();

    if (formData.crew) {
      formData.crew.forEach((crewMember) => {
        this.addCrewMember(crewMember);
      });
    }
  }

  buildCrewMember(crewMember: Crew = {} as Crew) {
    return this.formBuilder.group({
      name: crewMember.name || '',
      job: crewMember.job || '',
    });
  }

  addCrewMember(crewMember?: Crew) {
    this.crew.push(this.buildCrewMember(crewMember));
  }

  get crew() {
    return this.form.get('crew') as FormArray;
  }

  removeCrewMember(index: number) {
    this.crew.removeAt(index);
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      origin: ['', {validators: [Validators.required]}],
      destination: ['', {validators: [Validators.required]}],
      departureDate: ['', {validators: [Validators.required]}],
      departureTime: ['', {validators: [Validators.required]}],
      returnDate: ['', {validators: [Validators.required]}],
      returnTime: ['', {validators: [Validators.required]}],
      code: ['', {validators: [Validators.required, Validators.minLength(4), Validators.maxLength(7)]}],
      additionalInformation: '',
      withSKPlanesDiscount: false,
      crew: this.formBuilder.array(this.editMode ? [] : [this.buildCrewMember()])
    });
  }

  formatFormValues(): any {
    const values = this.form.value;

    const formatDateTime = (time: string, date: string): string => {
      const [hours, minutes] = time.split(':');
      const formattedDate = new Date(date);
      formattedDate.setHours(+hours, +minutes);

      const day = String(formattedDate.getDate()).padStart(2, '0');
      const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
      const year = formattedDate.getFullYear();
      const hour = String(formattedDate.getHours()).padStart(2, '0');
      const minute = String(formattedDate.getMinutes()).padStart(2, '0');

      return `${hour}:${minute} ${day}-${month}-${year}`;
    };

    return {
      ...values,
      departureTime: formatDateTime(values.departureTime, values.departureDate),
      returnTime: formatDateTime(values.returnTime, values.returnDate),
    };
  }

}
