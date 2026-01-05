import { Component, OnInit, OnDestroy } from '@angular/core';
import { IelcapiService } from '../ielcapi.service';
import { Router } from '@angular/router'; 
import { AuthService } from 'src/app/authservice.service';
import { MsalService } from '@azure/msal-angular';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, lastValueFrom, firstValueFrom   } from 'rxjs';
import { EmailService } from 'src/app/email.service';
import { NgZone } from '@angular/core';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { environment } from '../environment';
declare var bootstrap: any;


interface exam{
  sessionID: number;
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
  sessionID: number;
}
@Component({
  selector: 'app-exampage',
  templateUrl: './exampage.component.html',
  styleUrls: ['./exampage.component.css']
})
export class ExampageComponent implements OnInit  {

 
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
    sessionID: 0,
    }

     examdata:exam={
    sessionID: 0,
    examTime: 0,
    batchLimitMembers: 0,
    displayExamQuestions: 0,
    standardExamQuestions: 0,
    examPercentage: 0
   }

  currentQuestionIndex = 0;
  selectedAnswer: string | null = null;
  examlist: Question[] = [];
  isLoading = true;
  // examlist: any[] = []; 
  selectedSkill: string = '';
   timeLeft: number = this.examdata.examTime;
   timer: any;
   userName: string | null = null;
   userEmail: string | null = null;
   firstName: string = '';
   lastName: string = '';
   Registeredusers: any[] = []; 
   correctAnswersCount = 0;
   enrollmentID: number | null = null;
   sessionID: number | null = null;
   examdataList: exam[] = [];

   // ✅ Throttle for tab switch detection
   lastTabSwitchTime: number = 0;
   tabSwitchThrottleMs: number = 2000; // 2 second cooldown
   lastScreenshotAlertTime: number = 0;
   screenshotThrottleMs: number = 1000; // 1 second cooldown
   isAlertShowing: boolean = false; // Prevent multiple alerts

loadingProgress: number = 0;
fakePercent = 0;
 showWarningBanner = false;
warningMessage = '';
isExamLocked = false;
fullscreenExited = false;
maxFullscreenAttempts = 4;
remainingFullscreenAttempts = 4;


violationCountdown = 10;
violationTimer: any = null;
isViolationCountdownActive = false;
resumeAllowed = true;
showViolationModal = false;
  //isAutoSubmitDueToViolation: any;




// maxFullscreenAttempts = 3;
// remainingFullscreenAttempts = 3;

// fullscreenCountdown = 10; // seconds before auto-submit
// countdownTimer: any = null;



  constructor(private ielc:IelcapiService,private msalService: MsalService, private authService: AuthService, private router: Router,private route: ActivatedRoute,private emailService: EmailService,private zone: NgZone) {
    this.route.queryParams.subscribe(params => {
      this.selectedSkill = params['skill'];
      this.enrollmentID = params['enrollment'] ? Number(params['enrollment']) : null;
      this.sessionID = params['session'] ? Number(params['session']) : null;
    });
  }
  // ngOnDestroy(): void {
  //   throw new Error('Method not implemented.');
  // }
  
  //  async ngOnInit(){
  //   this.GetExamlist();
  //   this.GetAllSkillsQa();
   
  // try {
  //   await this.msalService.instance.initialize();  
  //   await this.msalService.instance.handleRedirectPromise();
  //   const activeAccount = this.msalService.instance.getActiveAccount();
  //   if (!activeAccount) {
  //      console.warn("No active account found. Redirecting to login...");
  //     this.router.navigate(['/login']);
  //     return;
  //   }

  //   this.authService.setActiveAccount();

  //   this.authService.userDetails$.subscribe(userDetails => {
  //     this.userName = userDetails?.displayName ;
  //     this.userEmail = userDetails?.email;
  //     if (userDetails) {
  //       this.userEmail = userDetails.email;
  //       this.GetAllUsers();
  //     }
  //   }); 
  // }
  //  catch (error) {
  //   // console.error("MSAL initialization error in HeaderComponent:", error);
  // }
  // }

private blurHandler!: () => void;
  async ngOnInit() {
    // Prevent all right-click and context menus
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('copy', e => e.preventDefault());
    document.addEventListener('cut', e => e.preventDefault());
    document.addEventListener('paste', e => e.preventDefault());

// document.addEventListener('fullscreenchange', () => {
//   if (!document.fullscreenElement) {
//     this.tabSwitchCount++;

//     this.warningMessage =
//       '⚠️ Fullscreen exited! This violation is recorded.';
//     this.showWarningBanner = true;

//     setTimeout(() => {
//       this.showWarningBanner = false;
//     }, 4000);

// //     if (this.tabSwitchCount >= 4) {
// //   this.submitExam();
// // }

// if (this.tabSwitchCount >= 4 && !this.showViolationModal) {
//   this.resumeAllowed = false;   // 🚫 disable resume
//   this.startViolationModal();
// }

//   }
// });

document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement && this.isExamLocked) {

    this.tabSwitchCount++;

    // 🚫 If attempts already exhausted → do nothing here
    if (this.remainingFullscreenAttempts <= 0) {
      return;
    }

    this.remainingFullscreenAttempts--;
    this.fullscreenExited = true;

    // 🔴 If this was the LAST allowed attempt
    if (this.remainingFullscreenAttempts === 0) {
      // Do NOT show resume popup
      this.fullscreenExited = false;

      // Start violation countdown / auto-submit
      this.startViolationModal();
      return;
    }
  }
});



// document.addEventListener('fullscreenchange', () => {
//   if (!document.fullscreenElement && this.isExamLocked) {

//     this.fullscreenExited = true;
//     this.remainingFullscreenAttempts--;

//     // Reset countdown
//     this.fullscreenCountdown = 10;

//     // Show warning banner
//     this.warningMessage =
//       '⚠️ Fullscreen exited. Resume fullscreen to continue.';
//     this.showWarningBanner = true;

//     // Start countdown to auto-submit
//     this.startFullscreenCountdown();

//     // Auto-submit if attempts exhausted
//     if (this.remainingFullscreenAttempts <= 0) {
//       this.submitExam();
//     }
//   }
// });


document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement && this.isExamLocked) {
      this.fullscreenExited = true;
      //this.tabSwitchCount++;

      // this.warningMessage =
      //  '⚠️ You exited fullscreen. Click "Resume Exam" to continue.';
      // this.showWarningBanner = true;
    }
  });



  this.blurHandler = () => {
    const now = Date.now();

    if (
      now - this.lastTabSwitchTime > this.tabSwitchThrottleMs &&
      !this.isAlertShowing
    ) {
      //this.tabSwitchCount++;
      this.lastTabSwitchTime = now;
      this.isAlertShowing = true;

      // ✅ Show warning banner instead of alert
      //this.warningMessage = '⚠️ Tab switching detected! This activity is monitored. Alert sent to Administrator!';
      this.showWarningBanner = true;

      // Auto-hide banner after 5 seconds
      setTimeout(() => {
        this.showWarningBanner = false;
        this.isAlertShowing = false;
      }, 5000);
    }
  };

  window.addEventListener('blur', this.blurHandler);



    // ✅ AGGRESSIVE keyboard prevention for screenshots and dev tools
    document.addEventListener('keydown', (e: any) => {
      // Block PrintScreen
      if (e.key === 'PrintScreen' || e.code === 'PrintScreen') {
        e.preventDefault();
        e.stopPropagation();
        this.showToastNotification('⚠️ Screenshots blocked');
        return;
      }

      // Block Ctrl+PrintScreen
      if (e.ctrlKey && (e.key === 'PrintScreen' || e.code === 'PrintScreen')) {
        e.preventDefault();
        e.stopPropagation();
        this.showToastNotification('⚠️ Screenshots blocked');
        return;
      }

      // Block Alt+PrintScreen
      if (e.altKey && (e.key === 'PrintScreen' || e.code === 'PrintScreen')) {
        e.preventDefault();
        e.stopPropagation();
        this.showToastNotification('⚠️ Screenshots blocked');
        return;
      }

      // Block Shift+PrintScreen
      if (e.shiftKey && (e.key === 'PrintScreen' || e.code === 'PrintScreen')) {
        e.preventDefault();
        e.stopPropagation();
        this.showToastNotification('⚠️ Screenshots blocked');
        return;
      }

      // Block Windows Key + Shift + S (Snipping Tool) - MOST IMPORTANT
      if (e.metaKey && e.shiftKey && e.key === 's') {
        e.preventDefault();
        e.stopPropagation();
        this.showToastNotification('⚠️ Snipping tool blocked');
        return;
      }

      // Block Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+P, Ctrl+S
      if (e.ctrlKey && ['c', 'v', 'x', 'p', 's'].includes(e.key.toLowerCase())) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Block F12 (Developer Tools)
      if (e.key === 'F12' || e.code === 'F12') {
        e.preventDefault();
        e.stopPropagation();
        this.showToastNotification('⚠️ Dev tools blocked');
        return;
      }

      // Block Ctrl+Shift+I (Inspector)
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i') {
        e.preventDefault();
        e.stopPropagation();
        this.showToastNotification('⚠️ Dev tools blocked');
        return;
      }

      // Block Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'j') {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Block Ctrl+Shift+C (Element Inspector)
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Block Ctrl+Shift+K (Console)
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
    }, true); // Use capture phase to intercept early

    // ✅ Block keyup for PrintScreen
    document.addEventListener('keyup', (e: any) => {
      if (e.key === 'PrintScreen' || e.code === 'PrintScreen') {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
    }, true);

    // ✅ Monitor clipboard for screenshot content
    document.addEventListener('paste', (e) => {
      e.preventDefault();
    });

    document.addEventListener('copy', (e) => {
      e.preventDefault();
    });

    // ✅ Blur page when tab is hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        document.body.style.filter = 'blur(10px)';
        //this.tabSwitchCount++;
      } else {
        document.body.style.filter = 'none';
      }
    });

    // ✅ Disable right-click entirely
    document.addEventListener('mousedown', (e: any) => {
      if (e.button === 2) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
    }, true);

    // ✅ Block drag and drop
    document.addEventListener('dragstart', (e) => {
      e.preventDefault();
      return false;
    });

    document.addEventListener('dragover', (e) => {
      e.preventDefault();
      return false;
    });

    document.addEventListener('drop', (e) => {
      e.preventDefault();
      return false;
    });

    // ✅ Prevent user select
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';
    (document.body as any).style.msUserSelect = 'none';
    (document.body as any).style.mozUserSelect = 'none';

    // ✅ Monitor for screen capture API attempts
    if ((navigator as any).mediaDevices && (navigator as any).mediaDevices.getDisplayMedia) {
      const originalGetDisplayMedia = (navigator as any).mediaDevices.getDisplayMedia;
      (navigator as any).mediaDevices.getDisplayMedia = function () {
        console.warn('Screen capture attempt blocked');
        return Promise.reject(new Error('Screen capture is disabled'));
      };
    }

    // 1) Load exam meta first
    this.ielc.GetSessionById(this.sessionID).subscribe(
      (data: exam[]) => {
        if (data && data.length > 0) {
          this.examdataList = data;
          this.examdata = data[0];
          this.timeLeft = this.examdata.examTime * 60;
          this.GetAllSkillsQa();
        }
      },
      error => {
        console.error('Error fetching exam data', error);
      }
    );

    // 2) Load user data
    try {
      await this.msalService.instance.initialize();
      await this.msalService.instance.handleRedirectPromise();
      const activeAccount = this.msalService.instance.getActiveAccount();
      if (!activeAccount) {
        this.router.navigate(['/login']);
        return;
      }

      this.authService.setActiveAccount();
      this.authService.userDetails$.subscribe(userDetails => {
        this.userName = userDetails?.displayName;
        this.userEmail = userDetails?.email;
        if (userDetails) {
          this.GetAllUsers();
        }
      });
    } catch (error) {
      // handle msal error if needed
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

  GetExamlist() {
    //debugger;
  this.ielc.GetSessionById(this.sessionID).subscribe(
    (data: exam[]) => {
      if (data && data.length > 0) {
        this.examdataList = data;
        this.examdata = data[0];  
        this.timeLeft = this.examdata.examTime * 60; 
        //console.log("Exam list", data);
        //console.log("time left", this.timeLeft);
      }
    },
    (error) => {
      console.error("Error fetching exam data", error);
    }
  );
}


  async compressBase64Image(base64: string, maxWidth = 400, quality = 0.7): Promise<string> {
    const img = new Image();
    img.src = base64;
  
    await new Promise<void>((resolve) => {
      img.onload = () => resolve();
    });
  
    const canvas = document.createElement('canvas');
    const scale = maxWidth / img.width;
    canvas.width = maxWidth;
    canvas.height = img.height * scale;
  
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas context not available');
  
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  
    return canvas.toDataURL('image/jpeg', quality);
  }
  

  progressValue = 0;
  circumference = 2 * Math.PI * 40;
  //=======================================================working code
  async GetAllSkillsQa() {
    this.isLoading = true;
    this.progressValue = 0;
    this.simulateLoading(); 
    //debugger;
    this.ielc.Getskillqa(this.selectedSkill).subscribe((data: Question[]) => {
    //console.log("all ques", data);
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
      //console.log("all ques", this.questions);

      this.isExamLocked = true;
this.enterFullscreen();
document.body.style.overflow = 'hidden';
     
      // Final setup
      this.currentQuestionIndex = 0;
      // this.isLoading = false;
  
      if (this.timeLeft > 0) {
        this.startTimer();
      }
     
    this.progressValue = 100;
    setTimeout(() => {
      this.isLoading = false;
    }, 300); 
      // this.isLoading = false;
    });
  }

 
  simulateLoading() {
    const interval = setInterval(() => {
      if (this.progressValue < 95) {
        this.progressValue += 3;
      } else {
        clearInterval(interval); // Let GetAllSkillsQa() finish it to 100
      }
    }, 200);
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
    // console.log('🧮 Total Questions:', totalQuestions);
    
    const attemptedQuestions = this.questions.filter(q => q['userAnswer']?.toString().trim() !== '').length;
    // console.log('✏️ Attempted Questions:', attemptedQuestions);
  //this.correctAnswersCount++;
  // console.log('📝 Matched Answers:', matchedAnswers);

    // console.log('✅ Correct Answers:', this.correctAnswersCount);
    this.percentage = (this.correctAnswersCount / totalQuestions) * 100;


    // console.log('📊 Calculated Percentage:', this.percentage);
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
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Registration Date</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Percentage</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                 <td style="border: 1px solid #ddd; padding: 8px;">${this.selectedSkill}</td>
                 <td style="border: 1px solid #ddd; padding: 8px;">${this.resultdata.enrollmentDate}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${this.percentage.toFixed(0)}%</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Completed</td>
                </tr>
              </tbody>
            </table>
            <br>
            <div style="border: 4px solid #0d6efd; padding: 30px; font-family: Arial, sans-serif; max-width: 600px; margin: auto; background-color: #fff;">
              <div style="text-align: center;">
                <h2 style="color: #0d6efd; margin: 0; font-size: 35px">INTEQ SOFTWARE LLP</h2>
                <h5 style="color: #999; margin-top: 5px;margin-left:40%">Innovation through people</h5>
                <h3 style="color: #999; margin-top: 10px;">Certificate of Completion</h3>
                <p style="color: #444; font-size: 16px;">This certificate is issued to</p>
                <h2 style="margin: 10px 0; color: #333;">${this.userName}</h2>
                <p style="font-size: 16px;">For successfully completing of the <strong>${this.selectedSkill}</strong> online test on <strong>${new Date().toLocaleDateString()}</strong>.</p>
                
                <img src="https://img.icons8.com/color/96/medal.png" alt="Medal" style="margin-top: 20px;" width="80" height="80"/><br>
             <div style="display: flex; margin-top: 20px; ">
              <img src="https://th.bing.com/th/id/OLC.rH1hOQll17Ivig480x360?&rs=1&pid=ImgDetMain" alt="Italian Trulli" style="margin-left: 0%;" width="150" height="100" style="margin-right: 20px;" />
              <p style="font-size: 18px; color: #666; margin: 30;margin-left: 30%;">
                C V Prasad <br> CISO / MR / Program Manager
              </p>
            </div>
            </div>
              <p style="color: #999; font-size: 10px; margin-top: 10px;text-align:center">INTEQ SOFTWARE LLP, 1-10-75-1 to 6, 1st Floor, Saptagiri Towers, Begumpet, HYDERABAD 500016, INDIA </p>
                  <p style="color: #999; font-size: 10px; margin-top: 10px; text-align:center">www.inteqsolutions.com</p>    
            </div>
  <p class="contact-info">
  For ISMS &amp; QMS queries contact:
  <a href="mailto:ramprasadh@inteqsolutions.com">ramprasadh@inteqsolutions.com</a>
</p>
            <br>
            <p style="margin-top: 15px; color: Green;">Thank you for your effort and dedication!</p>
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
                  <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Registration Date</th>
                  <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Percentage</th>
                  <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    <td style="border: 1px solid #ddd; padding: 8px;">${this.selectedSkill}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${this.resultdata.enrollmentDate}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${this.percentage.toFixed(0)}%</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">Failed</td>
                </tr>
              </tbody>
            </table>
  <p class="contact-info">
  For ISMS &amp; QMS queries contact:
  <a href="mailto:ramprasadh@inteqsolutions.com">ramprasadh@inteqsolutions.com</a>
</p>



            <p style="margin-top: 15px; color: red;">Please prepare and re-attempt the test again.</p>
            <br>
          `;
        }
        this.emailService.sendEmail(to,cc, subject, body);
        // alert("📩 You will receive your exam status via email shortly.");
      },
      (error) => {
        // console.error('❌ Error updating Record:', error);
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


get availableOptions(): string[] {
  return ['a', 'b', 'c', 'd'].filter(option =>
    this.currentQuestion?.[option] || this.currentQuestion?.['i' + option]
  );
}

//   submitExam() {
//     clearInterval(this.timer); // Stop timer when submitting
  
//     // Submit result to backend
//     this.UpdateResult(); // This handles the alert + navigation

//     //this.exitFullscreen();
// // this.isExamLocked = false;
// // document.body.style.overflow = 'auto';

//   }

// submitExam() {
//   clearInterval(this.timer);
//   clearInterval(this.violationTimer);

//   this.isViolationCountdownActive = false;
//   this.showWarningBanner = false;

//   this.UpdateResult();
// }

// submitExam() {
//   if(!(this.tabSwitchCount >= this.maxFullscreenAttempts)) {
//   clearInterval(this.timer);
//   clearInterval(this.violationTimer);
//   }
//   //this.showViolationModal = false;
// else {
//   this.UpdateResult();
// }
// }

submitExam() {
  // Always clear timers
  clearInterval(this.timer);
  clearInterval(this.violationTimer);

  // Hide violation UI if any
  this.showViolationModal = false;
  this.fullscreenExited = false;

  // ❌ Auto-submit due to violation → DO NOT update result
  if (this.isViolationCountdownActive) {
    this.openModal();
    // console.warn('Exam auto-submitted due to violation. Skipping UpdateResult().');
    return;
  }

  // ✅ Normal submit → update result
  this.UpdateResult();
}



//   startViolationCountdown() {
//   this.isViolationCountdownActive = true;
//   this.violationCountdown = 10;

//   this.warningMessage =
//     `🚨 Multiple violations detected. Exam will be submitted in ${this.violationCountdown} seconds.`;
//   this.showWarningBanner = true;

//   this.violationTimer = setInterval(() => {
//     this.violationCountdown--;

//     this.warningMessage =
//       `🚨 Exam will be auto-submitted in ${this.violationCountdown} seconds due to violations.`;

//     if (this.violationCountdown <= 0) {
//       clearInterval(this.violationTimer);
//       this.showWarningBanner = false;
//       this.submitExam();
//     }
//   }, 1000);
// }

// startViolationModal() {
//   this.showViolationModal = true;
//   this.violationCountdown = 10;

//   this.violationTimer = setInterval(() => {
//     this.violationCountdown--;

//     if (this.violationCountdown <= 0) {
//       clearInterval(this.violationTimer);
//       this.showViolationModal = false;
//       this.submitExam();
//     }
//   }, 1000);
// }

startViolationModal() {
  this.isViolationCountdownActive = true;
  this.showViolationModal = true;
  this.violationCountdown = 10;

  // ✅ Send violation email ONCE
  this.sendViolationEmail('Exited fullscreen multiple times');

  this.violationTimer = setInterval(() => {
    this.violationCountdown--;

    if (this.violationCountdown <= 0) {
      clearInterval(this.violationTimer);
      this.showViolationModal = false;
      this.submitExam();
    }
  }, 1000);
}

resumeFullscreenFromViolation() {
  if (!this.resumeAllowed) {
    return; // 🚫 resume blocked
  }

  const elem = document.documentElement as any;
  elem.requestFullscreen?.();

  clearInterval(this.violationTimer);
  this.showViolationModal = false;
}



  
  // ngOnDestroy(): void {
  //   clearInterval(this.timer); 
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

  // get currentQuestion() {
  //   return this.questions[this.currentQuestionIndex];
  // }

  // nextQuestion() {
  //   debugger;
  //   if (this.selectedAnswer) {
  //     const correctAnswer = this.currentQuestion.questionAnswer;
  
  //     // ✅ Track correct answers
  //     if (this.selectedAnswer.toUpperCase() === correctAnswer.toUpperCase()) {
  //       this.correctAnswersCount++;
  //     }
  
  //     this.selectedAnswer = null; // Reset for next question
  
  //     if (this.currentQuestionIndex < this.questions.length - 1) {
  //       this.currentQuestionIndex++;
  //     }
  //     else {
  //       // Last question, submit the exam
  //       this.submitExam();
  //     }
  //   } else {
  //     alert("⚠️ Please select an answer before proceeding.");
  //   }
  // }

    get currentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

nextQuestion() {
  if (this.selectedAnswer) {
    const questionid = this.currentQuestion.questionId;

    // ✅ Check answer from backend
    this.ielc.GetskillqaAnswer(questionid, this.selectedAnswer).subscribe((data: any) => {
      if (data === 1) {  // backend returns 1 if correct
        this.correctAnswersCount++;
      }

      this.selectedAnswer = null; // Reset for next question

      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
      } else {
        // Last question, submit the exam
        this.submitExam();
        this.loadSelectedAnswerForCurrentQuestion();
      }
    });
  } else {
    alert("⚠️ Please select an answer before proceeding.");
  }
}

goBack() {
    const userChoice = confirm(
    "⚠️ Going back may affect your exam flow.\n\nAre you sure you want to return to the Home page?"
  );

  if (!userChoice) {
    // ❌ User clicked CANCEL → Stay on page
    return;
  }

  // ✅ User clicked OK → Navigate to registration
  this.router.navigate(['/registration']);
}




showConfirmSubmit = false;
userAnswers: { questionIndex: number; selected: string | null }[] = [];
// cancelSubmit() {
//   this.correctAnswersCount
//   this.showConfirmSubmit = false;
// }

showCorrectPopup: boolean = false;

cancelSubmit() {
  this.calculateCorrectAnswers();
  this.showConfirmSubmit = false; // close main submit popup
  this.showCorrectPopup = true;   // show result popup
}

closeCorrectPopup() {
  this.showCorrectPopup = false;
}



confirmSubmit() {
  this.showConfirmSubmit = false;
  this.submitExam(); // your existing submit logic
}
get answeredCount(): number {
  return this.userAnswers.filter(a => !!a.selected).length;
}

// ✅ Progress percentage for progress bar
get answeredProgress(): number {
  const total = this.examdata?.displayExamQuestions || this.questions.length || 0;
  if (!total) { return 0; }
  return (this.answeredCount / total) * 100;
}
// Called when user selects an option
onOptionSelect(option: string) {
  const selectedCode = option.toUpperCase();
  this.selectedAnswer = selectedCode;

  const existing = this.userAnswers.find(a => a.questionIndex === this.currentQuestionIndex);
  if (existing) {
    existing.selected = selectedCode;
  } else {
    this.userAnswers.push({
      questionIndex: this.currentQuestionIndex,
      selected: selectedCode
    });
  }
}
// Optional: when you change question, restore previous answer
loadSelectedAnswerForCurrentQuestion() {
  const existing = this.userAnswers.find(a => a.questionIndex === this.currentQuestionIndex);
  this.selectedAnswer = existing?.selected || '';
}
// OPEN confirm submit dialog instead of direct submit
openConfirmSubmit() {
  if (!this.selectedAnswer) { return; }

  // ensure current answer is stored
  const code = this.selectedAnswer.toLowerCase();
  this.onOptionSelect(code);

  this.showConfirmSubmit = true;
}

correctAnswersCounts: number = 0;
showReviewMessage: boolean = false;
tabSwitchCount: number = 0;

calculateCorrectAnswers() {
  this.correctAnswersCounts = this.questions.filter((q: any) =>
    q.selectedAnswer === q.correctAnswer
  ).length;
}

// ✅ Toast notification (non-blocking, auto-dismiss)
showToastNotification(message: string, duration: number = 2000) {
  const toast = document.createElement('div');
  toast.textContent = message;
  
  toast.style.position = 'fixed';
  toast.style.top = '20px';
  toast.style.right = '20px';
  toast.style.backgroundColor = '#ff6b6b';
  toast.style.color = 'white';
  toast.style.padding = '12px 20px';
  toast.style.borderRadius = '4px';
  toast.style.zIndex = '99999';
  toast.style.fontSize = '14px';
  toast.style.fontWeight = 'bold';
  toast.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
  
  document.body.appendChild(toast);

  setTimeout(() => {
    if (document.body.contains(toast)) {
      document.body.removeChild(toast);
    }
  }, duration);
}

enterFullscreen() {
  const elem = document.documentElement as any;

  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
}
exitFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
}
resumeFullscreen() {
  const elem = document.documentElement as any;

  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }

  this.fullscreenExited = false;
  this.showWarningBanner = false;
}

// resumeFullscreen() {
//   const elem = document.documentElement as any;

//   if (elem.requestFullscreen) {
//     elem.requestFullscreen();
//   } else if (elem.webkitRequestFullscreen) {
//     elem.webkitRequestFullscreen();
//   } else if (elem.msRequestFullscreen) {
//     elem.msRequestFullscreen();
//   }

//   this.fullscreenExited = false;
//   this.showWarningBanner = false;

//   // Stop countdown
//   clearInterval(this.countdownTimer);
// }


// startFullscreenCountdown() {
//   clearInterval(this.countdownTimer);

//   this.countdownTimer = setInterval(() => {
//     this.fullscreenCountdown--;

//     if (this.fullscreenCountdown <= 0) {
//       clearInterval(this.countdownTimer);

//       // Auto-submit if still not in fullscreen
//       if (!document.fullscreenElement) {
//         this.submitExam();
//       }
//     }
//   }, 1000);
// }


sendViolationEmail(reason: string) {

  //const admins = environment.adminViolationEmails.join(',');
   const matchedUser = this.Registeredusers.find(user =>
      user.skillName === this.selectedSkill &&
      (this.enrollmentID ? user.enrollmentID === this.enrollmentID : true)
    );
const to = matchedUser.email || this.userEmail;
        const bcc = '';



  const subject = '🚨 Exam Violation Detected';

  const body = `
    <h3>🚨 Exam Violation Alert</h3>

    <p><strong>User Name:</strong> ${this.userName}</p>
    <p><strong>User Email:</strong> ${this.userEmail}</p>
    <p><strong>Skill:</strong> ${this.selectedSkill}</p>
    <p><strong>Enrollment ID:</strong> ${this.enrollmentID}</p>

    <hr>

    <p><strong>Violation Type:</strong> ${reason}</p>
    <p><strong>Violation Count:</strong> ${this.tabSwitchCount}</p>
    <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>

    <p style="color:red;">
      This violation may lead to auto-submission of the exam.
    </p>
  `;
  this.emailService.sendEmail(to,bcc, subject, body);
  // this.emailService.sendEmail(
  //   admins,        // to
  //   '',            // bcc
  //   subject,
  //   body
  // );
}


}