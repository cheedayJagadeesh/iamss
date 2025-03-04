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
  selector: 'app-soc',
  templateUrl: './soc.component.html',
  styleUrls: ['./soc.component.css']
})
export class SocComponent {
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
 socdata: any[] = []; 
 constructor(private ielc:IelcapiService) {

 }
 ngOnInit(): void {
   this.GetIsoSprtlist();
   this.Getsoclist();
 }

 GetIsoSprtlist(){
  this.ielc.Getiso27001().subscribe((data) => {
    this.isosprtlist=data;
    this.isLoading = false;
  });
 }

 Getsoclist(){
  this.ielc.Getsoc().subscribe((data) => {
    this.socdata=data;
    this.isLoading = false;
  });
 }
}
