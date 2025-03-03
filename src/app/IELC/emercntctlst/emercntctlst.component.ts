import { Component } from '@angular/core';
import { IelcapiService } from '../ielcapi.service';

interface emersprtinfo{
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
  selector: 'app-emercntctlst',
  templateUrl: './emercntctlst.component.html',
  styleUrls: ['./emercntctlst.component.css']
})
export class EmercntctlstComponent {
  isLoading = true;
  emersprtlist: any[] = []; 
  emersprtdata:emersprtinfo={
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

 EmerGeneraldata: any[] = []; 

   
 constructor(private ielc:IelcapiService) {

 }
 ngOnInit(): void {
   this.GetEmerSprtlist();
   this.GetEmerGenerallist();
 }
 
  GetEmerSprtlist(){
   this.ielc.GetemerSprt().subscribe((data) => {
     this.emersprtlist=data;
     this.isLoading = false;
   });
  }

  GetEmerGenerallist(){
    this.ielc.Getemergeneral().subscribe((data) => {
      this.EmerGeneraldata=data;
      this.isLoading = false;
    });
   }
}
