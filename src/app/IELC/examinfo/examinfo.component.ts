import { Component } from '@angular/core';
import { IelcapiService } from '../ielcapi.service';

interface exam{
  id: number;
  examTime: number;
  batchLimitMembers: number;
  displayExamQuestions: number;
  standardExamQuestions: number;
  examPercentage: number;
}
@Component({
  selector: 'app-examinfo',
  templateUrl: './examinfo.component.html',
  styleUrls: ['./examinfo.component.css']
})
export class ExaminfoComponent {
  isLoading = true;
  examlist: any[] = []; 
  examdata:exam={
    id: 0,
    examTime: 0,
    batchLimitMembers: 0,
    displayExamQuestions: 0,
    standardExamQuestions: 0,
    examPercentage: 0
   }

   constructor(private ielc:IelcapiService) {

   }
   ngOnInit(): void {
     this.GetExamlist();
   }
   
    GetExamlist(){
     this.ielc.Getexaminfo().subscribe((data) => {
       this.examlist=data;
       this.isLoading = false;
     });
    }

    EditExamlist(id: number) {
      console.log("Edit button clicked, fetching ID:", id); 
      this.ielc.GetexaminfoById(id).subscribe(data => {
    
        console.log("Fetched Record Session:", data); 
    
        if (data) {
          // Assign data only if it's valid
          this.examdata = { 
            id: data.id || 0,
            examTime: data.examTime || 0,
            batchLimitMembers: data.batchLimitMembers || 0,
            displayExamQuestions: data.displayExamQuestions || 0,
            standardExamQuestions: data.standardExamQuestions || 0,
            examPercentage: data.examPercentage || 0,
          };
        } else {
          console.warn("No data received for the given ID.");
        }
      }, error => {
        console.error("Error fetching record:", error);
      });
    }
    
    
    UpdateExamlist() {
      this.ielc.Updateexaminfo(this.examdata.id, this.examdata).subscribe(
        (response) => {
          console.log("Updated Successfully:", response);
          alert(" ✅ Record updated successfully!");
          this.GetExamlist();
         
        },
        (error) => {
          console.error("Error updating Record:", error);
        }
      );
    }
  
}
