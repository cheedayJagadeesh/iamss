import { Component } from '@angular/core';
import { IelcapiService } from '../ielcapi.service';
import { AuthService } from 'src/app/authservice.service';
import { MsalService } from '@azure/msal-angular';
import { Router } from '@angular/router';


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

  //  constructor(private ielc:IelcapiService) {

  //  }
   userName: string | null = null;
   userEmail: string | null = null;

  constructor(private msalService: MsalService, private authService: AuthService, private router: Router,private ielc:IelcapiService) {}
 
   async ngOnInit() {
    // try {
    //   await this.msalService.instance.handleRedirectPromise(); // Ensure MSAL is initialized
    //   this.authService.setActiveAccount(); // Ensure an account is set

    //   // this.authService.userName$.subscribe(username => {
    //   //   if (username) {
    //   //     this.userName = username;
    //   //   } else {
    //   //     this.authService.fetchUserDetails(); // Fetch from Microsoft Graph API if missing
    //   //   }
    //   // });
    //   this.authService.userDetails$.subscribe(userDetails => {
    //     this.userName = userDetails.displayName;
    //     this.userEmail = userDetails.email;
    //   });

    //   if (!this.authService.isAuthenticated()) {
    //     this.router.navigate(['/login']); // Redirect if not authenticated
    //   }
    // } catch (error) {
    //   console.error('MSAL initialization error in HomeComponent:', error);
    // }
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
