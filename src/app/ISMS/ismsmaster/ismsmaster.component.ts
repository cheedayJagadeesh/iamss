import { Component } from '@angular/core';
import { IelcapiService } from 'src/app/IELC/ielcapi.service';


@Component({
  selector: 'app-ismsmaster',
  templateUrl: './ismsmaster.component.html',
  styleUrls: ['./ismsmaster.component.css']
})
export class ISMSMasterComponent {
  ismsdetails: any[] = [];

    constructor(private ielc:IelcapiService) {}

    ngOnInit() {
    this.GetAllSkillsData();
   }

     GetAllSkillsData(){
    this.ielc.GetISMSMasterTable().subscribe((data) => {
      this.ismsdetails=data;
    });
   }

}
