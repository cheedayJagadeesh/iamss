import { Component, OnInit } from '@angular/core';
import { IelcapiService } from '../ielcapi.service';
import { ChangeDetectorRef } from '@angular/core';

interface calendar {
  id: number;
  team: string;
  process_Owner: string;
  jan: string;
  feb: string;
  mar: string;
  apr: string;
  may: string;
  jun: string;
  jul: string;
  aug: string;
  sep: string;
  oct: string;
  nov: string;
  dec: string;
}
@Component({
  selector: 'app-ismstask',
  templateUrl: './ismstask.component.html',
  styleUrls: ['./ismstask.component.css']
})
export class IsmstaskComponent implements OnInit  {
  isLoading = true;
  ismscalendarlist: any[] = []; 
  page: number = 1;  
  itemsPerPage: number = 10; 
  calendardata:calendar = {
    id:0,
    team: '',
    process_Owner: '',
    jan: '',
    feb: '',
    mar: '',
    apr: '',
    may: '',
    jun: '',
    jul: '',
    aug: '',
    sep: '',
    oct: '',
    nov: '',
    dec: '',
  }
   
  constructor(private ielc:IelcapiService,private cdr: ChangeDetectorRef) {
    for (let i = 1; i <= 100; i++) {
   }
  }
   ngOnInit(): void {
     this.GetIsmscalendarlist();
   }

   sortlist(data: any[]): any[] {
    return data.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
  }
  
   GetIsmscalendarlist(){
    this.ielc.Getismscalendar().subscribe((data) => {
      this.ismscalendarlist = data;
      this.ismscalendarlist = this.sortlist(data)
      console.log(this.ismscalendarlist);
      this.isLoading = false;
    });
   }

   
//  AddIsmscalendar(): void {
//   this.ielc.PostIsmscalendar(this.calendardata).subscribe(
//     (response) => {
//       alert('✅ Record Added Successfully!');
//       this.GetIsmscalendarlist();
//       this.resetlist();
//     },
//     (error) => {
//       alert('❌ Error adding Record. Please try again.');
//     }
//   );
// }


EditIsmscalendar(id: number) {
  // console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetIsmscalendarById(id).subscribe(data => {

    // console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.calendardata = { 
        id: data.id || 0,
        team: data.team || '',
        process_Owner: data.process_Owner || '',
        jan: data.jan || '',
        feb: data.feb || '',
        mar: data.mar || '',
        apr: data.apr || '',
        may: data.may || '',
        jun: data.jun || '', 
        jul: data.jul || '',
        aug: data.aug || '',
        sep: data.sep || '',
        oct: data.oct || '',
        nov: data.nov || '',
        dec: data.dec || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateIsmscalendar() {
  this.ielc.UpdateIsmscalendar(this.calendardata.id, this.calendardata).subscribe(
    (response) => {
      // console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetIsmscalendarlist();
      this.cdr.detectChanges(); 
      this.resetlist();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}


resetlist(){
  this.calendardata={
    id:0,
    team: '',
    process_Owner: '',
    jan: '',
    feb: '',
    mar: '',
    apr: '',
    may: '',
    jun: '',
    jul: '',
    aug: '',
    sep: '',
    oct: '',
    nov: '',
    dec: '',
  }
}



}
