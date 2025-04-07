import { Component, OnInit } from '@angular/core';
import { IelcapiService } from '../ielcapi.service';
import { forkJoin, Observable } from 'rxjs';
import { UsersInfo } from '../users-info';
// import { ExcelExportService } from '../excel-export.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { AuthService } from 'src/app/authservice.service';
import { MsalService } from '@azure/msal-angular';
import { Router } from '@angular/router';



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
  selector: 'app-resultinfo',
  templateUrl: './resultinfo.component.html',
  styleUrls: ['./resultinfo.component.css']
})
export class ResultinfoComponent implements OnInit  {
  Enrollmentlist: any[] = []; 
  Enrolledskills: any[] = []; 
  skillname='';
  status='';
  email='';
  isLoading = true;
  page: number = 1;  
  itemsPerPage: number = 10; 
  displayedColumns = [];
  exportAllRecords = false;
 
  // constructor(private ielc:IelcapiService) {}

  // ngOnInit() {
  //   this.GetAllUSers();
  //   this.GetAllSkillsData();
  //  }

   userName: string | null = null;
   userEmail: string | null = null;

   constructor(private msalService: MsalService, private authService: AuthService, private router: Router,private ielc:IelcapiService) {}
  
    async ngOnInit() {
    //  try {
    //    await this.msalService.instance.handleRedirectPromise(); // Ensure MSAL is initialized
    //    this.authService.setActiveAccount(); // Ensure an account is set
 
    //   //  this.authService.userName$.subscribe(username => {
    //   //    if (username) {
    //   //      this.userName = username;
    //   //    } else {
    //   //      this.authService.fetchUserDetails(); // Fetch from Microsoft Graph API if missing
    //   //    }
    //   //  });
    //   this.authService.userDetails$.subscribe(userDetails => {
    //     this.userName = userDetails.displayName;
    //     this.userEmail = userDetails.email;
    //   });
 
    //    if (!this.authService.isAuthenticated()) {
    //      this.router.navigate(['/login']); // Redirect if not authenticated
    //    }
    //  } catch (error) {
    //    console.error('MSAL initialization error in HomeComponent:', error);
    //  }
     this.GetAllUSers();
    this.GetAllSkillsData();
   }
  
   sortRegisteredUsers(data: any[]): any[] {
    return data.sort((a, b) => (a.enrollmentID > b.enrollmentID ? -1 : a.enrollmentID < b.enrollmentID ? 1 : 0));
  }
  
   GetAllUSers(){
    this.ielc.GetUsers().subscribe((data) => {
      this.Enrollmentlist=data;
      this.Enrollmentlist = this.sortRegisteredUsers(data);

       // Check each user for filled feedback fields
    // this.submittedFeedbackIds = this.Enrollmentlist
    // .filter(user =>
    //   user.subjectMatterKnowledge &&
    //   user.presentation &&
    //   user.communication &&
    //   user.handlingDoubts &&
    //   user.applicationtowork
    // )
    // .map(user => user.enrollmentID); 

      this.isLoading = false;
    });
    
   }
 
   GetAllSkillsData(){
    this.ielc.GetEnrolledSkills().subscribe((data) => {
      this.Enrolledskills=data;
    });
   }

   clear(){
    this.skillname = '';
    this.status = '';
    this.email = '';
   this.GetAllUSers()
 }
   searchSkills() {
    if (this.skillname) {
      this.ielc.GetUsersBySkill(this.skillname).subscribe((data) => {
        this.Enrollmentlist = data;
        this.Enrollmentlist = this.sortRegisteredUsers(data);
      });
    }
    if (this.status) {
      this.ielc.GetUsersByStatus(this.status).subscribe((data) => {
        this.Enrollmentlist = data;
        this.Enrollmentlist = this.sortRegisteredUsers(data);
      });
    }
   if (this.email) {
      this.ielc.GetUsersByEmail(this.email).subscribe((data)=>{
        this.Enrollmentlist = data;
        this.Enrollmentlist = this.sortRegisteredUsers(data);
      });
    }
  if(this.skillname && this.status) {
    forkJoin([
      this.ielc.GetUsersBySkill(this.skillname),
      this.ielc.GetUsersByStatus(this.status)
    ]).subscribe({
      next: ([skillUsers, statusUsers]) => {
        this.Enrollmentlist = (skillUsers as UsersInfo[]).filter((skillUser: UsersInfo) =>
          (statusUsers as UsersInfo[]).some((statusUsers: UsersInfo) => statusUsers.enrollmentID === skillUser.enrollmentID)
        );
        console.log("Filtered Users:", this.Enrollmentlist);
      },
      
      error: (err) => {
        console.error("Error fetching data:", err);
      }
    });
   }
   if(this.skillname && this.email) {
    forkJoin([
      this.ielc.GetUsersBySkill(this.skillname),
      this.ielc.GetUsersByEmail(this.email)
    ]).subscribe({
      next: ([skillUsers, emailUsers]) => {
        this.Enrollmentlist = (skillUsers as UsersInfo[]).filter((skillUser: UsersInfo) =>
          (emailUsers as UsersInfo[]).some((emailUsers: UsersInfo) => emailUsers.enrollmentID === skillUser.enrollmentID)
        );
        console.log("Filtered Users:", this.Enrollmentlist);
      },
      
      error: (err) => {
        console.error("Error fetching data:", err);
      }
    });
   }
   if(this.status && this.email) {
    forkJoin([
      this.ielc.GetUsersByStatus(this.status),
      this.ielc.GetUsersByEmail(this.email)
    ]).subscribe({
      next: ([statusUsers, emailUsers]) => {
        this.Enrollmentlist = (statusUsers as UsersInfo[]).filter((skillUser: UsersInfo) =>
          (emailUsers as UsersInfo[]).some((emailUsers: UsersInfo) => emailUsers.enrollmentID === skillUser.enrollmentID)
        );
        console.log("Filtered Users:", this.Enrollmentlist);
      },
      
      error: (err) => {
        console.error("Error fetching data:", err);
      }
    });
   }
   if (this.status && this.email && this.skillname) {
    forkJoin([
      this.ielc.GetUsersByStatus(this.status),
      this.ielc.GetUsersByEmail(this.email),
      this.ielc.GetUsersBySkill(this.skillname)
    ]).subscribe({
      next: ([venueUsers, optedtimes, skillUsers]) => {
        this.Enrollmentlist = (venueUsers as UsersInfo[]).filter((user: UsersInfo) =>
          (optedtimes as UsersInfo[]).some((optedtime: UsersInfo) => optedtime.enrollmentID === user.enrollmentID) &&
          (skillUsers as UsersInfo[]).some((skillUser: UsersInfo) => skillUser.enrollmentID === user.enrollmentID) 
        );
  
        console.log("Filtered Users:", this.Enrollmentlist);
      },
  
      error: (err) => {
        console.error("Error fetching data:", err);
      }
    });
  }
}
//columns: string[] = ['Mail','SkillName','Venue','Result','Percentage','TestTakenDate', 'Knowledge', 'Presentation', 'Communication', 'HandlingDoubts', 'Applicationtowork', 'Comments' ];
columns: string[] = ['mail','skillName','venue','result','percentage','testTakenDate', 'subjectMatterKnowledge', 'presentation', 'communication', 'handlingDoubts', 'applicationtowork', 'comments' ];
//   columns: { [key: string]: string } = {
//   mail: "Email",
//   skillName: "SkillName",
//   venue: "Venue",
//   result: "Result",
//   Percentage: "Percentage",
//   testTakenDate: "TestTakenDate",
//   subjectMatterKnowledge: "Knowledge",
//   presentation: "Presentation",
//   communication: "Communication",
//   handlingDoubts: "HandlingDoubts",
//   applicationtowork: "ApplicationtoWork",
//   comments: "Comments"
// };
// Mail	SkillName	Venue	Result	Percentage	TestTakenDate	Knowledge	Presentation	Communication	HandlingDoubts	Applicationtowork	Comments

exportExcel(): void {
  // Define a mapping of column keys to desired Excel headers
  const columnMappings: { [key: string]: string } = {
    mail: "Email",
    skillName: "Skill Name",
    venue: "Venue",
    result: "Result",
    percentage: "Percentage",
    testTakenDate: "TestTakenDate",
    subjectMatterKnowledge: "Knowledge",
    presentation: "Presentation",
    communication: "Communication",
    handlingDoubts: "HandlingDoubts",
    applicationtowork: "ApplicationtoWork",
    comments: "Comments"
  };

  // Ensure columns is an array
  if (!Array.isArray(this.columns)) {
    console.error("columns is not an array:", this.columns);
    return;
  }

  const startIndex = (this.page - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  const dataToExport = this.exportAllRecords
    ? this.Enrollmentlist // Export all data
    : this.Enrollmentlist.slice(startIndex, endIndex);

  // Convert Data to JSON and Apply Column Renaming
  const formattedData = dataToExport.map(row => {
    return this.columns.reduce((acc: Record<string, any>, column: string) => {
      acc[columnMappings[column] || column] = row[column] || ""; // Ensure empty values are also included
      return acc;
    }, {});
  });
     // Create a new worksheet from JSON data
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(formattedData);

  // Apply column width settings for visibility
  worksheet["!cols"] = Object.keys(columnMappings).map(() => ({ wch: 20 }));
  
  
  // Apply styles manually using cell properties
  const range = XLSX.utils.decode_range(worksheet["!ref"] as string);

  // 1️⃣ Apply Header Formatting (Bold & Background Color)
  for (let C = range.s.c; C <= range.e.c; ++C) {
    const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C });
    if (worksheet[cellAddress]) {
      worksheet[cellAddress].s = {
        font: { bold: true }, // Bold header text
        fill: { fgColor: { rgb: "D9D9D9" } }, // Light gray background
        alignment: { horizontal: "center", vertical: "center" }
      };
    }
  }

  // 2️⃣ Apply Alternating Row Colors & Borders
  for (let R = range.s.r + 1; R <= range.e.r; ++R) {
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });

      // Ensure the cell exists
      if (!worksheet[cellAddress]) {
        worksheet[cellAddress] = { v: "" }; // Set empty value
      }

      // Apply alternating row colors
      worksheet[cellAddress].s = {
        fill: { fgColor: { rgb: R % 2 === 0 ? "F7F7F7" : "FFFFFF" } }, // Alternate row color
        alignment: { horizontal: "center", vertical: "center" }, // Center text
        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } }
        }
      };
    }
  }


  // Create Workbook and Export
  const workbook: XLSX.WorkBook = { Sheets: { 'Sheet1': worksheet }, SheetNames: ['Sheet1'] };
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const fileData: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

  // Download the Excel file
  saveAs(fileData, 'TableData.xlsx');
}


submittedFeedbackIds: string[] = [];

 
}
