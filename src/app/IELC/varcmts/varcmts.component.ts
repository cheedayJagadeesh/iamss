import { Component } from '@angular/core';
import { IelcapiService } from '../ielcapi.service';


interface docs{
  documentID: string;
  documentName: string;
  url: string;
}
@Component({
  selector: 'app-varcmts',
  templateUrl: './varcmts.component.html',
  styleUrls: ['./varcmts.component.css']
})
export class VarcmtsComponent {
  isLoading = true;
  varcmtlist: any[] = []; 
 
  docsdata:docs={
   documentID:'',
   documentName: '',
   url: '',
  }
  constructor(private ielc:IelcapiService) {

  }
  ngOnInit(): void {
    this.GetVarcmtlist();
  }
  
   GetVarcmtlist(){
    this.ielc.Getvarcmt().subscribe((data) => {
      this.varcmtlist=data;
      this.isLoading = false;
    });
   }

}
