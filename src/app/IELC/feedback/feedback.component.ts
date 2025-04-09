import { Component } from '@angular/core';
import { IelcapiService } from '../ielcapi.service';
import { Router } from '@angular/router'; 
import { AuthService } from 'src/app/authservice.service';
import { MsalService } from '@azure/msal-angular';
import { ActivatedRoute } from '@angular/router';

// interface Feedback {
//   enrollmentID: number;
//   subjectMatterKnowledge: string;
//   presentation: string;
//   communication: string;
//   handlingDoubts: string;
//   applicationToWork: string;
//   comments: string;
// }

interface Enrollment {
  enrollmentID: number;
  name: string;
  mail: string;
  mobile: number;
  skillName: string;
  date: string;
  time: string;
  venue: string;
  batchmembers: number;
  enrollmentDate: string; 
  startDate: string;
  result: string;
  percentage: string;
  testTakenDate: string;
  subjectMatterKnowledge: string;
  presentation: string;
  communication: string;
  handlingDoubts: string;
  applicationtowork: string;
  comments: string;
}

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  selectedSkill: string = '';
  feedbackdata: Enrollment = {
  enrollmentID: 0,
  name: '',
  mail: '',
  mobile: 0,
  skillName: '',
  date: '',
  time: '',
  venue: '',
  batchmembers: 0,
  enrollmentDate: '',
  startDate: '',
  result: '',
  percentage: '',
  testTakenDate: '',
  subjectMatterKnowledge: '',
  presentation: '',
  communication: '',
  handlingDoubts: '',
  applicationtowork: '',
  comments: '',
  }
  enrollmentID: number | null = null;
  constructor(private ielc:IelcapiService,private msalService: MsalService, private authService: AuthService, private router: Router,private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.selectedSkill = params['skill'];
      this.enrollmentID = params['enrollment'] ? Number(params['enrollment']) : null;
    });
  }

  // UpdateFeedback() {
  //   if (this.enrollmentID) {

      
      
  //     // console.log('Before submitting:', {
  //     //   result: this.feedbackdata.result,
  //     //   percentage: this.feedbackdata.percentage,
  //     //   testTakenDate: this.feedbackdata.testTakenDate
  //     // });
  //     this.ielc.Updatefeedback(this.enrollmentID, this.feedbackdata).subscribe(
  //       (response) => {
  //         console.log('Updated Successfully:', response);
  //         alert('✅ Thank you for submitting the feedback!');
  
  //         // Navigate back to the table with submittedID
  //         this.router.navigate(['/registration']);
  //         // this.router.navigate(['/registration'], { queryParams: { submittedID: this.enrollmentID } });
  //       },
  //       (error) => {
  //         console.error('Error updating Record:', error);
  //       }
  //     );
  //   }
  // }

  UpdateFeedback() {
    if (this.enrollmentID !== null) {
      const id = this.enrollmentID;
  
      this.ielc.GetExamById(id).subscribe(
        (existingData: any) => {
          // Merge only feedback-related fields to avoid overwriting others
          const updatedData = {
            ...existingData,
            subjectMatterKnowledge: this.feedbackdata.subjectMatterKnowledge,
            presentation: this.feedbackdata.presentation,
            communication: this.feedbackdata.communication,
            handlingDoubts: this.feedbackdata.handlingDoubts,
            applicationtowork: this.feedbackdata.applicationtowork,
            comments: this.feedbackdata.comments
          };
     console.log('📦 Final Data to Submit:', updatedData);
          this.ielc.Updatefeedback(id, updatedData).subscribe(
            (response) => {
              console.log('Updated Successfully:', response);
              alert('✅ Thank you for submitting the feedback!');
              this.router.navigate(['/registration']);
            },
            (error) => {
              console.error('Error updating Record:', error);
            }
          );
        },
        (error) => {
          console.error('Error fetching existing exam data:', error);
        }
      );
    } else {
      alert("Enrollment ID is missing or invalid.");
    }
  }
  
  
  

  
  // UpdateFeedback() {
  //   if (this.enrollmentID) {
  //     // Add the optional feedback-related fields the backend expects
  //     const feedbackWithExtras = {
  //       ...this.feedbackdata,
  //       result: this.feedbackdata.result || '',
  //       percentage: this.feedbackdata.percentage || '',
  //       testTakenDate: this.feedbackdata.testTakenDate || ''
  //     };
  
  //     this.ielc.Updatefeedback(this.enrollmentID, feedbackWithExtras).subscribe(
  //       (response) => {
  //         console.log('Updated Successfully:', response);
  //         alert('✅ Thank you for submitting the feedback!');
  //         this.router.navigate(['/registration']);
  //       },
  //       (error) => {
  //         console.error('Error updating Record:', error);
  //       }
  //     );
  //   }
  // }
  
  
  
  resetlist(){
    this.feedbackdata={
      enrollmentID: 0,
      name: '',
      mail: '',
      mobile: 0,
      skillName: '',
      date: '',
      time: '',
      venue: '',
      batchmembers: 0,
      enrollmentDate: '',
      startDate: '',
      result: '',
      percentage: '',
      testTakenDate: '',
      subjectMatterKnowledge: '',
      presentation: '',
      communication: '',
      handlingDoubts: '',
      applicationtowork: '',
      comments: '',
    }
  }
}
