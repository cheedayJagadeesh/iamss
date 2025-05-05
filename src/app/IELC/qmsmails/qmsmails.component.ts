import { Component,OnInit } from '@angular/core';
import { IelcapiService } from '../ielcapi.service';

interface qmsmailsinfo{
    id: number;
    department: string;
    toaddress: string;
    cc: string;
    sharePath: string;
    sharePathURL: string;
    projectwiseShareLocation: string;
    projectwiseShareLocationURL: string;
    startDate: number;
    endDate: number;
    incidentMailDate: number;
    fromaddress: string;
    password: string;
}
@Component({
  selector: 'app-qmsmails',
  templateUrl: './qmsmails.component.html',
  styleUrls: ['./qmsmails.component.css']
})
export class QmsmailsComponent implements OnInit {

  qmsmailsdata:qmsmailsinfo={
    id: 0,
    department: '',
    toaddress: '',
    cc: '',
    sharePath: '',
    sharePathURL: '',
    projectwiseShareLocation: '',
    projectwiseShareLocationURL: '',
    startDate: 0,
    endDate: 0,
    incidentMailDate: 0,
    fromaddress: '',
    password: '',
   }

  isLoading = true;
  qmsmailslist: any[] = []; 
  page: number = 1;  
  itemsPerPage: number = 10; 

 constructor(private ielc:IelcapiService) {
  for (let i = 1; i <= 100; i++) {
    this.qmsmailslist.push({ id: i, name: `Item ${i}` });
 }
}
 ngOnInit(): void {
   this.GetQmsmailslist();
 
 }

 sortlist(data: any[]): any[] {
  return data.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
}

 GetQmsmailslist(){
  this.ielc.Getqmsmails().subscribe((data) => {
    this.qmsmailslist=data;
    this.qmsmailslist = this.sortlist(data)
    this.isLoading = false;
  });
 }

 AddQmsMails(): void {
  this.ielc.PostqmsMails(this.qmsmailsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetQmsmailslist();
      this.resetlist();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}


EditQmsMails(id: number) {
  // console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetqmsMailsById(id).subscribe(data => {

    // console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.qmsmailsdata = { 
        id: data.id || 0,
        department: data.department || '',
        toaddress: data.toaddress || '',
        cc: data.cc || '',
        sharePath: data.sharePath || '',
        sharePathURL: data.sharePathURL || '',
        projectwiseShareLocation: data.projectwiseShareLocation || '',
        projectwiseShareLocationURL: data.projectwiseShareLocationURL || '',
        startDate: data.startDate || 0, 
        endDate: data.endDate || 0,
        incidentMailDate: data.incidentMailDate || 0,
        fromaddress: data.fromaddress || '',
        password: data.password || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateQmsMails() {
  this.ielc.UpdateqmsMails(this.qmsmailsdata.id, this.qmsmailsdata).subscribe(
    (response) => {
      // console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetQmsmailslist();
     
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}

resetlist(){
  this.qmsmailsdata={
    id: 0,
    department: '',
    toaddress: '',
    cc: '',
    sharePath: '',
    sharePathURL: '',
    projectwiseShareLocation: '',
    projectwiseShareLocationURL: '',
    startDate: 0,
    endDate: 0,
    incidentMailDate: 0,
    fromaddress: '',
    password: '',
  }
}
}
