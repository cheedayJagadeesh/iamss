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
  selector: 'app-hippa',
  templateUrl: './hippa.component.html',
  styleUrls: ['./hippa.component.css']
})
export class HippaComponent {
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
 hippadata: any[] = []; 
 constructor(private ielc:IelcapiService) {

 }
 ngOnInit(): void {
   this.GetIsoSprtlist();
   this.Gethippalist();
 }

 GetIsoSprtlist(){
  this.ielc.Getiso27001().subscribe((data) => {
    this.isosprtlist=data;
    this.isLoading = false;
  });
 }

 Gethippalist(){
  this.ielc.Gethippa().subscribe((data) => {
    this.hippadata=data;
    this.isLoading = false;
  });
 }
 
}
