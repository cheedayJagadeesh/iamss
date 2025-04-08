import { Component, OnInit, OnDestroy } from '@angular/core';
import { IelcapiService } from '../ielcapi.service';
import { Router } from '@angular/router'; 
import { AuthService } from 'src/app/authservice.service';
import { MsalService } from '@azure/msal-angular';
import { ActivatedRoute } from '@angular/router';

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
  constructor(private ielc:IelcapiService,private msalService: MsalService, private authService: AuthService, private router: Router,private route: ActivatedRoute) {
    // this.route.queryParams.subscribe(params => {
    //   this.selectedSkill = params['skill'];
    // });
    this.route.queryParams.subscribe(params => {
      this.selectedSkill = params['skill'];
      this.enrollmentID = params['enrollment'] ? Number(params['enrollment']) : null;
    });
  }
  
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
    });
    this.authService.userDetails$.subscribe(userDetails => {
      if (userDetails) {
        this.userEmail = userDetails.email; // Ensure the email is correctly assigned
        this.GetAllUsers(); // Call this AFTER we get the email
      }
    });   
  }
  
   catch (error) {
    console.error("MSAL initialization error in HeaderComponent:", error);
  }
  }
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
        console.log("Assigned timeLeft:", this.timeLeft);
        console.log("Total Questions:", this.examdata.displayExamQuestions);
  
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
  
  GetAllSkillsQa() {
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
  
  
  UpdateResult() {
    if (this.Registeredusers.length > 0) {
      // Match the user by skill, and if enrollmentID is available, use it too
      const matchedUser = this.Registeredusers.find(user =>
        user.skillName === this.selectedSkill &&
        (this.enrollmentID ? user.enrollmentID === this.enrollmentID : true)
      );
  
      if (!matchedUser) {
        alert("⚠️ No matching registration found for this skill.");
        return;
      }
  
      const totalQuestions = this.examdata.displayExamQuestions;
      const percentage = (this.correctAnswersCount / totalQuestions) * 100;
      const formattedDate = this.formatDateToCustomString();
  
      this.resultdata = {
        ...matchedUser,
        testTakenDate: formattedDate,
        percentage: percentage.toFixed(0),
        result: "Completed"
      };
  
      this.ielc.Updatefeedback(matchedUser.enrollmentID, this.resultdata).subscribe(
        (response) => {
          // console.log('✅ Updated Successfully:', response);
          alert("✅ Exam Completed!\nThank you for taking the test.");
          // this.router.navigate(['/registration'], { queryParams: { submittedID: matchedUser.enrollmentID } });
          this.router.navigate(['/registration']);
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
  
  
  
  submitExam() {
    clearInterval(this.timer); // Stop timer when submitting
  
    // Submit result to backend
    this.UpdateResult(); // This handles the alert + navigation
  }
  
  
 
  
  ngOnDestroy(): void {
    clearInterval(this.timer); 
  }

  startTimer() {
    this.timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.timer);
        alert("Time's up! Exam ended.");
        this.router.navigate(['/registration']);
      }
    }, 1000); // Update timer every second
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
    } else {
      alert("⚠️ Please select an answer before proceeding.");
    }
  }
  
  
  
  

  goBack() {
    if (confirm("Are you sure you want to exit the exam? Your progress will not be saved.")) {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.selectedAnswer = null;
    }
  }
 }
}
