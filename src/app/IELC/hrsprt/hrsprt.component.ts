import { Component,OnInit } from '@angular/core';
import { IelcapiService } from '../ielcapi.service';


interface hrsprtinfo{
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
  selector: 'app-hrsprt',
  templateUrl: './hrsprt.component.html',
  styleUrls: ['./hrsprt.component.css']
})
export class HrsprtComponent implements OnInit {
email='shilpa.chilumula@inteqsolutions.com'
isLoading = true;
 hrsprtlist: any[] = []; 
 hrsprtdata:hrsprtinfo={
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
 
 
 constructor(private ielc:IelcapiService) {

 }
 ngOnInit(): void {
   this.GetHrSprtlist();
   this.GetHrISMSGenerallist();
   this.GetHrISMSGuidelineslist();
   this.GetHrISMSPolicylist();
   this.GetHrISMSProcedurelist();
   this.GetHrISMSFormatlist();
   this.GetHrQMSGenerallist();
   this.GetHrQMSGuidelineslist();
   this. GetHrQMSPolicylist();
   this.GetHrQMSProcedurelist();
   this.GetHrQMSFormatlist();
 }
 
  GetHrSprtlist(){
   this.ielc.GetHrSprt().subscribe((data) => {
     this.hrsprtlist=data;
     this.isLoading = false;
   });
  }

  GetHrISMSGenerallist(){
    this.ielc.Gethrismsgeneral().subscribe((data) => {
      this.HrIsmsGeneraldata=data;
      this.isLoading = false;
    });
   }
   GetHrISMSGuidelineslist(){
    this.ielc.Gethrismsguidelines().subscribe((data) => {
      this.HrIsmsGuidelinesdata=data;
      this.isLoading = false;
    });
   }
   GetHrISMSPolicylist(){
    this.ielc.Gethrismspolicy().subscribe((data) => {
      this.HrIsmsPolicydata=data;
      this.isLoading = false;
    });
   }
   GetHrISMSProcedurelist(){
    this.ielc.Gethrismsprocedure().subscribe((data) => {
      this.HrIsmsProceduredata=data;
      this.isLoading = false;
    });
   }
   GetHrISMSFormatlist(){
    this.ielc.Gethrismsformat().subscribe((data) => {
      this.HrIsmsFormatdata=data;
      this.isLoading = false;
    });
   }
   
  GetHrQMSGenerallist(){
    this.ielc.Gethrqmsgeneral().subscribe((data) => {
      this.HrqmsGeneraldata=data;
      this.isLoading = false;
    });
   }
   GetHrQMSGuidelineslist(){
    this.ielc.Gethrqmsguidelines().subscribe((data) => {
      this.HrqmsGuidelinesdata=data;
      this.isLoading = false;
    });
   }
   GetHrQMSPolicylist(){
    this.ielc.Gethrqmspolicy().subscribe((data) => {
      this.HrqmsPolicydata=data;
      this.isLoading = false;
    });
   }
   GetHrQMSProcedurelist(){
    this.ielc.Gethrqmsprocedure().subscribe((data) => {
      this.HrqmsProceduredata=data;
      this.isLoading = false;
    });
   }
   GetHrQMSFormatlist(){
    this.ielc.Gethrqmsformat().subscribe((data) => {
      this.HrqmsFormatdata=data;
      this.isLoading = false;
    });
   }
}
