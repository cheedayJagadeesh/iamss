import { Component,OnInit,AfterViewInit } from '@angular/core';
import { IelcapiService } from '../ielcapi.service';
import { ChangeDetectorRef } from '@angular/core';
declare var bootstrap: any; 

interface ismsmailsinfo{
    id: number;
    department: string;
    process_Owner: string;
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
  selector: 'app-ismsmails',
  templateUrl: './ismsmails.component.html',
  styleUrls: ['./ismsmails.component.css']
})
export class IsmsmailsComponent implements OnInit {

  // Track sidebar state
  isSidebarClosed = false;

  // Event handler for sidebar toggle event
   onSidebarToggled(state: boolean) {
    this.isSidebarClosed = state;
  }

  ismsmailsdata:ismsmailsinfo={
    id: 0,
    department: '',
    process_Owner: '',
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
  ismsmailslist: any[] = []; 
  page: number = 1;  
  itemsPerPage: number = 10; 

 constructor(private ielc:IelcapiService,private cdRef: ChangeDetectorRef) {
  for (let i = 1; i <= 100; i++) {
    this.ismsmailslist.push({ id: i, name: `Item ${i}` });
 }
 this.GetIsmsmailslist();
}
 ngOnInit(): void {
   this.GetIsmsmailslist();
 
 }

 sortlist(data: any[]): any[] {
  return data.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
}

 GetIsmsmailslist(){
  this.ielc.Getismsmails().subscribe((data) => {
    this.ismsmailslist = data;
    this.ismsmailslist = this.sortlist(data)
    this.isLoading = false;
  });
 }

 AddIsmsMails(): void {
  this.ielc.PostIsmsMails(this.ismsmailsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetIsmsmailslist();
      this.resetlist();
    },
    (error) => {
      // console.error('❌ Error details:', error);
      alert('❌ Error adding Record. Please try again.');
    }
  );
}

// EditIsmsMails(id: number){
//   this.ielc.GetIsmsMailsById(id).subscribe(data => {
//     console.log("Fetched Record Session:", data);
//   });
// }

EditIsmsMails(id: number) {
  // console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetIsmsMailsById(id).subscribe(data => {

    // console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.ismsmailsdata = { 
        id: data.id || 0,
        department: data.department || '',
        process_Owner: data.process_Owner || '',
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


UpdateIsmsMails() {
  this.ielc.UpdateIsmsMails(this.ismsmailsdata.id, this.ismsmailsdata).subscribe(
    (response) => {
      // console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetIsmsmailslist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}


resetlist(){
  this.ismsmailsdata={
    id: 0,
    department: '',
    process_Owner: '',
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

// deleteItem(id: number) {
//   if (confirm('Are you sure you want to delete this record?')) {
//     this.ielc.DeleteismsById(id).subscribe({
//       next: () => {
//         alert(`Record with ID ${id} deleted successfully!`);
//         this.GetIsmsmailslist(); // Call this only after successful deletion
//       },
//       // error: (err) => console.error('Error deleting item:', err)
//     });
//   }
// }


deleteItem(process_Owner: string) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteismsByOwner(process_Owner).subscribe({
      next: () => {
        alert(`Record with Process Owner ${process_Owner} deleted successfully!`);
        this.GetIsmsmailslist(); // Call this only after successful deletion
      },
      // error: (err) => console.error('Error deleting item:', err)
    });
  }
}

}
