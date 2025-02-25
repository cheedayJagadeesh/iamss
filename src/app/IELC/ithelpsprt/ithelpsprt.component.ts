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
export class IthelpsprtComponent {
 email='IT-TEAM@inteqsolutions.com'

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
 IsmsGuidelinesdata: any[] = []; 
 IsmsPolicydata: any[] = []; 
 IsmsProceduredata: any[] = []; 
 IsmsFormatdata: any[] = []; 
 

 constructor(private ielc:IelcapiService) {
  this.GetItSprtlist();
  this.GetISMSGuidelineslist();
  this. GetISMSPolicylist();
  this.GetISMSProcedurelist();
  this.GetISMSFormatlist();
}

 GetItSprtlist(){
  this.ielc.GetItSprt().subscribe((data) => {
    this.itsprtlist=data;
  });
 }
 GetISMSGuidelineslist(){
  this.ielc.Getismsguidelines().subscribe((data) => {
    this.IsmsGuidelinesdata=data;
  });
 }
 GetISMSPolicylist(){
  this.ielc.Getismspolicy().subscribe((data) => {
    this.IsmsPolicydata=data;
  });
 }
 GetISMSProcedurelist(){
  this.ielc.Getismsprocedure().subscribe((data) => {
    this.IsmsProceduredata=data;
  });
 }
 GetISMSFormatlist(){
  this.ielc.Getismsformat().subscribe((data) => {
    this.IsmsFormatdata=data;
  });
 }

}
