import { Component } from '@angular/core';
import { IelcapiService } from '../ielcapi.service';

interface ossprtinfo{
  id: string;
  contactPriority: string;
  name: string;
  mobile: string;
  email: string;
}
interface docs{
  documentID: string;
  documentName: string;
  url: string;
}

@Component({
  selector: 'app-adminsprt',
  templateUrl: './adminsprt.component.html',
  styleUrls: ['./adminsprt.component.css']
})
export class AdminsprtComponent {
 email='pcrao@inteqsolutions.com'
 isLoading = true;
 ossprtlist: any[] = []; 
 ossprtdata:ossprtinfo={
  id: '',
  contactPriority: '',
  name: '',
  mobile: '',
  email: '',
 }
 docsdata:docs={
  documentID:'',
  documentName: '',
  url: '',
 }
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
 
 
 constructor(private ielc:IelcapiService) {

 }
 ngOnInit(): void {
   this.GetOsSprtlist();
   this.GetOsISMSGenerallist();
   this.GetOsISMSGuidelineslist();
   this. GetOsISMSPolicylist();
   this.GetOsISMSProcedurelist();
   this.GetOsISMSFormatlist();
   this.GetOsQMSGenerallist();
   this.GetOsQMSGuidelineslist();
   this. GetOsQMSPolicylist();
   this.GetOsQMSProcedurelist();
   this.GetOsQMSFormatlist();
 }
 
  GetOsSprtlist(){
   this.ielc.GetosSprt().subscribe((data) => {
     this.ossprtlist=data;
     this.isLoading = false;
   });
  }

  GetOsISMSGenerallist(){
    this.ielc.Getosismsgeneral().subscribe((data) => {
      this.OsIsmsGeneraldata=data;
      this.isLoading = false;
    });
   }
   GetOsISMSGuidelineslist(){
    this.ielc.Getosismsguidelines().subscribe((data) => {
      this.OsIsmsGuidelinesdata=data;
      this.isLoading = false;
    });
   }
   GetOsISMSPolicylist(){
    this.ielc.Getosismspolicy().subscribe((data) => {
      this.OsIsmsPolicydata=data;
      this.isLoading = false;
    });
   }
   GetOsISMSProcedurelist(){
    this.ielc.Getosismsprocedure().subscribe((data) => {
      this.OsIsmsProceduredata=data;
      this.isLoading = false;
    });
   }
   GetOsISMSFormatlist(){
    this.ielc.Getosismsformat().subscribe((data) => {
      this.OsIsmsFormatdata=data;
      this.isLoading = false;
    });
   }
   
  GetOsQMSGenerallist(){
    this.ielc.Getosqmsgeneral().subscribe((data) => {
      this.OsqmsGeneraldata=data;
      this.isLoading = false;
    });
   }
   GetOsQMSGuidelineslist(){
    this.ielc.Getosqmsguidelines().subscribe((data) => {
      this.OsqmsGuidelinesdata=data;
      this.isLoading = false;
    });
   }
   GetOsQMSPolicylist(){
    this.ielc.Getosqmspolicy().subscribe((data) => {
      this.OsqmsPolicydata=data;
      this.isLoading = false;
    });
   }
   GetOsQMSProcedurelist(){
    this.ielc.Getosqmsprocedure().subscribe((data) => {
      this.OsqmsProceduredata=data;
      this.isLoading = false;
    });
   }
   GetOsQMSFormatlist(){
    this.ielc.Getosqmsformat().subscribe((data) => {
      this.OsqmsFormatdata=data;
      this.isLoading = false;
    });
   }
}
