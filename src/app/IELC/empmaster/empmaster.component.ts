import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-empmaster',
  templateUrl: './empmaster.component.html',
  styleUrls: ['./empmaster.component.css']
})
export class EmpmasterComponent {
// citizenshipCtrl = new FormControl('');

//   countries: string[] = [
//     'Afghanistan',
//     'Albania',
//     'Algeria',
//     'American Samoa',
//     'Andorra',
//     'Angola',
//     'India',
//     'USA',
//     'UK'
//   ];

//   filteredCountries: string[] = this.countries;

//   ngOnInit() {
//     this.citizenshipCtrl.valueChanges.subscribe(value => {
//       this.filteredCountries = this.countries.filter(country =>
//         country.toLowerCase().includes((value || '').toLowerCase())
//       );
//     });
//   }

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
personal: true,
  identity: true,
  visa: true,
  education: false,
  contact: false,
  certifications: false,
  residential: false,
  professional: false,
  legal: false,
  family: false,
  experience: false,
  language: false,
  feedback: false,
  details: false,
  type: false,
  project: false,
  salary: false,
  deductions: false
};

toggleSection(section: string) {
  this.isOpen[section] = !this.isOpen[section];
}

}
