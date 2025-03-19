import { Component, OnInit, OnDestroy } from '@angular/core';
import { IelcapiService } from '../ielcapi.service';
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
  selector: 'app-exampage',
  templateUrl: './exampage.component.html',
  styleUrls: ['./exampage.component.css']
})
export class ExampageComponent implements OnInit, OnDestroy  {
  // questions = [
  //   {
  //     question: "Which architectural layer is used as a backend in cloud computing?",
  //     options: ["cloud", "soft", "client", "all of the mentioned"],
  //     correctAnswer: "cloud"
  //   },
  //   {
  //     question: "What does IaaS stand for?",
  //     options: ["Infrastructure as a Service", "Internet as a Service", "Information as a System", "None of the above"],
  //     correctAnswer: "Infrastructure as a Service"
  //   }
  // ];
  questions = [
    {
       question: "Which architectural layer is used as a backend in cloud computing?",
    // questionImage: "https://th.bing.com/th/id/OIP._7eM_4ioIkRtrZ2hS4aCUAHaEK?w=296&h=180&c=7&r=0&o=5&pid=1.7", // Question has an image
      options: [
        { text: "Cloud", image: null}, // Text + Image
        { image: "https://th.bing.com/th/id/OIP.TWE6jmJeglacdUsn3aYPVQHaEx?w=274&h=180&c=7&r=0&o=5&pid=1.7" }, // Only text
        { text: "Client", image: null }, // Text + Image
        { text: "All of the mentioned", image: null } // Only text
      ],
      correctAnswer: "Cloud"
    },
    {
      question: "What does IaaS stand for?",
      questionImage: null, // No image for this question
      options: [
        { text: "Infrastructure as a Service", image: null }, // Only text
        { text: "Internet as a Service", image: null }, // Text + Image
        { text: "Information as a System", image: null }, // Only text
        { text: "None of the above", image: null } // Text + Image
      ],
      correctAnswer: "Infrastructure as a Service"
    }
  ];
  

  currentQuestionIndex = 0;
  selectedAnswer: string | null = null;

  examlist: any[] = []; 
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

  constructor(private ielc:IelcapiService,private router: Router) {

  }
  
  ngOnInit(): void {
    // this.startTimer();
    this.GetExamlist();
  }
 
  GetExamlist() {
    this.ielc.Getexaminfo().subscribe((data) => {
      console.log("Exam data received:", data);
      if (data && data.length > 0) {
        this.examlist = data; 
        this.examdata = this.examlist[0]; 
        this.timeLeft = this.examdata.examTime * 60; 
        console.log("Assigned timeLeft:", this.timeLeft);
        console.log("Total Questions:", this.examdata.displayExamQuestions);
        if (this.timeLeft > 0) {
          this.startTimer(); 
        }
      }
    }, (error) => {
      console.error("Error fetching exam data", error);
    });
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

  nextQuestion() {
    if (this.selectedAnswer) {
      this.selectedAnswer = null; // Reset answer for next question
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
      } else {
        clearInterval(this.timer); // Stop timer when exam is completed
        alert("Exam Completed!");
        this.router.navigate(['/registration']);
      }
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
