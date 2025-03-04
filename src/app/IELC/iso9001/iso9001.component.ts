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
  selector: 'app-iso9001',
  templateUrl: './iso9001.component.html',
  styleUrls: ['./iso9001.component.css']
})
export class Iso9001Component {
email='cvprasad@inteqsolutions.com'

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
 cisoqmsGuidelinesdata: any[] = []; 
 cisoqmsProceduredata: any[] = []; 
 cisoqmsFormatdata: any[] = []; 
 prjtqmsGuidelinesdata: any[] = []; 
 prjtqmsProceduredata: any[] = []; 
 prjtqmsFormatdata: any[] = []; 
 qmsGuidelinesdata: any[] = []; 
 qmsProceduredata: any[] = []; 
 qmsFormatdata: any[] = []; 
 HrqmsGuidelinesdata: any[] = []; 
 HrqmsProceduredata: any[] = []; 
 HrqmsFormatdata: any[] = []; 
 OsqmsGuidelinesdata: any[] = []; 
 OsqmsProceduredata: any[] = []; 
 OsqmsFormatdata: any[] = []; 
 
 
 constructor(private ielc:IelcapiService) {

 }
 ngOnInit(): void {
   this.GetIsoSprtlist();
   this.GetIsoInfolist();
   this.GetPrjtQMSGuidelineslist();
   this.GetPrjtQMSProcedurelist();
   this.GetPrjtQMSFormatlist();
   this.GetCisoQMSGuidelineslist();
   this.GetCisoQMSProcedurelist();
   this.GetCisoQMSFormatlist();
   this.GetQMSFormatlist();
   this.GetQMSGuidelineslist();
   this.GetQMSProcedurelist();
   this.GetOsQMSFormatlist();
   this.GetOsQMSGuidelineslist();
   this.GetOsQMSProcedurelist();
   this.GetHrQMSGuidelineslist();
   this.GetHrQMSProcedurelist();
   this.GetHrQMSFormatlist();
 }

 GetIsoSprtlist(){
  this.ielc.Getiso9001().subscribe((data) => {
    this.isosprtlist=data;
    this.isLoading = false;
  });
 }
 
 GetIsoInfolist(){
  this.ielc.Getisoinfo().subscribe((data) => {
    this.isoinfolist=data;
    this.isLoading = false;
  });
 }
 
GetPrjtQMSGuidelineslist(){
  this.ielc.Getprjtqmsguidelines().subscribe((data) => {
    this.prjtqmsGuidelinesdata=data;
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

 GetCisoQMSGuidelineslist(){
  this.ielc.Getcisoqmsguidelines().subscribe((data) => {
    this.cisoqmsGuidelinesdata=data;
    this.isLoading = false;
  });
 }
 
 GetCisoQMSProcedurelist(){
  this.ielc.Getcisoqmsprocedure().subscribe((data) => {
    this.cisoqmsProceduredata=data;
    this.isLoading = false;
  });
 }
 GetCisoQMSFormatlist(){
  this.ielc.Getcisoqmsformat().subscribe((data) => {
    this.cisoqmsFormatdata=data;
    this.isLoading = false;
  });
 }
 
 GetQMSGuidelineslist(){
  this.ielc.Getitqmsguidelines().subscribe((data) => {
    this.qmsGuidelinesdata=data;
    this.isLoading = false;
  });
 }
 GetQMSProcedurelist(){
  this.ielc.Getitqmsprocedure().subscribe((data) => {
    this.qmsProceduredata=data;
    this.isLoading = false;
  });
 }
 
 GetQMSFormatlist(){
  this.ielc.Getitqmsformat().subscribe((data) => {
    this.qmsFormatdata=data;
    this.isLoading = false;
  });
 }

 
 GetOsQMSGuidelineslist(){
  this.ielc.Getosqmsguidelines().subscribe((data) => {
    this.OsqmsGuidelinesdata=data;
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
 
 GetHrQMSGuidelineslist(){
  this.ielc.Gethrqmsguidelines().subscribe((data) => {
    this.HrqmsGuidelinesdata=data;
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
