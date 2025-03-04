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
  selector: 'app-dpdp',
  templateUrl: './dpdp.component.html',
  styleUrls: ['./dpdp.component.css']
})
export class DpdpComponent {
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
 dpdpdata: any[] = []; 
 constructor(private ielc:IelcapiService) {

 }
 ngOnInit(): void {
   this.GetIsoSprtlist();
   this.Getdpdplist();
 }

 GetIsoSprtlist(){
  this.ielc.Getiso27001().subscribe((data) => {
    this.isosprtlist=data;
    this.isLoading = false;
  });
 }

 Getdpdplist(){
  this.ielc.Getdpdp().subscribe((data) => {
    this.dpdpdata=data;
    this.isLoading = false;
  });
 }
}
