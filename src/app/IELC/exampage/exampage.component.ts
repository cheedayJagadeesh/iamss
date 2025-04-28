import { Component, OnInit, OnDestroy } from '@angular/core';
import { IelcapiService } from '../ielcapi.service';
import { Router } from '@angular/router'; 
import { AuthService } from 'src/app/authservice.service';
import { MsalService } from '@azure/msal-angular';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { EmailService } from 'src/app/email.service';
import { NgZone } from '@angular/core';
import { LazyLoadImageModule } from 'ng-lazyload-image';
declare var bootstrap: any;


interface exam{
  id: number;
  examTime: number;
  batchLimitMembers: number;
  displayExamQuestions: number;
  standardExamQuestions: number;
  examPercentage: number;
}
interface Question {
  [key: string]: string | number | File | undefined; // ✅ Allows dynamic property access

  questionId: number;
  skillName: string;
  question: string;
  a: string;
  b: string;
  c: string;
  d: string;
  iQuestion: string;
  ia: string;
  ib: string;
  ic: string;
  id: string;
  questionAnswer: string;

  iQuestionFile?: File;
  iaFile?: File;
  ibFile?: File;
  icFile?: File;
  idFile?: File;
}

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
  percentage: string,
  testTakenDate: string;
  subjectMatterKnowledge: string;
  presentation: string;
  communication: string;
  handlingDoubts: string;
  applicationtowork: string;
  comments: string;
}
@Component({
  selector: 'app-exampage',
  templateUrl: './exampage.component.html',
  styleUrls: ['./exampage.component.css']
})
export class ExampageComponent implements OnInit, OnDestroy  {
 
  questions: Question[] = [];
  resultdata: Enrollment = {
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

  currentQuestionIndex = 0;
  selectedAnswer: string | null = null;
  examlist: Question[] = [];
  isLoading = true;
  // examlist: any[] = []; 
  selectedSkill: string = '';
  examdata:exam={
    id: 0,
    examTime: 0,
    batchLimitMembers: 0,
    displayExamQuestions: 0,
    standardExamQuestions: 0,
    examPercentage: 0
   }
   timeLeft: number = this.examdata.examTime;
   timer: any;
   userName: string | null = null;
   userEmail: string | null = null;
   firstName: string = '';
   lastName: string = '';
   Registeredusers: any[] = []; 
   correctAnswersCount = 0;
   enrollmentID: number | null = null;
  constructor(private ielc:IelcapiService,private msalService: MsalService, private authService: AuthService, private router: Router,private route: ActivatedRoute,private emailService: EmailService,private zone: NgZone) {
    // this.route.queryParams.subscribe(params => {
    //   this.selectedSkill = params['skill'];
    // });
    this.route.queryParams.subscribe(params => {
      this.selectedSkill = params['skill'];
      this.enrollmentID = params['enrollment'] ? Number(params['enrollment']) : null;
    });
  }
 

  // preloadImages(imageData: string[]) {
  //   // Only preload if image data exists
  //   imageData.filter(image => image).forEach(image => {
  //     const img = new Image();
  //     img.src = 'data:image/jpeg;base64,' + image;
  //   });
  // }
  
  
   async ngOnInit(){
    // this.startTimer();
    this.GetExamlist();
    this.GetAllSkillsQa();

    

  try {
    console.log("Initializing MSAL...");
    
    // Ensure MSAL is properly initialized before proceeding
    await this.msalService.instance.initialize();  
    await this.msalService.instance.handleRedirectPromise();

    console.log("MSAL initialized successfully.");
    
    const activeAccount = this.msalService.instance.getActiveAccount();
    if (!activeAccount) {
      console.warn("No active account found. Redirecting to login...");
      this.router.navigate(['/login']);
      return;
    }

    this.authService.setActiveAccount();

    this.authService.userDetails$.subscribe(userDetails => {
      // this.userName = userDetails?.displayName || 'Unknown User';
      // this.userEmail = userDetails?.email || 'No Email';
      this.userName = userDetails?.displayName ;
      this.userEmail = userDetails?.email;
      if (userDetails) {
        this.userEmail = userDetails.email; // Ensure the email is correctly assigned
        this.GetAllUsers(); // Call this AFTER we get the email
      }
    });
    // this.authService.userDetails$.subscribe(userDetails => {
    //   if (userDetails) {
    //     this.userEmail = userDetails.email; // Ensure the email is correctly assigned
    //     this.GetAllUsers(); // Call this AFTER we get the email
    //   }
    // });   
  }
  
   catch (error) {
    console.error("MSAL initialization error in HeaderComponent:", error);
  }

  }

  // async ngOnInit() {
  //   try {
  //     console.log("Initializing MSAL...");
  //     await this.msalService.instance.initialize();  
  //     await this.msalService.instance.handleRedirectPromise();
  
  //     console.log("MSAL initialized successfully.");
      
  //     const activeAccount = this.msalService.instance.getActiveAccount();
  //     if (!activeAccount) {
  //       console.warn("No active account found. Redirecting to login...");
  //       this.router.navigate(['/login']);
  //       return;
  //     }
  
  //     this.authService.setActiveAccount();
  
  //     this.authService.userDetails$.subscribe(userDetails => {
  //       if (userDetails) {
  //         this.userName = userDetails.displayName;
  //         this.userEmail = userDetails.email;
  //         this.GetAllUsers(); // Trigger only after user info is available
  //       }
  //     });
  //   } catch (error) {
  //     console.error("MSAL initialization error:", error);
  //   }
  
  //   if (!this.selectedSkill) {
  //     console.warn("No selected skill. Skipping question generation.");
  //     return;
  //   }
  
  //   forkJoin({
  //     examinfo: this.ielc.Getexaminfo(),
  //     allQuestions: this.ielc.Getskillqa()
  //   }).subscribe(({ examinfo, allQuestions }) => {
  //     this.examdata = examinfo[0];
  //     this.timeLeft = this.examdata.examTime * 60;
  
  //     const standardSkillKey = `${this.selectedSkill}_StQuestions`;
  //     const totalQuestions = this.examdata.displayExamQuestions || allQuestions.length;
  //     const standardCount = this.examdata.standardExamQuestions || 0;
  
  //     const standardQuestions = allQuestions.filter((q: Question) => q.skillName === standardSkillKey);
  //     const standardQuestionIds = new Set(standardQuestions.map((q: Question) => q.id)); // assuming `id` exists
  
  //     const remainingCount = totalQuestions - standardQuestions.length;
  
  //     const skillQuestions = allQuestions.filter(
  //       (q: Question) => q.skillName === this.selectedSkill && !standardQuestionIds.has(q.id)
  //     );
  
  //     const combined = this.shuffleArray([
  //       ...this.shuffleArray(standardQuestions).slice(0, standardCount),
  //       ...this.shuffleArray(skillQuestions).slice(0, remainingCount)
  //     ]);
  
  //     this.questions = combined;
  //     this.currentQuestionIndex = 0;
  //     this.isLoading = false;
  //     if (this.timeLeft > 0) {
  //         this.startTimer(); 
  //       }
  //   });
  // }
  

 
  

  sortRegisteredUsers(data: any[]): any[] {
    return data.sort((a, b) => (a.enrollmentID > b.enrollmentID ? -1 : a.enrollmentID < b.enrollmentID ? 1 : 0));
  }
  GetAllUsers() {
    this.ielc.GetUsers().subscribe((data) => {
      const aadEmail = this.userEmail; // Use the retrieved AAD email
  
      if (aadEmail) {
        this.Registeredusers = this.sortRegisteredUsers(
          data.filter(user => user.mail === aadEmail)
        );
       
      } else {
        this.Registeredusers = []; // No users if email is missing
      }
    });
  }

  
 
  // GetExamlist() {
  //   this.ielc.Getexaminfo().subscribe((data) => {
  //     console.log("Exam data received:", data);
  //     if (data && data.length > 0) {
  //       this.examdata = this.examlist[0]; 
  //       this.timeLeft = this.examdata.examTime * 60; 
  //       console.log("Assigned timeLeft:", this.timeLeft);
  //       console.log("Total Questions:", this.examdata.displayExamQuestions);
  //       if (this.timeLeft > 0) {
  //         this.startTimer(); 
  //       }
  //     }
  //   }, (error) => {
  //     console.error("Error fetching exam data", error);
  //   });
  // }
  GetExamlist() {
    this.ielc.Getexaminfo().subscribe((data) => {
      console.log("Exam data received:", data);
      if (data && data.length > 0) {
        this.examdata = data[0];  // <-- only assign to examdata
        this.timeLeft = this.examdata.examTime * 60; 
        // console.log("Assigned timeLeft:", this.timeLeft);
        // console.log("Total Questions:", this.examdata.displayExamQuestions);
  
        // if (this.timeLeft > 0) {
        //   this.startTimer(); 
        // }
      }
     
    }, (error) => {
      console.error("Error fetching exam data", error);
     
    });
    
  }
  
  // GetAllSkillsQa() {
  //   this.ielc.Getskillqa().subscribe((data: Question[]) => {
  //     this.examlist = data;
  
  //     // Filter by selected skill
  //     let filteredQuestions = this.selectedSkill
  //       ? data.filter((q: Question) => q.skillName === this.selectedSkill)
  //       : data;
  
  //     // Shuffle the filtered questions
  //     filteredQuestions = this.shuffleArray(filteredQuestions);
  
  //     // Limit questions based on displayExamQuestions
  //     const displayCount = this.examdata.displayExamQuestions || filteredQuestions.length;
  //     this.questions = filteredQuestions.slice(0, displayCount);
  
  //     this.currentQuestionIndex = 0;
  //     this.isLoading = false;
  //     if (this.timeLeft > 0) {
  //       this.startTimer(); 
  //     }
  //   });
  // }
  //=======================================================working code
  GetAllSkillsQa() {
    this.isLoading = true; 
    this.ielc.Getskillqa().subscribe((data: Question[]) => {
      this.examlist = data;
  
      const standardSkillKey = this.selectedSkill + '_StQuestions';
      const totalQuestions = this.examdata.displayExamQuestions || data.length;
      const standardCount = this.examdata.standardExamQuestions || 0;
      
      // 🔹 Get and shuffle standard questions
      const standardQuestions = this.shuffleArray(
        data.filter(q => q.skillName === standardSkillKey)
      ).slice(0, standardCount);
      
      // 🔹 Remaining questions count
      const remainingCount = totalQuestions - standardQuestions.length;
  
      const skillQuestions = data
        .filter(q => q.skillName === this.selectedSkill)
        .filter(q => !standardQuestions.includes(q)); // avoid duplicates
      const shuffledSkillQuestions = this.shuffleArray(skillQuestions).slice(0, remainingCount);
  
      // Combine standard + remaining
      // this.questions = [...standardQuestions, ...shuffledSkillQuestions];

      const combined = [...standardQuestions, ...shuffledSkillQuestions];
      this.questions = this.shuffleArray(combined); 
  
      // Final setup
      this.currentQuestionIndex = 0;
      this.isLoading = false;
  
      if (this.timeLeft > 0) {
        this.startTimer();
      }
    });
  }

  // GetAllSkillsQa() {
  //   this.isLoading = true; // Set loading state immediately
  //   this.ielc.Getskillqa().subscribe((data: Question[]) => {
  //     this.examlist = data;
  
  //     const standardSkillKey = `${this.selectedSkill}_StQuestions`;
  //     const totalQuestions = this.examdata.displayExamQuestions || data.length;
  //     const standardCount = this.examdata.standardExamQuestions || 0;
  
  //     // 🔹 Get and shuffle standard questions
  //     const standardQuestions = this.shuffleArray(
  //       data.filter(q => q.skillName === standardSkillKey)
  //     ).slice(0, standardCount);
  
  //     // 🔹 Remaining questions count
  //     const remainingCount = totalQuestions - standardQuestions.length;
  
  //     // 🔹 Filter and shuffle skill questions more efficiently using a Set
  //     const skillQuestionsSet = new Set(data.filter(q => q.skillName === this.selectedSkill).map(q => q.id)); // Assuming `id` is unique for each question
  //     const remainingQuestions = data.filter(q => !standardQuestions.includes(q) && skillQuestionsSet.has(q.id));
  //     const shuffledSkillQuestions = this.shuffleArray(remainingQuestions).slice(0, remainingCount);
  
  //     // Combine standard + remaining
  //     const combined = [...standardQuestions, ...shuffledSkillQuestions];
  //     this.questions = this.shuffleArray(combined);
  
  //     // Final setup
  //     this.currentQuestionIndex = 0;
  //     this.isLoading = false;
  
  //     if (this.timeLeft > 0) {
  //       this.startTimer();
  //     }
  //   });
  // }

  //========================================working scenario 2
// GetAllSkillsQa() {
//   this.isLoading = true;
//   const getUsers$ = this.ielc.GetUsers();
//   const getExamInfo$ = this.ielc.Getexaminfo();
//   const getSkillQa$ = this.ielc.Getskillqa();

//   forkJoin([getUsers$, getExamInfo$, getSkillQa$]).subscribe(
//     ([usersData, examData, skillData]) => {
//       const aadEmail = this.userEmail; // Use the retrieved AAD email
//       if (aadEmail) {
//         this.Registeredusers = this.sortRegisteredUsers(
//           usersData.filter(user => user.mail === aadEmail)
//         );
//       } else {
//         this.Registeredusers = []; // No users if email is missing
//       }

//       if (examData && examData.length > 0) {
//         this.examdata = examData[0];
//         this.timeLeft = this.examdata.examTime * 60;
//       }

//       const standardSkillKey = this.selectedSkill + '_StQuestions';
//       const totalQuestions = this.examdata.displayExamQuestions || skillData.length;
//       const standardCount = this.examdata.standardExamQuestions || 0;

//       // 🔹 Get and shuffle standard questions
//       const standardQuestions = this.shuffleArray(
//         skillData.filter((q: Question) => q.skillName === standardSkillKey)
//       ).slice(0, standardCount);

//       // 🔹 Remaining questions count
//       const remainingCount = totalQuestions - standardQuestions.length;

//       const skillQuestions = skillData
//         .filter((q: Question) => q.skillName === this.selectedSkill)
//         .filter((q: Question) => !standardQuestions.includes(q)); // avoid duplicates
//       const shuffledSkillQuestions = this.shuffleArray(skillQuestions).slice(0, remainingCount);

//       // Combine standard + remaining
//       const combined = [...standardQuestions, ...shuffledSkillQuestions];
//       this.questions = this.shuffleArray(combined); 

//         // 👉👉 ADD PRELOAD IMAGES HERE
//         // const allImages: string[] = [];
//         // this.questions.forEach(q => {
//         //   if (q.iQuestion) allImages.push(q.iQuestion);
//         //   if (q.ia) allImages.push(q.ia);
//         //   if (q.ib) allImages.push(q.ib);
//         //   if (q.ic) allImages.push(q.ic);
//         //   if (q.id) allImages.push(q.id);
//         // });
//         // this.preloadImages(allImages);

//       // Final setup
//       this.currentQuestionIndex = 0;
//       this.isLoading = false;

//       if (this.timeLeft > 0) {
//         this.startTimer();
//       }
//     },
//     (error) => {
//       console.error("Error fetching data", error);
//       this.isLoading = false;
//     }
//   );
// }
  
  

  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  formatDateToCustomString(): string {
    const now = new Date();
  
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
    const month = months[now.getMonth()];
    const day = now.getDate(); // no leading zero
    const year = now.getFullYear();
  
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 becomes 12
  
    const formattedHour = hours.toString().padStart(2, '0');
  
    return `${month} ${day} ${year} ${formattedHour}:${minutes}${ampm}`;
  }
  
  
  // UpdateResult() {
  //   if (this.Registeredusers.length > 0) {
  //     // Match the user by skill, and if enrollmentID is available, use it too
  //     const matchedUser = this.Registeredusers.find(user =>
  //       user.skillName === this.selectedSkill &&
  //       (this.enrollmentID ? user.enrollmentID === this.enrollmentID : true)
  //     );
  
  //     if (!matchedUser) {
  //       alert("⚠️ No matching registration found for this skill.");
  //       return;
  //     }
  
  //     const totalQuestions = this.examdata.displayExamQuestions;
  //     const percentage = (this.correctAnswersCount / totalQuestions) * 100;
  //     const formattedDate = this.formatDateToCustomString();
  
  //     this.resultdata = {
  //       ...matchedUser,
  //       testTakenDate: formattedDate,
  //       percentage: percentage.toFixed(0),
  //       result: "Completed"
  //     };
     
  //     this.ielc.Updatefeedback(matchedUser.enrollmentID, this.resultdata).subscribe(
  //       (response) => {
  //         // console.log('✅ Updated Successfully:', response);
  //         alert("✅ Exam Completed!\nThank you for taking the test.");
  //         // this.router.navigate(['/registration'], { queryParams: { submittedID: matchedUser.enrollmentID } });
  //         this.router.navigate(['/registration']);
  //       },
  //       (error) => {
  //         console.error('❌ Error updating Record:', error);
  //         alert("❌ Failed to submit your result. Please try again.");
  //       }
  //     );
  //   } else {
  //     alert("⚠️ Registered users not loaded.");
  //   }
  // }
  

  examPassed: boolean = false;
percentage: number = 0;

UpdateResult() {
  if (this.Registeredusers.length > 0) {
    const matchedUser = this.Registeredusers.find(user =>
      user.skillName === this.selectedSkill &&
      (this.enrollmentID ? user.enrollmentID === this.enrollmentID : true)
    );

    if (!matchedUser) {
      alert("⚠️ No matching registration found for this skill.");
      return;
    }

    const totalQuestions = this.examdata.displayExamQuestions;
    this.percentage = (this.correctAnswersCount / totalQuestions) * 100;
    const formattedDate = this.formatDateToCustomString();
    this.examPassed = this.percentage >= this.examdata.examPercentage;

    this.resultdata = {
      ...matchedUser,
      testTakenDate: formattedDate,
      percentage: this.percentage.toFixed(0),
      result: "Completed"
    };

    this.ielc.Updatefeedback(matchedUser.enrollmentID, this.resultdata).subscribe(
     async (response) => {
        this.openModal(); // Show result modal


        const to = matchedUser.email || this.userEmail;
        const cc = '';
        const subject = `Exam Test Status`;
        let body =''

        if (this.examPassed) {
          // emailSubject = "🎉 Exam Completed - Congratulations!";
          body = `
            <p><strong>🎉 Wohoo! Congratulations! You passed the exam!</strong></p>
            <p>Here is your result</p>
            <table style="border: 1px solid #ddd; border-collapse: collapse; width: 100%;">
              <thead>
               <tr style="background-color: #f2f2f2;">
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">SkillName</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Percentage</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                 <td style="border: 1px solid #ddd; padding: 8px;">${this.selectedSkill}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${this.percentage.toFixed(0)}%</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Completed</td>
                </tr>
              </tbody>
            </table>
            <p style="margin-top: 15px;">Thank you for your effort and dedication!</p>
              <br>
          `;
        } else {
          // emailSubject = "📘 Exam Status - Reattempt Required";
          body = `
            <p><strong>🙁 Oh no! Better luck next time!</strong></p>
            <p>Here is your result</p>
            <table style="border: 1px solid #ddd; border-collapse: collapse; width: 100%;">
              <thead>
                  <tr style="background-color: #f2f2f2;">
                  <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">SkillName</th>
                  <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Percentage</th>
                  <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    <td style="border: 1px solid #ddd; padding: 8px;">${this.selectedSkill}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${this.percentage.toFixed(0)}%</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">Pending</td>
                </tr>
              </tbody>
            </table>
            <p style="margin-top: 15px;">Please prepare and re-attempt the test again.</p>
            <br>
          `;
        }
        this.emailService.sendEmail(to,cc, subject, body);
        // alert("📩 You will receive your exam status via email shortly.");
      },
      (error) => {
        console.error('❌ Error updating Record:', error);
        alert("❌ Failed to submit your result. Please try again.");
      }
    );
  } else {
    alert("⚠️ Registered users not loaded.");
  }
}


openModal() {
  const modal = new bootstrap.Modal(document.getElementById('resultModal')!);
  modal.show();
}

closeModal() {
  const modalElement = document.getElementById('resultModal')!;
  const modalInstance = bootstrap.Modal.getInstance(modalElement);
  modalInstance?.hide();
  alert("📩 You will receive your exam status via email shortly.");
  this.router.navigate(['/registration']);
}

  
  
  submitExam() {
    clearInterval(this.timer); // Stop timer when submitting
  
    // Submit result to backend
    this.UpdateResult(); // This handles the alert + navigation
  }
  
  
 
  
  ngOnDestroy(): void {
    clearInterval(this.timer); 
  }

  // startTimer() {
  //   this.timer = setInterval(() => {
  //     if (this.timeLeft > 0) {
  //       this.timeLeft--;
  //     } else {
  //       clearInterval(this.timer);
  //       alert("⏰ Time's up! Submitting your answers...");
  //       // this.router.navigate(['/registration']);
  //     }
  //   }, 1000); // Update timer every second
  // }
  startTimer() {
    this.timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.timer);
        alert("⏰ Time's up! Submitting your answers...");
  
        this.zone.run(() => {
          this.submitExam(); // ✅ forcefully call inside Angular zone
        });
      }
    }, 1000);
  }

  get formattedTime(): string {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    return `${minutes} Minute${minutes !== 1 ? 's' : ''} ${seconds} Second${seconds !== 1 ? 's' : ''}`;
  }

  get currentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  // nextQuestion() {
  //   if (this.selectedAnswer) {
  //     this.selectedAnswer = null; // Reset answer for next question
  //     if (this.currentQuestionIndex < this.questions.length - 1) {
  //       this.currentQuestionIndex++;
  //     } else {
  //       clearInterval(this.timer); // Stop timer when exam is completed
  //       alert("Exam Completed!");
  //       this.router.navigate(['/registration']);
  //     }
  //   }
  // }
  // nextQuestion() {
  //   if (this.selectedAnswer) {
  //     this.selectedAnswer = null; // Reset answer for next question
  //     if (this.currentQuestionIndex < this.questions.length - 1) {
  //       this.currentQuestionIndex++;
  //     } else {
  //       clearInterval(this.timer); // Stop timer when exam is completed
  //       alert("Exam Completed!");
  //       this.router.navigate(['/registration']);
  //     }
  //   }
  // }
  // nextQuestion() {
  //   if (this.selectedAnswer) {
  //     const correctAnswer = this.currentQuestion.questionAnswer;
  
  //     // ✅ Check if selected answer is correct
  //     if (this.selectedAnswer.toUpperCase() === correctAnswer.toUpperCase()) {
  //       this.correctAnswersCount++;
  //     }
  
  //     this.selectedAnswer = null; // Reset for next question
  
  //     if (this.currentQuestionIndex < this.questions.length - 1) {
  //       this.currentQuestionIndex++;
  //     } else {
  //       clearInterval(this.timer); // Stop timer
  
  //       const totalQuestions = this.examdata.displayExamQuestions;
  //       const percentage = (this.correctAnswersCount / totalQuestions) * 100;
  
  //       alert(`Exam Completed!\nYour Score: ${percentage}`);
  
  //       // You can submit this result to backend here if needed
  //       this.router.navigate(['/registration']);
  //     }
  //   } else {
  //     alert("Please select an answer before proceeding.");
  //   }
  // }

  nextQuestion() {
    if (this.selectedAnswer) {
      const correctAnswer = this.currentQuestion.questionAnswer;
  
      // ✅ Track correct answers
      if (this.selectedAnswer.toUpperCase() === correctAnswer.toUpperCase()) {
        this.correctAnswersCount++;
      }
  
      this.selectedAnswer = null; // Reset for next question
  
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
      }
      else {
        // Last question, submit the exam
        this.submitExam();
      }
    } else {
      alert("⚠️ Please select an answer before proceeding.");
    }
  }
  
  // forceSubmitExam() {
  //   let correctAnswers = 0;
  //   let totalQuestions = this.questions.length;
  
  //   this.questions.forEach(q => {
  //     if (q.selectedAnswer) {  // only check if user selected an answer
  //       if (q.selectedAnswer === q.correctAnswer) {
  //         correctAnswers++;
  //       }
  //     }
  //   });
  
  //   let percentage = (correctAnswers / totalQuestions) * 100;
    
  //   // Save or send the result
  //   this.saveExamResult(correctAnswers, totalQuestions, percentage);
  
  //   // Navigate to result page or show result
  // }
  
  
  

  goBack() {
    if (confirm("Are you sure you want to exit the exam? Your progress will not be saved.")) {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.selectedAnswer = null;
    }
  }
 }
}
