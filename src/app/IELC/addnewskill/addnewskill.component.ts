import { Component, OnInit } from '@angular/core';
import { IelcapiService } from '../ielcapi.service';


interface NewSkillsInfo {
  sessionID: string;
  fromDate: Date;
  toDate: Date;
  skillStartTime: string;
  skillEndTime: string;
  venue: string;
  skillDescription: string;
  skillName: string;
  aadUsersData: any;  
  aadGroupsData: any; 
  conductedBy: string;
}

@Component({
  selector: 'app-addnewskill',
  templateUrl: './addnewskill.component.html',
  styleUrls: ['./addnewskill.component.css']
})

export class AddnewskillComponent implements OnInit {
  Enrolledusers: any[] = []; 

  page: number = 1;  
  itemsPerPage: number = 10; 

  constructor(private ielc:IelcapiService) {
    for (let i = 1; i <= 100; i++) {
      this.Enrolledusers.push({ id: i, name: `Item ${i}` });
    }
    this.GetAllSkills();
  }

  ngOnInit() {
    this.GetAllSkills();
   }
  
   sortRegisteredUsers(data: any[]): any[] {
    return data.sort((a, b) => (a.sessionID > b.sessionID ? -1 : a.sessionID < b.sessionID ? 1 : 0));
  }
  
   GetAllSkills(){
    this.ielc.GetSkills().subscribe((data) => {
      this.Enrolledusers=data;
      this.Enrolledusers = this.sortRegisteredUsers(data);
    });
   }

}
