import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatAutocompleteModule } from "@angular/material/autocomplete";

@Component({
  selector: 'app-empanalytics',
  templateUrl: './empanalytics.component.html',
  styleUrls: ['./empanalytics.component.css']
})
export class EmpanalyticsComponent {

  months = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

constructor(private http: HttpClient) {}

citizenshipCtrl = new FormControl('');

countries: string[] = [];
filteredCountries: string[] = [];


ngOnInit() {

  this.http.get<string[]>('assets/countries.json')
    .subscribe(data => {
      this.countries = data;
      this.filteredCountries = data;
    });

  this.citizenshipCtrl.valueChanges.subscribe(value => {
    this.filteredCountries = this.countries.filter(country =>
      country.toLowerCase().includes((value || '').toLowerCase())
    );
  });
}

isOpen: any = {
disciplinary: true,
  redressal: true,
  leave: true,
  dailyattendance: false,
  empattendance: false,
  employeeattendance: false,
  performanceassessment: false,
  resourceallocation: false,
  skillset: false,
  freshersrating: false,
  selfappraisal: false,
  nodues: false,
  exitinterview: false,
};

toggleSection(section: string) {
  this.isOpen[section] = !this.isOpen[section];
}
}
