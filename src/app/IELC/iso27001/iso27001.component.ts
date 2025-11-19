import { Component } from '@angular/core';
import { IelcapiService } from '../ielcapi.service';


interface isosprtinfo{
  id: string;
  contactPriority: string;
  name: string;
  mobile: string;
  email: string;
}
interface docs{
  documentID: string;
  documentName: string;
  url: string;
}
  interface ISMSMasterData {
  documentID: number;
  ismsDept?: string;
  ismsDocType?: string;
  ismsDocumentName?: string;
  url?: string;
  ismsDocumentNo?: string;
  ismsCurrentVersion?: number;
  documentMaintainedBy?: string;
}



@Component({
  selector: 'app-iso27001',
  templateUrl: './iso27001.component.html',
  styleUrls: ['./iso27001.component.css']
})
export class Iso27001Component {
email='incidents@inteqsolutions.com'

ismsdatalist: any[] = []; 
ismsalldata: ISMSMasterData = {
  documentID: 0,
  ismsDept: '',
  ismsDocType: '',
  ismsDocumentName: '',
  url: '',
  ismsDocumentNo: '',
  ismsCurrentVersion: 0,
  documentMaintainedBy: '',
};

isLoading = true;
 isosprtlist: any[] = []; 
filteredISMSDocs: any[] = [];
 isosprtdata:isosprtinfo={
  id: '',
  contactPriority: '',
  name: '',
  mobile: '',
  email: '',
 }
 docsdata:docs={
  documentID:'',
  documentName: '',
  url: '',
 }
 isoinfolist: any[] = []; 
 isopolicylist: any[] = []; 
 prjtIsmsGuidelinesdata: any[] = []; 
 prjtIsmsPolicydata: any[] = []; 
 prjtIsmsProceduredata: any[] = []; 
 prjtIsmsFormatdata: any[] = []; 
 cisoIsmsGeneraldata: any[]=[];
 cisoIsmsGuidelinesdata: any[] = []; 
 cisoIsmsPolicydata: any[] = []; 
 cisoIsmsProceduredata: any[] = []; 
 cisoIsmsFormatdata: any[] = []; 
 IsmsGuidelinesdata: any[] = []; 
 IsmsPolicydata: any[] = []; 
 IsmsProceduredata: any[] = []; 
 IsmsFormatdata: any[] = []; 
 OsIsmsGuidelinesdata: any[] = []; 
 OsIsmsPolicydata: any[] = []; 
 OsIsmsProceduredata: any[] = []; 
 OsIsmsFormatdata: any[] = []; 
 HrIsmsGuidelinesdata: any[] = []; 
 HrIsmsPolicydata: any[] = []; 
 HrIsmsProceduredata: any[] = []; 
 HrIsmsFormatdata: any[] = []; 
 ismsdetails: any[] = [];
 
 constructor(private ielc:IelcapiService) {

 }
  showDeptFilter = false;
  selectedDepts: string[] = [];
  uniqueDepts: string[] = [];
  isAllDeptsSelected: boolean = true;

  // Filter UI state and values for ISMSDocType, ISMSDocumentNo, ISMSCurrentVersion, DocumentMaintainedBy
  showDocTypeFilter = false;
  showDocNoFilter = false;
  showVersionFilter = false;
  showMaintainedByFilter = false;

  uniqueDocTypes: string[] = [];
  selectedDocTypes: string[] = [];
  isAllDocTypesSelected: boolean = true;

  uniqueDocNos: string[] = [];
  selectedDocNos: string[] = [];
  isAllDocNosSelected: boolean = true;

  uniqueVersions: string[] = [];
  selectedVersions: string[] = [];
  isAllVersionsSelected: boolean = true;

  uniqueMaintainedBy: string[] = [];
  selectedMaintainedBy: string[] = [];
  isAllMaintainedBySelected: boolean = true;

  updateUniqueDocTypes(): void {
    const all = (this.ismsdetails || []).map((item: any) => item.ismsDocType).filter(Boolean);
    this.uniqueDocTypes = Array.from(new Set(all));
  }
  updateUniqueDocNos(): void {
    const all = (this.ismsdetails || []).map((item: any) => item.ismsDocumentNo).filter(Boolean);
    this.uniqueDocNos = Array.from(new Set(all));
  }
    updateUniqueVersions(): void {
    const all = (this.ismsdetails || []).map((item: any) => {
      if (item.ismsCurrentVersion === null || item.ismsCurrentVersion === undefined || item.ismsCurrentVersion === '') {
        return '';
      }
      return item.ismsCurrentVersion;
    });
    this.uniqueVersions = Array.from(new Set(all));
  }


  updateUniqueMaintainedBy(): void {
    const all = (this.ismsdetails || []).map((item: any) => item.documentMaintainedBy).filter(Boolean);
    this.uniqueMaintainedBy = Array.from(new Set(all));
  }

  toggleAllDocTypes(): void {
    if (this.isAllDocTypesSelected) {
      this.selectedDocTypes = [];
      this.isAllDocTypesSelected = false;
    } else {
      this.selectedDocTypes = [...this.uniqueDocTypes];
      this.isAllDocTypesSelected = true;
    }
    this.filterISMSDocs();
  }
  onDocTypeCheckboxChange(event: any, val: string): void {
    if (event.target.checked) {
      if (!this.selectedDocTypes.includes(val)) this.selectedDocTypes.push(val);
    } else {
      this.selectedDocTypes = this.selectedDocTypes.filter(d => d !== val);
    }
    this.isAllDocTypesSelected = this.selectedDocTypes.length === this.uniqueDocTypes.length;
    this.filterISMSDocs();
  }

  toggleAllDocNos(): void {
    if (this.isAllDocNosSelected) {
      this.selectedDocNos = [];
      this.isAllDocNosSelected = false;
    } else {
      this.selectedDocNos = [...this.uniqueDocNos];
      this.isAllDocNosSelected = true;
    }
    this.filterISMSDocs();
  }
  onDocNoCheckboxChange(event: any, val: string): void {
    if (event.target.checked) {
      if (!this.selectedDocNos.includes(val)) this.selectedDocNos.push(val);
    } else {
      this.selectedDocNos = this.selectedDocNos.filter(d => d !== val);
    }
    this.isAllDocNosSelected = this.selectedDocNos.length === this.uniqueDocNos.length;
    this.filterISMSDocs();
  }

  toggleAllVersions(): void {
    if (this.isAllVersionsSelected) {
      this.selectedVersions = [];
      this.isAllVersionsSelected = false;
    } else {
      this.selectedVersions = [...this.uniqueVersions];
      this.isAllVersionsSelected = true;
    }
    this.filterISMSDocs();
  }
  onVersionCheckboxChange(event: any, val: string): void {
    if (event.target.checked) {
      if (!this.selectedVersions.includes(val)) this.selectedVersions.push(val);
    } else {
      this.selectedVersions = this.selectedVersions.filter(d => d !== val);
    }
    this.isAllVersionsSelected = this.selectedVersions.length === this.uniqueVersions.length;
    this.filterISMSDocs();
  }

  toggleAllMaintainedBy(): void {
    if (this.isAllMaintainedBySelected) {
      this.selectedMaintainedBy = [];
      this.isAllMaintainedBySelected = false;
    } else {
      this.selectedMaintainedBy = [...this.uniqueMaintainedBy];
      this.isAllMaintainedBySelected = true;
    }
    this.filterISMSDocs();
  }
  onMaintainedByCheckboxChange(event: any, val: string): void {
    if (event.target.checked) {
      if (!this.selectedMaintainedBy.includes(val)) this.selectedMaintainedBy.push(val);
    } else {
      this.selectedMaintainedBy = this.selectedMaintainedBy.filter(d => d !== val);
    }
    this.isAllMaintainedBySelected = this.selectedMaintainedBy.length === this.uniqueMaintainedBy.length;
    this.filterISMSDocs();
  }
      clearAllFilters(): void {
      // Reset all filter selections to select all
      this.selectedDepts = [...this.uniqueDepts];
      this.isAllDeptsSelected = true;
      this.selectedDocTypes = [...this.uniqueDocTypes];
      this.isAllDocTypesSelected = true;
      this.selectedDocNos = [...this.uniqueDocNos];
      this.isAllDocNosSelected = true;
      this.selectedVersions = [...this.uniqueVersions];
      this.isAllVersionsSelected = true;
      this.selectedMaintainedBy = [...this.uniqueMaintainedBy];
      this.isAllMaintainedBySelected = true;
      this.filterISMSDocs();
    }
 ngOnInit(): void {
   this.GetIsoSprtlist();
   this.GetIsoInfolist();
   this.GetIsoPolicylist();
   this.GetPrjtISMSGuidelineslist();
   this.GetPrjtISMSProcedurelist();
   this.GetPrjtISMSPolicylist();
   this.GetPrjtISMSFormatlist();
  //  this.GetCisoISMSGenerallist();
   this.GetCisoISMSGuidelineslist();
   this.GetCisoISMSProcedurelist();
   this.GetCisoISMSPolicylist();
   this.GetCisoISMSFormatlist();
   this.GetISMSFormatlist();
   this.GetISMSGuidelineslist();
   this.GetISMSPolicylist();
   this.GetISMSProcedurelist();
   this.GetOsISMSFormatlist();
   this.GetOsISMSGuidelineslist();
   this.GetOsISMSPolicylist();
   this.GetOsISMSProcedurelist();
   this.GetHrISMSGuidelineslist();
   this.GetHrISMSPolicylist();
   this.GetHrISMSProcedurelist();
   this.GetHrISMSFormatlist();
   this.GetISMSDetails();
 }

 updateUniqueDepts(): void {
    // Extract unique departments from ISMSMasterTable (ismsdetails)
    const allDepts = (this.ismsdetails || []).map((item: any) => item.ismsDept).filter(Boolean);
    this.uniqueDepts = Array.from(new Set(allDepts));
  }

  toggleAllDepts(): void {
    if (this.isAllDeptsSelected) {
      // Deselect all
      this.selectedDepts = [];
      this.isAllDeptsSelected = false;
    } else {
      // Select all
      this.selectedDepts = [...this.uniqueDepts];
      this.isAllDeptsSelected = true;
    }
    this.filterISMSDocs();
  }

  onDeptCheckboxChange(event: any, dept: string): void {
    if (event.target.checked) {
      if (!this.selectedDepts.includes(dept)) {
        this.selectedDepts.push(dept);
      }
    } else {
      this.selectedDepts = this.selectedDepts.filter(d => d !== dept);
    }
    this.isAllDeptsSelected = this.selectedDepts.length === this.uniqueDepts.length;
    this.filterISMSDocs();
  }

  filterISMSDocs(): void {
    // Combined filter for all columns
    this.filteredISMSDocs = (this.ismsdetails || []).filter((item: any) => {
      const deptMatch = this.selectedDepts.length === 0 || this.selectedDepts.includes(item.ismsDept);
      const docTypeMatch = this.selectedDocTypes.length === 0 || this.selectedDocTypes.includes(item.ismsDocType);
      const docNoMatch = this.selectedDocNos.length === 0 || this.selectedDocNos.includes(item.ismsDocumentNo);
      //const versionMatch = this.selectedVersions.length === 0 || this.selectedVersions.includes(item.ismsCurrentVersion);
        const versionMatch = this.selectedVersions.length === 0 ||
          (item.ismsCurrentVersion === null && this.selectedVersions.includes('')) ||
          (item.ismsCurrentVersion === undefined && this.selectedVersions.includes('')) ||
          (item.ismsCurrentVersion === '' && this.selectedVersions.includes('')) ||
          this.selectedVersions.includes(item.ismsCurrentVersion);
  
      const maintainedByMatch = this.selectedMaintainedBy.length === 0 || this.selectedMaintainedBy.includes(item.documentMaintainedBy);
      return deptMatch && docTypeMatch && docNoMatch && versionMatch && maintainedByMatch;
    });
    this.updateCounts();
  }
GetISMSDetailsDocumentName() {
  this.isLoading = true;
  const ismsDocumentName = this.ismsalldata.ismsDocumentName;
  if (ismsDocumentName) { // Check if ismsDocumentName is not undefined
    this.ielc.GetISMSMasterTableDocName(ismsDocumentName)
      .subscribe({
        next: (data) => {
          this.ismsdetails = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching ISMS Master Table:', err);
          this.isLoading = false;
        }
      });
  } else {
    console.error('ismsDocumentName is undefined');
    this.isLoading = false;
  }
}
totalISMSDocs: number = 0;
totalPolicies: number = 0;
totalProcedures: number = 0;
totalGuidelines: number = 0;
totalFormats: number = 0;
totalISPolicies: number = 0;
updateCounts() {
  const docs = this.filteredISMSDocs || [];
  this.totalISMSDocs = docs.length;
  this.totalPolicies = docs.filter(x => x.ismsDocType?.toLowerCase() === 'policy').length;
  this.totalProcedures = docs.filter(x => x.ismsDocType?.toLowerCase() === 'procedures').length;
  this.totalGuidelines = docs.filter(x => x.ismsDocType?.toLowerCase() === 'guidelines').length;
  this.totalFormats = docs.filter(x => x.ismsDocType?.toLowerCase() === 'formats').length;
  this.totalISPolicies = docs.filter(x => x.ismsDocType?.toLowerCase() === 'is policy').length;
}


docname: string = '';

  clear(){
    this.docname = '';
    this.clearAllFilters();
  //  this.GetISMSDetails()
 } 
noResultsFound: boolean = false;
 onTextChange() {
  if (!this.docname.trim()) {
    this.noResultsFound = false;
    this.filteredISMSDocs = this.ismsdetails;
    this.updateCounts();
  }
}

searchSkills() {
  const search = this.docname?.trim().toLowerCase();
  
  if (!search) {
    // 🔄 If search box is empty, show all docs again
    this.noResultsFound = false;
    this.filteredISMSDocs = this.ismsdetails;
    this.updateCounts(); // optional: recalc totals
    return;
  }

  // 🔍 Filter locally
  this.filteredISMSDocs = this.ismsdetails.filter((doc: any) =>
    doc.ismsDocumentName?.toLowerCase().includes(search)
  );

  // 🚫 Show "no results" if nothing matches
  if (this.filteredISMSDocs.length === 0) {
    this.noResultsFound = true;
  } else {
    this.noResultsFound = false;
  }

  // optional: update counts based on filtered data
  this.updateCounts();
}
 GetIsoSprtlist(){
  this.ielc.Getiso27001().subscribe((data) => {
    this.isosprtlist=data;
    this.isLoading = false;
  });
 }
 
 GetIsoInfolist(){
  this.ielc.Getismsinfo().subscribe((data) => {
    this.isoinfolist=data;
    this.isLoading = false;
  });
 }
 GetIsoPolicylist(){
  this.ielc.Getispolicy().subscribe((data) => {
    this.isopolicylist=data;
    this.isLoading = false;
  });
 }
 
GetPrjtISMSGuidelineslist(){
  this.ielc.Getprjtismsguidelines().subscribe((data) => {
    this.prjtIsmsGuidelinesdata=data;
    this.isLoading = false;
  });
 }
 GetPrjtISMSPolicylist(){
  this.ielc.Getprjtismspolicy().subscribe((data) => {
    this.prjtIsmsPolicydata=data;
    this.isLoading = false;
  });
 }
 GetPrjtISMSProcedurelist(){
  this.ielc.Getprjtismsprocedure().subscribe((data) => {
    this.prjtIsmsProceduredata=data;
    this.isLoading = false;
  });
 }
 GetPrjtISMSFormatlist(){
  this.ielc.Getprjtismsformat().subscribe((data) => {
    this.prjtIsmsFormatdata=data;
    this.isLoading = false;
  });
 }

 GetCisoISMSGuidelineslist(){
  this.ielc.Getcisoismsguidelines().subscribe((data) => {
    this.cisoIsmsGuidelinesdata=data;
    this.isLoading = false;
  });
 }
 GetCisoISMSPolicylist(){
  this.ielc.Getcisoismspolicy().subscribe((data) => {
    this.cisoIsmsPolicydata=data;
    this.isLoading = false;
  });
 }
 GetCisoISMSProcedurelist(){
  this.ielc.Getcisoismsprocedure().subscribe((data) => {
    this.cisoIsmsProceduredata=data;
    this.isLoading = false;
  });
 }
 GetCisoISMSFormatlist(){
  this.ielc.Getcisoismsformat().subscribe((data) => {
    this.cisoIsmsFormatdata=data;
    this.isLoading = false;
  });
 }
 
 GetISMSGuidelineslist(){
  this.ielc.Getitismsguidelines().subscribe((data) => {
    this.IsmsGuidelinesdata=data;
    this.isLoading = false;
  });
 }
 GetISMSPolicylist(){
  this.ielc.Getitismspolicy().subscribe((data) => {
    this.IsmsPolicydata=data;
    this.isLoading = false;
  });
 }
 GetISMSProcedurelist(){
  this.ielc.Getitismsprocedure().subscribe((data) => {
    this.IsmsProceduredata=data;
    this.isLoading = false;
  });
 }
 GetISMSFormatlist(){
  this.ielc.Getitismsformat().subscribe((data) => {
    this.IsmsFormatdata=data;
    this.isLoading = false;
  });
 }

 
 GetOsISMSGuidelineslist(){
  this.ielc.Getosismsguidelines().subscribe((data) => {
    this.OsIsmsGuidelinesdata=data;
    this.isLoading = false;
  });
 }
 GetOsISMSPolicylist(){
  this.ielc.Getosismspolicy().subscribe((data) => {
    this.OsIsmsPolicydata=data;
    this.isLoading = false;
  });
 }
 GetOsISMSProcedurelist(){
  this.ielc.Getosismsprocedure().subscribe((data) => {
    this.OsIsmsProceduredata=data;
    this.isLoading = false;
  });
 }
 GetOsISMSFormatlist(){
  this.ielc.Getosismsformat().subscribe((data) => {
    this.OsIsmsFormatdata=data;
    this.isLoading = false;
  });
 }
 
 GetHrISMSGuidelineslist(){
  this.ielc.Gethrismsguidelines().subscribe((data) => {
    this.HrIsmsGuidelinesdata=data;
    this.isLoading = false;
  });
 }
 GetHrISMSPolicylist(){
  this.ielc.Gethrismspolicy().subscribe((data) => {
    this.HrIsmsPolicydata=data;
    this.isLoading = false;
  });
 }
 GetHrISMSProcedurelist(){
  this.ielc.Gethrismsprocedure().subscribe((data) => {
    this.HrIsmsProceduredata=data;
    this.isLoading = false;
  });
 }
 GetHrISMSFormatlist(){
  this.ielc.Gethrismsformat().subscribe((data) => {
    this.HrIsmsFormatdata=data;
    this.isLoading = false;
  });
 }

GetISMSDetails() {
  this.isLoading = true;

  this.ielc.GetISMSMasterTable().subscribe({
    next: (data) => {
      this.ismsdetails = data; 
      this.filteredISMSDocs = data; 
      this.updateUniqueDepts(); 
      this.updateUniqueDocTypes();
      this.updateUniqueDocNos();
      this.updateUniqueVersions();
      this.updateUniqueMaintainedBy();
      this.updateCounts(); 
      this.isLoading = false;
    },
    error: (err) => {
      console.error(err);
      this.isLoading = false;
    }
  });
}


}
