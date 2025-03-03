import { Component } from '@angular/core';
import { IelcapiService } from '../ielcapi.service';


interface isosprtinfo{
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
  selector: 'app-iso27001',
  templateUrl: './iso27001.component.html',
  styleUrls: ['./iso27001.component.css']
})
export class Iso27001Component {
email='incidents@inteqsolutions.com'

isLoading = true;
 isosprtlist: any[] = []; 
 isosprtdata:isosprtinfo={
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
 isoinfolist: any[] = []; 
 isopolicylist: any[] = []; 
 prjtIsmsGuidelinesdata: any[] = []; 
 prjtIsmsPolicydata: any[] = []; 
 prjtIsmsProceduredata: any[] = []; 
 prjtIsmsFormatdata: any[] = []; 
 cisoIsmsGuidelinesdata: any[] = []; 
 cisoIsmsPolicydata: any[] = []; 
 cisoIsmsProceduredata: any[] = []; 
 cisoIsmsFormatdata: any[] = []; 
 IsmsGuidelinesdata: any[] = []; 
 IsmsPolicydata: any[] = []; 
 IsmsProceduredata: any[] = []; 
 IsmsFormatdata: any[] = []; 
 OsIsmsGuidelinesdata: any[] = []; 
 OsIsmsPolicydata: any[] = []; 
 OsIsmsProceduredata: any[] = []; 
 OsIsmsFormatdata: any[] = []; 
 HrIsmsGuidelinesdata: any[] = []; 
 HrIsmsPolicydata: any[] = []; 
 HrIsmsProceduredata: any[] = []; 
 HrIsmsFormatdata: any[] = []; 
 
 constructor(private ielc:IelcapiService) {

 }
 ngOnInit(): void {
   this.GetIsoSprtlist();
   this.GetIsoInfolist();
   this.GetIsoPolicylist();
   this.GetPrjtISMSGuidelineslist();
   this.GetPrjtISMSProcedurelist();
   this.GetPrjtISMSPolicylist();
   this.GetPrjtISMSFormatlist();
   this.GetCisoISMSGuidelineslist();
   this.GetCisoISMSProcedurelist();
   this.GetCisoISMSPolicylist();
   this.GetCisoISMSFormatlist();
   this.GetISMSFormatlist();
   this.GetISMSGuidelineslist();
   this.GetISMSPolicylist();
   this.GetISMSProcedurelist();
   this.GetOsISMSFormatlist();
   this.GetOsISMSGuidelineslist();
   this.GetOsISMSPolicylist();
   this.GetOsISMSProcedurelist();
   this.GetHrISMSGuidelineslist();
   this.GetHrISMSPolicylist();
   this.GetHrISMSProcedurelist();
   this.GetHrISMSFormatlist();
 }

 GetIsoSprtlist(){
  this.ielc.Getiso27001().subscribe((data) => {
    this.isosprtlist=data;
    this.isLoading = false;
  });
 }
 
 GetIsoInfolist(){
  this.ielc.Getismsinfo().subscribe((data) => {
    this.isoinfolist=data;
    this.isLoading = false;
  });
 }
 GetIsoPolicylist(){
  this.ielc.Getispolicy().subscribe((data) => {
    this.isopolicylist=data;
    this.isLoading = false;
  });
 }
 
GetPrjtISMSGuidelineslist(){
  this.ielc.Getprjtismsguidelines().subscribe((data) => {
    this.prjtIsmsGuidelinesdata=data;
    this.isLoading = false;
  });
 }
 GetPrjtISMSPolicylist(){
  this.ielc.Getprjtismspolicy().subscribe((data) => {
    this.prjtIsmsPolicydata=data;
    this.isLoading = false;
  });
 }
 GetPrjtISMSProcedurelist(){
  this.ielc.Getprjtismsprocedure().subscribe((data) => {
    this.prjtIsmsProceduredata=data;
    this.isLoading = false;
  });
 }
 GetPrjtISMSFormatlist(){
  this.ielc.Getprjtismsformat().subscribe((data) => {
    this.prjtIsmsFormatdata=data;
    this.isLoading = false;
  });
 }

 GetCisoISMSGuidelineslist(){
  this.ielc.Getcisoismsguidelines().subscribe((data) => {
    this.cisoIsmsGuidelinesdata=data;
    this.isLoading = false;
  });
 }
 GetCisoISMSPolicylist(){
  this.ielc.Getcisoismspolicy().subscribe((data) => {
    this.cisoIsmsPolicydata=data;
    this.isLoading = false;
  });
 }
 GetCisoISMSProcedurelist(){
  this.ielc.Getcisoismsprocedure().subscribe((data) => {
    this.cisoIsmsProceduredata=data;
    this.isLoading = false;
  });
 }
 GetCisoISMSFormatlist(){
  this.ielc.Getcisoismsformat().subscribe((data) => {
    this.cisoIsmsFormatdata=data;
    this.isLoading = false;
  });
 }
 
 GetISMSGuidelineslist(){
  this.ielc.Getitismsguidelines().subscribe((data) => {
    this.IsmsGuidelinesdata=data;
    this.isLoading = false;
  });
 }
 GetISMSPolicylist(){
  this.ielc.Getitismspolicy().subscribe((data) => {
    this.IsmsPolicydata=data;
    this.isLoading = false;
  });
 }
 GetISMSProcedurelist(){
  this.ielc.Getitismsprocedure().subscribe((data) => {
    this.IsmsProceduredata=data;
    this.isLoading = false;
  });
 }
 GetISMSFormatlist(){
  this.ielc.Getitismsformat().subscribe((data) => {
    this.IsmsFormatdata=data;
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
}
