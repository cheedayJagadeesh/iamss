import { Component } from '@angular/core';
import { IelcapiService } from '../ielcapi.service';
import { UsersInfo } from '../users-info';

@Component({
  selector: 'app-registeredusers',
  templateUrl: './registeredusers.component.html',
  styleUrls: ['./registeredusers.component.css']
})
export class RegisteredusersComponent {
 selectedDate:string=''
 Registeredusers:any
 currentPage: number = 1;
 totalPages: number[] = [1, 2, 3, 4, 5]; 
 constructor(private ielc: IelcapiService) {}
 ngOnInit() {
  this.ielc.GetUsers().subscribe((data) => {
    // this.Registeredusers=data;
    this.Registeredusers = data.sort((a, b) => {
      if (a.enrollmentID > b.enrollmentID) {
        return -1; // a comes before b
      }
      if (a.enrollmentID < b.enrollmentID)  {
        return 1; // b comes before a
      }
      return 0; // a and b are equal
    });

  });
 }


  // Set the current page when a page is clicked
  setPage(page: number, event: Event): void {
    event.preventDefault(); // Prevent the default anchor tag behavior
    this.currentPage = page;
  }

  // Go to the previous page
  prevPage(event: Event): void {
    event.preventDefault();
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Go to the next page
  nextPage(event: Event): void {
    event.preventDefault();
    if (this.currentPage < this.totalPages.length) {
      this.currentPage++;
    }
  }
 
}
