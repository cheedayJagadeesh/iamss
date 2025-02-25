import { booleanAttribute, Component, OnInit,AfterViewInit } from '@angular/core';
import { IelcapiService } from '../ielcapi.service';
import { forkJoin } from 'rxjs';
import { NgForm } from '@angular/forms';
declare var bootstrap: any; 


interface NewSkillsInfo {
  sessionID: string;
  fromDate:  string ;  
  toDate:  string; 
  skillStartTime: string;
  skillEndTime: string;
  venue: string;
  skillDescription: string;
  skillName: string;
  aadUsersData: any;  
  aadGroupsData: any; 
  conductedBy: string;
  // skillID: string;
  // mail: string;
  // groupName:string;
}


interface aad{
  mail: string;
  groupName:string;
}

interface addskill {
  skillID: string;
  skillName: string;
}

@Component({
  selector: 'app-addnewskill',
  templateUrl: './addnewskill.component.html',
  styleUrls: ['./addnewskill.component.css']
})

export class AddnewskillComponent implements OnInit,AfterViewInit {
  Enrolledusers: any[] = []; 
  Enrolledskills: any[]=[];
  // AadUsers:any[]=[];
  // AadUserGroups:any[]=[];
  aadUsersData:any[]=[];
  aadGroupsData:any[]=[];
  skillData: addskill = {
    skillID: '',
    skillName: ''
  };
  
   skillname:string=''
   includeStQuestions:boolean=false;

   
  skillSessionData: NewSkillsInfo = {
    sessionID: '',
    fromDate: '',
    toDate: '',
    skillStartTime: '',
    skillEndTime: '',
    venue: '',
    skillDescription: '',
    skillName: '',
    aadUsersData: '',
    aadGroupsData: '',
    conductedBy: '',
  };
  

  

  page: number = 1;  
  itemsPerPage: number = 10; 

  constructor(private ielc:IelcapiService) {
    for (let i = 1; i <= 100; i++) {
      this.Enrolledusers.push({ id: i, name: `Item ${i}` });
    }
    this.GetAllSkillSessions();
    this.GetAllSkillsData();
  }

  ngOnInit() {
    this.GetAllSkillSessions();
    this.GetAllSkillsData();
    this.GetAadUsersData();
    this.GetAadUserGroupsData();
   }

   ngAfterViewInit() {
    // Get the modal element
    const modalElement = document.getElementById('exampleModal');
    if (modalElement) {
      modalElement.addEventListener('hidden.bs.modal', () => {
        console.log('Modal closed, reloading skill sessions...');
        this.GetAllSkillSessions();
      });
    }
  }
  
   sortRegisteredUsers(data: any[]): any[] {
    return data.sort((a, b) => (a.sessionID > b.sessionID ? -1 : a.sessionID < b.sessionID ? 1 : 0));
  }
  
   GetAllSkillSessions(){
    this.ielc.GetSkillSessions().subscribe((data) => {
      this.Enrolledusers=data;
      this.Enrolledusers = this.sortRegisteredUsers(data);
    });
   }

  resetSkillSession() {
    this.skillSessionData = {
      sessionID: '',
      fromDate: '', 
      toDate: '',  
      skillStartTime: '',
      skillEndTime: '',
      venue: '',
      skillDescription: '',
      skillName: '',
      aadUsersData: '',
      aadGroupsData: '',
      conductedBy: '',
      // skillID: '',
      // mail: '',
      // groupName: ''
    };
  }
  
  updateSelectedUsers(event: Event) {
    const target = event.target as HTMLSelectElement; // Cast event.target
    const selectedValues = Array.from(target.selectedOptions).map((option: HTMLOptionElement) => option.value);
    
    this.skillSessionData.aadUsersData = selectedValues.join(', '); // Convert array to comma-separated string
    console.log('Selected Users:', this.skillSessionData.aadUsersData);
  }
  
  updateSelectedGroups(event: Event) {
    const target = event.target as HTMLSelectElement; // Cast event.target
    const selectedValues = Array.from(target.selectedOptions).map((option: HTMLOptionElement) => option.value);
    
    this.skillSessionData.aadGroupsData = selectedValues.join(', '); // Convert array to comma-separated string
    console.log('Selected Users:', this.skillSessionData.aadGroupsData);
  }
  
  
   GetAllSkillsData(){
    this.ielc.GetEnrolledSkills().subscribe((data) => {
      this.Enrolledskills=data;
    });
   }

   AddSkillsession(): void {

    const formatTime = (time: string | undefined | null): string => {
      if (!time) return '00:00:00'; // Default value if time is empty or undefined
    
      const parts = time.split(':');
      if (parts.length < 2) return '00:00:00'; // Handle invalid time format
    
      const [hours, minutes, seconds = '00'] = parts; // Default seconds to "00"
      return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
    };
    
    
    const formattedSession = {
      ...this.skillSessionData,
      fromDate: new Date(this.skillSessionData.fromDate).toISOString(),
      toDate: new Date(this.skillSessionData.toDate).toISOString(),
      skillStartTime: formatTime(this.skillSessionData.skillStartTime),
      skillEndTime: formatTime(this.skillSessionData.skillEndTime),
      aadUsersData: this.skillSessionData.aadUsersData , 
      aadGroupsData: this.skillSessionData.aadGroupsData ,
      venue:this.skillSessionData.venue,
      skillDescription:this.skillSessionData.skillDescription,
      conductedBy:this.skillSessionData.conductedBy,
      sessionID:this.skillSessionData.sessionID ? this.skillSessionData.sessionID : 0,

    };
    console.log('Sending Data:', formattedSession); 
    this.ielc.PostEnrolledSessions(formattedSession).subscribe(
      (response) => {
        alert('✅ Skill Added Successfully!');
        this.GetAllSkillsData();
        this.resetSkillSession();
      },
      (error) => {
        alert('❌ Error adding skill. Please try again.');
      }
    );
  }
 
  EditSkillSession(id: string){
    //const id = this.skillSessionData.sessionID; 
    this.ielc.GetSkillSessionById(id).subscribe(data => {
      console.log("Fetched Skill Session:", data);
      // this.GetAllSkillSessions();
      this.skillSessionData = { ...data }; 
      if (this.skillSessionData.fromDate) {
        this.skillSessionData.fromDate = this.skillSessionData.fromDate.split("T")[0];
      }
      if (this.skillSessionData.toDate) {
        this.skillSessionData.toDate = this.skillSessionData.toDate.split("T")[0];
      }

    });
  }

  UpdateSkillSession() {
    this.ielc.UpdateSkillSession(this.skillSessionData.sessionID, this.skillSessionData).subscribe(
      (response) => {
        console.log("Updated Successfully:", response);
        alert(" ✅ Skill session updated successfully!");
        this.GetAllSkillsData();
       
      },
      (error) => {
        console.error("Error updating skill session:", error);
      }
    );
  }
  

  AddSkill(): void {
      let skillsToInsert = [{ skillName: this.skillData.skillName }];
  
      // If checkbox is checked, add another record with "_stquestions"
      if (this.includeStQuestions) {
        skillsToInsert.push({ skillName: this.skillData.skillName + '_StQuestions' });
      }
  
      // Send multiple insert requests
      forkJoin(skillsToInsert.map(skill => this.ielc.PostEnrolledSkill(skill))).subscribe(
        () => {
          alert('✅ Skill(s) Added Successfully!');
          this.GetAllSkillsData(); // Refresh data
          this.skillData.skillName = ''; // Clear input
          this.includeStQuestions = false; // Reset checkbox
        },
        (error) => {
          alert('❌ Error adding skill(s). Please try again.');
          console.error('API Error:', error);
        }
      );
    
  }

  DeleteSkill(): void {
    // Prepare an array of skill names to delete
    let skillsToDelete: string[] = [this.skillData.skillName];
  
    if (this.includeStQuestions) {
      skillsToDelete.push(this.skillData.skillName + '_StQuestions');
    }
  
    if (!confirm(`🗑️ Are you sure you want to delete: ${skillsToDelete.join(", ")}?`)) {
      return;
    }
  
    console.log(`🗑️ Deleting skills:`, skillsToDelete);
  
    // Call the API with an array
    this.ielc.DeleteEnrolledSkill(skillsToDelete).subscribe({
      next: () => {
        alert(`✅ Skills deleted successfully!`);
        this.GetAllSkillsData(); // Refresh skill list
        this.skillData.skillName = ''; // Clear input
        this.includeStQuestions = false; // Reset checkbox
      },
      error: (error) => {
        console.error('❌ API Error:', error);
        alert(`❌ Error deleting skills: ${error.message}`);
      }
    });
  }
  
  
   
  
  
  

  // deleteSkill(skillName: string) {
  //   if (confirm('Are you sure you want to delete this record?')) {
  //     this.ielc.DeleteEnrolledSkill(skillName).subscribe({
  //       next: () => {
  //         alert(`Record with ID ${skillName} deleted successfully!`);
  //         this.GetAllSkillsData();
  //       },
  //       error: (err) => console.error('Error deleting item:', err)
  //     });
  //   }
  // }
  

   GetAadUsersData(){
    this.ielc.GetAadUserslist().subscribe((data) => {
      this.aadUsersData=data;
    });
   }

   GetAadUserGroupsData(){
    this.ielc.GetAadUserGroupslist().subscribe((data) => {
      this.aadGroupsData=data;
    });
   }

   deleteItem(id: number) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.ielc.DeleteskillsessionsById(id).subscribe({
        next: () => {
          alert(`Record with ID ${id} deleted successfully!`);
          this.GetAllSkillSessions();
        },
        error: (err) => console.error('Error deleting item:', err)
      });
    }
  }
  
  showFullDescription(description: string) {
    alert(description); // Or open a modal to show the full text
  }

}
