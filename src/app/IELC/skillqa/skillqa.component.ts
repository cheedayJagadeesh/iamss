import { Component, OnInit } from '@angular/core';
import { IelcapiService } from '../ielcapi.service';
// interface Question {
  
//   questionId: number;
//   skillName: string;
//   question: string;
//   a: string;
//   b: string;
//   c: string;
//   d: string;
//   iQuestion: string;
//   ia: string;
//   ib: string;
//   ic: string;
//   id: string;
//   questionAnswer: string;
//   iQuestionFile?: File;
//   iaFile?: File;
//   ibFile?: File;
//   icFile?: File;
//   idFile?: File;
 
// }
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

@Component({
  selector: 'app-skillqa',
  templateUrl: './skillqa.component.html',
  styleUrls: ['./skillqa.component.css']
})
export class SkillqaComponent implements OnInit {
  Enrolledskills: any[] = []; 
  Enrolledskillqa: any[] = []; 
  skillname='';
  selectedSkill: string = ""; 
  allQuestions: Question[] = []; 
  filteredQuestions: Question[] = [];
  isLoading = true;
  page: number = 1;  
  itemsPerPage: number = 10; 
  submitted = false;
  questiondata: Question= {
    questionId: 0,
    skillName: '',
    question: '',
    a: '',
    b:'',
    c: '',
    d: '',
    iQuestion: '',
    ia: '',
    ib: '',
    ic: '',
    id: '',
    questionAnswer: ''
    
  }

  constructor(private ielc:IelcapiService) {}

  ngOnInit() {
    this.GetAllSkillsData();
    this.GetAllSkillsQa();
   }
  GetAllSkillsData(){
    this.ielc.GetEnrolledSkills().subscribe((data) => {
      this.Enrolledskills=data;
    });
   }
   GetAllSkillsQa(){
    this.isLoading = true;
    this.ielc.GetskillAllQues().subscribe((data) => {
      this.Enrolledskillqa=data;
      this.isLoading = false;
      this.filteredQuestions = [...this.Enrolledskillqa];
    });
   }
   sortRegisteredUsers(data: any[]): any[] {
    return data.sort((a, b) => (a.questionId > b.questionId ? -1 : a.questionId < b.questionId ? 1 : 0));
  }

  filterQuestions() {
    this.page = 1; // ✅ Reset to first page when filtering
    this.filteredQuestions = this.selectedSkill 
      ? this.Enrolledskillqa.filter(q => q.skillName === this.selectedSkill)
      : [...this.Enrolledskillqa]; // Show all if nothing is selected
  }
  // AddSkillsQa(): void {
  //   this.ielc.Postskillqa(this.questiondata).subscribe(
  //     (response) => {
  //       alert('✅ Record Added Successfully!');
  //       this.GetAllSkillsQa();
  //       this.resetlist();
  //     },
  //     (error) => {
  //       alert('❌ Error adding Record. Please try again.');
  //     }
  //   );
  // }

  AddSkillsQa() {
    const requestData = {
      skillName:this.questiondata.skillName,
      question: this.questiondata.question,
      a: this.questiondata.a,
      b: this.questiondata.b,
      c: this.questiondata.c,
      d: this.questiondata.d,
      iQuestion: this.questiondata.iQuestion,  // Base64 image
      ia: this.questiondata.ia,  // Base64 image
      ib: this.questiondata.ib,  // Base64 image
      ic: this.questiondata.ic,  // Base64 image
      id: this.questiondata.id,   // Base64 image
      questionAnswer: this.questiondata.questionAnswer
    };
  
    // console.log("Sending Data:", requestData); // Debugging
  
    this.ielc.Postskillqa(requestData).subscribe(
      (response) => {
        alert('✅ Record Added Successfully!');
        this.GetAllSkillsQa();
        this.resetlist();
      },
      (error) => {
        // console.error("Error:", error);
        alert('❌ Error adding Record. Please try again.');
      }
    );
  }
  
  
  
  

  DeleteSkillsQa(id: number) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.ielc.DeleteskillqaById(id).subscribe({
        next: () => {
          alert(`Record with ID ${id} deleted successfully!`);
          this.GetAllSkillsQa();
        },
        // error: (err) => console.error('Error deleting item:', err)
      });
    }
  }
  
  EditSkillsQa(id: number) {
    // console.log("Edit button clicked, fetching ID:", id); 
    this.ielc.GetskillqaById(id).subscribe(data => {
  
      // console.log("Fetched Record Session:", data); 
  
      if (data) {
        // Assign data only if it's valid
        this.questiondata = { 
          questionId: data.questionId || 0,
          skillName: data.skillName || '',
          question: data.question || '',
          a: data.a || '',
          b: data.b || '',
          c: data.c || '',
          d: data.d || '',
          iQuestion: data.iQuestion || '',
          ia: data.ia ||'',
          ib: data.ib || '',
          ic: data.ic || '',
          id: data.id || '',
          questionAnswer: data.questionAnswer || ''
        };
      } else {
        // console.warn("No data received for the given ID.");
      }
    }, error => {
      // console.error("Error fetching record:", error);
    });
  }
  UpdateSkillsQa() {
    const currentPage = this.page;  // ✅ Save current page
    this.ielc.Updateskillqa(this.questiondata.questionId, this.questiondata).subscribe(
      (response) => {
        // console.log("Updated Successfully:", response);
        alert(" ✅ Record updated successfully!");
  
        // ✅ Find the updated record and replace it locally
        const index = this.Enrolledskillqa.findIndex(q => q.questionId === this.questiondata.questionId);
        if (index !== -1) {
          this.Enrolledskillqa[index] = { ...this.questiondata }; // Update locally
        }
  
        // ✅ Apply the filter again so it does not reset
        this.filterQuestions();  
        
        // ✅ Restore the same page
        this.page = currentPage;  
      },
      (error) => {
        // console.error("Error updating Record:", error);
      }
    );
  }
  
  
  resetlist(){
    this.questiondata= {
      questionId: 0,
      skillName: '',
      question: '',
      a: '',
      b:'',
      c: '',
      d: '',
      iQuestion: '',
      ia: '',
      ib: '',
      ic: '',
      id: '',
      questionAnswer: ''
    }
    this.selectedSkill=''
  }

  hasMinimumOptions(): boolean {
    const options = [
      this.questiondata.a || this.questiondata.ia,
      this.questiondata.b || this.questiondata.ib,
      this.questiondata.c || this.questiondata.ic,
      this.questiondata.d || this.questiondata.id
    ];
    // Filter out null/empty strings and count non-empty options
    const validOptions = options.filter(opt => !!opt && opt.trim() !== '');
    return validOptions.length >= 2;
  }

  // onFileSelected(event: any, field: string) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file); // Convert file to Base64
  //     reader.onload = () => {
  //       if (reader.result) {
  //         this.questiondata[field] = reader.result as string; // Store Base64 string
  //       }
  //     };
  //   }
  // }
  iQuestionPreviewUrl: string | null = null;
  optionAPreviewUrl: string | null = null;
  optionBPreviewUrl: string | null = null;
  optionCPreviewUrl: string | null = null;
  optionDPreviewUrl: string | null = null;

  // onFileSelected(event: any, fieldName: keyof Question) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
      
  //     reader.onload = (e: any) => {
  //       // Extract only the Base64 part (remove "data:image/jpeg;base64,")
  //       const base64String = e.target.result.split(',')[1]; 
  //       this.questiondata[fieldName] = base64String; // Store clean Base64 string
  //     };
  
  //     reader.readAsDataURL(file);
  
  //     // Generate preview URLs for UI display
  //     switch (fieldName) {
  //       case 'iQuestion':
  //         this.iQuestionPreviewUrl = URL.createObjectURL(file);
  //         break;
  //       case 'ia':
  //         this.optionAPreviewUrl = URL.createObjectURL(file);
  //         break;
  //       case 'ib':
  //         this.optionBPreviewUrl = URL.createObjectURL(file);
  //         break;
  //       case 'ic':
  //         this.optionCPreviewUrl = URL.createObjectURL(file);
  //         break;
  //       case 'id':
  //         this.optionDPreviewUrl = URL.createObjectURL(file);
  //         break;
  //     }
  //   }
  // }

  onFileSelected(event: any, fieldName: keyof Question) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      
      reader.onload = (e: any) => {
        const img = new Image();
        img.src = e.target.result;
        
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
  
          // Set the new image size (Adjust width & height as needed)
          const maxWidth = 300; // Reduce size to 300px width
          const maxHeight = 300; // Reduce size to 300px height
          let width = img.width;
          let height = img.height;
  
          if (width > maxWidth || height > maxHeight) {
            if (width > height) {
              height *= maxWidth / width;
              width = maxWidth;
            } else {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }
  
          canvas.width = width;
          canvas.height = height;
          ctx?.drawImage(img, 0, 0, width, height);
  
          const fileType = file.type === "image/png" ? "image/png" : "image/jpeg";

          // Convert resized image to Base64 and remove "data:image/png;base64," or "data:image/jpeg;base64,"
          const base64String = canvas.toDataURL(fileType).split(",")[1];
  
          // Store only the Base64 string (without prefix)
          this.questiondata[fieldName] = base64String;
        };
      };
  
      reader.readAsDataURL(file);
    }
  }
  
  removeImage(fieldName: keyof Question) {
    this.questiondata[fieldName] = undefined; // Clear the stored image
  
    // Convert fieldName to a string before passing to getElementById
    const fileInput = document.getElementById(fieldName.toString()) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ""; // Reset the file input field
    }
  }
  
  
  
  
  
  
  
  

  // onFileSelected(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       this.questiondata.iQuestion = reader.result as string; // Store the image as a base64 string
  //     };
  //   }
  // }
  
  
  
}
