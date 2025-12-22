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
  interface QMSMasterData {
  documentID: number;
  qmsDept?: string;
  qmsDocType?: string;
  qmsDocumentName?: string;
  url?: string;
  qmsDocumentNo?: string;
  qmsCurrentVersion?: number;
  documentMaintainedBy?: string;
}
@Component({
  selector: 'app-iso9001',
  templateUrl: './iso9001.component.html',
  styleUrls: ['./iso9001.component.css']
})
export class Iso9001Component {
email='cvprasad@inteqsolutions.com'

isLoading = true;
 isosprtlist: any[] = []; 
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
 qmsdatalist: any[] = []; 
qmsalldata: QMSMasterData = {
  documentID: 0,
  qmsDept: '',
  qmsDocType: '',
  qmsDocumentName: '',
  url: '',
  qmsDocumentNo: '',
  qmsCurrentVersion: 0,
  documentMaintainedBy: '',
};
 isoinfolist: any[] = []; 
 cisoqmsGuidelinesdata: any[] = []; 
 cisoqmsProceduredata: any[] = []; 
 cisoqmsFormatdata: any[] = []; 
 prjtqmsGuidelinesdata: any[] = []; 
 prjtqmsProceduredata: any[] = []; 
 prjtqmsFormatdata: any[] = []; 
 qmsGuidelinesdata: any[] = []; 
 qmsProceduredata: any[] = []; 
 qmsFormatdata: any[] = []; 
 HrqmsGuidelinesdata: any[] = []; 
 HrqmsProceduredata: any[] = []; 
 HrqmsFormatdata: any[] = []; 
 OsqmsGuidelinesdata: any[] = []; 
 OsqmsProceduredata: any[] = []; 
 OsqmsFormatdata: any[] = []; 
 filteredQMSDocs: any[] = [];
 qmsdetails: any[] = [];
 
 constructor(private ielc:IelcapiService) {

 }
 showDeptFilterQMS = false;
  selectedDeptsQMS: string[] = [];
  uniqueDeptsQMS: string[] = [];
  isAllDeptsSelectedQMS: boolean = true;

  // Filter UI state and values for ISMSDocType, ISMSDocumentNo, ISMSCurrentVersion, DocumentMaintainedBy
  showDocTypeFilterQMS = false;
  showDocNoFilterQMS = false;
  showVersionFilterQMS = false;
  showMaintainedByFilterQMS = false;

  uniqueDocTypesQMS: string[] = [];
  selectedDocTypesQMS: string[] = [];
  isAllDocTypesSelectedQMS: boolean = true;

  uniqueDocNosQMS: string[] = [];
  selectedDocNosQMS: string[] = [];
  isAllDocNosSelectedQMS: boolean = true;

  uniqueVersionsQMS: string[] = [];
  selectedVersionsQMS: string[] = [];
  isAllVersionsSelectedQMS: boolean = true;

  uniqueMaintainedByQMS: string[] = [];
  selectedMaintainedByQMS: string[] = [];
  isAllMaintainedBySelectedQMS: boolean = true;

  updateUniqueDocTypesQMS(): void {
    const all = (this.qmsdetails || []).map((item: any) => item.qmsDocType).filter(Boolean);
    this.uniqueDocTypesQMS = Array.from(new Set(all));
  }
  updateUniqueDocNosQMS(): void {
  const all = (this.qmsdetails || []).map((item: any) => item.qmsDocumentNo);
  // Remove only undefined/null, keep empty string
  this.uniqueDocNosQMS = Array.from(new Set(all.filter(v => v !== undefined && v !== null)));
  }
  updateUniqueVersionsQMS(): void {
    const all = (this.qmsdetails || []).map((item: any) => {
      if (item.qmsCurrentVersion === null || item.qmsCurrentVersion === undefined || item.qmsCurrentVersion === '') {
        return '';
      }
      return item.qmsCurrentVersion;
    });
    this.uniqueVersionsQMS = Array.from(new Set(all));
  }
  updateUniqueMaintainedByQMS(): void {
    const all = (this.qmsdetails || []).map((item: any) => item.documentMaintainedByQMS).filter(Boolean);
    this.uniqueMaintainedByQMS = Array.from(new Set(all));
  }

  toggleAllDocTypesQMS(): void {
    if (this.isAllDocTypesSelectedQMS) {
      this.selectedDocTypesQMS = [];
      this.isAllDocTypesSelectedQMS = false;
    } else {
      this.selectedDocTypesQMS = [...this.uniqueDocTypesQMS];
      this.isAllDocTypesSelectedQMS = true;
    }
    this.filterQMSDocs();
  }
  onDocTypeCheckboxChangeQMS(event: any, val: string): void {
    if (event.target.checked) {
      if (!this.selectedDocTypesQMS.includes(val)) this.selectedDocTypesQMS.push(val);
    } else {
      this.selectedDocTypesQMS = this.selectedDocTypesQMS.filter(d => d !== val);
    }
    this.isAllDocTypesSelectedQMS = this.selectedDocTypesQMS.length === this.uniqueDocTypesQMS.length;
    this.filterQMSDocs();
  }

  toggleAllDocNosQMS(): void {
    if (this.isAllDocNosSelectedQMS) {
      this.selectedDocNosQMS = [];
      this.isAllDocNosSelectedQMS = false;
    } else {
      this.selectedDocNosQMS = [...this.uniqueDocNosQMS];
      this.isAllDocNosSelectedQMS = true;
    }
    this.filterQMSDocs();
  }
  onDocNoCheckboxChangeQMS(event: any, val: string): void {
    if (event.target.checked) {
      if (!this.selectedDocNosQMS.includes(val)) this.selectedDocNosQMS.push(val);
    } else {
      this.selectedDocNosQMS = this.selectedDocNosQMS.filter(d => d !== val);
    }
    this.isAllDocNosSelectedQMS = this.selectedDocNosQMS.length === this.uniqueDocNosQMS.length;
    this.filterQMSDocs();
  }

  toggleAllVersionsQMS(): void {
    if (this.isAllVersionsSelectedQMS) {
      this.selectedVersionsQMS = [];
      this.isAllVersionsSelectedQMS = false;
    } else {
      this.selectedVersionsQMS = [...this.uniqueVersionsQMS];
      this.isAllVersionsSelectedQMS = true;
    }
    this.filterQMSDocs();
  }
  onVersionCheckboxChangeQMS(event: any, val: string): void {
    if (event.target.checked) {
      if (!this.selectedVersionsQMS.includes(val)) this.selectedVersionsQMS.push(val);
    } else {
      this.selectedVersionsQMS = this.selectedVersionsQMS.filter(d => d !== val);
    }
    this.isAllVersionsSelectedQMS = this.selectedVersionsQMS.length === this.uniqueVersionsQMS.length;
    this.filterQMSDocs();
  }

  toggleAllMaintainedByQMS(): void {
    if (this.isAllMaintainedBySelectedQMS) {
      this.selectedMaintainedByQMS = [];
      this.isAllMaintainedBySelectedQMS = false;
    } else {
      this.selectedMaintainedByQMS = [...this.uniqueMaintainedByQMS];
      this.isAllMaintainedBySelectedQMS = true;
    }
    this.filterQMSDocs();
  }
  onMaintainedByCheckboxChangeQMS(event: any, val: string): void {
    if (event.target.checked) {
      if (!this.selectedMaintainedByQMS.includes(val)) this.selectedMaintainedByQMS.push(val);
    } else {
      this.selectedMaintainedByQMS = this.selectedMaintainedByQMS.filter(d => d !== val);
    }
    this.isAllMaintainedBySelectedQMS = this.selectedMaintainedByQMS.length === this.uniqueMaintainedByQMS.length;
    this.filterQMSDocs();
  }
      clearAllFiltersQMS(): void {
      // Reset all filter selections to select all
      this.selectedDeptsQMS = [...this.uniqueDeptsQMS];
      this.isAllDeptsSelectedQMS = true;
      this.selectedDocTypesQMS = [...this.uniqueDocTypesQMS];
      this.isAllDocTypesSelectedQMS = true;
      this.selectedDocNosQMS = [...this.uniqueDocNosQMS];
      this.isAllDocNosSelectedQMS = true;
      this.selectedVersionsQMS = [...this.uniqueVersionsQMS];
      this.isAllVersionsSelectedQMS = true;
      this.selectedMaintainedByQMS = [...this.uniqueMaintainedByQMS];
      this.isAllMaintainedBySelectedQMS = true;
      this.filterQMSDocs();
    }

 ngOnInit(): void {
   this.GetIsoSprtlist();
   this.GetIsoInfolist();
   this.GetPrjtQMSGuidelineslist();
   this.GetPrjtQMSProcedurelist();
   this.GetPrjtQMSFormatlist();
   this.GetCisoQMSGuidelineslist();
   this.GetCisoQMSProcedurelist();
   this.GetCisoQMSFormatlist();
   this.GetQMSFormatlist();
   this.GetQMSGuidelineslist();
   this.GetQMSProcedurelist();
   this.GetOsQMSFormatlist();
   this.GetOsQMSGuidelineslist();
   this.GetOsQMSProcedurelist();
   this.GetHrQMSGuidelineslist();
   this.GetHrQMSProcedurelist();
   this.GetHrQMSFormatlist();
   this.GetQMSDetails();
 }
updateUniqueDeptsQMS(): void {
    // Extract unique departments from ISMSMasterTable (ismsdetails)
    const allDeptsQMS = (this.qmsdetails || []).map((item: any) => item.qmsDept).filter(Boolean);
    this.uniqueDeptsQMS = Array.from(new Set(allDeptsQMS));
  }

  toggleAllDeptsQMS(): void {
    if (this.isAllDeptsSelectedQMS) {
      // Deselect all
      this.selectedDeptsQMS = [];
      this.isAllDeptsSelectedQMS = false;
    } else {
      // Select all
      this.selectedDeptsQMS = [...this.uniqueDeptsQMS];
      this.isAllDeptsSelectedQMS = true;
    }
    this.filterQMSDocs();
  }

  onDeptCheckboxChangeQMS(event: any, dept: string): void {
    if (event.target.checked) {
      if (!this.selectedDeptsQMS.includes(dept)) {
        this.selectedDeptsQMS.push(dept);
      }
    } else {
      this.selectedDeptsQMS = this.selectedDeptsQMS.filter(d => d !== dept);
    }
    this.isAllDeptsSelectedQMS = this.selectedDeptsQMS.length === this.uniqueDeptsQMS.length;
    this.filterQMSDocs();
  }

  filterQMSDocs(): void {
    // Combined filter for all columns
    this.filteredQMSDocs = (this.qmsdetails || []).filter((item: any) => {
        const deptMatchQMS = this.selectedDeptsQMS.length === 0 || this.selectedDeptsQMS.includes(item.qmsDept);
        const docTypeMatchQMS = this.selectedDocTypesQMS.length === 0 || this.selectedDocTypesQMS.includes(item.qmsDocType);
        const docNoMatchQMS = this.selectedDocNosQMS.length === 0 ||
          (item.qmsDocumentNo === '' && this.selectedDocNosQMS.includes('')) ||
          this.selectedDocNosQMS.includes(item.qmsDocumentNo);
        const versionMatchQMS = this.selectedVersionsQMS.length === 0 ||
          (item.qmsCurrentVersion === null && this.selectedVersionsQMS.includes('')) ||
          (item.qmsCurrentVersion === undefined && this.selectedVersionsQMS.includes('')) ||
          (item.qmsCurrentVersion === '' && this.selectedVersionsQMS.includes('')) ||
          this.selectedVersionsQMS.includes(item.qmsCurrentVersion);
        const maintainedByMatchQMS = this.selectedMaintainedByQMS.length === 0 || this.selectedMaintainedByQMS.includes(item.documentMaintainedByQMS);
        return deptMatchQMS && docTypeMatchQMS && docNoMatchQMS && versionMatchQMS && maintainedByMatchQMS;
    });
    this.updateQMSCounts();
  }

  GetQMSDetails() {
  this.isLoading = true;
  this.ielc.GetQMSMasterTable().subscribe({
    next: (data) => {
      this.qmsdetails = data;
      this.updateUniqueDeptsQMS();
      this.updateUniqueDocTypesQMS();
      this.updateUniqueDocNosQMS();
      this.updateUniqueVersionsQMS();
      this.updateUniqueMaintainedByQMS();
      this.selectedDeptsQMS = [...this.uniqueDeptsQMS];
      this.isAllDeptsSelectedQMS = true;
      this.selectedDocTypesQMS = [...this.uniqueDocTypesQMS];
      this.isAllDocTypesSelectedQMS = true;
      this.selectedDocNosQMS = [...this.uniqueDocNosQMS];
      this.isAllDocNosSelectedQMS = true;
      this.selectedVersionsQMS = [...this.uniqueVersionsQMS];
      this.isAllVersionsSelectedQMS = true;
      this.selectedMaintainedByQMS = [...this.uniqueMaintainedByQMS];
      this.isAllMaintainedBySelectedQMS = true;
      this.filterQMSDocs();
      this.isLoading = false;
      //console.log("QMS",this.qmsdetails);
    },
    error: (err) => {
      console.error('Error fetching QMS Master Table:', err);
      this.isLoading = false;
    }
  });
}
totalQMSDocs: number = 0;
totalQMSPolicies: number = 0;
totalQMSProcedures: number = 0;
totalQMSGuidelines: number = 0;
totalQMSFormats: number = 0;
totalQMS: number = 0;

//filtercounts
updateQMSCounts() {
  const docs = this.filteredQMSDocs || [];
  this.totalQMSDocs = docs.length;
  this.totalQMSPolicies = docs.filter(x => x.qmsDocType?.toLowerCase() === 'policy').length;
  this.totalQMSProcedures = docs.filter(x => x.qmsDocType?.toLowerCase() === 'procedures').length;
  this.totalQMSGuidelines = docs.filter(x => x.qmsDocType?.toLowerCase() === 'guidelines').length;
  this.totalQMSFormats = docs.filter(x => x.qmsDocType?.toLowerCase() === 'formats').length;
  this.totalQMS = docs.filter(x => x.qmsDocType?.toLowerCase() === 'qms').length;
}


docnameqms: string = '';

  clearQMS(){
    this.docnameqms = '';
   this.clearAllFiltersQMS();
 } 
 noResultsFoundqms: boolean = false;
 onTextChangeQMS() {
  if (!this.docnameqms.trim()) {
    this.noResultsFoundqms = false;
    this.filteredQMSDocs = this.qmsdetails;
    this.updateQMSCounts();
  }
}

searchSkillsQMS() {
  const search = this.docnameqms?.trim().toLowerCase();
  
  if (!search) {
    this.noResultsFoundqms = false;
    this.filteredQMSDocs = this.qmsdetails;
    this.updateQMSCounts();
    return;
  }

  // 🔍 Filter locally
  this.filteredQMSDocs = this.qmsdetails.filter((doc: any) =>
    doc.qmsDocumentName?.toLowerCase().includes(search)
  );

  // 🚫 Show "no results" if nothing matches
  if (this.filteredQMSDocs.length === 0) {
    this.noResultsFoundqms = true;
  } else {
    this.noResultsFoundqms = false;
  }

  // optional: update counts based on filtered data
  this.updateQMSCounts();
}

 GetIsoSprtlist(){
  this.ielc.Getiso9001().subscribe((data) => {
    this.isosprtlist=data;
    this.isLoading = false;
  });
 }
 
 GetIsoInfolist(){
  this.ielc.Getisoinfo().subscribe((data) => {
    this.isoinfolist=data;
    this.isLoading = false;
  });
 }
 
GetPrjtQMSGuidelineslist(){
  this.ielc.Getprjtqmsguidelines().subscribe((data) => {
    this.prjtqmsGuidelinesdata=data;
    this.isLoading = false;
  });
 }
 
 GetPrjtQMSProcedurelist(){
  this.ielc.Getprjtqmsprocedure().subscribe((data) => {
    this.prjtqmsProceduredata=data;
    this.isLoading = false;
  });
 }

 GetPrjtQMSFormatlist(){
  this.ielc.Getprjtqmsformat().subscribe((data) => {
    this.prjtqmsFormatdata=data;
    this.isLoading = false;
  });
 }

 GetCisoQMSGuidelineslist(){
  this.ielc.Getcisoqmsguidelines().subscribe((data) => {
    this.cisoqmsGuidelinesdata=data;
    this.isLoading = false;
  });
 }
 
 GetCisoQMSProcedurelist(){
  this.ielc.Getcisoqmsprocedure().subscribe((data) => {
    this.cisoqmsProceduredata=data;
    this.isLoading = false;
  });
 }
 GetCisoQMSFormatlist(){
  this.ielc.Getcisoqmsformat().subscribe((data) => {
    this.cisoqmsFormatdata=data;
    this.isLoading = false;
  });
 }
 
 GetQMSGuidelineslist(){
  this.ielc.Getitqmsguidelines().subscribe((data) => {
    this.qmsGuidelinesdata=data;
    this.isLoading = false;
  });
 }
 GetQMSProcedurelist(){
  this.ielc.Getitqmsprocedure().subscribe((data) => {
    this.qmsProceduredata=data;
    this.isLoading = false;
  });
 }
 
 GetQMSFormatlist(){
  this.ielc.Getitqmsformat().subscribe((data) => {
    this.qmsFormatdata=data;
    this.isLoading = false;
  });
 }

 
 GetOsQMSGuidelineslist(){
  this.ielc.Getosqmsguidelines().subscribe((data) => {
    this.OsqmsGuidelinesdata=data;
    this.isLoading = false;
  });
 }

 GetOsQMSProcedurelist(){
  this.ielc.Getosqmsprocedure().subscribe((data) => {
    this.OsqmsProceduredata=data;
    this.isLoading = false;
  });
 }
 GetOsQMSFormatlist(){
  this.ielc.Getosqmsformat().subscribe((data) => {
    this.OsqmsFormatdata=data;
    this.isLoading = false;
  });
 }
 
 GetHrQMSGuidelineslist(){
  this.ielc.Gethrqmsguidelines().subscribe((data) => {
    this.HrqmsGuidelinesdata=data;
    this.isLoading = false;
  });
 }

 GetHrQMSProcedurelist(){
  this.ielc.Gethrqmsprocedure().subscribe((data) => {
    this.HrqmsProceduredata=data;
    this.isLoading = false;
  });
 }
 GetHrQMSFormatlist(){
  this.ielc.Gethrqmsformat().subscribe((data) => {
    this.HrqmsFormatdata=data;
    this.isLoading = false;
  });
 }



}
