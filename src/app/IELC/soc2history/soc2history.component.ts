import { Component, OnInit } from '@angular/core';
import { IelcapiService } from '../ielcapi.service';

@Component({
  selector: 'app-soc2history',
  templateUrl: './soc2history.component.html',
  styleUrls: ['./soc2history.component.css']
})
export class Soc2historyComponent implements OnInit {

   // Track sidebar state
  isSidebarClosed = false;

  // Event handler for sidebar toggle event
   onSidebarToggled(state: boolean) {
    this.isSidebarClosed = state;
  }

  isLoading = true;
  years: number[] = [];
  selectedYear: number = new Date().getFullYear();
  tableData: any[] = []; 
  page: number = 1;  
  itemsPerPage: number = 10; 
  constructor(private ielc:IelcapiService) {
    for (let i = 1; i <= 100; i++) {
   }
  }
   ngOnInit(): void {
    //  this.GetIsmshistorylist();
     this.populateYears();
     this.selectedYear = new Date().getFullYear(); // Default to current year
     this.fetchData(this.selectedYear);
   }

   sortlist(data: any[]): any[] {
    return data.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
  }
  
  //  GetIsmshistorylist(){
  //   this.ielc.Getismshistory().subscribe((data) => {
  //     this.ismshistorylist = data;
  //     this.ismshistorylist = this.sortlist(data)
  //     this.isLoading = false;
  //   });
  //  }

  
 
  populateYears(): void {
    const startYear = 2023;
    const currentYear = new Date().getFullYear();
    const today = new Date();
  
    // Always include years up to the current year
    this.years = [];
    for (let year = startYear; year <= currentYear; year++) {
      this.years.push(year);
    }
  
    // Only add next year if today is January 1st
    if (today.getMonth() === 0 && today.getDate() === 1) {
      this.years.push(currentYear + 1);
    }
  }

  fetchData(year: number): void {
    this.ielc.Getqmshistory(year).subscribe(
      (data) => {
        this.tableData = data;
        this.tableData = this.sortlist(data);
        this.isLoading = false;
      },
      (error) => {
        // console.error('Error fetching data:', error);
        this.tableData = []; // Clear data on error
      }
    );
  }
}
