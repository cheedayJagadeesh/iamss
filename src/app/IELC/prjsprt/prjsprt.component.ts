import { Component } from '@angular/core';
import { IelcapiService } from '../ielcapi.service';

interface prjtsprtinfo{
  id: string;
  functions: string;
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
  selector: 'app-prjsprt',
  templateUrl: './prjsprt.component.html',
  styleUrls: ['./prjsprt.component.css']
})
export class PrjsprtComponent {
email='incidents@inteqsolutions.com'

isLoading = true;
prjtsprtlist: any[] = []; 
prjtsprtdata:prjtsprtinfo={
 id: '',
 functions: '',
 name: '',
 mobile: '',
 email: '',
}
docsdata:docs={
 documentID:'',
 documentName: '',
 url: '',
}
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


constructor(private ielc:IelcapiService) {

}
ngOnInit(): void {
 this.GetPrjtSprtlist();
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
}

GetPrjtSprtlist(){
 this.ielc.GetprjtSprt().subscribe((data) => {
   this.prjtsprtlist=data;
   this.isLoading = false;
 });
}
GetPrjtISMSGenerallist(){
 this.ielc.Getprjtismsgeneral().subscribe((data) => {
   this.prjtIsmsGeneraldata=data;
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

GetPrjtQMSGenerallist(){
 this.ielc.Getprjtqmsgeneral().subscribe((data) => {
   this.prjtqmsGeneraldata=data;
   this.isLoading = false;
 });
}
GetPrjtQMSGuidelineslist(){
 this.ielc.Getprjtqmsguidelines().subscribe((data) => {
   this.prjtqmsGuidelinesdata=data;
   this.isLoading = false;
 });
}
GetPrjtQMSPolicylist(){
 this.ielc.Getprjtqmspolicy().subscribe((data) => {
   this.prjtqmsPolicydata=data;
   this.isLoading = false;
 });
}
GetPrjtQMSProcedurelist(){
 this.ielc.Getprjtqmsprocedure().subscribe((data) => {
   this.prjtqmsProceduredata=data;
   this.isLoading = false;
 });
}
GetPrjtQMSFormatlist(){
 this.ielc.Getprjtqmsformat().subscribe((data) => {
   this.prjtqmsFormatdata=data;
   this.isLoading = false;
 });
}

}
