import { Component } from '@angular/core';
import { IelcapiService } from '../ielcapi.service';

interface smtpinfo{
  id: number;
  userName: string;
  password: string;
}
interface itsprtinfo{
  id: number;
  contactPriority: string;
  name: string;
  mobile: number;
  email: string;
}
interface ossprtinfo{
  id: number;
  contactPriority: string;
  name: string;
  mobile: number;
  email: string;
}
interface hrsprtinfo{
  id: number;
  contactPriority: string;
  name: string;
  mobile: number;
  email: string;
}
interface emersprtinfo{
  id: number;
  functions: string;
  name: string;
  mobile: number;
  email: string;
}
interface isosprtinfo{
  id: number;
  contactPriority: string;
  name: string;
  mobile: number;
  email: string;
}
@Component({
  selector: 'app-adminusers',
  templateUrl: './adminusers.component.html',
  styleUrls: ['./adminusers.component.css']
})
export class AdminusersComponent {
  // selectedOption: string = '';
  selectedOption1: string = '';
  selectedOption2: string = '';
  isContactSelected: boolean = false;

onSelection1Change() {
  this.isContactSelected = this.selectedOption1 === 'Contact';

}
onSelection2Change() {
  // if (this.selectedOption2 === 'INTEQITSupport') {
  //   this.isContactSelected = true; 
  // }
}


  isLoading = true;
  smtplist: any[] = []; 
  smtpdata:smtpinfo={
   id: 0,
   userName: '',
   password: '',
  }
  itsprtlist: any[] = []; 
  itsprtdata:itsprtinfo={
  id: 0,
  contactPriority: '',
  name: '',
  mobile: 0,
  email: '',
  }
  ossprtlist: any[] = []; 
  ossprtdata:ossprtinfo={
  id: 0,
  contactPriority: '',
  name: '',
  mobile: 0,
  email: '',
 }
 hrsprtlist: any[] = []; 
 hrsprtdata:hrsprtinfo={
  id: 0,
  contactPriority: '',
  name: '',
  mobile: 0,
  email: '',
 }
 emersprtlist: any[] = []; 
 emersprtdata:emersprtinfo={
  id: 0,
  functions: '',
  name: '',
  mobile: 0,
  email: '',
  }
  isosprtlist: any[] = []; 
  isosprtdata:isosprtinfo={
    id: 0,
    contactPriority: '',
    name: '',
    mobile: 0,
    email: '',
 }
  
  constructor(private ielc:IelcapiService) {

  }

  sortlist(data: any[]): any[] {
    return data.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
  }
  
  ngOnInit(): void {
    this.GetSmtplist();
    this.GetItSprtlist();
    this.GetOsSprtlist();
    this.GetHrSprtlist();
    this.GetEmerSprtlist();
    this.GetIsoSprtlist();
    this.GetIso9001Sprtlist();
  }

//-------------------------------------------------------------------------------SMTP
  GetSmtplist(){
    this.ielc.Getsmtp().subscribe((data) => {
      this.smtplist=data;
      this.smtplist = this.sortlist(data)
      this.isLoading = false;
    });
   }
   AddSmtp(): void {
    this.ielc.Postsmtp(this.smtpdata).subscribe(
      (response) => {
        alert('✅ Record Added Successfully!');
        this.GetSmtplist();
        this.resetsmtp();
      },
      (error) => {
        alert('❌ Error adding Record. Please try again.');
      }
    );
  }
  deletesmtp(id: number) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.ielc.DeletesmtpById(id).subscribe({
        next: () => {
          alert(`Record with ID ${id} deleted successfully!`);
          this.GetSmtplist();
        },
        error: (err) => console.error('Error deleting item:', err)
      });
    }
  }
  resetsmtp(){
    this.smtpdata={
    id: 0,
    userName: '',
    password: '',
    }
  }
//-------------------------------------------------------------------------------INTEQ IT Sprt
 GetItSprtlist(){
  this.ielc.GetItSprt().subscribe((data) => {
    this.itsprtlist=data;
    this.itsprtlist = this.sortlist(data)
    this.isLoading = false;
  });
 }
 AddItSprt(): void {
  this.ielc.PostITSprt(this.itsprtdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetItSprtlist();
      this.resetItSprt();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteitsprt(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteITSprtById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetItSprtlist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditItSprt(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetITSprtById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.itsprtdata = { 
        id: data.id || 0,
        contactPriority: data.contactPriority || '',
        name:  data.name || '',
        mobile:  data.mobile || 0,
        email:  data.email || '',
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateItSprt() {
  this.ielc.UpdateITSprt(this.itsprtdata.id, this.itsprtdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetItSprtlist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}
resetItSprt(){
  this.itsprtdata={
    id: 0,
    contactPriority: '',
    name: '',
    mobile: 0,
    email: '',
  }
}

//-------------------------------------------------------------------------------INTEQ Admin Sprt

GetOsSprtlist(){
  this.ielc.GetosSprt().subscribe((data) => {
    this.ossprtlist=data;
    this.ossprtlist = this.sortlist(data)
    this.isLoading = false;
  });
 }
 
 AddOsSprt(): void {
  this.ielc.PostOsSprt(this.ossprtdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetOsSprtlist();
      this.resetOsSprt();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteOssprt(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteOsSprtById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetOsSprtlist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditOsSprt(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetOsSprtById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.ossprtdata = { 
        id: data.id || 0,
        contactPriority: data.contactPriority || '',
        name:  data.name || '',
        mobile:  data.mobile || 0,
        email:  data.email || '',
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateOsSprt() {
  this.ielc.UpdateOsSprt(this.ossprtdata.id, this.ossprtdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetOsSprtlist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}
resetOsSprt(){
  this.ossprtdata={
    id: 0,
    contactPriority: '',
    name: '',
    mobile: 0,
    email: '',
  }
}

//-------------------------------------------------------------------------------INTEQ Hr Sprt

GetHrSprtlist(){
  this.ielc.GetHrSprt().subscribe((data) => {
    this.hrsprtlist=data;
    this.hrsprtlist = this.sortlist(data)
    this.isLoading = false;
  });
 }
 
 AddHrSprt(): void {
  this.ielc.PostHrSprt(this.hrsprtdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetHrSprtlist();
      this.resetHrSprt();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteHrsprt(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteHrSprtById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetHrSprtlist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditHrSprt(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetHrSprtById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.hrsprtdata = { 
        id: data.id || 0,
        contactPriority: data.contactPriority || '',
        name:  data.name || '',
        mobile:  data.mobile || 0,
        email:  data.email || '',
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateHrSprt() {
  this.ielc.UpdateHrSprt(this.hrsprtdata.id, this.hrsprtdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetHrSprtlist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}
resetHrSprt(){
  this.hrsprtdata={
    id: 0,
    contactPriority: '',
    name: '',
    mobile: 0,
    email: '',
  }
}
//-------------------------------------------------------------------------------INTEQ Emergency Sprt

GetEmerSprtlist(){
  this.ielc.GetemerSprt().subscribe((data) => {
    this.emersprtlist=data;
    this.emersprtlist = this.sortlist(data)
    this.isLoading = false;
  });
 }

 AddEmerSprt(): void {
  this.ielc.PostEmerSprt(this.emersprtdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetEmerSprtlist();
      this.resetEmerSprt();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteEmersprt(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteEmerSprtById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetEmerSprtlist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditEmerSprt(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetEmerSprtById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.emersprtdata = { 
        id: data.id || 0,
        functions: data.functions || '',
        name:  data.name || '',
        mobile:  data.mobile || 0,
        email:  data.email || '',
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateEmerSprt() {
  this.ielc.UpdateEmerSprt(this.emersprtdata.id, this.emersprtdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetEmerSprtlist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}
resetEmerSprt(){
  this.emersprtdata={
    id: 0,
    functions: '',
    name: '',
    mobile: 0,
    email: '',
  }
}

//-------------------------------------------------------------------------------INTEQ ISO27001

GetIsoSprtlist(){
  this.ielc.Getiso27001().subscribe((data) => {
    this.isosprtlist=data;
    this.isosprtlist = this.sortlist(data)
    this.isLoading = false;
  });
 }

 
 AddISO27001Sprt(): void {
  this.ielc.PostIso27001Sprt(this.isosprtdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetIsoSprtlist();
      this.resetISO27001Sprt();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteISO27001sprt(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteIso27001SprtById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetIsoSprtlist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditISO27001Sprt(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetIso27001SprtById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.isosprtdata = { 
        id: data.id || 0,
        contactPriority: data.contactPriority || '',
        name:  data.name || '',
        mobile:  data.mobile || 0,
        email:  data.email || '',
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateISO27001Sprt() {
  this.ielc.UpdateIso27001Sprt(this.isosprtdata.id, this.isosprtdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetIsoSprtlist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}
resetISO27001Sprt(){
  this.isosprtdata={
    id: 0,
    contactPriority: '',
    name: '',
    mobile: 0,
    email: '',
  }
}

//-------------------------------------------------------------------------------INTEQ ISO9001

GetIso9001Sprtlist(){
  this.ielc.Getiso9001().subscribe((data) => {
    this.isosprtlist=data;
    this.isosprtlist = this.sortlist(data)
    this.isLoading = false;
  });
 }

 AddISO9001Sprt(): void {
  this.ielc.PostIso9001Sprt(this.isosprtdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetIso9001Sprtlist();
      this.resetISO9001Sprt();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteISO9001sprt(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteIso9001SprtById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetIso9001Sprtlist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditISO9001Sprt(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetIso9001SprtById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.isosprtdata = { 
        id: data.id || 0,
        contactPriority: data.contactPriority || '',
        name:  data.name || '',
        mobile:  data.mobile || 0,
        email:  data.email || '',
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateISO9001Sprt() {
  this.ielc.UpdateIso9001Sprt(this.isosprtdata.id, this.isosprtdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetIso9001Sprtlist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}
resetISO9001Sprt(){
  this.isosprtdata={
    id: 0,
    contactPriority: '',
    name: '',
    mobile: 0,
    email: '',
  }
}
}
