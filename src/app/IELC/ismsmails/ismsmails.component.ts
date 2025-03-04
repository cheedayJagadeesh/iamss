import { Component,OnInit } from '@angular/core';
import { IelcapiService } from '../ielcapi.service';

interface ismsmailsinfo{
    id: number;
    department: string;
    toaddress: string;
    cc: string;
    sharePath: string;
    sharePathURL: string;
    projectwiseShareLocation: string;
    projectwiseShareLocationURL: string;
    startDate: number;
    endDate: number;
    incidentMailDate: number;
    fromaddress: string;
    password: string;
}
@Component({
  selector: 'app-ismsmails',
  templateUrl: './ismsmails.component.html',
  styleUrls: ['./ismsmails.component.css']
})
export class IsmsmailsComponent implements OnInit  {
  ismsmailsdata:ismsmailsinfo={
    id: 0,
    department: '',
    toaddress: '',
    cc: '',
    sharePath: '',
    sharePathURL: '',
    projectwiseShareLocation: '',
    projectwiseShareLocationURL: '',
    startDate: 0,
    endDate: 0,
    incidentMailDate: 0,
    fromaddress: '',
    password: '',
   }

  isLoading = true;
  ismsmailslist: any[] = []; 
  page: number = 1;  
  itemsPerPage: number = 10; 

 constructor(private ielc:IelcapiService) {
  for (let i = 1; i <= 100; i++) {
    this.ismsmailslist.push({ id: i, name: `Item ${i}` });
 }
}
 ngOnInit(): void {
   this.GetIsmsmailslist();
 
 }

 GetIsmsmailslist(){
  this.ielc.Getismsmails().subscribe((data) => {
    this.ismsmailslist=data;
    this.isLoading = false;
  });
 }

}
