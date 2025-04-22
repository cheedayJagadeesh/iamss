import { Component } from '@angular/core';
import { AuthService } from 'src/app/authservice.service';
import { MsalService } from '@azure/msal-angular';
import { Router } from '@angular/router';
import { IelcapiService } from '../ielcapi.service';
import { IsmsheaderComponent } from '../ismsheader/ismsheader.component';
import { switchMap, forkJoin, Observable, of, map } from 'rxjs';


interface compliance {
    Id: number;
    team: string;
    process_Owner: string;
    jan:string;
    feb: string;
    mar: string;
    apr: string,
    may: string;
    jun: string;
    jul: string;
    aug:string;
    sep: string;
    oct: string;
    nov: string,
    dec: string;
}

interface reset {
  selectedCompliance:string,
    selectedProject:string,
    selectedStatus:string,
}

@Component({
  selector: 'app-complianceform',
  templateUrl: './complianceform.component.html',
  styleUrls: ['./complianceform.component.css']
})
export class ComplianceformComponent {
  compliancelist: any[] = []; 
  compliancelistfilter: any[] = [];
  projectlist: any[] = [];
  projects = '';
  userName: string | null = null;
  userEmail: string | null = null;
  isLoading: boolean = true;
  selectedCompliance = '';
  selectedProject: string = ''; 
  showProjectDropdown = false;
  showTable = false;
  selectedTableData: any[] = [];
  ccDisplayNames: string[] = [];
  toDisplayNames: string[] = [];
  matchedSuperOwner: boolean = false;
  matchedOwner: boolean = false;
  superownerss: any[] = [];
  ownerss: any[] = [];
  userProjects: string[] = [];
  filterprojectisms: string[] = [];
  filterprojectqms: string[] = [];
  currentproject = '';
  selectedStatus: string = '';
status: any;
form: any;
idlist: any;
updatedata: any[] = [];

compliancedata:compliance={
  Id: 0,
  team:  '',
  process_Owner:  '',
  jan: '',
  feb:  '',
  mar:  '',
  apr:  '',
  may:  '',
  jun:  '',
  jul:  '',
  aug: '',
  sep:  '',
  oct:  '',
  nov:  '',
  dec:  '',
  }

  resetdata = {
    // selectedCompliance: '',
    selectedProject: '',
    selectedStatus: ''
  };


//workingcode2
onComplianceChange(event: Event): void {
  const target = event.target as HTMLSelectElement;
  this.selectedCompliance = target.value;

  this.isLoading = true;
  this.selectedTableData = [];

  this.showProjectDropdown = true;
  this.selectedProject = '';
  this.showTable = true;

  forkJoin({
    ccData: this.ielc.GetCCDisplayNames(),
    toData: this.ielc.GetToDisplayNames()
  }).subscribe(({ ccData, toData }) => {
    this.ccDisplayNames = ccData;
    this.toDisplayNames = toData;

    if (this.userName) {
      const lowerUser = this.userName.toLowerCase();

      this.matchedSuperOwner = this.ccDisplayNames.some(name =>
        name.toLowerCase().includes(lowerUser)
      );

      this.matchedOwner = this.toDisplayNames.some(name =>
        name.toLowerCase().includes(lowerUser)
      );

      let complianceData$: Observable<any[]> | undefined;

      if (this.matchedSuperOwner) {
        //console.log("✅ User is a Super Owner");
        complianceData$ = this.selectedCompliance === 'ISMS'
          ? this.ielc.Getcomplianceismsdata()
          : this.selectedCompliance === 'QMS'
            ? this.ielc.Getcomplianceqmsdata()
            : undefined;
      } else if (this.matchedOwner) {
        //console.log("✅ User is a Normal Owner");
        this.GetUserByProjectsList();
        complianceData$ = this.selectedCompliance === 'ISMS'
          ? this.GetFilteredISMSUserTable()
          : this.selectedCompliance === 'QMS'
            ? this.GetFilteredQMSUserTable()
            : undefined;
      } else {
       // console.log("❌ User not found in either list.");
        this.isLoading = false;
        this.selectedTableData = [];
        return;
      }

      if (complianceData$) {
        complianceData$.subscribe({
          next: (data) => {
            this.selectedTableData = this.sortlist(data);
            this.isLoading = false;
          },
          error: (err) => {
           // console.error("❌ Error fetching compliance data:", err);
            this.selectedTableData = [];
            this.isLoading = false;
          }
        });
      }
    }
  });
}

onProjectChange(event: Event): void {
  const target = event.target as HTMLSelectElement;
  this.selectedProject = target.value;
    this.currentproject = this.selectedProject
    if (this.selectedCompliance === 'ISMS') {
      this.GetProjectIdISMS();
      this.GetUserProjectsAndLoadCurrentMonthISMS();
    } else if (this.selectedCompliance === 'QMS') {
      this.GetProjectIDQMS();
      this.GetUserProjectsAndLoadCurrentMonthQMS();
    }    
}


  projectMap: { [key: string]: any[] } = {
    ISMS: [
      { skillName: 'IT Team' },
      { skillName: 'Security Team' }
    ],
    QMS: [
      { skillName: 'Quality Team' },
      { skillName: 'Audit Team' }
    ]
  };
  

  //constructor(private msalService: MsalService, private authService: AuthService, private router: Router) {}
constructor(private ielc:IelcapiService, private authService: AuthService) {
}

  sortlist(data: any[]): any[] {
    return data.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
  }

 
  ngOnInit(): void {
    this.authService.userDetails$.subscribe(userDetails => {
      // this.userName = 'Ramprasad .KP' ;
       this.userName = userDetails?.displayName;
      this.userEmail = userDetails?.email ;
    });

  this.GetComplianceISMSData();
  this.GetComplianceQMSData();
  this.GetAllProjectsList();
  this.GetSuperOwners(this.userName);
  this.GetOwners();
   this.GetUserByProjectsList();
  this.GetFilteredISMSUserTable();
  this.GetFilteredQMSUserTable();
  }

  resetComplianceData() {
    this.selectedCompliance = '';
    this.selectedProject = '';
    this.selectedStatus = '';
    // this.selectedTableData = [];
    // this.showTable = false;
    // this.isLoading = false;
  }
  

   //ISMS

  // GetComplianceISMSData(){
  //   this.ielc.Getcomplianceismsdata().subscribe((data) => {
  //     this.compliancelist=data;
  //     this.compliancelist = this.sortlist(data)
  //     this.isLoading = false;
  //   });
  //  }

  GetComplianceISMSData() {
    this.ielc.Getcomplianceismsdata().subscribe((data) => {
      const sortedData = this.sortlist(data);
     //this.compliancelist = sortedData;
      this.selectedTableData = sortedData;
      this.isLoading = false;
    });
  }

   GetFilteredISMSUserTable(): Observable<any[]> {
    if (!this.userName) return of([]);
  
    return this.ielc.Getcompliancefilterprojects(this.userName).pipe(
      switchMap(() => this.ielc.GetUserByProjects(this.userName!)),
      switchMap((userProjects: string[]) => {
        this.userProjects = userProjects;
        const requests = userProjects.map(project =>
          this.ielc.GetISMSUserByProjectTable(project)
        );
        return forkJoin(requests);
      }),
      map((complianceLists: any[][]) => complianceLists.flat())
    );
  }

   GetUserByProjectsList(){
    this.ielc.GetUserByProjects(this.userName!).subscribe((userbyprojectsdata) => {
    this.projectlist=userbyprojectsdata;
    //console.log("l",userbyprojectsdata);
    });
   }

   GetUserProjectsAndLoadCurrentMonthISMS() {
    this.ielc.GetUserByProjects(this.userName!).subscribe((userbyprojectsdata) => {
      this.projectlist = userbyprojectsdata;
      this.ielc.GetCurrentMonth(this.currentproject).subscribe((currentMonthData) => {
        this.filterprojectisms = currentMonthData;
        //console.log("ISMS Status",this.filterprojectisms);
      });    
    });
  }

  GetProjectIdISMS(){
    this.ielc.GetProjectIDISMS(this.selectedProject).subscribe((iddata) => {
    this.idlist=iddata;
    });
   }

  //  GetComplianceISMSDataAfterUpdate() {
  //   this.isLoading = true;
  
  //   this.GetFilteredISMSUserTable().subscribe((projectData: any[]) => {
  //     this.selectedTableData = this.sortlist(projectData);
  //     //console.log("✅ Updated ISMS Data After Update:", this.selectedTableData);
  //     this.isLoading = false;
  //   });
  // }

  GetComplianceISMSDataAfterUpdate() {
    this.isLoading = true;
  
    this.GetFilteredISMSUserTable().subscribe((projectData: any[]) => {
      const sortedData = this.sortlist(projectData);
      this.selectedTableData = sortedData;
      //this.compliancelist = sortedData;
      this.isLoading = false;
    });
  }
  

     //QMS

  //  GetComplianceQMSData(){
  //   this.ielc.Getcomplianceqmsdata().subscribe((data) => {
  //     this.compliancelist=data;
  //     this.compliancelist = this.sortlist(data)
  //     this.isLoading = false;
  //   });
  //  }

   GetComplianceQMSData() {
    this.ielc.Getcomplianceqmsdata().subscribe((data) => {
      const sortedData = this.sortlist(data);
     //this.compliancelist = sortedData;
      this.selectedTableData = sortedData;
      this.isLoading = false;
    });
  }

   GetFilteredQMSUserTable(): Observable<any[]> {
    if (!this.userName) return of([]);
  
    return this.ielc.Getcompliancefilterprojectsqms(this.userName).pipe(
      switchMap(() => this.ielc.GetUserByProjectsqms(this.userName!)),
      switchMap((userProjects: string[]) => {
        this.userProjects = userProjects;
        //console.log(userProjects);
        const requests = userProjects.map(project =>
          this.ielc.GetQMSUserByProjectTable(project)
        );
        return forkJoin(requests);
      }),
      map((complianceLists: any[][]) => complianceLists.flat())
    );
  }

GetUserByProjectsListQMS(){
  this.ielc.GetUserByProjectsqms(this.userName!).subscribe((userbyprojectsdata) => {
  this.projectlist=userbyprojectsdata;
  });
 }

 GetUserProjectsAndLoadCurrentMonthQMS() {
  this.ielc.GetUserByProjectsqms(this.userName!).subscribe((userbyprojectsdata) => {
    this.projectlist = userbyprojectsdata;
    this.ielc.GetCurrentMonthQMS(this.currentproject).subscribe((currentMonthData) => {
      this.filterprojectqms = currentMonthData;
      //console.log("QMS Status",this.filterprojectqms);
    });    
  });
  }

  GetProjectIDQMS(){
    this.ielc.GetProjectIDQMS(this.selectedProject).subscribe((iddata) => {
    this.idlist=iddata;
    });
   }

  //  GetComplianceQMSDataAfterUpdate() {
  //   this.isLoading = true;
  
  //   this.GetFilteredQMSUserTable().subscribe((projectData: any[]) => {
  //     this.selectedTableData = this.sortlist(projectData);
  //     //console.log("✅ Updated ISMS Data After Update:", this.selectedTableData);
  //     this.isLoading = false;
  //   });
  // }

  GetComplianceQMSDataAfterUpdate() {
    this.isLoading = true;
  
    this.GetFilteredQMSUserTable().subscribe((projectData: any[]) => {
      const sortedData = this.sortlist(projectData);
      this.selectedTableData = sortedData;
      //this.compliancelist = sortedData;
      this.isLoading = false;
    });
  }

   //Both

  GetAllProjectsList(){
    this.ielc.GetByProjects().subscribe((Teamsdata) => {
    this.projectlist=Teamsdata;
    });
   }

   GetFilterProjects() {
    if (!this.userName) return;
    this.ielc.Getcompliancefilterprojects(this.userName).subscribe((filterprojects) => {
      this.compliancelistfilter = filterprojects;
    });
  }

   GetSuperOwners(userName: string | null){
    this.ielc.GetCCDisplayNames().subscribe((superowners) => {
    this.superownerss=superowners;
    });
   }

   GetOwners(){
    this.ielc.GetToDisplayNames().subscribe((owners) => {
    this.ownerss=owners;
    });
   }


   UpdateComplianceData() {
    if (this.selectedCompliance === 'ISMS') {
      const hasComplete = this.filterprojectisms.some(status => status === 'Complete');
      if (hasComplete) {
        alert('Task is already marked as complete.');
        return;
      }
    } else if (this.selectedCompliance === 'QMS') {
      const hasComplete = this.filterprojectqms.some(status => status === 'Complete');
      if (hasComplete) {
        alert('Task is already marked as complete.');
        return;
      }
    }
  
    if (this.selectedCompliance === 'ISMS') {
     // console.log("Selected Status:", this.selectedStatus);
  
      this.ielc.GetProjectIDISMS(this.selectedProject).subscribe({
        next: (idArray: string[]) => {
          const projectId = Number(idArray[0]);
          this.ielc.UpdateISMSCompliance(projectId, this.selectedStatus).subscribe({
            next: (response) => {
              //console.log("Raw response:", response);
              if (typeof response === 'string') {
                try {
                  const parsedResponse = JSON.parse(response);
                  //console.log("✅ Updated Successfully:", parsedResponse);
                  alert("✅ Record updated successfully!");
                } catch (error) {
                  //console.log("❌ Response is not JSON:", response);
                  alert("❌ Server message: " + response);
                }
              } else {
                //console.log("✅ Updated Successfully:", response);
                alert("✅ Record updated successfully!");
                if(this.matchedSuperOwner){
                  this.GetComplianceISMSData();
                } else{
                  this.GetComplianceISMSDataAfterUpdate();
                }
              }
            },
            error: (error) => {
              //console.error("❌ Error updating Record:", error);
              alert("❌ Failed to update record. Please try again.");
            }
          });
        },
        error: (error) => {
          //console.error("❌ Error getting project ID:", error);
          alert("❌ Failed to fetch project ID. Please try again.");
        }
      });
      // if(this.matchedSuperOwner){
      //   this.GetComplianceISMSData();
      // } else{
      //   this.GetComplianceISMSDataAfterUpdate();
      // }
  
    } else if (this.selectedCompliance === 'QMS') {
      this.ielc.GetProjectIDQMS(this.selectedProject).subscribe({
        next: (idArray: string[]) => {
          const projectId = Number(idArray[0]);
          this.ielc.UpdateQMSCompliance(projectId, this.selectedStatus).subscribe({
            next: (response) => {
              //console.log("Raw response:", response);
              if (typeof response === 'string') {
                try {
                  const parsedResponse = JSON.parse(response);
                  //console.log("✅ Updated Successfully:", parsedResponse);
                  alert("✅ Record updated successfully!");
                } catch (error) {
                  //console.log("❌ Response is not JSON:", response);
                  alert("❌ Server message: " + response);
                }
              } else {
                //console.log("✅ Updated Successfully:", response);
                alert("✅ Record updated successfully!");
                if(this.matchedSuperOwner){
                  this.GetComplianceQMSData();
                } else{
                  this.GetComplianceQMSDataAfterUpdate();
                }
              }
            },
            error: (error) => {
              //console.error("❌ Error updating Record:", error);
              alert("❌ Failed to update record. Please try again.");
            }
          });
        },
        error: (error) => {
          //console.error("❌ Error getting project ID:", error);
          alert("❌ Failed to fetch project ID. Please try again.");
        }
      });
  
    } else {
      //console.log("⚠️ Unknown compliance type selected.");
    }
    // if(this.matchedSuperOwner){
    //   this.GetComplianceQMSData();
    // } else{
    //   this.GetComplianceQMSDataAfterUpdate();
    // }
    //this.GetComplianceISMSDataAfterUpdate();


    // this.resetComplianceData();
  }

// UpdateComplianceData() {
//   const isISMS = this.selectedCompliance === 'ISMS';
//   const isQMS = this.selectedCompliance === 'QMS';

//   // Check if already complete
//   const hasComplete = isISMS 
//     ? this.filterprojectisms.some(status => status === 'Complete')
//     : this.filterprojectqms.some(status => status === 'Complete');

//   if (hasComplete) {
//     alert('Task is already marked as complete.');
//     return;
//   }

//   const getProjectId = isISMS 
//     ? this.ielc.GetProjectIDISMS(this.selectedProject) 
//     : this.ielc.GetProjectIDQMS(this.selectedProject);

//   getProjectId.subscribe({
//     next: (idArray: string[]) => {
//       const projectId = Number(idArray[0]);
//       const updateCompliance = isISMS
//         ? this.ielc.UpdateISMSCompliance(projectId, this.selectedStatus)
//         : this.ielc.UpdateQMSCompliance(projectId, this.selectedStatus);

//       updateCompliance.subscribe({
//         next: (response) => {
//           if (typeof response === 'string') {
//             try {
//               JSON.parse(response);
//               alert("✅ Record updated successfully!");
//             } catch {
//               alert("❌ Server message: " + response);
//               return;
//             }
//           } else {
//             alert("✅ Record updated successfully!");
//           }

//           if (isISMS) {
//             this.matchedSuperOwner
//               ? this.GetComplianceISMSData()
//               : this.GetComplianceISMSDataAfterUpdate();
//           } else {
//             this.matchedSuperOwner
//               ? this.GetComplianceQMSData()
//               : this.GetComplianceQMSDataAfterUpdate();
//           }
//         },
//         error: () => {
//           alert("❌ Failed to update record. Please try again.");
//         }
//       });
//     },
//     error: () => {
//       alert("❌ Failed to fetch project ID. Please try again.");
//     }
//   });
// }


 }