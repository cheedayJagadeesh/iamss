import { booleanAttribute, Component, OnInit,AfterViewInit } from '@angular/core';
import { IelcapiService } from '../ielcapi.service';
import { forkJoin, of } from 'rxjs';
import { NgForm } from '@angular/forms';
import { catchError } from 'rxjs/operators';
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
  examTime: string;
  batchLimitMembers: string;
  displayExamQuestions: string;
  standardExamQuestions: string;
  examPercentage: string
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
  isLoading=true;
  Enrolledusers: any[] = []; 
  Enrolledskills: any[]=[];
  Enrolledskillvenue: any[]=[];
  Enrolledskillvenuedatetime: any[]=[];
      value: number = 1;
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
   today:string=''
   
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
    examTime: '',
    batchLimitMembers: '',
    displayExamQuestions: '',
    standardExamQuestions: '',
    examPercentage: '',
  };
  

  

  page: number = 1;  
  itemsPerPage: number = 10; 

  constructor(private ielc:IelcapiService) {
    for (let i = 1; i <= 100; i++) {
      this.Enrolledusers.push({ id: i, name: `Item ${i}` });
    }
    // this.GetAllSkillSessions();
    this.GetAllSkillsData();
  }

  ngOnInit() {
    this.GetAllSkillSessions();
    this.GetAllSkillsData();
    this.GetAadUsersData();
    this.GetAadUserGroupsData();
    const currentDate = new Date();
    this.today = currentDate.toISOString().split('T')[0];
   }

   ngAfterViewInit() {
    // Get the modal element
    const modalElement = document.getElementById('exampleModal');
    if (modalElement) {
      modalElement.addEventListener('hidden.bs.modal', () => {
        // console.log('Modal closed, reloading skill sessions...');
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
      this.isLoading=false;
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
      examTime: '',
      batchLimitMembers: '',
      displayExamQuestions: '',
      standardExamQuestions: '',
      examPercentage: ''
    };
  }
  
  updateSelectedUsers(event: Event) {
    const target = event.target as HTMLSelectElement; // Cast event.target
    const selectedValues = Array.from(target.selectedOptions).map((option: HTMLOptionElement) => option.value);
    
    this.skillSessionData.aadUsersData = selectedValues.join(', '); // Convert array to comma-separated string
    // console.log('Selected Users:', this.skillSessionData.aadUsersData);
  }
  
  updateSelectedGroups(event: Event) {
    const target = event.target as HTMLSelectElement; // Cast event.target
    const selectedValues = Array.from(target.selectedOptions).map((option: HTMLOptionElement) => option.value);
    
    this.skillSessionData.aadGroupsData = selectedValues.join(', '); // Convert array to comma-separated string
    // console.log('Selected Users:', this.skillSessionData.aadGroupsData);
  }
  
  
   GetAllSkillsData(){
    this.ielc.GetEnrolledSkills().subscribe((data) => {
      this.Enrolledskills=data;
    });
   }

    GetAllSkillvenue(){
    this.ielc.GetSkillnameVenue(this.skillSessionData.skillName, this.skillSessionData.venue).subscribe((data) => {
      this.Enrolledskillvenue=data;
      console.log("testes",this.Enrolledskillvenue);
    });
   }

  //    GetAllSkillvenuedatetime(){
  //   this.ielc.GetSkillnameVenueDateTime(this.skillSessionData.skillName, this.skillSessionData.venue, this.skillSessionData.skillName, this.skillSessionData.skillName).subscribe((data) => {
  //     this.Enrolledskillvenuedatetime=data;
  //   });
  //  }


  Postthevalues(){
    debugger;
    if (this.skillSessionData.venue === 'Self-Learning'){
    this.ielc.GetSkillnameVenue(this.skillSessionData.skillName, this.skillSessionData.venue)
      .subscribe((data) => {
        this.Enrolledskillvenue = data;
        console.log("testes", this.Enrolledskillvenue);
        if (this.Enrolledskillvenue || this.Enrolledskillvenue > 0) {
          alert('❌ A record with the same SkillName and Venue is already available. Kindly update it with the latest details.');
        }
        else{
          this.AddSkillsession();
        }
      });
    }
    else{
      this.AddSkillsession();
      }
  }


   AddSkillsession(): void {
    const formatTime = (time: string | undefined | null): string => {
      if (!time) return '00:00:00'; // Default value if time is empty or undefined
    
      const parts = time.split(':');
      if (parts.length < 2) return '00:00:00'; // Handle invalid time format
    
      const [hours, minutes, seconds = '00'] = parts; // Default seconds to "00"
      return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
    };
    
    const today = new Date().toISOString().split('T')[0];
    const formattedSession = {
      ...this.skillSessionData,
      // fromDate: new Date(this.skillSessionData.fromDate).toISOString(),
      // toDate: new Date(this.skillSessionData.toDate).toISOString(),
      fromDate: this.skillSessionData.fromDate ? new Date(this.skillSessionData.fromDate).toISOString() : this.today , // Default to today if not set
      toDate: this.skillSessionData.toDate ? new Date(this.skillSessionData.toDate).toISOString() : this.today ,  // Default to today if not set
      skillStartTime: formatTime(this.skillSessionData.skillStartTime),
      skillEndTime: formatTime(this.skillSessionData.skillEndTime),
      aadUsersData: this.skillSessionData.aadUsersData , 
      aadGroupsData: this.skillSessionData.aadGroupsData ,
      venue:this.skillSessionData.venue,
      skillDescription:this.skillSessionData.skillDescription,
      conductedBy:this.skillSessionData.conductedBy,
      sessionID:this.skillSessionData.sessionID ? this.skillSessionData.sessionID : 0,

    };
    // console.log('Sending Data:', formattedSession); 
    this.ielc.PostEnrolledSessions(formattedSession).subscribe(
      (response) => {
        alert('✅ Skill Added Successfully!');
        this.GetAllSkillsData();
        this.GetAllSkillSessions();
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
      // console.log("Fetched Skill Session:", data);
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
        // console.log("Updated Successfully:", response);
        alert(" ✅ Skill session updated successfully!");
        this.GetAllSkillsData();
        this.GetAllSkillSessions();
        this.resetSkillSession();
      },
      (error) => {
        // console.error("Error updating skill session:", error);
      }
    );
  }
  

  // AddSkill(): void {
  //     let skillsToInsert = [{ skillName: this.skillData.skillName }];
  
  //     // If checkbox is checked, add another record with "_stquestions"
  //     if (this.includeStQuestions) {
  //       skillsToInsert.push({ skillName: this.skillData.skillName + '_StQuestions' });
  //     }
      
  
  //     // Send multiple insert requests
  //     forkJoin(skillsToInsert.map(skill => this.ielc.PostEnrolledSkill(skill))).subscribe(
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
  // AddSkill(): void {
  //   // Ensure you have the current skills list loaded in this.allSkills beforehand
  //   const currentSkillNames = this.Enrolledskills.map(s => s.skillName.toLowerCase());
  
  //   let skillsToInsert = [];
  
  //   // Add base skill if not exists
  //   if (this.skillData.skillName && !currentSkillNames.includes(this.skillData.skillName.toLowerCase())) {
  //     skillsToInsert.push({ skillName: this.skillData.skillName });
  //   }
  
  //   // Add _StQuestions if checkbox is checked and doesn't already exist
  //   const stQuestionsSkill = this.skillData.skillName + '_StQuestions';
  //   if (this.includeStQuestions && !currentSkillNames.includes(stQuestionsSkill.toLowerCase())) {
  //     skillsToInsert.push({ skillName: stQuestionsSkill });
  //   }
  
  //   if (skillsToInsert.length === 0) {
  //     alert('⚠️ Skill(s) already exist. Nothing to insert.');
  //     return;
  //   }
  
  //   forkJoin(skillsToInsert.map(skill => this.ielc.PostEnrolledSkill(skill))).subscribe(
  //     () => {
  //       alert('✅ Skill(s) Added Successfully!');
  //       this.GetAllSkillsData(); // Refresh data
  //       this.skillData.skillName = ''; // Clear input
  //       this.includeStQuestions = false; // Reset checkbox
  //     },
  //     (error) => {
  //       alert('❌ Error adding skill(s). Please try again.');
  //       // console.error('API Error:', error);
  //     }
  //   );
  // }

  AddSkill(): void {
    const currentSkillNames = this.Enrolledskills.map(s => s.skillName.toLowerCase());
    let skillsToInsert: any[] = [];
  
    if (this.skillData.skillName && !currentSkillNames.includes(this.skillData.skillName.toLowerCase())) {
      skillsToInsert.push({ skillName: this.skillData.skillName });
    }
  
    const stQuestionsSkill = this.skillData.skillName + '_StQuestions';
    if (this.includeStQuestions && !currentSkillNames.includes(stQuestionsSkill.toLowerCase())) {
      skillsToInsert.push({ skillName: stQuestionsSkill });
    }
  
    if (skillsToInsert.length === 0) {
      alert('⚠️ Skill(s) already exist. Nothing to insert.');
      return;
    }
  
    forkJoin(skillsToInsert.map(skill => this.ielc.PostEnrolledSkill(skill))).subscribe(
      () => {
        // Step 1: Show success message
        alert('✅ Skill(s) Added Successfully!');
  
        // Step 2: Post default questions
        forkJoin(skillsToInsert.map(skill => {
          const defaultQuestion = {
            questionId: 0,
            skillName: skill.skillName,
            question: `What is ${skill.skillName}?`,
            a: 'A',
            b: 'B',
            c: 'C',
            d: 'D',
            questionAnswer: 'A' // You can change this logic if needed
          };
          return this.ielc.PostEnrolledSkillQuestions(defaultQuestion);
        })).subscribe(
          () => {
            alert('✅ Default question(s) added!');
            this.GetAllSkillsData();
            this.skillData.skillName = '';
            this.includeStQuestions = false;
          },
          (error) => {
            alert('⚠️ Skill(s) added, but failed to add default question(s).');
          }
        );
      },
      (error) => {
        alert('❌ Error adding skill(s). Please try again.');
      }
    );
  }
  
  

  // DeleteSkill(): void {
  //   // Prepare an array of skill names to delete
  //   let skillsToDelete: string[] = [this.skillData.skillName];
  
  //   if (this.includeStQuestions) {
  //     skillsToDelete.push(this.skillData.skillName + '_StQuestions');
  //   }
  
  //   if (!confirm(`🗑️ Are you sure you want to delete: ${skillsToDelete.join(", ")}?`)) {
  //     return;
  //   }
  
  //   console.log(`🗑️ Deleting skills:`, skillsToDelete);
  
  //   // Call the API with an array
  //   this.ielc.DeleteEnrolledSkill(skillsToDelete).subscribe({
  //     next: () => {
  //       alert(`✅ Skills deleted successfully!`);
  //       this.GetAllSkillsData(); // Refresh skill list
  //       this.skillData.skillName = ''; // Clear input
  //       this.includeStQuestions = false; // Reset checkbox
  //     },
  //     error: (error) => {
  //       console.error('❌ API Error:', error);
  //       alert(`❌ Error deleting skills: ${error.message}`);
  //     }
  //   });
  // }
 
  DeleteSkill(): void {
    const skillName = this.skillData.skillName?.trim();
  
    if (!skillName) {
      alert("❗ Please enter a Skill Name to delete.");
      return;
    }
  
    const skillsToDelete: string[] = [];
  
    if (this.includeStQuestions) {
      skillsToDelete.push(skillName, `${skillName}_StQuestions`);
    } else {
      skillsToDelete.push(skillName);
    }
  
    if (!confirm(`🗑️ Are you sure you want to delete: ${skillsToDelete.join(", ")}?`)) {
      return;
    }
  
    forkJoin(
      skillsToDelete.map(name =>
        this.ielc.DeleteEnrolledSkill(name).pipe(
          catchError(error => {
            // Silently handle deletion failures (like 404s)
            return of({ error, name });
          })
        )
      )
    ).subscribe(results => {
      const deleted = skillsToDelete.filter((_, i) => !results[i]?.error);
  
      if (deleted.length > 0) {
        alert(`✅ Deleted: ${deleted.join(", ")}`);
      }
  
      // Optionally show which were not found
      // const failed = results.filter(r => r?.error).map((r: any) => r.name);
      // if (failed.length > 0) {
      //   alert(`⚠️ Couldn't delete: ${failed.join(", ")}`);
      // }
  
      this.GetAllSkillsData(); // Refresh
      this.skillData.skillName = ''; // Reset input
      this.includeStQuestions = false; // Reset checkbox
    });
  }
   
 
  
  
  

  // DeleteSkill(): void {
  //   let skillsToDelete: string[] = [];
  
  //   if (this.skillData.skillName) {
  //     skillsToDelete.push(this.skillData.skillName);
  //     if (this.includeStQuestions) {
  //       skillsToDelete.push(this.skillData.skillName + '_StQuestions');
  //     }
  //   }
  
  //   if (skillsToDelete.length === 0) return;
  
  //   if (!confirm(`🗑️ Are you sure you want to delete: ${skillsToDelete.join(", ")}?`)) {
  //     return;
  //   }
  
  //   const deleteRequests = skillsToDelete.map(skill =>
  //     this.ielc.DeleteEnrolledSkill([skill]).pipe(
  //       catchError(error => {
  //         console.error(`❌ Failed to delete: ${skill}`, error);
  //         return of(null); // Continue even if one fails
  //       })
  //     )
  //   );
  
  //   forkJoin(deleteRequests).subscribe(() => {
  //     alert(`✅ Skill deletion attempt complete! Check console for any failed deletions.`);
  //     this.GetAllSkillsData();
  //     this.skillData.skillName = '';
  //     this.includeStQuestions = false;
  //   });
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
        // error: (err) => 
        //   console.error('Error deleting item:', err)
      });
    }
  }
  
  showFullDescription(description: string) {
    alert(description); // Or open a modal to show the full text
  }

}
