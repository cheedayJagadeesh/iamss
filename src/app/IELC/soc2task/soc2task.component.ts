import { Component, OnInit } from '@angular/core';
import { IelcapiService } from '../ielcapi.service';

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
  selector: 'app-soc2task',
  templateUrl: './soc2task.component.html',
  styleUrls: ['./soc2task.component.css']
})
export class Soc2taskComponent implements OnInit {
  isLoading = true;
  qmscalendarlist: any[] = []; 
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
   
  constructor(private ielc:IelcapiService) {
    for (let i = 1; i <= 100; i++) {
   }
  }
   ngOnInit(): void {
     this.GetQmscalendarlist();
   }

   sortlist(data: any[]): any[] {
    return data.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
  }
  
   GetQmscalendarlist(){
    this.ielc.Getqmscalendar().subscribe((data) => {
      this.qmscalendarlist = data;
      this.qmscalendarlist = this.sortlist(data)
      this.isLoading = false;
    });
   }

   
 AddQmscalendar(): void {
  this.ielc.Postqsmscalendar(this.calendardata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetQmscalendarlist();
      this.resetlist();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}


EditQmscalendar(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetqmscalendarById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

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
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateQmscalendar() {
  this.ielc.Updateqmscalendar(this.calendardata.id, this.calendardata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetQmscalendarlist();
      this.resetlist();
    },
    (error) => {
      console.error("Error updating Record:", error);
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
