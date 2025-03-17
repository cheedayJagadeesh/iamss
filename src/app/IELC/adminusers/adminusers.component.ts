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
interface docs{
  documentID: number;
  documentName: string;
  url: string;
}
interface adminusersinfo{
  roleName: string;
  pageName: string;
  email: string;
}
interface holidays{
  date: string;
  content: string;
}
interface eventsinfo{
  id: number;
  eventData: string;
  eventName: string;
}
interface crserest{
  id: number;
  coursesList: string;
}
interface eventalertsinfo{
  alertID: number;
  alertName: string;
  alertDate: string;
  toMails: string;
  ccMails: string;
  mailAlertDay: number;
  mailType: string;
  frequency: string;
  alertAttachment: string;
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
  selectedOption3: string = '';
  isContactSelected: boolean = false;
  isHRSelected: boolean = false;
  isOSSelected: boolean = false;
  isITSelected: boolean = false;
  isPRJTSelected: boolean = false;
  isCISOSelected: boolean = false;

onSelection1Change() {
  this.isContactSelected = this.selectedOption1 === 'Contact';
  this.isHRSelected = this.selectedOption1 === 'HRSupport';
  this.isOSSelected = this.selectedOption1 === 'OperationsSupport';
  this.isITSelected = this.selectedOption1 === 'ITSupport';
  this.isPRJTSelected = this.selectedOption1 === 'ProjectsSupport';
  this.isCISOSelected = this.selectedOption1 === 'CISO_MR_Support';
  if (this.selectedOption1 !== 'Contact') {
    this.selectedOption2 =''
    console.log(this.selectedOption1)
  }

}
onSelection2Change() {
 
  // if (this.selectedOption2 === 'INTEQITSupport') {
  //   this.isContactSelected = true; 
  // }
  // this.isHRSelected = this.selectedOption2 === 'HRSupport';
}


onSelection3Change() {
 
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
  isosprtlist27001: any[] = []; 
  isosprtlist9001: any[] = []; 
  isosprtdata:isosprtinfo={
    id: 0,
    contactPriority: '',
    name: '',
    mobile: 0,
    email: '',
 }
 docsdata:docs={
  documentID: 0,
  documentName: '',
  url: '',
 }
 adminusersdata:adminusersinfo={
  roleName: '',
  pageName: '',
  email: '',
 }
 holidaysdata:holidays={
  date: '',
  content: ''
 }
 eventsdata:eventsinfo={
  id: 0,
  eventData: '',
  eventName: ''
 }
 crserestdata:crserest={
  id: 0,
  coursesList: '',
 }
 eventalertsdata:eventalertsinfo={
  alertID: 0,
  alertName: '',
  alertDate: '',
  toMails: '',
  ccMails: '',
  mailAlertDay: 0,
  mailType: '',
  frequency: '',
  alertAttachment: ''
 }
 HrIsmsGeneraldata: any[] = []; 
 HrIsmsGuidelinesdata: any[] = []; 
 HrIsmsPolicydata: any[] = []; 
 HrIsmsProceduredata: any[] = []; 
 HrIsmsFormatdata: any[] = []; 
 HrqmsGeneraldata: any[] = []; 
 HrqmsGuidelinesdata: any[] = []; 
 HrqmsPolicydata: any[] = []; 
 HrqmsProceduredata: any[] = []; 
 HrqmsFormatdata: any[] = []; 
 OsIsmsGeneraldata: any[] = []; 
 OsIsmsGuidelinesdata: any[] = []; 
 OsIsmsPolicydata: any[] = []; 
 OsIsmsProceduredata: any[] = []; 
 OsIsmsFormatdata: any[] = []; 
 OsqmsGeneraldata: any[] = []; 
 OsqmsGuidelinesdata: any[] = []; 
 OsqmsPolicydata: any[] = []; 
 OsqmsProceduredata: any[] = []; 
 OsqmsFormatdata: any[] = []; 
 IsmsSprtdata:any[]=[];
 IsoSprtdata:any[]=[];
 IsPolicydata:any[]=[];
 ItIsmsGeneraldata: any[] = []; 
 ItIsmsGuidelinesdata: any[] = []; 
 ItIsmsPolicydata: any[] = []; 
 ItIsmsProceduredata: any[] = []; 
 ItIsmsFormatdata: any[] = []; 
 ItqmsGeneraldata: any[] = []; 
 ItqmsGuidelinesdata: any[] = []; 
 ItqmsPolicydata: any[] = []; 
 ItqmsProceduredata: any[] = []; 
 ItqmsFormatdata: any[] = []; 
 prjtIsmsGeneraldata: any[] = []; 
 prjtIsmsGuidelinesdata: any[] = []; 
 prjtIsmsPolicydata: any[] = []; 
 prjtIsmsProceduredata: any[] = []; 
 prjtIsmsFormatdata: any[] = []; 
 prjtqmsGeneraldata: any[] = []; 
 prjtqmsGuidelinesdata: any[] = []; 
 prjtqmsPolicydata: any[] = []; 
 prjtqmsProceduredata: any[] = []; 
 prjtqmsFormatdata: any[] = []; 
 cisoIsmsGeneraldata: []=[];
 cisoIsmsGendata: any[]=[];
 cisoIsmsGuidelinesdata: docs[] = []; 
 cisoIsmsPolicydata: any[] = []; 
 cisoIsmsProceduredata: any[] = []; 
 cisoIsmsFormatdata: any[] = []; 
 cisoqmsGeneraldata: any[]=[];
 cisoqmsGuidelinesdata: any[] = []; 
 cisoqmsPolicydata: any[] = []; 
 cisoqmsProceduredata: any[] = []; 
 cisoqmsFormatdata: any[] = []; 
 EmerGeneraldata: any[]=[];
 VarcmtGeneraldata: any[]=[];
 HipaaGeneraldata: any[]=[];
 SocGeneraldata: any[]=[];
 GdprGeneraldata: any[]=[];
 DpdpGeneraldata: any[]=[];
 adminuserslist: any[]=[];
 holidayslist: any[]=[];
 eventslist: any[]=[];
 crserestlist: any[]=[];
 eventalertslist: any[]=[];
  
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
    this.GetHrISMSGenerallist();
    this.GetHrISMSGuidelineslist();
    this.GetHrISMSPolicylist();
    this.GetHrISMSProcedurelist();
    this.GetHrISMSFormatlist();
    this.GetHrQMSGenerallist();
    this.GetHrQMSGuidelineslist();
    this.GetHrQMSPolicylist();
    this.GetHrQMSProcedurelist();
    this.GetHrQMSFormatlist();
    this.GetOsISMSGenerallist();
    this.GetOsISMSGuidelineslist();
    this.GetOsISMSPolicylist();
    this.GetOsISMSProcedurelist();
    this.GetOsISMSFormatlist();
    this.GetOsQMSGenerallist();
    this.GetOsQMSGuidelineslist();
    this.GetOsQMSPolicylist();
    this.GetOsQMSProcedurelist();
    this.GetOsQMSFormatlist();
    this.GetIsmsSprt();
    this.GetIsoSprt();
    this.GetItISMSGenerallist();
    this.GetItISMSGuidelineslist();
    this.GetItISMSPolicylist();
    this.GetItISMSProcedurelist();
    this.GetItISMSFormatlist();
    this.GetItQMSGenerallist();
    this.GetItQMSGuidelineslist();
    this.GetItQMSPolicylist();
    this.GetItQMSProcedurelist();
    this.GetItQMSFormatlist();
    this.GetPrjtISMSGenerallist();
    this.GetPrjtISMSGuidelineslist();
    this.GetPrjtISMSPolicylist();
    this.GetPrjtISMSProcedurelist();
    this.GetPrjtISMSFormatlist();
    this.GetPrjtQMSGenerallist();
    this.GetPrjtQMSGuidelineslist();
    this.GetPrjtQMSPolicylist();
    this.GetPrjtQMSProcedurelist();
    this.GetPrjtQMSFormatlist();
    this.GetCisoISMSGenerallist();
    this.GetCisoISMSGuidelineslist();
    this.GetCisoISMSProcedurelist();
    this.GetCisoISMSPolicylist();
    this.GetCisoISMSFormatlist();
    this.GetCisoQMSGenerallist();
    this.GetCisoQMSGuidelineslist();
    this.GetCisoQMSProcedurelist();
    this.GetCisoQMSPolicylist();
    this.GetCisoQMSFormatlist();
    this.GetIsoPolicy();
    this.GetEmerGenerallist();
    this.GetVarCmtGenerallist();
    this.GetHipaaGenerallist();
    this.GetSocGenerallist();
    this.GetGdprGenerallist();
    this.GetDpdpGenerallist();
    this.GetAdminuserslist();
    this.GetHolidaysist();
    this.GetEventsist();
    this.GetCourseist();
    this.GetEventAlertsist();
    
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
      this.resetItSprt();
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
      this.resetOsSprt();
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
      this.resetHrSprt();
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
      this.resetEmerSprt();
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
    this.isosprtlist27001=data;
    this.isosprtlist27001 = this.sortlist(data)
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
      this.resetISO27001Sprt();
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
    this.isosprtlist9001=data;
    this.isosprtlist9001 = this.sortlist(data)
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
      this.resetISO9001Sprt();
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

//-------------------------------------------------------------------------------HR ISMS
GetHrISMSGenerallist(){
  this.ielc.Gethrismsgeneral().subscribe((data) => {
    this.HrIsmsGeneraldata=data;
    this.isLoading = false;
  });
 }

 
 AddHrISMSGeneral(): void {
  this.ielc.PostHrismsgeneral(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetHrISMSGenerallist();
      this.resetHrISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}

deleteHrISMSGeneral(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteHrismsgeneralById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetHrISMSGenerallist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditHrISMSGeneral(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetHrismsgeneralById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateHrISMSGeneral() {
  this.ielc.UpdateHrismsgeneral(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetHrISMSGenerallist();
      this.resetHrISMS();
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}
resetHrISMS(){
  this.docsdata={
    documentID: 0,
    documentName: '',
    url: '',
  }
}
 GetHrISMSGuidelineslist(){
  this.ielc.Gethrismsguidelines().subscribe((data) => {
    this.HrIsmsGuidelinesdata=data;
    this.isLoading = false;
  });
 }
 
 AddHrISMSGuidelines(): void {
  this.ielc.PostHrismsguideline(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetHrISMSGuidelineslist();
      this.resetHrISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteHrISMSGuidelines(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteHrismsguidelineById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetHrISMSGuidelineslist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditHrISMSGuidelines(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetHrismsguidelineById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateHrISMSGuidelines() {
  this.ielc.UpdateHrismsguideline(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetHrISMSGuidelineslist();
      this.resetHrISMS();
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}

 GetHrISMSPolicylist(){
  this.ielc.Gethrismspolicy().subscribe((data) => {
    this.HrIsmsPolicydata=data;
    this.isLoading = false;
  });
 }
 
 AddHrISMSPolicy(): void {
  this.ielc.PostHrismspolicy(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetHrISMSPolicylist();
      this.resetHrISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteHrISMSPolicy(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteHrismspolicyById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetHrISMSPolicylist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditHrISMSPolicy(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetHrismspolicyById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateHrISMSPolicy() {
  this.ielc.UpdateHrismspolicy(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetHrISMSPolicylist();
      this.resetHrISMS();
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}

 GetHrISMSProcedurelist(){
  this.ielc.Gethrismsprocedure().subscribe((data) => {
    this.HrIsmsProceduredata=data;
    this.isLoading = false;
  });
 }
 
 AddHrISMSProcedure(): void {
  this.ielc.PostHrismsprocedure(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetHrISMSProcedurelist();
      this.resetHrISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteHrISMSProcedure(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteHrismsprocedureById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetHrISMSProcedurelist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditHrISMSProcedure(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetHrismsprocedureById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateHrISMSProcedure() {
  this.ielc.UpdateHrismsprocedure(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetHrISMSProcedurelist();
      this.resetHrISMS();
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}

 GetHrISMSFormatlist(){
  this.ielc.Gethrismsformat().subscribe((data) => {
    this.HrIsmsFormatdata=data;
    this.isLoading = false;
  });
 }
 
 AddHrISMSFormat(): void {
  this.ielc.PostHrismsformat(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetHrISMSFormatlist();
      this.resetHrISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteHrISMSFormat(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteHrismsformatById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetHrISMSFormatlist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditHrISMSFormat(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetHrismsformatById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateHrISMSFormat() {
  this.ielc.UpdateHrismsformat(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetHrISMSFormatlist();
      this.resetHrISMS();
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}
//-------------------------------------------------------------------------------------------HR QMS
GetHrQMSGenerallist(){
  this.ielc.Gethrqmsgeneral().subscribe((data) => {
    this.HrqmsGeneraldata=data;
    this.isLoading = false;
  });
 }

 
 AddHrQMSGeneral(): void {
  this.ielc.PostHrqmsgeneral(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetHrQMSGenerallist();
      this.resetHrQMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}

deleteHrQMSGeneral(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteHrqmsgeneralById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetHrQMSGenerallist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditHrQMSGeneral(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetHrqmsgeneralById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateHrQMSGeneral() {
  this.ielc.UpdateHrqmsgeneral(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetHrQMSGenerallist();
      this.resetHrQMS();
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}
resetHrQMS(){
  this.docsdata={
    documentID: 0,
    documentName: '',
    url: '',
  }
}
 GetHrQMSGuidelineslist(){
  this.ielc.Gethrqmsguidelines().subscribe((data) => {
    this.HrqmsGuidelinesdata=data;
    this.isLoading = false;
  });
 }
 
 AddHrQMSGuidelines(): void {
  this.ielc.PostHrqmsguideline(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetHrQMSGuidelineslist();
      this.resetHrQMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteHrQMSGuidelines(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteHrqmsguidelineById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetHrQMSGuidelineslist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditHrQMSGuidelines(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetHrqmsguidelineById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateHrQMSGuidelines() {
  this.ielc.UpdateHrqmsguideline(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetHrQMSGuidelineslist();
      this.resetHrQMS();
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}

 GetHrQMSPolicylist(){
  this.ielc.Gethrqmspolicy().subscribe((data) => {
    this.HrqmsPolicydata=data;
    this.isLoading = false;
  });
 }
 
 AddHrQMSPolicy(): void {
  this.ielc.PostHrqmspolicy(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetHrQMSPolicylist();
      this.resetHrISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteHrQMSPolicy(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteHrqmspolicyById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetHrQMSPolicylist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditHrQMSPolicy(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetHrqmspolicyById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateHrQMSPolicy() {
  this.ielc.UpdateHrqmspolicy(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetHrQMSPolicylist();
      this.resetHrQMS();
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}

 GetHrQMSProcedurelist(){
  this.ielc.Gethrqmsprocedure().subscribe((data) => {
    this.HrqmsProceduredata=data;
    this.isLoading = false;
  });
 }
 
 AddHrQMSProcedure(): void {
  this.ielc.PostHrqmsprocedure(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetHrQMSProcedurelist();
      this.resetHrISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteHrQMSProcedure(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteHrqmsprocedureById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetHrQMSProcedurelist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditHrQMSProcedure(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetHrqmsprocedureById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateHrQMSProcedure() {
  this.ielc.UpdateHrqmsprocedure(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetHrQMSProcedurelist();
      this.resetHrQMS();
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}

 GetHrQMSFormatlist(){
  this.ielc.Gethrqmsformat().subscribe((data) => {
    this.HrqmsFormatdata=data;
    this.isLoading = false;
  });
 }
 
 AddHrQMSFormat(): void {
  this.ielc.PostHrqmsformat(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetHrQMSFormatlist();
      this.resetHrISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteHrQMSFormat(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteHrqmsformatById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetHrQMSFormatlist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditHrQMSFormat(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetHrqmsformatById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateHrQMSFormat() {
  this.ielc.UpdateHrqmsformat(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetHrQMSFormatlist();
      this.resetHrQMS();
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}
//=====================================================================================Admin/OS Support ISMS

GetOsISMSGenerallist(){
  this.ielc.Getosismsgeneral().subscribe((data) => {
    this.OsIsmsGeneraldata=data;
    this.isLoading = false;
  });
 }
 
 AddOsISMSGeneral(): void {
  this.ielc.Postosismsgeneral(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetOsISMSGenerallist();
      this.resetOsISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}

deleteOsISMSGeneral(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteosismsgeneralById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetOsISMSGenerallist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditOsISMSGeneral(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetosismsgeneralById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateOsISMSGeneral() {
  this.ielc.Updateosismsgeneral(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetOsISMSGenerallist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}
resetOsISMS(){
  this.docsdata={
    documentID: 0,
    documentName: '',
    url: '',
  }
}
GetOsISMSGuidelineslist(){
  this.ielc.Getosismsguidelines().subscribe((data) => {
    this.OsIsmsGuidelinesdata=data;
    this.isLoading = false;
  });
 }
 
 AddOsISMSGuidelines(): void {
  this.ielc.Postosismsguideline(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetOsISMSGuidelineslist();
      this.resetOsISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteOsISMSGuidelines(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteosismsguidelineById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetOsISMSGuidelineslist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditOsISMSGuidelines(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetosismsguidelineById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateOsISMSGuidelines() {
  this.ielc.Updateosismsguideline(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetOsISMSGuidelineslist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}

GetOsISMSPolicylist(){
  this.ielc.Getosismspolicy().subscribe((data) => {
    this.OsIsmsPolicydata=data;
    this.isLoading = false;
  });
 }
 
 AddOsISMSPolicy(): void {
  this.ielc.Postosismspolicy(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetOsISMSPolicylist();
      this.resetOsISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteOsISMSPolicy(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteosismspolicyById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetOsISMSPolicylist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditOsISMSPolicy(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetosismspolicyById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateOsISMSPolicy() {
  this.ielc.Updateosismspolicy(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetOsISMSPolicylist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}

GetOsISMSProcedurelist(){
  this.ielc.Getosismsprocedure().subscribe((data) => {
    this.OsIsmsProceduredata=data;
    this.isLoading = false;
  });
 }
 
 AddOsISMSProcedure(): void {
  this.ielc.Postosismsprocedure(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetOsISMSProcedurelist();
      this.resetOsISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteOsISMSProcedure(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteosismsprocedureById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetOsISMSProcedurelist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditOsISMSProcedure(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetosismsprocedureById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateOsISMSProcedure() {
  this.ielc.Updateosismsprocedure(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetOsISMSProcedurelist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}

GetOsISMSFormatlist(){
  this.ielc.Getosismsformat().subscribe((data) => {
    this.OsIsmsFormatdata=data;
    this.isLoading = false;
  });
 }
 
 AddOsISMSFormat(): void {
  this.ielc.Postosismsformat(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetOsISMSFormatlist();
      this.resetOsISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteOsISMSFormat(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteosismsformatById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetOsISMSFormatlist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditOsISMSFormat(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetosismsformatById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateOsISMSFormat() {
  this.ielc.Updateosismsformat(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetOsISMSFormatlist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}

//===============================================================================Admin/OS support QMS


GetOsQMSGenerallist(){
  this.ielc.Getosqmsgeneral().subscribe((data) => {
    this.OsqmsGeneraldata=data;
    this.isLoading = false;
  });
 }
 
 AddOsQMSGeneral(): void {
  this.ielc.Postosqmsgeneral(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetOsQMSGenerallist();
      this.resetOsQMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}

deleteOsQMSGeneral(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteosqmsgeneralById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetOsQMSGenerallist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditOsQMSGeneral(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetosqmsgeneralById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateOsQMSGeneral() {
  this.ielc.Updateosqmsgeneral(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetOsQMSGenerallist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}
resetOsQMS(){
  this.docsdata={
    documentID: 0,
    documentName: '',
    url: '',
  }
}
GetOsQMSGuidelineslist(){
  this.ielc.Getosqmsguidelines().subscribe((data) => {
    this.OsqmsGuidelinesdata=data;
    this.isLoading = false;
  });
 }
 AddOsQMSGuidelines(): void {
  this.ielc.Postosqmsguideline(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetOsQMSGuidelineslist();
      this.resetOsQMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteOsQMSGuidelines(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteosqmsguidelineById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetOsQMSGuidelineslist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditOsQMSGuidelines(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetosqmsguidelineById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateOsQMSGuidelines() {
  this.ielc.Updateosqmsguideline(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetOsQMSGuidelineslist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}

GetOsQMSPolicylist(){
  this.ielc.Getosqmspolicy().subscribe((data) => {
    this.OsqmsPolicydata=data;
    this.isLoading = false;
  });
 }
 
 AddOsQMSPolicy(): void {
  this.ielc.Postosqmspolicy(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetOsQMSPolicylist();
      this.resetOsQMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteOsQMSPolicy(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteosqmspolicyById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetOsQMSPolicylist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditOsQMSPolicy(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetosqmspolicyById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateOsQMSPolicy() {
  this.ielc.Updateosqmspolicy(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetOsQMSPolicylist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}

GetOsQMSProcedurelist(){
  this.ielc.Getosqmsprocedure().subscribe((data) => {
    this.OsqmsProceduredata=data;
    this.isLoading = false;
  });
 }
 
 AddOsQMSProcedure(): void {
  this.ielc.Postosqmsprocedure(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetOsQMSProcedurelist();
      this.resetOsQMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteOsQMSProcedure(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteosqmsprocedureById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetOsQMSProcedurelist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditOsQMSProcedure(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetosqmsprocedureById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateOsQMSProcedure() {
  this.ielc.Updateosqmsprocedure(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetOsQMSProcedurelist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}

GetOsQMSFormatlist(){
  this.ielc.Getosqmsformat().subscribe((data) => {
    this.OsqmsFormatdata=data;
    this.isLoading = false;
  });
 }

 
 AddOsQMSFormat(): void {
  this.ielc.Postosqmsformat(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetOsQMSFormatlist();
      this.resetOsQMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteOsQMSFormat(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteosqmsformatById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetOsQMSFormatlist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditOsQMSFormat(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetosqmsformatById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateOsQMSFormat() {
  this.ielc.Updateosqmsformat(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetOsQMSFormatlist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}

//-------------------------------------------------------------------------------------ISMS Support
GetIsmsSprt(){
  this.ielc.Getismsinfo().subscribe((data) => {
    this.IsmsSprtdata=data;
    this.isLoading = false;
  });
 }
 
 AddIsmsSprt(): void {
  this.ielc.PostIsmsSprt(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetIsmsSprt();
      this.resetIsmsSprt();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteIsmsSprt(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteIsmsSprtById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetIsmsSprt();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditIsmsSprt(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetIsmsSprtById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateIsmsSprt() {
  this.ielc.UpdateIsmsSprt(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetIsmsSprt();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}
resetIsmsSprt(){
  this.docsdata={
    documentID: 0,
    documentName: '',
    url: '',
  }
}

//-------------------------------------------------------------------------------------ISO Supprot
GetIsoSprt(){
  this.ielc.Getisosprt().subscribe((data) => {
    this.IsoSprtdata=data;
    this.isLoading = false;
  });
 }
 
 AddIsoSprt(): void {
  this.ielc.Postisosprt(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetIsoSprt();
      this.resetIsoSprt();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteIsoSprt(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteisosprtById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetIsoSprt();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditIsoSprt(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetisosprtById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateIsoSprt() {
  this.ielc.Updateisosprt(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetIsoSprt();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}
resetIsoSprt(){
  this.docsdata={
    documentID: 0,
    documentName: '',
    url: '',
  }
}

//-------------------------------------------------------------------------------------IS Policy
GetIsoPolicy(){
  this.ielc.Getispolicy().subscribe((data) => {
    this.IsPolicydata=data;
    this.isLoading = false;
  });
 }
 
 AddIsoPolicy(): void {
  this.ielc.Postispolicy(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetIsoPolicy();
      this.resetIsoPolicy();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteIsoPolicy(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteispolicyById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetIsoPolicy();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditIsoPolicy(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetispolicyById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateIsoPolicy() {
  this.ielc.Updateispolicy(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetIsoPolicy();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}
resetIsoPolicy(){
  this.docsdata={
    documentID: 0,
    documentName: '',
    url: '',
  }
}
//================================================================================IT Support ISMS

GetItISMSGenerallist(){
  this.ielc.Getitismsgeneral().subscribe((data) => {
    this.ItIsmsGeneraldata=data;
    this.isLoading = false;
  });
 }
 
 AddItISMSGeneral(): void {
  this.ielc.Postitismsgeneral(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetItISMSGenerallist();
      this.resetItISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}

deleteItISMSGeneral(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteitismsgeneralById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetItISMSGenerallist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditItISMSGeneral(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetitismsgeneralById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateItISMSGeneral() {
  this.ielc.Updateitismsgeneral(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetItISMSGenerallist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}
resetItISMS(){
  this.docsdata={
    documentID: 0,
    documentName: '',
    url: '',
  }
}
GetItISMSGuidelineslist(){
  this.ielc.Getitismsguidelines().subscribe((data) => {
    this.ItIsmsGuidelinesdata=data;
    this.isLoading = false;
  });
 }
 
 AddItISMSGuidelines(): void {
  this.ielc.Postitismsguideline(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetItISMSGuidelineslist();
      this.resetItISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteItISMSGuidelines(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteitismsguidelineById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetItISMSGuidelineslist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditItISMSGuidelines(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetitismsguidelineById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateItISMSGuidelines() {
  this.ielc.Updateitismsguideline(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetItISMSGuidelineslist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}

GetItISMSPolicylist(){
  this.ielc.Getitismspolicy().subscribe((data) => {
    this.ItIsmsPolicydata=data;
    this.isLoading = false;
  });
 }
 
 AddItISMSPolicy(): void {
  this.ielc.Postitismspolicy(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetItISMSPolicylist();
      this.resetItISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteItISMSPolicy(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteitismspolicyById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetItISMSPolicylist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditItISMSPolicy(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetitismspolicyById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateItISMSPolicy() {
  this.ielc.Updateitismspolicy(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetItISMSPolicylist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}

GetItISMSProcedurelist(){
  this.ielc.Getitismsprocedure().subscribe((data) => {
    this.ItIsmsProceduredata=data;
    this.isLoading = false;
  });
 }
 
 AddItISMSProcedure(): void {
  this.ielc.Postitismsprocedure(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetItISMSProcedurelist();
      this.resetItISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteItISMSProcedure(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteitismsprocedureById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetItISMSProcedurelist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditItISMSProcedure(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetitismsprocedureById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateItISMSProcedure() {
  this.ielc.Updateitismsprocedure(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetItISMSProcedurelist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}

GetItISMSFormatlist(){
  this.ielc.Getitismsformat().subscribe((data) => {
    this.ItIsmsFormatdata=data;
    this.isLoading = false;
  });
 }
 
 AddItISMSFormat(): void {
  this.ielc.Postitismsformat(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetItISMSFormatlist();
      this.resetItISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteItISMSFormat(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteitismsformatById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetItISMSFormatlist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditItISMSFormat(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetitismsformatById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateItISMSFormat() {
  this.ielc.Updateitismsformat(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetItISMSFormatlist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}


 //================================================================================IT Support QMS
 GetItQMSGenerallist(){
  this.ielc.Getitqmsgeneral().subscribe((data) => {
    this.ItqmsGeneraldata=data;
    this.isLoading = false;
  });
 }
 
 AddItQMSGeneral(): void {
  this.ielc.Postitqmsgeneral(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetItQMSGenerallist();
      this.resetItQMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}

deleteItQMSGeneral(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteitqmsgeneralById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetItQMSGenerallist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditItQMSGeneral(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetitqmsgeneralById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateItQMSGeneral() {
  this.ielc.Updateitqmsgeneral(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetItQMSGenerallist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}
resetItQMS(){
  this.docsdata={
    documentID: 0,
    documentName: '',
    url: '',
  }
}
GetItQMSGuidelineslist(){
  this.ielc.Getitqmsguidelines().subscribe((data) => {
    this.ItqmsGuidelinesdata=data;
    this.isLoading = false;
  });
 }
 AddItQMSGuidelines(): void {
  this.ielc.Postitqmsguideline(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetItQMSGuidelineslist();
      this.resetItQMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteItQMSGuidelines(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteitqmsguidelineById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetItQMSGuidelineslist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditItQMSGuidelines(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetitqmsguidelineById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateItQMSGuidelines() {
  this.ielc.Updateitqmsguideline(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetItQMSGuidelineslist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}

GetItQMSPolicylist(){
  this.ielc.Getitqmspolicy().subscribe((data) => {
    this.ItqmsPolicydata=data;
    this.isLoading = false;
  });
 }
 
 AddItQMSPolicy(): void {
  this.ielc.Postitqmspolicy(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetItQMSPolicylist();
      this.resetItQMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteItQMSPolicy(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteitqmspolicyById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetItQMSPolicylist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditItQMSPolicy(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetitqmspolicyById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateItQMSPolicy() {
  this.ielc.Updateitqmspolicy(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetItQMSPolicylist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}

GetItQMSProcedurelist(){
  this.ielc.Getitqmsprocedure().subscribe((data) => {
    this.ItqmsProceduredata=data;
    this.isLoading = false;
  });
 }
 
 AddItQMSProcedure(): void {
  this.ielc.Postitqmsprocedure(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetItQMSProcedurelist();
      this.resetItQMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteItQMSProcedure(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteitqmsprocedureById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetItQMSProcedurelist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditItQMSProcedure(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetitqmsprocedureById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateItQMSProcedure() {
  this.ielc.Updateitqmsprocedure(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetItQMSProcedurelist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}

GetItQMSFormatlist(){
  this.ielc.Getitqmsformat().subscribe((data) => {
    this.ItqmsFormatdata=data;
    this.isLoading = false;
  });
 }
 
 AddItQMSFormat(): void {
  this.ielc.Postitqmsformat(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetItQMSFormatlist();
      this.resetItQMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteItQMSFormat(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteitqmsformatById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetItQMSFormatlist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditItQMSFormat(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetitqmsformatById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateItQMSFormat() {
  this.ielc.Updateitqmsformat(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetItQMSFormatlist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}
//=======================================================================================Project Support ISMS

GetPrjtISMSGenerallist(){
  this.ielc.Getprjtismsgeneral().subscribe((data) => {
    this.prjtIsmsGeneraldata=data;
    this.isLoading = false;
  });
 }
 
 AddPrjtISMSGeneral(): void {
  this.ielc.Postprjtismsgeneral(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetPrjtISMSGenerallist();
      this.resetPrjtISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}

deletePrjtISMSGeneral(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteprjtismsgeneralById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetPrjtISMSGenerallist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditPrjtISMSGeneral(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetprjtismsgeneralById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdatePrjtISMSGeneral() {
  this.ielc.Updateprjtismsgeneral(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetPrjtISMSGenerallist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}
resetPrjtISMS(){
  this.docsdata={
    documentID: 0,
    documentName: '',
    url: '',
  }
}
GetPrjtISMSGuidelineslist(){
  this.ielc.Getprjtismsguidelines().subscribe((data) => {
    this.prjtIsmsGuidelinesdata=data;
    this.isLoading = false;
  });
 }
 
 AddPrjtISMSGuidelines(): void {
  this.ielc.Postprjtismsguideline(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetPrjtISMSGuidelineslist();
      this.resetPrjtISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deletePrjtISMSGuidelines(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteprjtismsguidelineById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetPrjtISMSGuidelineslist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditPrjtISMSGuidelines(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetprjtismsguidelineById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdatePrjtISMSGuidelines() {
  this.ielc.Updateprjtismsguideline(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetPrjtISMSGuidelineslist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}

GetPrjtISMSPolicylist(){
  this.ielc.Getprjtismspolicy().subscribe((data) => {
    this.prjtIsmsPolicydata=data;
    this.isLoading = false;
  });
 }
 
 AddPrjtISMSPolicy(): void {
  this.ielc.Postprjtismspolicy(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetPrjtISMSPolicylist();
      this.resetPrjtISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deletePrjtISMSPolicy(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteprjtismspolicyById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetPrjtISMSPolicylist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditPrjtISMSPolicy(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetprjtismspolicyById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdatePrjtISMSPolicy() {
  this.ielc.Updateprjtismspolicy(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetPrjtISMSPolicylist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}

GetPrjtISMSProcedurelist(){
  this.ielc.Getprjtismsprocedure().subscribe((data) => {
    this.prjtIsmsProceduredata=data;
    this.isLoading = false;
  });
 }
 
 AddPrjtISMSProcedure(): void {
  this.ielc.Postprjtismsprocedure(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetPrjtISMSProcedurelist();
      this.resetPrjtISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deletePrjtISMSProcedure(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteprjtismsprocedureById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetPrjtISMSProcedurelist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditPrjtISMSProcedure(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetprjtismsprocedureById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdatePrjtISMSProcedure() {
  this.ielc.Updateprjtismsprocedure(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetPrjtISMSProcedurelist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}

GetPrjtISMSFormatlist(){
  this.ielc.Getprjtismsformat().subscribe((data) => {
    this.prjtIsmsFormatdata=data;
    this.isLoading = false;
  });
 }
 
 AddPrjtISMSFormat(): void {
  this.ielc.Postprjtismsformat(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetPrjtISMSFormatlist();
      this.resetPrjtISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deletePrjtISMSFormat(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteprjtismsformatById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetPrjtISMSFormatlist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditPrjtISMSFormat(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetprjtismsformatById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdatePrjtISMSFormat() {
  this.ielc.Updateprjtismsformat(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetPrjtISMSFormatlist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}

 //=======================================================================================Project Support QMS
 GetPrjtQMSGenerallist(){
  this.ielc.Getprjtqmsgeneral().subscribe((data) => {
    this.prjtqmsGeneraldata=data;
    this.isLoading = false;
  });
 }
 AddPrjtQMSGeneral(): void {
  this.ielc.Postprjtqmsgeneral(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetPrjtQMSGenerallist();
      this.resetPrjtQMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}

deletePrjtQMSGeneral(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteprjtqmsgeneralById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetPrjtQMSGenerallist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditPrjtQMSGeneral(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetprjtqmsgeneralById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdatePrjtQMSGeneral() {
  this.ielc.Updateprjtqmsgeneral(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetPrjtQMSGenerallist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}
resetPrjtQMS(){
  this.docsdata={
    documentID: 0,
    documentName: '',
    url: '',
  }
}
GetPrjtQMSGuidelineslist(){
  this.ielc.Getprjtqmsguidelines().subscribe((data) => {
    this.prjtqmsGuidelinesdata=data;
    this.isLoading = false;
  });
 }
 
 AddPrjtQMSGuidelines(): void {
  this.ielc.Postprjtqmsguideline(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetPrjtQMSGuidelineslist();
      this.resetPrjtQMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deletePrjtQMSGuidelines(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteprjtqmsguidelineById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetPrjtQMSGuidelineslist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditPrjtQMSGuidelines(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetprjtqmsguidelineById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdatePrjtQMSGuidelines() {
  this.ielc.Updateprjtqmsguideline(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetPrjtQMSGuidelineslist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}

GetPrjtQMSPolicylist(){
  this.ielc.Getprjtqmspolicy().subscribe((data) => {
    this.prjtqmsPolicydata=data;
    this.isLoading = false;
  });
 }
 
 AddPrjtQMSPolicy(): void {
  this.ielc.Postprjtqmspolicy(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetPrjtQMSPolicylist();
      this.resetPrjtQMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deletePrjtQMSPolicy(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteprjtqmspolicyById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetPrjtQMSPolicylist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditPrjtQMSPolicy(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetprjtqmspolicyById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdatePrjtQMSPolicy() {
  this.ielc.Updateprjtqmspolicy(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetPrjtQMSPolicylist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}

GetPrjtQMSProcedurelist(){
  this.ielc.Getprjtqmsprocedure().subscribe((data) => {
    this.prjtqmsProceduredata=data;
    this.isLoading = false;
  });
 }
 
 AddPrjtQMSProcedure(): void {
  this.ielc.Postprjtqmsprocedure(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetPrjtQMSProcedurelist();
      this.resetPrjtQMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deletePrjtQMSProcedure(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteprjtqmsprocedureById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetPrjtQMSProcedurelist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditPrjtQMSProcedure(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetprjtqmsprocedureById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdatePrjtQMSProcedure() {
  this.ielc.Updateprjtqmsprocedure(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetPrjtQMSProcedurelist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}

GetPrjtQMSFormatlist(){
  this.ielc.Getprjtqmsformat().subscribe((data) => {
    this.prjtqmsFormatdata=data;
    this.isLoading = false;
  });
 }
 
 AddPrjtQMSFormat(): void {
  this.ielc.Postprjtqmsformat(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetPrjtQMSFormatlist();
      this.resetPrjtQMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deletePrjtQMSFormat(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteprjtqmsformatById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetPrjtQMSFormatlist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditPrjtQMSFormat(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetprjtqmsformatById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdatePrjtQMSFormat() {
  this.ielc.Updateprjtqmsformat(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetPrjtQMSFormatlist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}
//===============================================================================CISO ISMS

GetCisoISMSGenerallist(){
  this.ielc.Getcisoismsgeneral().subscribe((data) => {
    this.cisoIsmsGendata=data;
    this.isLoading = false;
  });
 }
 
 AddCisoISMSGeneral(): void {
  this.ielc.Postcisoismsgeneral(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetCisoISMSGenerallist();
      this.resetCisoISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}

deleteCisoISMSGeneral(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeletecisoismsgeneralById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetCisoISMSGenerallist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditCisoISMSGeneral(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetcisoismsgeneralById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateCisoISMSGeneral() {
  this.ielc.Updatecisoismsgeneral(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetCisoISMSGenerallist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}
resetCisoISMS(){
  this.docsdata={
    documentID: 0,
    documentName: '',
    url: '',
  }
}
GetCisoISMSGuidelineslist(){
  this.ielc.Getcisoismsguidelines().subscribe((data) => {
    this.cisoIsmsGuidelinesdata=data;
    this.isLoading = false;
  });
 }
 
 AddCisoISMSGuidelines(): void {
  this.ielc.Postcisoismsguideline(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetCisoISMSGuidelineslist();
      this.resetCisoISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteCisoISMSGuidelines(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeletecisoismsguidelineById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetCisoISMSGuidelineslist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditCisoISMSGuidelines(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetcisoismsguidelineById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateCisoISMSGuidelines() {
  this.ielc.Updatecisoismsguideline(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetCisoISMSGuidelineslist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}

GetCisoISMSPolicylist(){
  this.ielc.Getcisoismspolicy().subscribe((data) => {
    this.cisoIsmsPolicydata=data;
    this.isLoading = false;
  });
 }
 
 AddCisoISMSPolicy(): void {
  this.ielc.Postcisoismspolicy(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetCisoISMSPolicylist();
      this.resetCisoISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteCisoISMSPolicy(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeletecisoismspolicyById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetCisoISMSPolicylist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditCisoISMSPolicy(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetcisoismspolicyById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateCisoISMSPolicy() {
  this.ielc.Updatecisoismspolicy(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetCisoISMSPolicylist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}

GetCisoISMSProcedurelist(){
  this.ielc.Getcisoismsprocedure().subscribe((data) => {
    this.cisoIsmsProceduredata=data;
    this.isLoading = false;
  });
 }
 
 AddCisoISMSProcedure(): void {
  this.ielc.Postcisoismsprocedure(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetCisoISMSProcedurelist();
      this.resetCisoISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteCisoISMSProcedure(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeletecisoismsprocedureById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetCisoISMSProcedurelist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditCisoISMSProcedure(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetcisoismsprocedureById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateCisoISMSProcedure() {
  this.ielc.Updatecisoismsprocedure(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetCisoISMSProcedurelist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}

GetCisoISMSFormatlist(){
  this.ielc.Getcisoismsformat().subscribe((data) => {
    this.cisoIsmsFormatdata=data;
    this.isLoading = false;
  });
 } 
 
 AddCisoISMSFormat(): void {
  this.ielc.Postcisoismsformat(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetCisoISMSFormatlist();
      this.resetCisoISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteCisoISMSFormat(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeletecisoismsformatById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetCisoISMSFormatlist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditCisoISMSFormat(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetcisoismsformatById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateCisoISMSFormat() {
  this.ielc.Updatecisoismsformat(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetCisoISMSFormatlist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}

//===================================================================================CISO QMS
GetCisoQMSGenerallist(){
  this.ielc.Getcisoqmsgeneral().subscribe((data) => {
    this.cisoqmsGeneraldata=data;
    this.isLoading = false;
  });
 }
 
 AddCisoQMSGeneral(): void {
  this.ielc.Postcisoqmsgeneral(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetCisoQMSGenerallist();
      this.resetCisoQMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}

deleteCisoQMSGeneral(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeletecisoqmsgeneralById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetCisoQMSGenerallist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditCisoQMSGeneral(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetcisoqmsgeneralById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateCisoQMSGeneral() {
  this.ielc.Updatecisoqmsgeneral(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetCisoQMSGenerallist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}
resetCisoQMS(){
  this.docsdata={
    documentID: 0,
    documentName: '',
    url: '',
  }
}
GetCisoQMSGuidelineslist(){
  this.ielc.Getcisoqmsguidelines().subscribe((data) => {
    this.cisoqmsGuidelinesdata=data;
    this.isLoading = false;
  });
 }
 
 AddCisoQMSGuidelines(): void {
  this.ielc.Postcisoqmsguideline(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetCisoQMSGuidelineslist();
      this.resetCisoQMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteCisoQMSGuidelines(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeletecisoqmsguidelineById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetCisoQMSGuidelineslist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditCisoQMSGuidelines(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetcisoqmsguidelineById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateCisoQMSGuidelines() {
  this.ielc.Updatecisoqmsguideline(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetCisoQMSGuidelineslist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}

GetCisoQMSPolicylist(){
  this.ielc.Getcisoqmspolicy().subscribe((data) => {
    this.cisoqmsPolicydata=data;
    this.isLoading = false;
  });
 }
 
 AddCisoQMSPolicy(): void {
  this.ielc.Postcisoqmspolicy(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetCisoQMSPolicylist();
      this.resetCisoQMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteCisoQMSPolicy(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeletecisoqmspolicyById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetCisoQMSPolicylist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditCisoQMSPolicy(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetcisoqmspolicyById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateCisoQMSPolicy() {
  this.ielc.Updatecisoqmspolicy(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetCisoQMSPolicylist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}

GetCisoQMSProcedurelist(){
  this.ielc.Getcisoqmsprocedure().subscribe((data) => {
    this.cisoqmsProceduredata=data;
    this.isLoading = false;
  });
 }
 
 AddCisoQMSProcedure(): void {
  this.ielc.Postcisoqmsprocedure(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetCisoQMSProcedurelist();
      this.resetCisoQMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteCisoQMSProcedure(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeletecisoqmsprocedureById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetCisoQMSProcedurelist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditCisoQMSProcedure(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetcisoqmsprocedureById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateCisoQMSProcedure() {
  this.ielc.Updatecisoqmsprocedure(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetCisoQMSProcedurelist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}

GetCisoQMSFormatlist(){
  this.ielc.Getcisoqmsformat().subscribe((data) => {
    this.cisoqmsFormatdata=data;
    this.isLoading = false;
  });
 } 
 
 AddCisoQMSFormat(): void {
  this.ielc.Postcisoqmsformat(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetCisoQMSFormatlist();
      this.resetCisoQMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteCisoQMSFormat(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeletecisoqmsformatById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetCisoQMSFormatlist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditCisoQMSFormat(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetcisoqmsformatById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateCisoQMSFormat() {
  this.ielc.Updatecisoqmsformat(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetCisoQMSFormatlist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}
//=====================================================================================Emergency 
GetEmerGenerallist(){
  this.ielc.Getemergeneral().subscribe((data) => {
    this.EmerGeneraldata=data;
    this.isLoading = false;
  });
 }
 
 AddEmerGeneral(): void {
  this.ielc.Postemergeneral(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetEmerGenerallist();
      this.resetCisoQMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}

deleteEmerGeneral(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteemergeneralById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetEmerGenerallist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditEmerGeneral(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetemergeneralById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateEmerGeneral() {
  this.ielc.Updateemergeneral(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetEmerGenerallist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}
resetEmer(){
  this.docsdata={
    documentID: 0,
    documentName: '',
    url: '',
  }
}

//=====================================================================================Var Committees
GetVarCmtGenerallist(){
  this.ielc.Getvarcmt().subscribe((data) => {
    this.VarcmtGeneraldata=data;
    this.isLoading = false;
  });
 }
 
 AddVarCmtGeneral(): void {
  this.ielc.Postvarcmt(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetVarCmtGenerallist();
      this.resetVarCmt();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}

deleteVarCmtGeneral(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeletevarcmtById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetVarCmtGenerallist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditVarCmtGeneral(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetvarcmtById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateVarCmtGeneral() {
  this.ielc.Updatevarcmt(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetVarCmtGenerallist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}
resetVarCmt(){
  this.docsdata={
    documentID: 0,
    documentName: '',
    url: '',
  }
}
//=====================================================================================HIPAA 
GetHipaaGenerallist(){
  this.ielc.Gethippa().subscribe((data) => {
    this.HipaaGeneraldata=data;
    this.isLoading = false;
  });
 }
 
 AddHipaaGeneral(): void {
  this.ielc.Posthippa(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetHipaaGenerallist();
      this.resetHipaa();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}

deleteHipaaGeneral(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeletehippaById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetHipaaGenerallist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditHipaaGeneral(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GethippaById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateHipaaGeneral() {
  this.ielc.Updatehippa(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetHipaaGenerallist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}
resetHipaa(){
  this.docsdata={
    documentID: 0,
    documentName: '',
    url: '',
  }
}
//=====================================================================================SOC 
GetSocGenerallist(){
  this.ielc.Getsoc().subscribe((data) => {
    this.SocGeneraldata=data;
    this.isLoading = false;
  });
 }
 
 AddSocGeneral(): void {
  this.ielc.Postsoc(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetSocGenerallist();
      this.resetSoc();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}

deleteSocGeneral(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeletesocById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetSocGenerallist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditSocGeneral(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetsocById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateSocGeneral() {
  this.ielc.Updatesoc(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetSocGenerallist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}
resetSoc(){
  this.docsdata={
    documentID: 0,
    documentName: '',
    url: '',
  }
}
//=====================================================================================GDPR 
GetGdprGenerallist(){
  this.ielc.Getgdpr().subscribe((data) => {
    this.GdprGeneraldata=data;
    this.isLoading = false;
  });
 }
 
 AddGdprGeneral(): void {
  this.ielc.Postgdpr(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetGdprGenerallist();
      this.resetGdpr();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}

deleteGdprGeneral(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeletegdprById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetGdprGenerallist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditGdprGeneral(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetgdprById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateGdprGeneral() {
  this.ielc.Updategdpr(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetGdprGenerallist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}
resetGdpr(){
  this.docsdata={
    documentID: 0,
    documentName: '',
    url: '',
  }
}
//=====================================================================================DPDP 
GetDpdpGenerallist(){
  this.ielc.Getdpdp().subscribe((data) => {
    this.DpdpGeneraldata=data;
    this.isLoading = false;
  });
 }
 
 AddDpdpGeneral(): void {
  this.ielc.Postdpdp(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetDpdpGenerallist();
      this.resetDpdp();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}

deleteDpdpGeneral(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeletedpdpById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetDpdpGenerallist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditDpdpGeneral(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetdpdpById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateDpdpGeneral() {
  this.ielc.Updatedpdp(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetDpdpGenerallist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}
resetDpdp(){
  this.docsdata={
    documentID: 0,
    documentName: '',
    url: '',
  }
}
//========================================================================================Admin users
GetAdminuserslist(){
  this.ielc.Getadminusers().subscribe((data) => {
    this.adminuserslist=data;
    this.isLoading = false;
  });
}  
AddAdminusers(): void {
  this.ielc.Postadminusers(this.adminusersdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetAdminuserslist();
      this.resetAdminusers();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteAdminusers(email: any) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteadminusersById(email).subscribe({
      next: () => {
        alert(`Record with ${email} deleted successfully!`);
        this.GetAdminuserslist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}
resetAdminusers(){
  this.adminusersdata={
    roleName: '',
    pageName: '',
    email: '',
  }
}
//---------------------------------------------------------------------------------------Holidays
 
GetHolidaysist(){
  this.ielc.Getholidays().subscribe((data) => {
    this.holidayslist=data;
    this.holidayslist = this.sortdate(data)
    this.isLoading = false;
  });
}  
sortdate(data: any[]): any[] {
  return data.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
}
AddHolidays(): void {
  this.ielc.Postholidays(this.holidaysdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetHolidaysist();
      this.resetHolidays();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteHolidays(content: any) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteholidaysById(content).subscribe({
      next: () => {
        alert(`Record with  ${content} deleted successfully!`);
        this.GetHolidaysist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}
resetHolidays(){
  this.holidaysdata={
    date: '',
  content: ''
  }
}

//=====================================================================================Events 
GetEventsist(){
  this.ielc.Getevents().subscribe((data) => {
    this.eventslist=data;
    this.eventslist = this.sortlist(data)
    this.isLoading = false;
  });
 }
 
//  AddEvents(): void {
//   this.ielc.Postevents(this.eventsdata).subscribe(
//     (response) => {
//       alert('✅ Record Added Successfully!');
//       this.GetEventsist();
//       this.resetEvents();
//     },
//     (error) => {
//       alert('❌ Error adding Record. Please try again.');
//     }
//   );
// }
AddEvents(item: any) {
  const eventPayload = {
    id: item.id,             // Event ID
    eventData: item.eventData, // Base64 Image Data
    eventName: item.eventName  // Event Name
  };

  this.ielc.Postevents(eventPayload).subscribe(
    response => {
      alert('✅ Event Added Successfully!');
      console.log('Response:', response);
    },
    error => {
      alert('❌ Error adding event. Please try again.');
      console.error('Error:', error);
    }
  );
}


deleteEvents(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteeventsById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetEventsist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditEvents(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GeteventsById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.eventsdata = { 
        id: data.id || 0,
        eventData: data.eventData || '',
        eventName:  data.eventName || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateEvents() {
  this.ielc.Updateevents(this.eventsdata.id, this.eventsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetEventsist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}
resetEvents(){
  this.eventsdata={
    id: 0,
  eventData: '',
  eventName: ''
  }
}

//=====================================================================================Courses Restriction 
GetCourseist(){
  this.ielc.Getcourse().subscribe((data) => {
    this.crserestlist=data;
    this.isLoading = false;
  });
 }
 
 AddCourse(): void {
  this.ielc.Postcourse(this.crserestdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetCourseist();
      this.resetCourse();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}


deleteCourse(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeletecourseById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetCourseist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditCourse(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetcourseById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.crserestdata = { 
        id: data.id || 0,
        coursesList: data.coursesList || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateCourse() {
  this.ielc.Updatecourse(this.crserestdata.id, this.crserestdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetCourseist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}
resetCourse(){
  this.crserestdata={
    id: 0,
    coursesList: ''
  }
}

//=====================================================================================Event Alerts
GetEventAlertsist(){
  this.ielc.Geteventalerts().subscribe((data) => {
    this.eventalertslist=data;
    this.isLoading = false;
  });
 }
 
 AddEventAlerts(): void {
  this.ielc.Posteventalerts(this.eventalertsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetEventAlertsist();
      this.resetEventAlerts();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}


deleteEventAlerts(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteeventalertsById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetEventAlertsist();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

EditEventAlerts(id: number) {
  console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GeteventalertsById(id).subscribe(data => {

    console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.eventalertsdata = { 
        alertID: data.alertID || 0,
        alertName: data.alertName || '',
        alertDate: data.alertDate || '',
        toMails: data.toMails || '',
        ccMails: data.ccMails || '',
        mailAlertDay: data.mailAlertDay || 0,
        mailType: data.mailType || '',
        frequency: data.frequency || '',
        alertAttachment: data.alertAttachment || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  }, error => {
    console.error("Error fetching record:", error);
  });
}


UpdateEventAlerts() {
  this.ielc.Updateeventalerts(this.eventalertsdata.alertID, this.eventalertsdata).subscribe(
    (response) => {
      console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetEventAlertsist();
     
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}
resetEventAlerts(){
  this.eventalertsdata={
    alertID: 0,
    alertName: '',
    alertDate: '',
    toMails: '',
    ccMails: '',
    mailAlertDay: 0,
    mailType: '',
    frequency: '',
    alertAttachment: ''
   }
}
getFileIcon(alertAttachment: string): string {
  if (!alertAttachment) {
    return 'assets/icons/default-file-icon.jpg'; // Default icon
  }

  const extension = alertAttachment.split('.').pop()?.toLowerCase(); // Get file extension

  switch (extension) {
    case 'pdf':
      return 'assets/icons/pdf-icon.jpg';
    case 'doc':
    case 'docx':
      return 'assets/icons/word-icon.jpg';
    case 'xls':
    case 'xlsx':
      return 'assets/icons/excel-icon.jpg';
    case 'txt':
      return 'assets/icons/text-icon.jpg';
    case 'jpg':
    case 'jpeg':
    case 'png':
      return 'assets/icons/image-icon.jpg';
    case 'zip':
    case 'rar':
      return 'assets/icons/zip-icon.jpg';
    default:
      return 'assets/icons/default-file-icon.jpg';
  }
}

getDownloadLink(alertAttachment: string): string {
  return alertAttachment.startsWith('data:') 
    ? alertAttachment  // Base64 data
    : `https://ielc-coreapi.azurewebsites.net/EventAlerts/${alertAttachment}`; // File URL
}


}
