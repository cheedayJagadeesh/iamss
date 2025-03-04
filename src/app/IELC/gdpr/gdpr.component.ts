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
  selector: 'app-gdpr',
  templateUrl: './gdpr.component.html',
  styleUrls: ['./gdpr.component.css']
})
export class GdprComponent {
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
 gdprdata: any[] = []; 
 constructor(private ielc:IelcapiService) {

 }
 ngOnInit(): void {
   this.GetIsoSprtlist();
   this.Getgdprlist();
 }

 GetIsoSprtlist(){
  this.ielc.Getiso27001().subscribe((data) => {
    this.isosprtlist=data;
    this.isLoading = false;
  });
 }

 Getgdprlist(){
  this.ielc.Getgdpr().subscribe((data) => {
    this.gdprdata=data;
    this.isLoading = false;
  });
 }
}
