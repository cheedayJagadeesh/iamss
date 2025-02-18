import { booleanAttribute, Component, OnInit } from '@angular/core';
import { IelcapiService } from '../ielcapi.service';
import { forkJoin } from 'rxjs';


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
  skillID: string;
  mail: string;
  groupName:string;
}

interface addskill {
  skillID: number;
  skillName: string;
}

@Component({
  selector: 'app-addnewskill',
  templateUrl: './addnewskill.component.html',
  styleUrls: ['./addnewskill.component.css']
})

export class AddnewskillComponent implements OnInit {
  Enrolledusers: any[] = []; 
  Enrolledskills: any[]=[];
  AadUsers:any[]=[];
  AadUserGroups:any[]=[];
  skillData: addskill = {
    skillID: 0,
    skillName: ''
  };
   skillname:string=''
   includeStQuestions:boolean=false;
  

  

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
    this. GetAllSkillsData();
    this.GetAadUsersData();
    this.GetAadUserGroupsData();
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

   GetAllSkillsData(){
    this.ielc.GetEnrolledSkills().subscribe((data) => {
      this.Enrolledskills=data;
    });
   }

   AddSkill(): void {
    this.ielc.AddEnrolledSkill(this.skillData).subscribe(
      (response) => {
        alert('✅ Skill Added Successfully!');
        this.GetAllSkillsData()
      },
      (error) => {
        alert('❌ Error adding skill. Please try again.');
      }
    );
  }

  // AddSkill(): void {
  //     let skillsToInsert = [{ skillName: this.skillData.skillName }];
  
  //     // If checkbox is checked, add another record with "_stquestions"
  //     if (this.includeStQuestions) {
  //       skillsToInsert.push({ skillName: this.skillData.skillName + '_stquestions' });
  //     }
  
  //     // Send multiple insert requests
  //     forkJoin(skillsToInsert.map(skill => this.ielc.AddEnrolledSkill(skill))).subscribe(
  //       () => {
  //         alert('✅ Skill(s) Added Successfully!');
  //         this.GetAllSkillsData(); // Refresh data
  //         this.skillData.skillName = ''; // Clear input
  //         this.includeStQuestions = false; // Reset checkbox
  //       },
  //       (error) => {
  //         alert('❌ Error adding skill(s). Please try again.');
  //         console.error('API Error:', error);
  //       }
  //     );
    
  // }
  

  deleteSkill(skillName: string) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.ielc.DeleteEnrolledSkill(skillName).subscribe({
        next: () => {
          alert(`Record with ID ${skillName} deleted successfully!`);
          this.GetAllSkillsData();
        },
        error: (err) => console.error('Error deleting item:', err)
      });
    }
  }
  

   GetAadUsersData(){
    this.ielc.GetAadUserslist().subscribe((data) => {
      this.AadUsers=data;
    });
   }

   GetAadUserGroupsData(){
    this.ielc.GetAadUserGroupslist().subscribe((data) => {
      this.AadUserGroups=data;
    });
   }

   deleteItem(id: number) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.ielc.DeleteskillById(id).subscribe({
        next: () => {
          alert(`Record with ID ${id} deleted successfully!`);
          this.GetAllSkills();
        },
        error: (err) => console.error('Error deleting item:', err)
      });
    }
  }
  
  showFullDescription(description: string) {
    alert(description); // Or open a modal to show the full text
  }

}
