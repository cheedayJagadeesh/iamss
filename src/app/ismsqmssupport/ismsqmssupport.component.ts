import { Component,OnInit } from '@angular/core';
import { IelcapiService } from '../IELC/ielcapi.service';


interface ismsqmssprtinfo{
  id: number;
  contactPriority: string;
  name: string;
  mobile: number;
  email: string;
}

@Component({
  selector: 'app-ismsqmssupport',
  templateUrl: './ismsqmssupport.component.html',
  styleUrls: ['./ismsqmssupport.component.css']
})
export class IsmsqmssupportComponent implements OnInit {
email='incidents@inteqsolutions.com'
isLoading = true;
   ismsqmssprtdata:ismsqmssprtinfo={
    id: 0,
    contactPriority: '',
    name: '',
    mobile: 0,
    email: '',
 }
ismsqmssupport: any[] = []; 
 
 constructor(private ielc:IelcapiService) {

 }
 ngOnInit(): void {
   this.GetIsmsqmsSprtlist();
 }
 
GetIsmsqmsSprtlist(){
  this.ielc.Getismsqms().subscribe((data) => {
    this.ismsqmssupport=data;
    this.ismsqmssupport = this.sortlist(data)
    this.isLoading = false;
  });
 }
  sortlist(data: any[]): any[] {
    return data.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
  }

  
}
