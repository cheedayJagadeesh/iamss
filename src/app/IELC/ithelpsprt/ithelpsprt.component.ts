import { Component, OnInit } from '@angular/core';
import { IelcapiService } from '../ielcapi.service';

interface itsprtinfo{
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
  selector: 'app-ithelpsprt',
  templateUrl: './ithelpsprt.component.html',
  styleUrls: ['./ithelpsprt.component.css']
})
export class IthelpsprtComponent implements OnInit {
 email='IT-TEAM@inteqsolutions.com'
 isLoading = true;
 itsprtlist: any[] = []; 
 itsprtdata:itsprtinfo={
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
 IsmsGeneraldata: any[] = []; 
 IsmsGuidelinesdata: any[] = []; 
 IsmsPolicydata: any[] = []; 
 IsmsProceduredata: any[] = []; 
 IsmsFormatdata: any[] = []; 
 qmsGeneraldata: any[] = []; 
 qmsGuidelinesdata: any[] = []; 
 qmsPolicydata: any[] = []; 
 qmsProceduredata: any[] = []; 
 qmsFormatdata: any[] = []; 
 

 constructor(private ielc:IelcapiService) {

}
ngOnInit(): void {
  this.GetItSprtlist();
  this.GetISMSGenerallist();
  this.GetISMSGuidelineslist();
  this.GetISMSPolicylist();
  this.GetISMSProcedurelist();
  this.GetISMSFormatlist();
  this.GetQMSGenerallist();
  this.GetQMSGuidelineslist();
  this.GetQMSPolicylist();
  this.GetQMSProcedurelist();
  this.GetQMSFormatlist();
}

 GetItSprtlist(){
  this.ielc.GetItSprt().subscribe((data) => {
    this.itsprtlist=data;
    this.isLoading = false;
  });
 }
 GetISMSGenerallist(){
  this.ielc.Getitismsgeneral().subscribe((data) => {
    this.IsmsGeneraldata=data;
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
 
 GetQMSGenerallist(){
  this.ielc.Getitqmsgeneral().subscribe((data) => {
    this.qmsGeneraldata=data;
    this.isLoading = false;
  });
 }
 GetQMSGuidelineslist(){
  this.ielc.Getitqmsguidelines().subscribe((data) => {
    this.qmsGuidelinesdata=data;
    this.isLoading = false;
  });
 }
 GetQMSPolicylist(){
  this.ielc.Getitqmspolicy().subscribe((data) => {
    this.qmsPolicydata=data;
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

}
