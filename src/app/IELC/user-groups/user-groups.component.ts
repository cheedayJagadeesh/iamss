import { Component, OnInit } from '@angular/core';
import { IelcapiService } from '../ielcapi.service';
import { forkJoin } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface smtpinfo {
  id: number;
  userName: string;
  password: string;
}
export interface EventScheduleDetails {
  eventScheduleId: number;
  projectInternalAudit: string;
  projectQMS: string;
  projectISMS: string;
  organizerCompany: string;
  organizerSchedule: string;
  organizerDateRange: string;
  notes: string;
  organizerLastDate: string;
}

//   interface eventsschedulesdetails {
//   eventScheduleId: number;
//   projectInternalAudit: string;
//   projectQMS: string;
//   projectISMS: string;
//   organizerCompany: string;
//   organizerSchedule: string;
//   organizerDateRange: string;
//   notes: string;
//   organizerLastDate:string;
// }
  interface CoOwners {
  id: number;
  auditeeDepartment?: string;
  auditees?: string;
  superOwners?: string;
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

interface eventsscuserdt {
    id: number;
  auditeedepartment?: string;
  auditees?: string;
  starting?: string;
  time?: string;
  auditors?: string;
}
interface eventscadmininfo {
  id: number;
  auditeedepartment: string;
  procedures: string;
}
interface eventsctimeinfo {
  id: number;
  time: string;
}
interface eventscuserinfo {
  id: number;
  auditeedepartment: string;
  auditees: string;
  starting: string;
  time: string;
  auditors: string;
}

interface itsprtinfo{
  id: number;
  contactPriority: string;
  name: string;
  mobile: number;
  email: string;
}
interface ossprtinfo{
  id: number;
  contactPriority: string;
  name: string;
  mobile: number;
  email: string;
}
interface hrsprtinfo{
  id: number;
  contactPriority: string;
  name: string;
  mobile: number;
  email: string;
}
interface emersprtinfo{
  id: number;
  functions: string;
  name: string;
  mobile: number;
  email: string;
}
interface isosprtinfo{
  id: number;
  contactPriority: string;
  name: string;
  mobile: number;
  email: string;
}
interface ismsqmssprtinfo{
  id: number;
  contactPriority: string;
  name: string;
  mobile: number;
  email: string;}
interface docs{
  documentID: number;
  documentName: string;
  url: string;
}
interface adminusersinfo{
  roleName: string;
  pageName: string;
  email: string;
}
interface holidays{
  date: string;
  content: string;
}
interface eventsinfo{
  id: number;
  eventData: string;
  eventName: string;
}
interface crserest{
  id: number;
  coursesList: string;
}
interface eventalertsinfo{
  alertID: number;
  alertName: string;
  alertDate: string;
  toMails: string;
  ccMails: string;
  mailAlertDay: number;
  mailType: string;
  frequency: string;
  alertAttachment?: string;
  fileName?: string; 
   status:string;
}

interface auditevents{
  Id: number,
  auditeeDepartment: string;
  auditees: string;
  StartingDate: string;
  StartTime: string;
  EndTime: string;
  auditors: string;
  location: string;
}

@Component({
  selector: 'app-user-groups',
  templateUrl: './user-groups.component.html',
  styleUrls: ['./user-groups.component.css']
})
export class UserGroupsComponent implements OnInit {
  isLoading=true;


      isSidebarClosed = false;

  // Event handler for sidebar toggle event
   onSidebarToggled(state: boolean) {
    this.isSidebarClosed = state;
  }


  encodePassword (password: string): string {
    return btoa(password);
  }
  // selectedOption: string = '';
  selectedOption1: string = '';
  selectedOption2: string = '';
  selectedOption3: string = '';
  selectedOption4: string = '';
  selectedOption5: string = '';
  isContactSelected: boolean = false;
  isHRSelected: boolean = false;
  isOSSelected: boolean = false;
  isITSelected: boolean = false;
  isPRJTSelected: boolean = false;
  isCISOSelected: boolean = false;
  showContactTable: boolean = false;
  isEventSchedulerSelected: boolean = false;
  isEventYearSelected: boolean = false;
  isEventMonthSelected: boolean = false;

onSelection1Change() {
  this.isContactSelected = this.selectedOption1 === 'Contact';
  this.isHRSelected = this.selectedOption1 === 'HRSupport';
  this.isOSSelected = this.selectedOption1 === 'OperationsSupport';
  this.isITSelected = this.selectedOption1 === 'ITSupport';
  this.isPRJTSelected = this.selectedOption1 === 'ProjectsSupport';
  this.isCISOSelected = this.selectedOption1 === 'CISO_MR_Support';
  this.isEventSchedulerSelected = this.selectedOption1 === 'EventScheduler';

  // Load AuditEvents data when AuditEvents is selected
  // if (this.selectedOption1 === 'AuditEvents') {
  //   this.GetAuditSchedule();
  // }

  if (this.selectedOption1 !== 'Contact') {
    this.showContactTable = false;
  }
}

onSelection2Change() {
 
  // if (this.selectedOption2 === 'INTEQITSupport') {
  //   this.isContactSelected = true; 
  // }
  // this.isHRSelected = this.selectedOption2 === 'HRSupport';
}


onSelection3Change() {
 
}

onSelection4Change() {
    this.isEventYearSelected = this.selectedOption4 === 'Year';
}

onSelection5Change() {
}

  smtplist: any[] = []; 
  smtpdata:smtpinfo={
   id: 0,
   userName: '',
   password: '',
  }
  eventscheduledetailslist: any[] = []; 
  eventschedulesdata: EventScheduleDetails = {
  eventScheduleId: 0,
  projectInternalAudit: '',
  projectQMS: '',
  projectISMS: '',
  organizerCompany: '',
  organizerSchedule: '',
  organizerDateRange: '',
  notes: '',
  organizerLastDate: '',
};

coownerslist: any[] = []; 
coownersdept: CoOwners = {
  id: 0,
  auditeeDepartment: '',
  auditees: '',
  superOwners: '',
};

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


  eventschadtlist: any[] = []; 
 eventschadmindets: eventsscuserdt = {
   id: 0,
  auditeedepartment: '',
  auditees: '',
  starting: '',
  time: '',
  auditors: '',
};

  eventschadlist: any[] = []; 
eventschadmin: eventscadmininfo = {
  id: 0,
  auditeedepartment: '',
  procedures: '',
};

  eventschadtimelist: any[] = []; 
eventschtime: eventsctimeinfo = {
  id: 0,
  time: '',
};

  eventschuserlist: any[] = []; 
eventschuser: eventscuserinfo = {
  id: 0,
  auditeedepartment: '',
  auditees: '',
  starting: '',
  time: '',
  auditors: '',
};

  itsprtlist: any[] = []; 
  itsprtdata:itsprtinfo={
  id: 0,
  contactPriority: '',
  name: '',
  mobile: 0,
  email: '',
  }
  ossprtlist: any[] = []; 
  ossprtdata:ossprtinfo={
  id: 0,
  contactPriority: '',
  name: '',
  mobile: 0,
  email: '',
 }
 hrsprtlist: any[] = []; 
 hrsprtdata:hrsprtinfo={
  id: 0,
  contactPriority: '',
  name: '',
  mobile: 0,
  email: '',
 }
 emersprtlist: any[] = []; 
 emersprtdata:emersprtinfo={
  id: 0,
  functions: '',
  name: '',
  mobile: 0,
  email: '',
  }
  isosprtlist27001: any[] = []; 
  isosprtlist9001: any[] = [];
  ismsqmssupport: any[] = []; 
  isosprtdata:isosprtinfo={
    id: 0,
    contactPriority: '',
    name: '',
    mobile: 0,
    email: '',
 }
   ismsqmssprtdata:ismsqmssprtinfo={
    id: 0,
    contactPriority: '',
    name: '',
    mobile: 0,
    email: '',
 }
 docsdata:docs={
  documentID: 0,
  documentName: '',
  url: '',
 }
 adminusersdata:adminusersinfo={
  roleName: '',
  pageName: '',
  email: '',
 }
 holidaysdata:holidays={
  date: '',
  content: ''
 }
 eventsdata:eventsinfo={
  id: 0,
  eventData: '',
  eventName: ''
 }
 crserestdata:crserest={
  id: 0,
  coursesList: '',
 }
 eventalertsdata:eventalertsinfo={
  alertID: 0,
  alertName: '',
  alertDate: '',
  toMails: '',
  ccMails: '',
  mailAlertDay: 0,
  mailType: '',
  frequency: '',
  alertAttachment: '',
  fileName: '',
  status:'',
 }

 auditeventsdata:auditevents={
  Id: 0,
  auditeeDepartment: '',
  auditees: '',
  StartingDate: '',
  StartTime: '',
  EndTime: '',
  auditors: '',
  location: '',
 }
today:string=''
 HrIsmsGeneraldata: any[] = []; 
 HrIsmsGuidelinesdata: any[] = []; 
 HrIsmsPolicydata: any[] = []; 
 HrIsmsProceduredata: any[] = []; 
 HrIsmsFormatdata: any[] = []; 
 HrqmsGeneraldata: any[] = []; 
 HrqmsGuidelinesdata: any[] = []; 
 HrqmsPolicydata: any[] = []; 
 HrqmsProceduredata: any[] = []; 
 HrqmsFormatdata: any[] = []; 
 OsIsmsGeneraldata: any[] = []; 
 OsIsmsGuidelinesdata: any[] = []; 
 OsIsmsPolicydata: any[] = []; 
 OsIsmsProceduredata: any[] = []; 
 OsIsmsFormatdata: any[] = []; 
 OsqmsGeneraldata: any[] = []; 
 OsqmsGuidelinesdata: any[] = []; 
 OsqmsPolicydata: any[] = []; 
 OsqmsProceduredata: any[] = []; 
 OsqmsFormatdata: any[] = []; 
 IsmsSprtdata:any[]=[];
 IsoSprtdata:any[]=[];
 IsPolicydata:any[]=[];
 ItIsmsGeneraldata: any[] = []; 
 ItIsmsGuidelinesdata: any[] = []; 
 ItIsmsPolicydata: any[] = []; 
 ItIsmsProceduredata: any[] = []; 
 ItIsmsFormatdata: any[] = []; 
 ItqmsGeneraldata: any[] = []; 
 ItqmsGuidelinesdata: any[] = []; 
 ItqmsPolicydata: any[] = []; 
 ItqmsProceduredata: any[] = []; 
 ItqmsFormatdata: any[] = []; 
 prjtIsmsGeneraldata: any[] = []; 
 prjtIsmsGuidelinesdata: any[] = []; 
 prjtIsmsPolicydata: any[] = []; 
 prjtIsmsProceduredata: any[] = []; 
 prjtIsmsFormatdata: any[] = []; 
 prjtqmsGeneraldata: any[] = []; 
 prjtqmsGuidelinesdata: any[] = []; 
 prjtqmsPolicydata: any[] = []; 
 prjtqmsProceduredata: any[] = []; 
 prjtqmsFormatdata: any[] = []; 
 cisoIsmsGeneraldata: []=[];
 cisoIsmsGendata: any[]=[];
 cisoIsmsGuidelinesdata: docs[] = []; 
 cisoIsmsPolicydata: any[] = []; 
 cisoIsmsProceduredata: any[] = []; 
 cisoIsmsFormatdata: any[] = []; 
 cisoqmsGeneraldata: any[]=[];
 cisoqmsGuidelinesdata: any[] = []; 
 cisoqmsPolicydata: any[] = []; 
 cisoqmsProceduredata: any[] = []; 
 cisoqmsFormatdata: any[] = []; 
 EmerGeneraldata: any[]=[];
 VarcmtGeneraldata: any[]=[];
 HipaaGeneraldata: any[]=[];
 SocGeneraldata: any[]=[];
 GdprGeneraldata: any[]=[];
 DpdpGeneraldata: any[]=[];
 adminuserslist: any[]=[];
 holidayslist: any[]=[];
 eventslist: any[]=[];
 eventscheduleradmin: any[]=[];
 eventscheduleadmin: any[]=[];
 eventscheduleruser: any[]=[];
 eventschedulertime: any[]=[];
 eventschedules: any[]=[];
 crserestlist: any[]=[];
 auditschedulelist: any[]=[];
 eventalertslist: any[]=[];
 ismsdetails: any[] = [];
 qmsdetails: any[] = [];
 event: any | null = null;
 fileError: string = "";
 coownerss: any[]=[];
 ismsdata: any[]=[];
 years: number[] = [];
//selectedYear: string = new Date().getFullYear().toString();
 selectedYear: string = '';
 tableData: any[] = [];
 availableMonths: string[] = [];
 selectedMonth: string = '';
  items: any[] = [];
  prjtIsmsGeneraldatainfo: any[]= [];
  filteredISMSDocs: any[] = [];
  filteredQMSDocs: any[] = [];

 updatedFields: any;
  
  constructor(private ielc:IelcapiService, private router: Router) {
     this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  sortlist(data: any[]): any[] {
    return data.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
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

    //QMS
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
    // ...existing code...
    this.GetSmtplist();
    this.GetItSprtlist();
    this.GetOsSprtlist();
    this.GetHrSprtlist();
    this.GetEmerSprtlist();
    this.GetIsoSprtlist();
    this.GetIso9001Sprtlist();
    this.GetIsmsqmsSprtlist();
    this.GetHrISMSGenerallist();
    this.GetHrISMSGuidelineslist();
    this.GetHrISMSPolicylist();
    this.GetHrISMSProcedurelist();
    this.GetHrISMSFormatlist();
    this.GetHrQMSGenerallist();
    this.GetHrQMSGuidelineslist();
    this.GetHrQMSPolicylist();
    this.GetHrQMSProcedurelist();
    this.GetHrQMSFormatlist();
    this.GetOsISMSGenerallist();
    this.GetOsISMSGuidelineslist();
    this.GetOsISMSPolicylist();
    this.GetOsISMSProcedurelist();
    this.GetOsISMSFormatlist();
    this.GetOsQMSGenerallist();
    this.GetOsQMSGuidelineslist();
    this.GetOsQMSPolicylist();
    this.GetOsQMSProcedurelist();
    this.GetOsQMSFormatlist();
    this.GetIsmsSprt();
    this.GetIsoSprt();
    this.GetItISMSGenerallist();
    this.GetItISMSGuidelineslist();
    this.GetItISMSPolicylist();
    this.GetItISMSProcedurelist();
    this.GetItISMSFormatlist();
    this.GetItQMSGenerallist();
    this.GetItQMSGuidelineslist();
    this.GetItQMSPolicylist();
    this.GetItQMSProcedurelist();
    this.GetItQMSFormatlist();
    this.GetPrjtISMSGenerallist();
    this.GetPrjtISMSGuidelineslist();
    this.GetPrjtISMSPolicylist();
    this.GetPrjtISMSProcedurelist();
    this.GetPrjtISMSFormatlist();
    this.GetPrjtQMSGenerallist();
    this.GetPrjtQMSGuidelineslist();
    this.GetPrjtQMSPolicylist();
    this.GetPrjtQMSProcedurelist();
    this.GetPrjtQMSFormatlist();
    this.GetCisoISMSGenerallist();
    this.GetCisoISMSGuidelineslist();
    this.GetCisoISMSProcedurelist();
    this.GetCisoISMSPolicylist();
    this.GetCisoISMSFormatlist();
    this.GetCisoQMSGenerallist();
    this.GetCisoQMSGuidelineslist();
    this.GetCisoQMSProcedurelist();
    this.GetCisoQMSPolicylist();
    this.GetCisoQMSFormatlist();
    this.GetIsoPolicy();
    this.GetEmerGenerallist();
    this.GetVarCmtGenerallist();
    this.GetHipaaGenerallist();
    this.GetSocGenerallist();
    this.GetGdprGenerallist();
    this.GetDpdpGenerallist();
    this.GetAdminuserslist();
    this.GetHolidaysist();
    this.GetEventsist();
    this.GetCourseist();
    this.GetEventAlertsist();
    this.GetEventSchedulerAdmin();
    //this.GetEventSchedulerUser();
    //this.GetEventSchedules();
    this.GetEventSchedulerTimeslots();
    this.GetCoOnwers();
    this.GetAuditSchedule();
    this.populateYears();
    this.selectedYear = '';
    // this.fetchData(this.selectedYear);
    this.GetISMSDetails();
    this.GetQMSDetails();
    const currentDate = new Date();
    this.today = currentDate.toISOString().split('T')[0];
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

  //QMS
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



  //--------------------------------------------------------------------------------Years
GetMonthsByYear(year: string): void {
  this.ielc.GetAvailableMonthsByYear(year).subscribe({
    next: (months) => {
      this.availableMonths = months;
    },
    error: (err) => {
      console.error('Failed to load months:', err);
      this.availableMonths = [];
    }
  });
}
onYearChange(): void {
  if (this.selectedYear) {
    this.isEventYearSelected = true;
    this.GetMonthsByYear(this.selectedYear);
  } else {
    this.availableMonths = [];
    this.isEventYearSelected = false;
  }
}
  onMonthChange(): void {
    if (this.selectedYear && this.selectedMonth) {
       this.isEventMonthSelected = true;
      forkJoin({
        scheduleTimes: this.ielc.GetEventSchedulerTime(this.selectedYear, this.selectedMonth),
        eventschedules: this.ielc.GetEventSchedules(this.selectedYear, this.selectedMonth),
        eventuser: this.ielc.GetEventSchedulerUser(this.selectedYear, this.selectedMonth)
      }).subscribe({
        next: (results) => {
         // console.log('✅ scheduleTimes:', results.scheduleTimes);
          //console.log('✅ eventschedules:', results.eventschedules);
          this.eventschedulertime = results.scheduleTimes;
          this.eventschedules = this.sortlist(results.eventschedules);
          this.eventscheduleruser = this.sortlist(results.eventuser);
        },
        error: (err) => {
          console.error('❌ Error loading data:', err);
          this.eventschedulertime = [];
          this.eventschedules = [];
        }
      });
       this.isEventMonthSelected = false;
    }
  }

// onMonthChange(): void {
//   if (this.selectedYear && this.selectedMonth) {
//     this.ielc.GetEventSchedulerTime(this.selectedYear, this.selectedMonth)
//       .subscribe({
//         next: (data) => this.eventschedulertime = data,
//         error: (err) => {
//           console.error('Error loading times:', err);
//           this.eventschedulertime = [];
//         }
//       });
//   }
// }


  populateYears(): void {
    const startYear = 2025;
    const currentYear = new Date().getFullYear();
    const today = new Date();
  
    // Always include years up to the current year
    this.years = [];
    for (let year = startYear; year <= currentYear; year++) {
      this.years.push(year);
    }
  
    // Only add next year if today is January 1st
    if (today.getMonth() === 0 && today.getDate() === 1) {
      this.years.push(currentYear + 1);
    }
  }

  // fetchData(year: number): void {
  //   this.ielc.Getismshistory(year).subscribe(
  //     (data) => {
  //       this.tableData = data;
  //       this.tableData = this.sortlist(data);
  //       this.isLoading = false;
  //     },
  //     (error) => {
  //       // console.error('Error fetching data:', error);
  //       this.tableData = []; // Clear data on error
  //     }
  //   );
  // }

  //-------------------------------------------------------------------------------EventSchedulerAdmin


//-------------------------------------------------------------------------------ISMSMasterTable
// GetISMSDetails(){
//   this.ielc.GetISMSMasterTable().subscribe((data) => {
//     this.ismsdetails=data;
//     this.isLoading = false;
//   console.log(this.ismsdetails);
//   });
//  }

GetISMSDetails() {
  this.isLoading = true;
  this.ielc.GetISMSMasterTable().subscribe({
    next: (data) => {
      this.ismsdetails = data;
      // Update unique values for all filters
      this.updateUniqueDepts();
      this.updateUniqueDocTypes();
      this.updateUniqueDocNos();
      this.updateUniqueVersions();
      this.updateUniqueMaintainedBy();
      // Select all by default
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
      this.isLoading = false;
    },
    error: (err) => {
      console.error('Error fetching ISMS Master Table:', err);
      this.isLoading = false;
    }
  });
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

//overallcounts
// updateCounts() {
//   this.totalISMSDocs = this.ismsdetails?.length || 0;

//   this.totalPolicies = this.ismsdetails.filter(
//     (x: any) => x.ismsDocType?.toLowerCase() === 'policy'
//   ).length;

//   this.totalProcedures = this.ismsdetails.filter(
//     (x: any) => x.ismsDocType?.toLowerCase() === 'procedures'
//   ).length;

//   this.totalGuidelines = this.ismsdetails.filter(
//     (x: any) => x.ismsDocType?.toLowerCase() === 'guidelines'
//   ).length;

//   this.totalFormats = this.ismsdetails.filter(
//     (x: any) => x.ismsDocType?.toLowerCase() === 'formats'
//   ).length;

//   this.totalISPolicies = this.ismsdetails.filter(
//     (x: any) => x.ismsDocType?.toLowerCase() === 'is policy'
//   ).length;
// }

//filtercounts
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
   this.GetISMSDetails()
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



//  onTextChange() {
//   if (!this.docname.trim()) {
//     this.noResultsFound = false;
//     this.GetISMSDetails(); // reload all when textbox becomes empty
//   }
// }
//    noResultsFound: boolean = false;

// searchSkills() {
//   const search = this.docname?.trim();
//   if (!search) {
//     this.noResultsFound = false;
//     this.GetISMSDetails(); // reload all
//     return;
//   }

//   this.isLoading = true;
//   this.noResultsFound = false;

//   this.ielc.GetISMSMasterTableDocName(search).subscribe({
//     next: (data) => {
//       if (!data || (Array.isArray(data) && data.length === 0)) {
//         this.filteredISMSDocs = [];
//         this.noResultsFound = true;
//       } else {
//         this.filteredISMSDocs = Array.isArray(data) ? data : [data];
//       }
//       this.isLoading = false;
//     },
//     error: (err) => {
//       console.error('Error fetching ISMS Master Table:', err);
//       this.filteredISMSDocs = [];
//       this.noResultsFound = true;
//       this.isLoading = false;
//     }
//   });
// }



AddISMSDetails(): void {
  const ismsdata = {
    ismsDept: this.ismsalldata.ismsDept,
    ismsDocType: this.ismsalldata.ismsDocType,
    ismsDocumentName: this.ismsalldata.ismsDocumentName,
    url: this.ismsalldata.url,
    ismsDocumentNo: this.ismsalldata.ismsDocumentNo,
    ismsCurrentVersion: this.ismsalldata.ismsCurrentVersion,
    documentMaintainedBy: this.ismsalldata.documentMaintainedBy
  };

  this.ielc.PostISMSMasterTable(ismsdata).subscribe({
    next: (response) => {
      alert('✅ Record Added Successfully!');
      this.GetISMSDetails();
      this.resetISMSDetails();
    },
    error: (error) => {
      console.error('Error adding record:', error);
      alert('❌ Error adding Record. Please try again.');
    }
  });
}


    deleteISMSDetails(id: number) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.ielc.DeleteISMSMasterTable(id).subscribe({
        next: () => {
          alert(`Record with ID ${id} deleted successfully!`);
          this.GetISMSDetails();
        },
         error: (err) =>  console.error('Error deleting item:', err)
      });
    }
  }
  EditISMSDetails(id: number) {
    //debugger;
  this.ielc.GetISMSMasterTableId(id).subscribe(data => {
    if (data) {
      this.ismsalldata = { 
        documentID: data.documentID || 0,
        ismsDept: data.ismsDept || '',
        ismsDocType: data.ismsDocType || '',
       ismsDocumentName:data.ismsDocumentName || '',
       url:data.url || '',
       ismsDocumentNo:data.ismsDocumentNo || '',
       ismsCurrentVersion:data.ismsCurrentVersion || '',
       documentMaintainedBy:data.documentMaintainedBy || ''
      };
      //console.log("API Response:", data);
    } else {
       console.warn("No data received for the given ID.");
    }
  }, error => {
     console.error("Error fetching record:", error);
  });
}

UpdateISMSDetails() {
  debugger;
  this.ielc.UpdateISMSMasterTable(this.ismsalldata.documentID, this.ismsalldata).subscribe(
    (response) => {
      alert(" ✅ Record updated successfully!");
      this.GetISMSDetails();
      this.resetISMSDetails();
      console.log("Updated Successfully:", response);
    },
    (error) => {
       console.error("Error updating Record:", error);
    }
  );
}
  //searchText: string = '';

//   onSearchClick() {
//     debugger;
//   const search = this.searchText?.trim();
//   if (!search) {
//     this.GetISMSDetails(); // reload all
//     return;
//   }

//   this.isLoading = true;
//   this.ielc.GetISMSMasterTableDocName(search).subscribe({
//     next: (data) => {
//       this.filteredISMSDocs = Array.isArray(data) ? data : [data];
//       this.isLoading = false;
//     },
//     error: (err) => {
//       console.error('Error fetching ISMS Master Table:', err);
//       this.isLoading = false;
//     }
//   });
// }

// getFilteredISMSDocs(): any[] {
//   if (!this.searchText) {
//     return this.ismsdetails;
//   }
//   const search = this.searchText.toLowerCase();
//   return this.ismsdetails.filter(item =>
//     item.ismsDocumentName?.toLowerCase().includes(search) ||
//     item.ismsDocumentNo?.toLowerCase().includes(search)
//   );
// }


resetISMSDetails() {
  this.ismsalldata = {
    documentID: 0,
    ismsDept: '',
    ismsDocType: '',
    ismsDocumentName: '',
    url: '',
    ismsDocumentNo: '',
    ismsCurrentVersion: 0,
    documentMaintainedBy: ''
  };
}

//-------------------------------------------------------------------------------QMSMasterTable

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

GetQMSDetailsDocumentName() {
  this.isLoading = true;
  const qmsDocumentName = this.qmsalldata.qmsDocumentName;
  if (qmsDocumentName) { // Check if ismsDocumentName is not undefined
    this.ielc.GetQMSMasterTableDocName(qmsDocumentName)
      .subscribe({
        next: (data) => {
          this.qmsdetails = data;
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
   this.GetQMSDetails()
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

AddQMSDetails(): void {
  const qmsdata = {
    qmsDept: this.qmsalldata.qmsDept,
    qmsDocType: this.qmsalldata.qmsDocType,
    qmsDocumentName: this.qmsalldata.qmsDocumentName,
    url: this.qmsalldata.url,
    qmsDocumentNo: this.qmsalldata.qmsDocumentNo,
    qmsCurrentVersion: this.qmsalldata.qmsCurrentVersion,
    documentMaintainedBy: this.qmsalldata.documentMaintainedBy
  };

  this.ielc.PostQMSMasterTable(qmsdata).subscribe({
    next: (response) => {
      alert('✅ Record Added Successfully!');
      this.GetQMSDetails();
      this.resetQMSDetails();
    },
    error: (error) => {
      console.error('Error adding record:', error);
      alert('❌ Error adding Record. Please try again.');
    }
  });
}


    deleteQMSDetails(id: number) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.ielc.DeleteQMSMasterTable(id).subscribe({
        next: () => {
          alert(`Record with ID ${id} deleted successfully!`);
          this.GetQMSDetails();
        },
         error: (err) =>  console.error('Error deleting item:', err)
      });
    }
  }
  EditQMSDetails(id: number) {
    //debugger;
  this.ielc.GetQMSMasterTableId(id).subscribe(data => {
    if (data) {
      this.qmsalldata = { 
        documentID: data.documentID || 0,
        qmsDept: data.qmsDept || '',
        qmsDocType: data.qmsDocType || '',
        qmsDocumentName:data.qmsDocumentName || '',
       url:data.url || '',
       qmsDocumentNo:data.qmsDocumentNo || '',
       qmsCurrentVersion:data.qmsCurrentVersion || '',
       documentMaintainedBy:data.documentMaintainedBy || ''
      };
      //console.log("API Response:", data);
    } else {
       console.warn("No data received for the given ID.");
    }
  }, error => {
     console.error("Error fetching record:", error);
  });
}

UpdateQMSDetails() {
  debugger;
  this.ielc.UpdateQMSMasterTable(this.qmsalldata.documentID, this.qmsalldata).subscribe(
    (response) => {
      alert(" ✅ Record updated successfully!");
      this.GetQMSDetails();
      this.resetQMSDetails();
      //console.log("Updated Successfully:", response);
    },
    (error) => {
       console.error("Error updating Record:", error);
    }
  );
}

resetQMSDetails() {
  this.qmsalldata = {
    documentID: 0,
    qmsDept: '',
    qmsDocType: '',
    qmsDocumentName: '',
    url: '',
    qmsDocumentNo: '',
    qmsCurrentVersion: 0,
    documentMaintainedBy: ''
  };
}


  //--------------------------------------------------------------------------------CreateTables

  createEventTables(): void {
    if (confirm('Are you sure you want to create the Event DB tables?')) {
      this.ielc.createEventTables().subscribe({
        next: (res: any) => {
          alert('✅ Tables created successfully!');
        },
        error: (err: any) => {
         // console.error('Error creating tables:', err);
          alert('❌ Failed to create tables.');
        }
      });
    }
  }
//--------------------------------------------------------------------------------CoOnwers
GetCoOnwers() {
  this.ielc.GetCoOwners().subscribe((data) => {
    this.coownerss = this.sortlist(data);
    //console.log(this.coownerss); // Should show IDs
    this.isLoading = false;
  });
}

  AddCoOnwers(): void {
  this.ielc.PostCoOwners(this.coownerss).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetCoOnwers();
      this.resetCoOwners();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}

    deleteCoOwners(id: number) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.ielc.DeleteCoOwners(id).subscribe({
        next: () => {
          alert(`Record with ID ${id} deleted successfully!`);
          this.GetCoOnwers();
        },
         error: (err) =>  console.error('Error deleting item:', err)
      });
    }
  }

// EditCoOwners(id: number) { 
//   this.ielc.GetCoOwnersId(id).subscribe(
//     data => {
//       if (data && typeof data === 'object' && 'id' in data && 'auditeedepartment' in data && 'auditees' in data && 'superowners' in data) {
//         this.coownersdept = { 
//           id: data.id,
//           auditeedepartment: data.auditeedepartment,
//           auditees: data.auditees,
//           superowners:data.superowners
//         };
//       } else {
//         console.warn("Unexpected data format received:", data);
//       }
//     },
//     error => {
//       console.error("Error fetching record:", error);
//     }
//   );
// }
EditCoOwners(id: number) {
  this.ielc.GetCoOwnersId(id).subscribe(data => {
    if (data) {
      this.coownersdept = { 
        id: data.id || 0,
        auditeeDepartment: data.auditeeDepartment || '',
        auditees: data.auditees || '',
       superOwners:data.superOwners || ''
      };
      //console.log("API Response:", data);
    } else {
       console.warn("No data received for the given ID.");
    }
  }, error => {
     console.error("Error fetching record:", error);
  });
}

UpdateCoOwners() {
  this.ielc.UpdateCoOwners(this.coownersdept.id, this.coownersdept).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetCoOnwers();
      this.resetCoOwners();
    },
    (error) => {
       console.error("Error updating Record:", error);
    }
  );
}

  resetCoOwners(){
    this.coownersdept={
    id: 0,
    auditeeDepartment: '',
    auditees: '',
    superOwners: '',
    }
  }

//--------------------------------------------------------------------------------EventSchedulerTime
GetEventSchedulerTimeslots() {
  if (!this.selectedYear || !this.selectedMonth) {
    console.warn("Year and Month must be selected before loading timeslots");
    return;
  }
  this.isLoading = true;
  this.ielc.GetEventSchedulerTime(this.selectedYear, this.selectedMonth).subscribe((data) => {
    this.eventschedulertime = this.sortlist(data);
    this.isLoading = false;
  });
}

AddEventSchedulerTime(): void {
  const time = this.eventschtime.time;
  if (!time || time.trim() === '') {
    alert('❌ Time cannot be empty');
    return;
  }
  if (!this.selectedYear || !this.selectedMonth) {
    alert('Please select year and month first!');
    return;
  }
  this.ielc.PostEventSchedulerTime(this.selectedYear, this.selectedMonth, time).subscribe({
    next: () => {
      alert('✅ Record Added Successfully!');
      this.GetEventSchedulerTimeslots();
      this.resetEventSchedulerTime();
    },
    error: (error) => {
      console.error('❌ Error adding record:', error);
      alert('❌ Error adding record. Please try again.');
    }
  });
}

EditEventSchedulerTime(id: number) { 
  if (!this.selectedYear || !this.selectedMonth) {
    alert('Please select year and month first!');
    return;
  }
  this.ielc.GetEventSchedulerTimeId(this.selectedYear, this.selectedMonth, id).subscribe(
    data => {
      if (data && typeof data === 'object' && 'id' in data && 'time' in data) {
        this.eventschtime = { 
          id: data.id,
          time: data.time,
        };
      } else {
        console.warn("Unexpected data format received:", data);
      }
    },
    error => {
      console.error("Error fetching record:", error);
    }
  );
}

UpdateEventSchedulerTime(): void {
  const id = this.eventschtime.id;
  const time = this.eventschtime.time;

  if (!id || id === 0) {
    alert("Invalid ID");
    return;
  }

  if (!time || time.trim() === "") {
    alert("Time is empty");
    return;
  }

  if (!this.selectedYear || !this.selectedMonth) {
    alert('Please select year and month first!');
    return;
  }

  this.ielc.UpdateEventSchedulerTime(this.selectedYear, this.selectedMonth, id, time).subscribe({
    next: () => {
      alert(`Record with ID ${id} updated successfully!`);
      this.GetEventSchedulerTimeslots();
      this.resetEventSchedulerTime();
    },
    error: (err) => {
      console.error('Update failed:', err);
      alert('Error updating record.');
    }
  });
}

deleteEventSchedulerTime(id: number) {
  if (!this.selectedYear || !this.selectedMonth) {
    alert('Please select year and month first!');
    return;
  }

  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteEventSchedulerTime(this.selectedYear, this.selectedMonth, id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetEventSchedulerTimeslots();
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

resetEventSchedulerTime(){
  this.eventschtime={
  id: 0,
  time: '',
  }
}

 //-------------------------------------------------------------------------------EventSchedulerAdmin
GetEventSchedulerAdmin(){
  this.ielc.GetEventSchedulerAdmin().subscribe((data) => {
    this.eventscheduleradmin=data;
    this.eventscheduleradmin = this.sortlist(data)
    this.isLoading = false;
    //////console.log(this.eventscheduleradmin);
  });
 }
 
AddEventSchedulerAdmin(): void {
  const payload = {
    auditeedepartment: this.eventschadmin.auditeedepartment,
    procedures: this.eventschadmin.procedures
  };
  this.ielc.PostEventSchedulerAdmin(payload).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetEventSchedulerAdmin();
      this.resetEventSchedulerAdmin();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}

  deleteEventSchedulerAdmin(id: number) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.ielc.DeleteEventSchedulerAdmin(id).subscribe({
        next: () => {
          alert(`Record with ID ${id} deleted successfully!`);
          this.GetEventSchedulerAdmin();
        },
         error: (err) =>  console.error('Error deleting item:', err)
      });
    }
  }

EditEventSchedulerAdmin(id: number) { 
  this.ielc.GetEventSchedulerAdminId(id).subscribe(data => {
    if (data) {
      this.eventschadmin = { 
        id: data.id || 0,
        auditeedepartment: data.auditeedepartment || '',
        procedures:  data.procedures || '',
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  },
   error => {
     console.error("Error fetching record:", error);
  });
}

UpdateEventSchedulerAdmin() {
  const payload = {
    id: this.eventschadmin.id,
    auditeedepartment: this.eventschadmin.auditeedepartment,
    procedures: this.eventschadmin.procedures
  };
  this.ielc.UpdateEventSchedulerAdmin(this.eventschadmin.id, payload).subscribe(
    (response) => {
      alert(" ✅ Record updated successfully!");
      this.GetEventSchedulerAdmin();
       this.resetEventSchedulerAdmin();
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}

  resetEventSchedulerAdmin(){
    this.eventschadmin={
    id: 0,
    auditeedepartment: '',
    procedures: '',
    }
  }
 //-------------------------------------------------------------------------------EventSchedules
GetEventSchedules() {
  if (!this.selectedYear || !this.selectedMonth) {
    console.warn("Year and Month must be selected before loading timeslots");
    return;
  }
  this.isLoading = true;
  this.ielc.GetEventSchedules(this.selectedYear, this.selectedMonth).subscribe((data) => {
    this.eventschedules = this.sortlist(data);
    this.isLoading = false;
  });
}

EditEventSchedules(eventScheduleId: number) { 
  this.ielc.GetEventSchedulerUserId(this.selectedYear, this.selectedMonth, eventScheduleId).subscribe(data => {
    if (data) {
      this.eventschedulesdata = { 
        eventScheduleId: data.eventScheduleId || 0,
        projectInternalAudit: data.projectInternalAudit || '',
        projectQMS:  data.projectQMS || '',
        projectISMS: data.projectISMS || '',
        organizerCompany:  data.organizerCompany || '',
        organizerSchedule: data.organizerSchedule || '',
        organizerDateRange:  data.organizerDateRange || '',
        notes: data.notes || '',
        organizerLastDate:  data.organizerLastDate || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  },
   error => {
     console.error("Error fetching record:", error);
  });
}


// EditEventSchedules(id: number) {
//   this.ielc.GetEventSchedulesId(this.selectedYear, this.selectedMonth, id).subscribe({
//     next: (data) => {
//       if (data) {
//         this.eventschedulesdata = {
//           eventScheduleId: data.eventScheduleId ?? null,
//           projectInternalAudit: data.projectInternalAudit ?? '',
//           projectQMS: data.projectQMS ?? '',
//           projectISMS: data.projectISMS ?? '',
//           organizerCompany: data.organizerCompany ?? '',
//           organizerSchedule: data.organizerSchedule ?? '',
//           organizerDateRange: data.organizerDateRange ?? '',
//           notes: data.notes ?? '',
//           organizerLastDate: data.organizerLastDate ?? '',
//         };
//       } else {
//         console.warn("No data returned for the given ID.");
//       }
//     },
//     error: (error) => {
//       console.error("Error fetching record:", error);
//     }
//   });
// }

// UpdateEventSchedules() {
//   this.ielc.UpdateEventSchedules(this.selectedYear, this.selectedMonth, this.eventschedulesdata.eventScheduleId, this.eventschedulesdata).subscribe(
//     (response) => {
//       // // ////console.log("Updated Successfully:", response);
//       alert(" ✅ Record updated successfully!");
//       this.GetEventSchedules();
//       //this.resetItSprt();
//     },
//     (error) => {
//       // // console.error("Error updating Record:", error);
//     }
//   );
// }

editRecord(eitem:any){
  this.updatedFields = eitem;
}
UpdateEventSchedules(item:any) {
  const payload = {
    eventScheduleId: item.eventScheduleId,
    projectInternalAudit: item.projectInternalAudit,
    projectQMS: item.projectQMS,
    projectISMS: item.projectISMS,
    organizerCompany: item.organizerCompany,
    organizerSchedule: item.organizerSchedule,
    organizerDateRange: item.organizerDateRange,
    notes: item.notes,
    organizerLastDate: item.organizerLastDate
  };
  this.ielc.UpdateEventSchedules(this.selectedYear, this.selectedMonth,  item.eventScheduleId, payload).subscribe(
    (response) => {
      alert(" ✅ Record updated successfully!");
      this.GetEventSchedules();
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}

// UpdateEventSchedules() {
//   const eventScheduleId = this.eventschedulesdata.eventScheduleId;
//   const payload = {
//     eventScheduleId: this.eventschedulesdata.eventScheduleId,
//     projectInternalAudit: this.eventschedulesdata.projectInternalAudit,
//     projectQMS: this.eventschedulesdata.projectQMS,
//     projectISMS: this.eventschedulesdata.projectISMS,
//     organizerCompany: this.eventschedulesdata.organizerCompany,
//     organizerSchedule: this.eventschedulesdata.organizerSchedule,
//     organizerDateRange: this.eventschedulesdata.organizerDateRange,
//     notes: this.eventschedulesdata.notes,
//     organizerLastDate: this.eventschedulesdata.organizerLastDate
//   };
//   this.ielc.UpdateEventSchedules(this.selectedYear, this.selectedMonth, eventScheduleId, payload).subscribe({
//     next: () => {
//       alert(`✅ Record with ID ${eventScheduleId} updated successfully!`);
//       console.log(this.selectedYear, this.selectedMonth, eventScheduleId, payload);
//       this.GetEventSchedules();
//     },
//     error: (err) => {
//       console.error('❌ Update failed:', err);
//       alert('Error updating record.');
//     }
//   });
// }
   //-------------------------------------------------------------------------------EventSchedulerAdmin
GetEventSchedulerUser(){
  this.ielc.GetEventSchedulerUser(this.selectedYear, this.selectedMonth).subscribe((data) => {
    this.eventscheduleruser=data;
    this.eventscheduleruser = this.sortlist(data)
    this.isLoading = false;
    //console.log("user",this.eventscheduleruser);
  });
 }

AddEventSchedulerUser(): void {
  const payload: any = {};

  if (this.eventschuser.auditeedepartment) {
    payload.auditeedepartment = this.eventschuser.auditeedepartment;
  }

  if (this.eventschuser.auditees) {
    payload.auditees = this.eventschuser.auditees;
  }

  if (this.eventschuser.starting) {
    payload.starting = this.eventschuser.starting;
  }

  if (this.eventschuser.time) {
    payload.time = this.eventschuser.time;
  }

  if (this.eventschuser.auditors) {
    payload.auditors = this.eventschuser.auditors;
  }

 this.ielc.PostEventSchedulerUser(this.selectedYear, this.selectedMonth, payload).subscribe(
  (response) => {
    alert('✅ Record Added Successfully!');
    this.GetEventSchedulerUser();
    this.resetEventSchedulerUser();
  },
  (error) => {
    alert('❌ Error adding Record. Please try again.');
  }
);
}

  deleteEventSchedulerUser(id: number) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.ielc.DeleteEventSchedulerUser(this.selectedYear, this.selectedMonth, id).subscribe({
        next: () => {
          alert(`Record with ID ${id} deleted successfully!`);
          this.GetEventSchedulerUser();
        },
        error: (err) =>  console.error('Error deleting item:', err)
      });
    }
  }

EditEventSchedulerUser(id: number) { 
  this.ielc.GetEventSchedulerUserId(this.selectedYear, this.selectedMonth, id).subscribe(data => {
    if (data) {
      this.eventschuser = { 
        id: data.id || 0,
        auditeedepartment: data.auditeedepartment || '',
        auditees:  data.auditees || '',
        starting: data.starting || '',
        time:  data.time || '',
        auditors: data.auditors || ''
      };
    } else {
      console.warn("No data received for the given ID.");
    }
  },
   error => {
     console.error("Error fetching record:", error);
  });
}

UpdateEventSchedulerUser() {
  const payload = {
    id: this.eventschuser.id,
    auditeedepartment: this.eventschuser.auditeedepartment,
    auditees: this.eventschuser.auditees,
    starting: this.eventschuser.starting,
    time: this.eventschuser.time,
    auditors: this.eventschuser.auditors
  };
  this.ielc.UpdateEventSchedulerUser(this.selectedYear, this.selectedMonth, this.eventschuser.id, payload).subscribe(
    (response) => {
      alert(" ✅ Record updated successfully!");
      this.GetEventSchedulerUser();
       this.resetEventSchedulerUser();
    },
    (error) => {
      console.error("Error updating Record:", error);
    }
  );
}

resetEventSchedulerUser(){
    this.eventschuser={
    id: 0,
    auditeedepartment: '',
    auditees: '',
    starting: '',
    time: '',
    auditors: ''
    }
  } 
//-------------------------------------------------------------------------------SMTP
  GetSmtplist(){
    this.ielc.Getsmtp().subscribe((data) => {
      this.smtplist=data;
      this.smtplist = this.sortlist(data)
      this.isLoading = false;
    });
   }
   AddSmtp(): void { 
    this.smtpdata.password = this.encodePassword(this.smtpdata.password);  
    this.ielc.Postsmtp(this.smtpdata).subscribe(
      (response) => {
        alert('✅ Record Added Successfully!');
        this.GetSmtplist();
        this.resetsmtp();
      },
      (error) => {
        // // console.error('❌ Error adding record:', error);
        alert('❌ Error adding Record. Please try again.');
      }
    );
  }
   
  
  // AddSmtp() {
  //   this.smtpdata.password = this.encodePassword(this.smtpdata.password);
  //   this.smtplist.push({...this.smtpdata})
  // }
  deletesmtp(id: number) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.ielc.DeletesmtpById(id).subscribe({
        next: () => {
          alert(`Record with ID ${id} deleted successfully!`);
          this.GetSmtplist();
        },
         error: (err) =>  console.error('Error deleting item:', err)
      });
    }
  }
  resetsmtp(){
    this.smtpdata={
    id: 0,
    userName: '',
    password: '',
    }
  }
//-------------------------------------------------------------------------------INTEQ IT Sprt
 GetItSprtlist(){
  this.ielc.GetItSprt().subscribe((data) => {
    this.itsprtlist=data;
    this.itsprtlist = this.sortlist(data)
    this.isLoading = false;
  });
 }
 AddItSprt(): void {
  this.ielc.PostITSprt(this.itsprtdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetItSprtlist();
      this.resetItSprt();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteitsprt(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteITSprtById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetItSprtlist();
      },
      // // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditItSprt(id: number) {
  // // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetITSprtById(id).subscribe(data => {

    // // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.itsprtdata = { 
        id: data.id || 0,
        contactPriority: data.contactPriority || '',
        name:  data.name || '',
        mobile:  data.mobile || 0,
        email:  data.email || '',
      };
    } else {
      // // console.warn("No data received for the given ID.");
    }
  },
   error => {
    // // console.error("Error fetching record:", error);
  });
}


UpdateItSprt() {
  this.ielc.UpdateITSprt(this.itsprtdata.id, this.itsprtdata).subscribe(
    (response) => {
      // // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetItSprtlist();
      this.resetItSprt();
    },
    (error) => {
      // // console.error("Error updating Record:", error);
    }
  );
}
resetItSprt(){
  this.itsprtdata={
    id: 0,
    contactPriority: '',
    name: '',
    mobile: 0,
    email: '',
  }
}

//-------------------------------------------------------------------------------INTEQ Admin Sprt

GetOsSprtlist(){
  this.ielc.GetosSprt().subscribe((data) => {
    this.ossprtlist=data;
    this.ossprtlist = this.sortlist(data)
    this.isLoading = false;
  });
 }
 
 AddOsSprt(): void {
  this.ielc.PostOsSprt(this.ossprtdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetOsSprtlist();
      this.resetOsSprt();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteOssprt(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteOsSprtById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetOsSprtlist();
      },
      // error: (err) => 
      //   // console.error('Error deleting item:', err)
    });
  }
}

EditOsSprt(id: number) {
  // // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetOsSprtById(id).subscribe(data => {

    // // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.ossprtdata = { 
        id: data.id || 0,
        contactPriority: data.contactPriority || '',
        name:  data.name || '',
        mobile:  data.mobile || 0,
        email:  data.email || '',
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  },
   error => {
    // // console.error("Error fetching record:", error);
  });
}


UpdateOsSprt() {
  this.ielc.UpdateOsSprt(this.ossprtdata.id, this.ossprtdata).subscribe(
    (response) => {
      // // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetOsSprtlist();
      this.resetOsSprt();
    },
    (error) => {
      // // console.error("Error updating Record:", error);
    }
  );
}
resetOsSprt(){
  this.ossprtdata={
    id: 0,
    contactPriority: '',
    name: '',
    mobile: 0,
    email: '',
  }
}

//-------------------------------------------------------------------------------INTEQ Hr Sprt

GetHrSprtlist(){
  this.ielc.GetHrSprt().subscribe((data) => {
    this.hrsprtlist=data;
    this.hrsprtlist = this.sortlist(data)
    this.isLoading = false;
  });
 }
 
 AddHrSprt(): void {
  this.ielc.PostHrSprt(this.hrsprtdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetHrSprtlist();
      this.resetHrSprt();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteHrsprt(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteHrSprtById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetHrSprtlist();
      },
      // // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditHrSprt(id: number) {
  // // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetHrSprtById(id).subscribe(data => {

    // // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.hrsprtdata = { 
        id: data.id || 0,
        contactPriority: data.contactPriority || '',
        name:  data.name || '',
        mobile:  data.mobile || 0,
        email:  data.email || '',
      };
    } else {
      // // console.warn("No data received for the given ID.");
    }
  }, error => {
    // // console.error("Error fetching record:", error);
  });
}


UpdateHrSprt() {
  this.ielc.UpdateHrSprt(this.hrsprtdata.id, this.hrsprtdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetHrSprtlist();
      this.resetHrSprt();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}
resetHrSprt(){
  this.hrsprtdata={
    id: 0,
    contactPriority: '',
    name: '',
    mobile: 0,
    email: '',
  }
}
//-------------------------------------------------------------------------------INTEQ Emergency Sprt

GetEmerSprtlist(){
  this.ielc.GetemerSprt().subscribe((data) => {
    this.emersprtlist=data;
    this.emersprtlist = this.sortlist(data)
    this.isLoading = false;
  });
 }

 AddEmerSprt(): void {
  this.ielc.PostEmerSprt(this.emersprtdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetEmerSprtlist();
      this.resetEmerSprt();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteEmersprt(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteEmerSprtById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetEmerSprtlist();
      },
    //  error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditEmerSprt(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetEmerSprtById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.emersprtdata = { 
        id: data.id || 0,
        functions: data.functions || '',
        name:  data.name || '',
        mobile:  data.mobile || 0,
        email:  data.email || '',
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateEmerSprt() {
  this.ielc.UpdateEmerSprt(this.emersprtdata.id, this.emersprtdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetEmerSprtlist();
      this.resetEmerSprt();
    },
    (error) => {
       console.error("Error updating Record:", error);
    }
  );
}
resetEmerSprt(){
  this.emersprtdata={
    id: 0,
    functions: '',
    name: '',
    mobile: 0,
    email: '',
  }
}

//-------------------------------------------------------------------------------INTEQ ISO27001

GetIsoSprtlist(){
  this.ielc.Getiso27001().subscribe((data) => {
    this.isosprtlist27001=data;
    this.isosprtlist27001 = this.sortlist(data)
    this.isLoading = false;
  });
 }

 
 AddISO27001Sprt(): void {
  this.ielc.PostIso27001Sprt(this.isosprtdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetIsoSprtlist();
      this.resetISO27001Sprt();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteISO27001sprt(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteIso27001SprtById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetIsoSprtlist();
      },
     // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditISO27001Sprt(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetIso27001SprtById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.isosprtdata = { 
        id: data.id || 0,
        contactPriority: data.contactPriority || '',
        name:  data.name || '',
        mobile:  data.mobile || 0,
        email:  data.email || '',
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateISO27001Sprt() {
  this.ielc.UpdateIso27001Sprt(this.isosprtdata.id, this.isosprtdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetIsoSprtlist();
      this.resetISO27001Sprt();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}
resetISO27001Sprt(){
  this.isosprtdata={
    id: 0,
    contactPriority: '',
    name: '',
    mobile: 0,
    email: '',
  }
}

//-------------------------------------------------------------------------------INTEQ ISO9001

GetIso9001Sprtlist(){
  this.ielc.Getiso9001().subscribe((data) => {
    this.isosprtlist9001=data;
    this.isosprtlist9001 = this.sortlist(data)
    this.isLoading = false;
  });
 }

 AddISO9001Sprt(): void {
  this.ielc.PostIso9001Sprt(this.isosprtdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetIso9001Sprtlist();
      this.resetISO9001Sprt();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteISO9001sprt(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteIso9001SprtById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetIso9001Sprtlist();
      },
     // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditISO9001Sprt(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetIso9001SprtById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.isosprtdata = { 
        id: data.id || 0,
        contactPriority: data.contactPriority || '',
        name:  data.name || '',
        mobile:  data.mobile || 0,
        email:  data.email || '',
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateISO9001Sprt() {
  this.ielc.UpdateIso9001Sprt(this.isosprtdata.id, this.isosprtdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetIso9001Sprtlist();
      this.resetISO9001Sprt();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}
resetISO9001Sprt(){
  this.isosprtdata={
    id: 0,
    contactPriority: '',
    name: '',
    mobile: 0,
    email: '',
  }
}

//-------------------------------------------------------------------------------INTEQ ISO27001

GetIsmsqmsSprtlist(){
  this.ielc.Getismsqms().subscribe((data) => {
    this.ismsqmssupport=data;
    this.ismsqmssupport = this.sortlist(data)
    this.isLoading = false;
  });
 }

 
 AddIsmsqmsSprt(): void {
  this.ielc.PostismsqmsSprt(this.ismsqmssprtdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetIsmsqmsSprtlist();
      this.resetIsmsqmsSprt();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteIsmsqmssprt(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteismsqmsSprtById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetIsmsqmsSprtlist();
      },
     // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditIsmsqmsSprt(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetismsqmsSprtById(id).subscribe(data => {
    if (data) {
      // Assign data only if it's valid
      this.ismsqmssprtdata = { 
        id: data.id || 0,
        contactPriority: data.contactPriority || '',
        name:  data.name || '',
        mobile:  data.mobile || 0,
        email:  data.email || '',
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateIsmsqmsSprt() {
  this.ielc.UpdateismsqmsSprt(this.ismsqmssprtdata.id, this.ismsqmssprtdata).subscribe(
    (response) => {
      //console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetIsmsqmsSprtlist();
      this.resetIsmsqmsSprt();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}
resetIsmsqmsSprt(){
  this.ismsqmssprtdata={
    id: 0,
    contactPriority: '',
    name: '',
    mobile: 0,
    email: '',
  }
}

//-------------------------------------------------------------------------------HR ISMS
GetHrISMSGenerallist(){
  this.ielc.Gethrismsgeneral().subscribe((data) => {
    this.HrIsmsGeneraldata=data;
    this.isLoading = false;
  });
 }

 
 AddHrISMSGeneral(): void {
  this.ielc.PostHrismsgeneral(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetHrISMSGenerallist();
      this.resetHrISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}

deleteHrISMSGeneral(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteHrismsgeneralById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetHrISMSGenerallist();
      },
     // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditHrISMSGeneral(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetHrismsgeneralById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateHrISMSGeneral() {
  this.ielc.UpdateHrismsgeneral(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetHrISMSGenerallist();
      this.resetHrISMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}
resetHrISMS(){
  this.docsdata={
    documentID: 0,
    documentName: '',
    url: '',
  }
}
 GetHrISMSGuidelineslist(){
  this.ielc.Gethrismsguidelines().subscribe((data) => {
    this.HrIsmsGuidelinesdata=data;
    this.isLoading = false;
  });
 }
 
 AddHrISMSGuidelines(): void {
  this.ielc.PostHrismsguideline(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetHrISMSGuidelineslist();
      this.resetHrISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteHrISMSGuidelines(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteHrismsguidelineById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetHrISMSGuidelineslist();
      },
     // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditHrISMSGuidelines(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetHrismsguidelineById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateHrISMSGuidelines() {
  this.ielc.UpdateHrismsguideline(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetHrISMSGuidelineslist();
      this.resetHrISMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}

 GetHrISMSPolicylist(){
  this.ielc.Gethrismspolicy().subscribe((data) => {
    this.HrIsmsPolicydata=data;
    this.isLoading = false;
  });
 }
 
 AddHrISMSPolicy(): void {
  this.ielc.PostHrismspolicy(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetHrISMSPolicylist();
      this.resetHrISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteHrISMSPolicy(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteHrismspolicyById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetHrISMSPolicylist();
      },
     // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditHrISMSPolicy(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetHrismspolicyById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateHrISMSPolicy() {
  this.ielc.UpdateHrismspolicy(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetHrISMSPolicylist();
      this.resetHrISMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}

 GetHrISMSProcedurelist(){
  this.ielc.Gethrismsprocedure().subscribe((data) => {
    this.HrIsmsProceduredata=data;
    this.isLoading = false;
  });
 }
 
 AddHrISMSProcedure(): void {
  this.ielc.PostHrismsprocedure(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetHrISMSProcedurelist();
      this.resetHrISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteHrISMSProcedure(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteHrismsprocedureById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetHrISMSProcedurelist();
      },
   //   error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditHrISMSProcedure(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetHrismsprocedureById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateHrISMSProcedure() {
  this.ielc.UpdateHrismsprocedure(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetHrISMSProcedurelist();
      this.resetHrISMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}

 GetHrISMSFormatlist(){
  this.ielc.Gethrismsformat().subscribe((data) => {
    this.HrIsmsFormatdata=data;
    this.isLoading = false;
  });
 }
 
 AddHrISMSFormat(): void {
  this.ielc.PostHrismsformat(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetHrISMSFormatlist();
      this.resetHrISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteHrISMSFormat(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteHrismsformatById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetHrISMSFormatlist();
      },
     // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditHrISMSFormat(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetHrismsformatById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateHrISMSFormat() {
  this.ielc.UpdateHrismsformat(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetHrISMSFormatlist();
      this.resetHrISMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}
//-------------------------------------------------------------------------------------------HR QMS
GetHrQMSGenerallist(){
  this.ielc.Gethrqmsgeneral().subscribe((data) => {
    this.HrqmsGeneraldata=data;
    this.isLoading = false;
  });
 }

 
 AddHrQMSGeneral(): void {
  this.ielc.PostHrqmsgeneral(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetHrQMSGenerallist();
      this.resetHrQMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}

deleteHrQMSGeneral(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteHrqmsgeneralById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetHrQMSGenerallist();
      },
    //  error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditHrQMSGeneral(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetHrqmsgeneralById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateHrQMSGeneral() {
  this.ielc.UpdateHrqmsgeneral(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetHrQMSGenerallist();
      this.resetHrQMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}
resetHrQMS(){
  this.docsdata={
    documentID: 0,
    documentName: '',
    url: '',
  }
}
 GetHrQMSGuidelineslist(){
  this.ielc.Gethrqmsguidelines().subscribe((data) => {
    this.HrqmsGuidelinesdata=data;
    this.isLoading = false;
  });
 }
 
 AddHrQMSGuidelines(): void {
  this.ielc.PostHrqmsguideline(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetHrQMSGuidelineslist();
      this.resetHrQMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteHrQMSGuidelines(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteHrqmsguidelineById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetHrQMSGuidelineslist();
      },
    //  error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditHrQMSGuidelines(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetHrqmsguidelineById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateHrQMSGuidelines() {
  this.ielc.UpdateHrqmsguideline(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetHrQMSGuidelineslist();
      this.resetHrQMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}

 GetHrQMSPolicylist(){
  this.ielc.Gethrqmspolicy().subscribe((data) => {
    this.HrqmsPolicydata=data;
    this.isLoading = false;
  });
 }
 
 AddHrQMSPolicy(): void {
  this.ielc.PostHrqmspolicy(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetHrQMSPolicylist();
      this.resetHrISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteHrQMSPolicy(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteHrqmspolicyById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetHrQMSPolicylist();
      },
     // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditHrQMSPolicy(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetHrqmspolicyById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateHrQMSPolicy() {
  this.ielc.UpdateHrqmspolicy(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetHrQMSPolicylist();
      this.resetHrQMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}

 GetHrQMSProcedurelist(){
  this.ielc.Gethrqmsprocedure().subscribe((data) => {
    this.HrqmsProceduredata=data;
    this.isLoading = false;
  });
 }
 
 AddHrQMSProcedure(): void {
  this.ielc.PostHrqmsprocedure(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetHrQMSProcedurelist();
      this.resetHrISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteHrQMSProcedure(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteHrqmsprocedureById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetHrQMSProcedurelist();
      },
   //   error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditHrQMSProcedure(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetHrqmsprocedureById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateHrQMSProcedure() {
  this.ielc.UpdateHrqmsprocedure(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetHrQMSProcedurelist();
      this.resetHrQMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}

 GetHrQMSFormatlist(){
  this.ielc.Gethrqmsformat().subscribe((data) => {
    this.HrqmsFormatdata=data;
    this.isLoading = false;
  });
 }
 
 AddHrQMSFormat(): void {
  this.ielc.PostHrqmsformat(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetHrQMSFormatlist();
      this.resetHrISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteHrQMSFormat(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteHrqmsformatById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetHrQMSFormatlist();
      },
     // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditHrQMSFormat(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetHrqmsformatById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateHrQMSFormat() {
  this.ielc.UpdateHrqmsformat(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetHrQMSFormatlist();
      this.resetHrQMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}
//=====================================================================================Admin/OS Support ISMS

GetOsISMSGenerallist(){
  this.ielc.Getosismsgeneral().subscribe((data) => {
    this.OsIsmsGeneraldata=data;
    this.isLoading = false;
  });
 }
 
 AddOsISMSGeneral(): void {
  this.ielc.Postosismsgeneral(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetOsISMSGenerallist();
      this.resetOsISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}

deleteOsISMSGeneral(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteosismsgeneralById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetOsISMSGenerallist();
      },
    //  error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditOsISMSGeneral(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetosismsgeneralById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateOsISMSGeneral() {
  this.ielc.Updateosismsgeneral(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetOsISMSGenerallist();
      this.resetOsISMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}
resetOsISMS(){
  this.docsdata={
    documentID: 0,
    documentName: '',
    url: '',
  }
}
GetOsISMSGuidelineslist(){
  this.ielc.Getosismsguidelines().subscribe((data) => {
    this.OsIsmsGuidelinesdata=data;
    this.isLoading = false;
  });
 }
 
 AddOsISMSGuidelines(): void {
  this.ielc.Postosismsguideline(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetOsISMSGuidelineslist();
      this.resetOsISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteOsISMSGuidelines(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteosismsguidelineById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetOsISMSGuidelineslist();
      },
    //  error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditOsISMSGuidelines(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetosismsguidelineById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateOsISMSGuidelines() {
  this.ielc.Updateosismsguideline(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetOsISMSGuidelineslist();
      this.resetOsISMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}

GetOsISMSPolicylist(){
  this.ielc.Getosismspolicy().subscribe((data) => {
    this.OsIsmsPolicydata=data;
    this.isLoading = false;
  });
 }
 
 AddOsISMSPolicy(): void {
  this.ielc.Postosismspolicy(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetOsISMSPolicylist();
      this.resetOsISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteOsISMSPolicy(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteosismspolicyById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetOsISMSPolicylist();
      },
    //  error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditOsISMSPolicy(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetosismspolicyById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateOsISMSPolicy() {
  this.ielc.Updateosismspolicy(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetOsISMSPolicylist();
      this.resetOsISMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}

GetOsISMSProcedurelist(){
  this.ielc.Getosismsprocedure().subscribe((data) => {
    this.OsIsmsProceduredata=data;
    this.isLoading = false;
  });
 }
 
 AddOsISMSProcedure(): void {
  this.ielc.Postosismsprocedure(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetOsISMSProcedurelist();
      this.resetOsISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteOsISMSProcedure(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteosismsprocedureById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetOsISMSProcedurelist();
      },
    //  error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditOsISMSProcedure(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetosismsprocedureById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateOsISMSProcedure() {
  this.ielc.Updateosismsprocedure(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetOsISMSProcedurelist();
      this.resetOsISMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}

GetOsISMSFormatlist(){
  this.ielc.Getosismsformat().subscribe((data) => {
    this.OsIsmsFormatdata=data;
    this.isLoading = false;
  });
 }
 
 AddOsISMSFormat(): void {
  this.ielc.Postosismsformat(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetOsISMSFormatlist();
      this.resetOsISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteOsISMSFormat(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteosismsformatById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetOsISMSFormatlist();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditOsISMSFormat(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetosismsformatById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateOsISMSFormat() {
  this.ielc.Updateosismsformat(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetOsISMSFormatlist();
      this.resetOsISMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}

//===============================================================================Admin/OS support QMS


GetOsQMSGenerallist(){
  this.ielc.Getosqmsgeneral().subscribe((data) => {
    this.OsqmsGeneraldata=data;
    this.isLoading = false;
  });
 }
 
 AddOsQMSGeneral(): void {
  this.ielc.Postosqmsgeneral(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetOsQMSGenerallist();
      this.resetOsQMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}

deleteOsQMSGeneral(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteosqmsgeneralById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetOsQMSGenerallist();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditOsQMSGeneral(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetosqmsgeneralById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateOsQMSGeneral() {
  this.ielc.Updateosqmsgeneral(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetOsQMSGenerallist();
      this.resetOsQMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}
resetOsQMS(){
  this.docsdata={
    documentID: 0,
    documentName: '',
    url: '',
  }
}
GetOsQMSGuidelineslist(){
  this.ielc.Getosqmsguidelines().subscribe((data) => {
    this.OsqmsGuidelinesdata=data;
    this.isLoading = false;
  });
 }
 AddOsQMSGuidelines(): void {
  this.ielc.Postosqmsguideline(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetOsQMSGuidelineslist();
      this.resetOsQMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteOsQMSGuidelines(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteosqmsguidelineById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetOsQMSGuidelineslist();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditOsQMSGuidelines(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetosqmsguidelineById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateOsQMSGuidelines() {
  this.ielc.Updateosqmsguideline(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetOsQMSGuidelineslist();
      this.resetOsQMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}

GetOsQMSPolicylist(){
  this.ielc.Getosqmspolicy().subscribe((data) => {
    this.OsqmsPolicydata=data;
    this.isLoading = false;
  });
 }
 
 AddOsQMSPolicy(): void {
  this.ielc.Postosqmspolicy(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetOsQMSPolicylist();
      this.resetOsQMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteOsQMSPolicy(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteosqmspolicyById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetOsQMSPolicylist();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditOsQMSPolicy(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetosqmspolicyById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateOsQMSPolicy() {
  this.ielc.Updateosqmspolicy(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetOsQMSPolicylist();
      this.resetOsQMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}

GetOsQMSProcedurelist(){
  this.ielc.Getosqmsprocedure().subscribe((data) => {
    this.OsqmsProceduredata=data;
    this.isLoading = false;
  });
 }
 
 AddOsQMSProcedure(): void {
  this.ielc.Postosqmsprocedure(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetOsQMSProcedurelist();
      this.resetOsQMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteOsQMSProcedure(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteosqmsprocedureById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetOsQMSProcedurelist();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditOsQMSProcedure(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetosqmsprocedureById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateOsQMSProcedure() {
  this.ielc.Updateosqmsprocedure(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetOsQMSProcedurelist();
      this.resetOsQMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}

GetOsQMSFormatlist(){
  this.ielc.Getosqmsformat().subscribe((data) => {
    this.OsqmsFormatdata=data;
    this.isLoading = false;
  });
 }

 
 AddOsQMSFormat(): void {
  this.ielc.Postosqmsformat(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetOsQMSFormatlist();
      this.resetOsQMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteOsQMSFormat(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteosqmsformatById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetOsQMSFormatlist();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditOsQMSFormat(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetosqmsformatById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateOsQMSFormat() {
  this.ielc.Updateosqmsformat(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetOsQMSFormatlist();
      this.resetOsQMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}

//-------------------------------------------------------------------------------------ISMS Support
GetIsmsSprt(){
  this.ielc.Getismsinfo().subscribe((data) => {
    this.IsmsSprtdata=data;
    this.isLoading = false;
  });
 }
 
 AddIsmsSprt(): void {
  this.ielc.PostIsmsSprt(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetIsmsSprt();
      this.resetIsmsSprt();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteIsmsSprt(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteIsmsSprtById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetIsmsSprt();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditIsmsSprt(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetIsmsSprtById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateIsmsSprt() {
  this.ielc.UpdateIsmsSprt(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetIsmsSprt();
      this.resetIsmsSprt();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}
resetIsmsSprt(){
  this.docsdata={
    documentID: 0,
    documentName: '',
    url: '',
  }
}

//-------------------------------------------------------------------------------------ISO Supprot
GetIsoSprt(){
  this.ielc.Getisosprt().subscribe((data) => {
    this.IsoSprtdata=data;
    this.isLoading = false;
  });
 }
 
 AddIsoSprt(): void {
  this.ielc.Postisosprt(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetIsoSprt();
      this.resetIsoSprt();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteIsoSprt(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteisosprtById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetIsoSprt();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditIsoSprt(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetisosprtById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateIsoSprt() {
  this.ielc.Updateisosprt(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetIsoSprt();
      this.resetIsoSprt();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}
resetIsoSprt(){
  this.docsdata={
    documentID: 0,
    documentName: '',
    url: '',
  }
}

//-------------------------------------------------------------------------------------IS Policy
GetIsoPolicy(){
  this.ielc.Getispolicy().subscribe((data) => {
    this.IsPolicydata=data;
    this.isLoading = false;
  });
 }
 
 AddIsoPolicy(): void {
  this.ielc.Postispolicy(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetIsoPolicy();
      this.resetIsoPolicy();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteIsoPolicy(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteispolicyById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetIsoPolicy();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditIsoPolicy(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetispolicyById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateIsoPolicy() {
  this.ielc.Updateispolicy(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetIsoPolicy();
      this.resetIsoPolicy();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}
resetIsoPolicy(){
  this.docsdata={
    documentID: 0,
    documentName: '',
    url: '',
  }
}
//================================================================================IT Support ISMS

GetItISMSGenerallist(){
  this.ielc.Getitismsgeneral().subscribe((data) => {
    this.ItIsmsGeneraldata=data;
    this.isLoading = false;
  });
 }
 
 AddItISMSGeneral(): void {
  this.ielc.Postitismsgeneral(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetItISMSGenerallist();
      this.resetItISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}

deleteItISMSGeneral(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteitismsgeneralById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetItISMSGenerallist();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditItISMSGeneral(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetitismsgeneralById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateItISMSGeneral() {
  this.ielc.Updateitismsgeneral(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetItISMSGenerallist();
      this.resetItISMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}
resetItISMS(){
  this.docsdata={
    documentID: 0,
    documentName: '',
    url: '',
  }
}
GetItISMSGuidelineslist(){
  this.ielc.Getitismsguidelines().subscribe((data) => {
    this.ItIsmsGuidelinesdata=data;
    this.isLoading = false;
  });
 }
 
 AddItISMSGuidelines(): void {
  this.ielc.Postitismsguideline(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetItISMSGuidelineslist();
      this.resetItISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteItISMSGuidelines(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteitismsguidelineById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetItISMSGuidelineslist();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditItISMSGuidelines(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetitismsguidelineById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateItISMSGuidelines() {
  this.ielc.Updateitismsguideline(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetItISMSGuidelineslist();
      this.resetItISMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}

GetItISMSPolicylist(){
  this.ielc.Getitismspolicy().subscribe((data) => {
    this.ItIsmsPolicydata=data;
    this.isLoading = false;
  });
 }
 
 AddItISMSPolicy(): void {
  this.ielc.Postitismspolicy(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetItISMSPolicylist();
      this.resetItISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteItISMSPolicy(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteitismspolicyById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetItISMSPolicylist();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditItISMSPolicy(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetitismspolicyById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateItISMSPolicy() {
  this.ielc.Updateitismspolicy(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetItISMSPolicylist();
      this.resetItISMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}

GetItISMSProcedurelist(){
  this.ielc.Getitismsprocedure().subscribe((data) => {
    this.ItIsmsProceduredata=data;
    this.isLoading = false;
  });
 }
 
 AddItISMSProcedure(): void {
  this.ielc.Postitismsprocedure(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetItISMSProcedurelist();
      this.resetItISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteItISMSProcedure(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteitismsprocedureById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetItISMSProcedurelist();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditItISMSProcedure(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetitismsprocedureById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateItISMSProcedure() {
  this.ielc.Updateitismsprocedure(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetItISMSProcedurelist();
      this.resetItISMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}

GetItISMSFormatlist(){
  this.ielc.Getitismsformat().subscribe((data) => {
    this.ItIsmsFormatdata=data;
    this.isLoading = false;
  });
 }
 
 AddItISMSFormat(): void {
  this.ielc.Postitismsformat(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetItISMSFormatlist();
      this.resetItISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteItISMSFormat(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteitismsformatById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetItISMSFormatlist();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditItISMSFormat(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetitismsformatById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateItISMSFormat() {
  this.ielc.Updateitismsformat(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetItISMSFormatlist();
      this.resetItISMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}


 //================================================================================IT Support QMS
 GetItQMSGenerallist(){
  this.ielc.Getitqmsgeneral().subscribe((data) => {
    this.ItqmsGeneraldata=data;
    this.isLoading = false;
  });
 }
 
 AddItQMSGeneral(): void {
  this.ielc.Postitqmsgeneral(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetItQMSGenerallist();
      this.resetItQMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}

deleteItQMSGeneral(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteitqmsgeneralById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetItQMSGenerallist();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditItQMSGeneral(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetitqmsgeneralById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateItQMSGeneral() {
  this.ielc.Updateitqmsgeneral(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetItQMSGenerallist();
      this.resetItQMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}
resetItQMS(){
  this.docsdata={
    documentID: 0,
    documentName: '',
    url: '',
  }
}
GetItQMSGuidelineslist(){
  this.ielc.Getitqmsguidelines().subscribe((data) => {
    this.ItqmsGuidelinesdata=data;
    this.isLoading = false;
  });
 }
 AddItQMSGuidelines(): void {
  this.ielc.Postitqmsguideline(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetItQMSGuidelineslist();
      this.resetItQMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteItQMSGuidelines(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteitqmsguidelineById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetItQMSGuidelineslist();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditItQMSGuidelines(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetitqmsguidelineById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateItQMSGuidelines() {
  this.ielc.Updateitqmsguideline(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetItQMSGuidelineslist();
      this.resetItQMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}

GetItQMSPolicylist(){
  this.ielc.Getitqmspolicy().subscribe((data) => {
    this.ItqmsPolicydata=data;
    this.isLoading = false;
  });
 }
 
 AddItQMSPolicy(): void {
  this.ielc.Postitqmspolicy(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetItQMSPolicylist();
      this.resetItQMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteItQMSPolicy(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteitqmspolicyById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetItQMSPolicylist();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditItQMSPolicy(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetitqmspolicyById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateItQMSPolicy() {
  this.ielc.Updateitqmspolicy(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetItQMSPolicylist();
      this.resetItQMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}

GetItQMSProcedurelist(){
  this.ielc.Getitqmsprocedure().subscribe((data) => {
    this.ItqmsProceduredata=data;
    this.isLoading = false;
  });
 }
 
 AddItQMSProcedure(): void {
  this.ielc.Postitqmsprocedure(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetItQMSProcedurelist();
      this.resetItQMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteItQMSProcedure(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteitqmsprocedureById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetItQMSProcedurelist();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditItQMSProcedure(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetitqmsprocedureById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateItQMSProcedure() {
  this.ielc.Updateitqmsprocedure(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetItQMSProcedurelist();
      this.resetItQMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}

GetItQMSFormatlist(){
  this.ielc.Getitqmsformat().subscribe((data) => {
    this.ItqmsFormatdata=data;
    this.isLoading = false;
  });
 }
 
 AddItQMSFormat(): void {
  this.ielc.Postitqmsformat(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetItQMSFormatlist();
      this.resetItQMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteItQMSFormat(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteitqmsformatById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetItQMSFormatlist();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditItQMSFormat(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetitqmsformatById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateItQMSFormat() {
  this.ielc.Updateitqmsformat(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetItQMSFormatlist();
      this.resetItQMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}
//=======================================================================================Project Support ISMS

GetPrjtISMSGenerallist(){
  this.ielc.Getprjtismsgeneral().subscribe((data) => {
    this.prjtIsmsGeneraldata=data;
    this.isLoading = false;
  });
 }

//  GetPrjtISMSGenerallist() {
//   this.ielc.Getprjtismsgeneral().subscribe((data) => {
//     this.prjtIsmsGeneraldata = data.map((item: any) => {
//       // find matching file info by comparing names
//       const match = this.prjtIsmsGeneraldatainfo.find(
//         info => info.displayName === item.documentName
//       );

//       return {
//         ...item,                           // keep all API data
//         fileName: match ? match.fileName : null // add fileName if found
//       };
//     });

//     this.isLoading = false;
//   });
// }
 
 AddPrjtISMSGeneral(): void {
  this.ielc.Postprjtismsgeneral(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetPrjtISMSGenerallist();
      this.resetPrjtISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}

deletePrjtISMSGeneral(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteprjtismsgeneralById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetPrjtISMSGenerallist();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditPrjtISMSGeneral(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetprjtismsgeneralById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdatePrjtISMSGeneral() {
  this.ielc.Updateprjtismsgeneral(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetPrjtISMSGenerallist();
      this.resetPrjtISMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}
resetPrjtISMS(){
  this.docsdata={
    documentID: 0,
    documentName: '',
    url: '',
  }
}
GetPrjtISMSGuidelineslist(){
  this.ielc.Getprjtismsguidelines().subscribe((data) => {
    this.prjtIsmsGuidelinesdata=data;
    this.isLoading = false;
  });
 }
 
 AddPrjtISMSGuidelines(): void {
  this.ielc.Postprjtismsguideline(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetPrjtISMSGuidelineslist();
      this.resetPrjtISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deletePrjtISMSGuidelines(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteprjtismsguidelineById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetPrjtISMSGuidelineslist();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditPrjtISMSGuidelines(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetprjtismsguidelineById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdatePrjtISMSGuidelines() {
  this.ielc.Updateprjtismsguideline(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetPrjtISMSGuidelineslist();
      this.resetPrjtISMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}

GetPrjtISMSPolicylist(){
  this.ielc.Getprjtismspolicy().subscribe((data) => {
    this.prjtIsmsPolicydata=data;
    this.isLoading = false;
  });
 }
 
 AddPrjtISMSPolicy(): void {
  this.ielc.Postprjtismspolicy(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetPrjtISMSPolicylist();
      this.resetPrjtISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deletePrjtISMSPolicy(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteprjtismspolicyById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetPrjtISMSPolicylist();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditPrjtISMSPolicy(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetprjtismspolicyById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdatePrjtISMSPolicy() {
  this.ielc.Updateprjtismspolicy(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetPrjtISMSPolicylist();
      this.resetPrjtISMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}

GetPrjtISMSProcedurelist(){
  this.ielc.Getprjtismsprocedure().subscribe((data) => {
    this.prjtIsmsProceduredata=data;
    this.isLoading = false;
  });
 }
 
 AddPrjtISMSProcedure(): void {
  this.ielc.Postprjtismsprocedure(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetPrjtISMSProcedurelist();
      this.resetPrjtISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deletePrjtISMSProcedure(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteprjtismsprocedureById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetPrjtISMSProcedurelist();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditPrjtISMSProcedure(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetprjtismsprocedureById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdatePrjtISMSProcedure() {
  this.ielc.Updateprjtismsprocedure(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetPrjtISMSProcedurelist();
      this.resetPrjtISMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}

GetPrjtISMSFormatlist(){
  this.ielc.Getprjtismsformat().subscribe((data) => {
    this.prjtIsmsFormatdata=data;
    this.isLoading = false;
  });
 }
 
 AddPrjtISMSFormat(): void {
  this.ielc.Postprjtismsformat(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetPrjtISMSFormatlist();
      this.resetPrjtISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deletePrjtISMSFormat(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteprjtismsformatById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetPrjtISMSFormatlist();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditPrjtISMSFormat(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetprjtismsformatById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdatePrjtISMSFormat() {
  this.ielc.Updateprjtismsformat(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetPrjtISMSFormatlist();
      this.resetPrjtISMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}

 //=======================================================================================Project Support QMS
 GetPrjtQMSGenerallist(){
  this.ielc.Getprjtqmsgeneral().subscribe((data) => {
    this.prjtqmsGeneraldata=data;
    this.isLoading = false;
  });
 }
 AddPrjtQMSGeneral(): void {
  this.ielc.Postprjtqmsgeneral(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetPrjtQMSGenerallist();
      this.resetPrjtQMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}

deletePrjtQMSGeneral(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteprjtqmsgeneralById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetPrjtQMSGenerallist();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditPrjtQMSGeneral(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetprjtqmsgeneralById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdatePrjtQMSGeneral() {
  this.ielc.Updateprjtqmsgeneral(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetPrjtQMSGenerallist();
      this.resetPrjtQMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}
resetPrjtQMS(){
  this.docsdata={
    documentID: 0,
    documentName: '',
    url: '',
  }
}
GetPrjtQMSGuidelineslist(){
  this.ielc.Getprjtqmsguidelines().subscribe((data) => {
    this.prjtqmsGuidelinesdata=data;
    this.isLoading = false;
  });
 }
 
 AddPrjtQMSGuidelines(): void {
  this.ielc.Postprjtqmsguideline(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetPrjtQMSGuidelineslist();
      this.resetPrjtQMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deletePrjtQMSGuidelines(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteprjtqmsguidelineById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetPrjtQMSGuidelineslist();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditPrjtQMSGuidelines(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetprjtqmsguidelineById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdatePrjtQMSGuidelines() {
  this.ielc.Updateprjtqmsguideline(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetPrjtQMSGuidelineslist();
      this.resetPrjtQMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}

GetPrjtQMSPolicylist(){
  this.ielc.Getprjtqmspolicy().subscribe((data) => {
    this.prjtqmsPolicydata=data;
    this.isLoading = false;
  });
 }
 
 AddPrjtQMSPolicy(): void {
  this.ielc.Postprjtqmspolicy(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetPrjtQMSPolicylist();
      this.resetPrjtQMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deletePrjtQMSPolicy(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteprjtqmspolicyById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetPrjtQMSPolicylist();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditPrjtQMSPolicy(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetprjtqmspolicyById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdatePrjtQMSPolicy() {
  this.ielc.Updateprjtqmspolicy(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetPrjtQMSPolicylist();
      this.resetPrjtQMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}

GetPrjtQMSProcedurelist(){
  this.ielc.Getprjtqmsprocedure().subscribe((data) => {
    this.prjtqmsProceduredata=data;
    this.isLoading = false;
  });
 }
 
 AddPrjtQMSProcedure(): void {
  this.ielc.Postprjtqmsprocedure(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetPrjtQMSProcedurelist();
      this.resetPrjtQMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deletePrjtQMSProcedure(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteprjtqmsprocedureById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetPrjtQMSProcedurelist();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditPrjtQMSProcedure(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetprjtqmsprocedureById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdatePrjtQMSProcedure() {
  this.ielc.Updateprjtqmsprocedure(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetPrjtQMSProcedurelist();
      this.resetPrjtQMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}

GetPrjtQMSFormatlist(){
  this.ielc.Getprjtqmsformat().subscribe((data) => {
    this.prjtqmsFormatdata=data;
    this.isLoading = false;
  });
 }
 
 AddPrjtQMSFormat(): void {
  this.ielc.Postprjtqmsformat(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetPrjtQMSFormatlist();
      this.resetPrjtQMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deletePrjtQMSFormat(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteprjtqmsformatById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetPrjtQMSFormatlist();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditPrjtQMSFormat(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetprjtqmsformatById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdatePrjtQMSFormat() {
  this.ielc.Updateprjtqmsformat(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetPrjtQMSFormatlist();
      this.resetPrjtQMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}
//===============================================================================CISO ISMS

GetCisoISMSGenerallist(){
  this.ielc.Getcisoismsgeneral().subscribe((data) => {
    this.cisoIsmsGendata=data;
    this.isLoading = false;
  });
 }
 
 AddCisoISMSGeneral(): void {
  this.ielc.Postcisoismsgeneral(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetCisoISMSGenerallist();
      this.resetCisoISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}

deleteCisoISMSGeneral(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeletecisoismsgeneralById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetCisoISMSGenerallist();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditCisoISMSGeneral(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetcisoismsgeneralById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateCisoISMSGeneral() {
  this.ielc.Updatecisoismsgeneral(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetCisoISMSGenerallist();
      this.resetCisoISMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}
resetCisoISMS(){
  this.docsdata={
    documentID: 0,
    documentName: '',
    url: '',
  }
}
GetCisoISMSGuidelineslist(){
  this.ielc.Getcisoismsguidelines().subscribe((data) => {
    this.cisoIsmsGuidelinesdata=data;
    this.isLoading = false;
  });
 }
 
 AddCisoISMSGuidelines(): void {
  this.ielc.Postcisoismsguideline(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetCisoISMSGuidelineslist();
      this.resetCisoISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteCisoISMSGuidelines(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeletecisoismsguidelineById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetCisoISMSGuidelineslist();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditCisoISMSGuidelines(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetcisoismsguidelineById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateCisoISMSGuidelines() {
  this.ielc.Updatecisoismsguideline(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetCisoISMSGuidelineslist();
      this.resetCisoISMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}

GetCisoISMSPolicylist(){
  this.ielc.Getcisoismspolicy().subscribe((data) => {
    this.cisoIsmsPolicydata=data;
    this.isLoading = false;
  });
 }
 
 AddCisoISMSPolicy(): void {
  this.ielc.Postcisoismspolicy(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetCisoISMSPolicylist();
      this.resetCisoISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteCisoISMSPolicy(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeletecisoismspolicyById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetCisoISMSPolicylist();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditCisoISMSPolicy(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetcisoismspolicyById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateCisoISMSPolicy() {
  this.ielc.Updatecisoismspolicy(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetCisoISMSPolicylist();
      this.resetCisoISMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}

GetCisoISMSProcedurelist(){
  this.ielc.Getcisoismsprocedure().subscribe((data) => {
    this.cisoIsmsProceduredata=data;
    this.isLoading = false;
  });
 }
 
 AddCisoISMSProcedure(): void {
  this.ielc.Postcisoismsprocedure(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetCisoISMSProcedurelist();
      this.resetCisoISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteCisoISMSProcedure(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeletecisoismsprocedureById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetCisoISMSProcedurelist();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditCisoISMSProcedure(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetcisoismsprocedureById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateCisoISMSProcedure() {
  this.ielc.Updatecisoismsprocedure(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetCisoISMSProcedurelist();
      this.resetCisoISMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}

GetCisoISMSFormatlist(){
  this.ielc.Getcisoismsformat().subscribe((data) => {
    this.cisoIsmsFormatdata=data;
    this.isLoading = false;
  });
 } 
 
 AddCisoISMSFormat(): void {
  this.ielc.Postcisoismsformat(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetCisoISMSFormatlist();
      this.resetCisoISMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteCisoISMSFormat(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeletecisoismsformatById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetCisoISMSFormatlist();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditCisoISMSFormat(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetcisoismsformatById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateCisoISMSFormat() {
  this.ielc.Updatecisoismsformat(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetCisoISMSFormatlist();
      this.resetCisoISMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}

//===================================================================================CISO QMS
GetCisoQMSGenerallist(){
  this.ielc.Getcisoqmsgeneral().subscribe((data) => {
    this.cisoqmsGeneraldata=data;
    this.isLoading = false;
  });
 }
 
 AddCisoQMSGeneral(): void {
  this.ielc.Postcisoqmsgeneral(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetCisoQMSGenerallist();
      this.resetCisoQMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}

deleteCisoQMSGeneral(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeletecisoqmsgeneralById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetCisoQMSGenerallist();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditCisoQMSGeneral(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetcisoqmsgeneralById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateCisoQMSGeneral() {
  this.ielc.Updatecisoqmsgeneral(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetCisoQMSGenerallist();
      this.resetCisoQMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}
resetCisoQMS(){
  this.docsdata={
    documentID: 0,
    documentName: '',
    url: '',
  }
}
GetCisoQMSGuidelineslist(){
  this.ielc.Getcisoqmsguidelines().subscribe((data) => {
    this.cisoqmsGuidelinesdata=data;
    this.isLoading = false;
  });
 }
 
 AddCisoQMSGuidelines(): void {
  this.ielc.Postcisoqmsguideline(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetCisoQMSGuidelineslist();
      this.resetCisoQMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteCisoQMSGuidelines(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeletecisoqmsguidelineById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetCisoQMSGuidelineslist();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditCisoQMSGuidelines(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetcisoqmsguidelineById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateCisoQMSGuidelines() {
  this.ielc.Updatecisoqmsguideline(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetCisoQMSGuidelineslist();
      this.resetCisoQMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}

GetCisoQMSPolicylist(){
  this.ielc.Getcisoqmspolicy().subscribe((data) => {
    this.cisoqmsPolicydata=data;
    this.isLoading = false;
  });
 }
 
 AddCisoQMSPolicy(): void {
  this.ielc.Postcisoqmspolicy(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetCisoQMSPolicylist();
      this.resetCisoQMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteCisoQMSPolicy(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeletecisoqmspolicyById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetCisoQMSPolicylist();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditCisoQMSPolicy(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetcisoqmspolicyById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateCisoQMSPolicy() {
  this.ielc.Updatecisoqmspolicy(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetCisoQMSPolicylist();
      this.resetCisoQMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}

GetCisoQMSProcedurelist(){
  this.ielc.Getcisoqmsprocedure().subscribe((data) => {
    this.cisoqmsProceduredata=data;
    this.isLoading = false;
  });
 }
 
 AddCisoQMSProcedure(): void {
  this.ielc.Postcisoqmsprocedure(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetCisoQMSProcedurelist();
      this.resetCisoQMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteCisoQMSProcedure(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeletecisoqmsprocedureById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetCisoQMSProcedurelist();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditCisoQMSProcedure(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetcisoqmsprocedureById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateCisoQMSProcedure() {
  this.ielc.Updatecisoqmsprocedure(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetCisoQMSProcedurelist();
      this.resetCisoQMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}

GetCisoQMSFormatlist(){
  this.ielc.Getcisoqmsformat().subscribe((data) => {
    this.cisoqmsFormatdata=data;
    this.isLoading = false;
  });
 } 
 
 AddCisoQMSFormat(): void {
  this.ielc.Postcisoqmsformat(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetCisoQMSFormatlist();
      this.resetCisoQMS();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteCisoQMSFormat(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeletecisoqmsformatById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetCisoQMSFormatlist();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditCisoQMSFormat(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetcisoqmsformatById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateCisoQMSFormat() {
  this.ielc.Updatecisoqmsformat(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetCisoQMSFormatlist();
      this.resetCisoQMS();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}
//=====================================================================================Emergency 
GetEmerGenerallist(){
  this.ielc.Getemergeneral().subscribe((data) => {
    this.EmerGeneraldata=data;
    this.isLoading = false;
  });
 }
 
 AddEmerGeneral(): void {
  this.ielc.Postemergeneral(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetEmerGenerallist();
      this.resetEmer();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}

deleteEmerGeneral(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteemergeneralById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetEmerGenerallist();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditEmerGeneral(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetemergeneralById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateEmerGeneral() {
  this.ielc.Updateemergeneral(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetEmerGenerallist();
      this.resetEmer();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}
resetEmer(){
  this.docsdata={
    documentID: 0,
    documentName: '',
    url: '',
  }
}

//=====================================================================================Var Committees
GetVarCmtGenerallist(){
  this.ielc.Getvarcmt().subscribe((data) => {
    this.VarcmtGeneraldata=data;
    this.isLoading = false;
  });
 }
 
 AddVarCmtGeneral(): void {
  this.ielc.Postvarcmt(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetVarCmtGenerallist();
      this.resetVarCmt();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}

deleteVarCmtGeneral(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeletevarcmtById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetVarCmtGenerallist();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditVarCmtGeneral(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetvarcmtById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateVarCmtGeneral() {
  this.ielc.Updatevarcmt(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetVarCmtGenerallist();
      this.resetVarCmt();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}
resetVarCmt(){
  this.docsdata={
    documentID: 0,
    documentName: '',
    url: '',
  }
}
//=====================================================================================HIPAA 
GetHipaaGenerallist(){
  this.ielc.Gethippa().subscribe((data) => {
    this.HipaaGeneraldata=data;
    this.isLoading = false;
  });
 }
 
 AddHipaaGeneral(): void {
  this.ielc.Posthippa(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetHipaaGenerallist();
      this.resetHipaa();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}

deleteHipaaGeneral(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeletehippaById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetHipaaGenerallist();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditHipaaGeneral(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GethippaById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateHipaaGeneral() {
  this.ielc.Updatehippa(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetHipaaGenerallist();
      this.resetHipaa();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}
resetHipaa(){
  this.docsdata={
    documentID: 0,
    documentName: '',
    url: '',
  }
}
//=====================================================================================SOC 
GetSocGenerallist(){
  this.ielc.Getsoc().subscribe((data) => {
    this.SocGeneraldata=data;
    this.isLoading = false;
  });
 }
 
 AddSocGeneral(): void {
  this.ielc.Postsoc(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetSocGenerallist();
      this.resetSoc();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}

deleteSocGeneral(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeletesocById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetSocGenerallist();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditSocGeneral(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetsocById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateSocGeneral() {
  this.ielc.Updatesoc(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetSocGenerallist();
      this.resetSoc();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}
resetSoc(){
  this.docsdata={
    documentID: 0,
    documentName: '',
    url: '',
  }
}
//=====================================================================================GDPR 
GetGdprGenerallist(){
  this.ielc.Getgdpr().subscribe((data) => {
    this.GdprGeneraldata=data;
    this.isLoading = false;
  });
 }
 
 AddGdprGeneral(): void {
  this.ielc.Postgdpr(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetGdprGenerallist();
      this.resetGdpr();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}

deleteGdprGeneral(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeletegdprById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetGdprGenerallist();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditGdprGeneral(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetgdprById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateGdprGeneral() {
  this.ielc.Updategdpr(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetGdprGenerallist();
      this.resetGdpr();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}
resetGdpr(){
  this.docsdata={
    documentID: 0,
    documentName: '',
    url: '',
  }
}
//=====================================================================================DPDP 
GetDpdpGenerallist(){
  this.ielc.Getdpdp().subscribe((data) => {
    this.DpdpGeneraldata=data;
    this.isLoading = false;
  });
 }
 
 AddDpdpGeneral(): void {
  this.ielc.Postdpdp(this.docsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetDpdpGenerallist();
      this.resetDpdp();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}

deleteDpdpGeneral(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeletedpdpById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetDpdpGenerallist();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditDpdpGeneral(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetdpdpById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.docsdata = { 
        documentID: data.documentID || 0,
        documentName: data.documentName || '',
        url:  data.url || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateDpdpGeneral() {
  this.ielc.Updatedpdp(this.docsdata.documentID, this.docsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetDpdpGenerallist();
      this.resetDpdp();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}
resetDpdp(){
  this.docsdata={
    documentID: 0,
    documentName: '',
    url: '',
  }
}
//========================================================================================Admin users
GetAdminuserslist(){
  this.ielc.Getadminusers().subscribe((data) => {
    this.adminuserslist=data;
    this.isLoading = false;
  });
}  
AddAdminusers(): void {
  this.ielc.Postadminusers(this.adminusersdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetAdminuserslist();
      this.resetAdminusers();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteAdminusers(email: any) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteadminusersById(email).subscribe({
      next: () => {
        alert(`Record with ${email} deleted successfully!`);
        this.GetAdminuserslist();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}
resetAdminusers(){
  this.adminusersdata={
    roleName: '',
    pageName: '',
    email: '',
  }
}
//---------------------------------------------------------------------------------------Holidays
 
GetHolidaysist(){
  this.ielc.Getholidays().subscribe((data) => {
    this.holidayslist=data;
    this.holidayslist = this.sortdate(data)
    this.isLoading = false;
  });
}  
sortdate(data: any[]): any[] {
  return data.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
}
AddHolidays(): void {
  this.ielc.Postholidays(this.holidaysdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetHolidaysist();
      this.resetHolidays();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}
deleteHolidays(content: any) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteholidaysById(content).subscribe({
      next: () => {
        alert(`Record with  ${content} deleted successfully!`);
        this.GetHolidaysist();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}
resetHolidays(){
  this.holidaysdata={
    date: '',
  content: ''
  }
}




//=====================================================================================Events 
GetEventsist(){
  this.ielc.Getevents().subscribe((data) => {
    this.eventslist=data;
    this.eventslist = this.sortlist(data)
    this.isLoading = false;
  });
 }
 
//  AddEvents(): void {
//   this.ielc.Postevents(this.eventsdata).subscribe(
//     (response) => {
//       alert('✅ Record Added Successfully!');
//       this.GetEventsist();
//       this.resetEvents();
//     },
//     (error) => {
//       alert('❌ Error adding Record. Please try again.');
//     }
//   );
// }
// AddEvents(item: any) {
//   const eventPayload = {
//     id: item.id,             // Event ID
//     eventData: item.eventData, // Base64 Image Data
//     eventName: item.eventName  // Event Name
//   };

//   this.ielc.Postevents(eventPayload).subscribe(
//     response => {
//       alert('✅ Event Added Successfully!');
//       // ////console.log('Response:', response);
//       this.GetEventsist();
//       this.resetEvents();
//     },
//     error => {
//       alert('❌ Error adding event. Please try again.');
//       // console.error('Error:', error);
//     }
//   );
// }
AddEvents() {
  const eventPayload = {
    id: this.eventsdata.id,             // Event ID
    eventData: this.eventsdata.eventData, // Base64 Image Data
    eventName: this.eventsdata.eventName  // Event Name
  };
  // // ////console.log("🚀 Sending Payload:", eventPayload); 
  this.ielc.Postevents(eventPayload).subscribe(
    response => {
      alert('✅ Event Added Successfully!');
      // ////console.log('Response:', response);
      this.GetEventsist();
      this.resetEvents();
    },
    error => {
      alert('❌ Error adding event. Please try again.');
      // console.error('Error:', error);
    }
  );
}
onEventFileSelected(event: any) {
  const file = event.target.files[0]; // Get selected file
  this.fileError = ""; // Reset error

  if (!file) {
    this.fileError = "Please select a file.";
    return;
  }

  // Validate file type (Only allow images)
  if (!file.type.startsWith("image/")) {
    this.fileError = "Only image files are allowed.";
    event.target.value = ""; // Reset file input
    return;
  }

  // Validate file size (Max: 2MB)
  const maxSize = 2 * 1024 * 1024; // 2MB in bytes
  if (file.size > maxSize) {
    this.fileError = "File size must be less than 2MB.";
    event.target.value = ""; // Reset file input
    return;
  }

  const reader = new FileReader();
  reader.onload = (e: any) => {
    const base64String = e.target.result.split(",")[1]; // Keep full resolution
    this.eventsdata.eventData = base64String;
  };

  reader.readAsDataURL(file);
}

// showFileInput: boolean = true;
// fileError: string = ''; // Variable to store error message

// onEventFileSelected(event: any) {
//   const file = event.target.files[0]; // Get selected file
//   this.fileError = ""; // Reset error

//   if (!file) {
//     this.fileError = "Please select a file.";
//     return;
//   }

//   // Validate file type (Only allow images)
//   if (!file.type.startsWith("image/")) {
//     this.fileError = "Only image files are allowed.";
//     event.target.value = ""; // Reset file input
//     return;
//   }

//   // Validate file size (Max: 2MB)
//   const maxSize = 2 * 1024 * 1024; // 2MB in bytes
//   if (file.size > maxSize) {
//     this.fileError = "File size must be less than 2MB.";
//     event.target.value = ""; // Reset file input
//     return;
//   }

//   // If file is valid, process it
//   const reader = new FileReader();
//   reader.onload = (e: any) => {
//     const img = new Image();
//     img.src = e.target.result;

//     img.onload = () => {
//       const canvas = document.createElement("canvas");
//       const ctx = canvas.getContext("2d");

//       // Resize Image (Set max width & height)
//       const maxWidth = 300;
//       const maxHeight = 300;
//       let width = img.width;
//       let height = img.height;

//       if (width > maxWidth || height > maxHeight) {
//         if (width > height) {
//           height *= maxWidth / width;
//           width = maxWidth;
//         } else {
//           width *= maxHeight / height;
//           height = maxHeight;
//         }
//       }

//       canvas.width = width;
//       canvas.height = height;
//       ctx?.drawImage(img, 0, 0, width, height);

//       const fileType = file.type === "image/png" ? "image/png" : "image/jpeg";
//       const base64String = canvas.toDataURL(fileType).split(",")[1]; // Remove the prefix

//       this.eventsdata.eventData = base64String; // Store Base64 in your object
//     };
//   };

//   reader.readAsDataURL(file);
// }


removeEventImage() {
  this.eventsdata.eventData = ""; // ✅ Clear stored image

  // ✅ Reset file input field
  const fileInput = document.getElementById("formFile") as HTMLInputElement;
  if (fileInput) {
    fileInput.value = ""; // ✅ Properly reset file input
  }
}


deleteEvents(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteeventsById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetEventsist();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditEvents(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GeteventsById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.eventsdata = { 
        id: data.id || 0,
        eventData: data.eventData || '',
        eventName:  data.eventName || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateEvents() {
  this.ielc.Updateevents(this.eventsdata.id, this.eventsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetEventsist();
      this.resetEvents();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}
resetEvents(){
  this.eventsdata={
    id: 0,
  eventData: '',
  eventName: ''
  }
}

//=====================================================================================Courses Restriction 
GetCourseist(){
  this.ielc.Getcourse().subscribe((data) => {
    this.crserestlist=data;
    this.isLoading = false;
  });
 }
 
 AddCourse(): void {
  this.ielc.Postcourse(this.crserestdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetCourseist();
      this.resetCourse();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}


deleteCourse(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeletecourseById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetCourseist();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditCourse(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GetcourseById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.crserestdata = { 
        id: data.id || 0,
        coursesList: data.coursesList || ''
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateCourse() {
  this.ielc.Updatecourse(this.crserestdata.id, this.crserestdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetCourseist();
      this.resetCourse();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}
resetCourse(){
  this.crserestdata={
    id: 0,
    coursesList: ''
  }
}

//=====================================================================================Audit Schedule
// GetAuditSchedule(){
//   this.ielc.GetAuditSchedule().subscribe((data) => {
//     this.auditschedulelist=data;
//     this.isLoading = false;
//   });
//  }

 
GetAuditSchedule(){
  this.ielc.GetAuditSchedule().subscribe((data) => {
    this.auditschedulelist=data;
    //console.log("Audit Schedule Data:", data);
    this.isLoading = false;
  });
 }

//   AddAuditSchedule(): void {
//   this.ielc.PostAuditSchedule(this.auditeventsdata).subscribe(
//     (response) => {
//       alert('✅ Record Added Successfully!');
//       this.GetAuditSchedule();
//       this.resetAuditSchedule();
//     },
//     (error) => {
//       alert('❌ Error adding Record. Please try again.');
//     }
//   );
// }

AddAuditSchedule(): void {

  // Convert time to 12-hour format
  this.auditeventsdata.StartTime =
    this.convertTo12Hour(this.auditeventsdata.StartTime);

  this.auditeventsdata.EndTime =
    this.convertTo12Hour(this.auditeventsdata.EndTime);

  // Combine if needed
  // this.auditeventsdata.Time =
  //   `${this.auditeventsdata.StartTime} - ${this.auditeventsdata.EndTime}`;

  this.ielc.PostAuditSchedule(this.auditeventsdata).subscribe(
    () => {
      alert('✅ Record Added Successfully!');
      this.GetAuditSchedule();
      this.resetAuditSchedule();
    },
    () => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}

convertTo12Hour(time: string): string {
  if (!time) return '';

  const [hourStr, minute] = time.split(':');
  let hour = Number(hourStr);
  const ampm = hour >= 12 ? 'PM' : 'AM';

  hour = hour % 12;
  hour = hour ? hour : 12; // 0 → 12

  return `${hour.toString().padStart(2, '0')}:${minute} ${ampm}`;
}

 
deleteAuditSchedule(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteAuditScheduleById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetAuditSchedule();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

// EditAuditSchedule(id: number) {
//   this.ielc.GetAuditScheduleId(id).subscribe(data => {
//     if (data) {
//       // Assign data only if it's valid
//       this.auditeventsdata = { 
//         Id: data.id || 0,
//         auditeeDepartment: data.auditeeDepartment || '',
//         auditees: data.auditees || '',
//         StartingDate: data.StartingDate || '',
//         StartTime: data.StartTime || '',
//         EndTime: data.EndTime || '',
//         auditors: data.auditors || '',
//         location: data.location || ''
//       };
//     } else {
//       // console.warn("No data received for the given ID.");
//     }
//   }, error => {
//     // console.error("Error fetching record:", error);
//   });
// }

EditAuditSchedule(id: number) {
  const record = (this.auditschedulelist || []).find((x: any) => x.id === id);
  if (!record) return;

  // Map API response to interface (handles different property casing)
  const startingDate = record.StartingDate || record.startingDate || record.startingdate || '';
  const startTime = record.StartTime || record.startTime || record.timeslot || '';
  const endTime = record.EndTime || record.endTime || '';
  
  this.auditeventsdata = {
    Id: record.Id || record.id || 0,
    auditeeDepartment: record.auditeeDepartment || record.auditeedepartment || '',
    auditees: record.auditees || '',
    StartingDate: startingDate,
    StartTime: startTime,
    EndTime: endTime,
    auditors: record.auditors || '',
    location: record.location || record.Location || ''
  };

  // ✅ FIX DATE (yyyy-MM-dd format for HTML date input) - Avoid timezone issues
  if (this.auditeventsdata.StartingDate) {
    // Extract date part directly without timezone conversion
    if (this.auditeventsdata.StartingDate.includes('T')) {
      // If format is "2025-12-31T00:00:00", extract just the date part
      this.auditeventsdata.StartingDate = this.auditeventsdata.StartingDate.split('T')[0];
    } else if (this.auditeventsdata.StartingDate.includes('-')) {
      // Already in yyyy-MM-dd format, keep as is
      this.auditeventsdata.StartingDate = this.auditeventsdata.StartingDate.substring(0, 10);
    }
  }

  // ✅ FIX TIME (convert 12h → 24h if needed)
  if (this.auditeventsdata.StartTime && (this.auditeventsdata.StartTime.includes('AM') || this.auditeventsdata.StartTime.includes('PM'))) {
    this.auditeventsdata.StartTime = this.convertTo24Hour(this.auditeventsdata.StartTime);
  }

  if (this.auditeventsdata.EndTime && (this.auditeventsdata.EndTime.includes('AM') || this.auditeventsdata.EndTime.includes('PM'))) {
    this.auditeventsdata.EndTime = this.convertTo24Hour(this.auditeventsdata.EndTime);
  }
}
convertTo24Hour(time: string): string {
  if (!time) return '';

  // Example: "05:43 PM"
  const [t, modifier] = time.split(' ');
  let [hours, minutes] = t.split(':');

  let h = parseInt(hours, 10);

  if (modifier === 'PM' && h < 12) h += 12;
  if (modifier === 'AM' && h === 12) h = 0;

  return `${h.toString().padStart(2, '0')}:${minutes}`;
}



UpdateAuditSchedule() {
  // Convert times from 24-hour to 12-hour format (HH:MM PM format)
  const dataToSend = { ...this.auditeventsdata };
  
  if (dataToSend.StartTime) {
    dataToSend.StartTime = this.convertTo12Hour(dataToSend.StartTime);
  }
  
  if (dataToSend.EndTime) {
    dataToSend.EndTime = this.convertTo12Hour(dataToSend.EndTime);
  }
  
  this.ielc.UpdateAuditSchedule(dataToSend.Id, dataToSend).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetAuditSchedule();
      this.resetAuditSchedule();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}
resetAuditSchedule(){
  this.auditeventsdata={
  Id: 0,
  auditeeDepartment: '',
  auditees: '',
  StartingDate: '',
  StartTime: '',
  EndTime: '',
  auditors: '',
  location: ''
  }
}


//=====================================================================================Event Alerts
// GetEventAlertsist(){
//   this.ielc.Geteventalerts().subscribe((data) => {
//     this.eventalertslist=data;
//     this.isLoading = false;
//      this.items = data.map((item: any) => ({
//       ...item,
//       isPaused: item.status === 'InActive'
//     }));
//   });
//  }

GetEventAlertsist() {
  this.isLoading = true;
  this.ielc.Geteventalerts().subscribe((data) => {
    //console.log("Raw API data:", data); // 👈 Check here

    this.eventalertslist = data.map((item: any) => ({
      ...item,
      isPaused: item.status?.trim().toLowerCase() === 'inactive'
    }));

    //console.log("Processed items:", this.eventalertslist);

    this.isLoading = false; // 👈 set false only after mapping is done
  },
  (error) => {
    console.error("Error fetching event alerts:", error);
    this.isLoading = false; // 👈 important to stop loader on error also
  });
}




//  loadData() {
//   debugger;
//   this.ielc.Geteventalerts().subscribe(data => {
//     this.items = data.map((item: any) => ({
//       ...item,
//       isPaused: item.status === 'InActive'
//     }));
//   });
// }

   selectedFileBase64: string = '';
 onFileChange(event: any): void {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = (reader.result as string).split(',')[1];
      this.eventalertsdata.alertAttachment = base64String;
      this.eventalertsdata.fileName = file.name; // <-- Save the original filename
    };
    reader.readAsDataURL(file);
  }
}


togglePlayPause(item: any): void {
  item.isPaused = !item.isPaused;
  item.status = item.isPaused ? 'InActive' : 'Active'; // Match DB casing

  //console.log('Toggling status to:', item.status);

  const payload = {
    AlertID: item.alertID,
    Status: item.status
  };

  this.ielc.UpdateEventAlertStatus(payload).subscribe({
    next: () => {
      //console.log('✅ Status updated in DB');
    },
    error: (err) => {
      console.error('❌ API failed:', err);
      alert('Failed to update status.');
      // Revert UI
      item.isPaused = !item.isPaused;
      item.status = item.isPaused ? 'InActive' : 'Active';
    }
  });
}
 
//  AddEventAlerts(): void {
//   this.ielc.Posteventalerts(this.eventalertsdata).subscribe(
//     (response) => {
//       alert('✅ Record Added Successfully!');
//       this.GetEventAlertsist();
//       this.resetEventAlerts();
//     },
//     (error) => {
//       alert('❌ Error adding Record. Please try again.');
//     }
//   );
// }

AddEventAlerts(): void {
  this.eventalertsdata.status = 'Active';
  this.ielc.Posteventalerts(this.eventalertsdata).subscribe(
    (response) => {
      alert('✅ Record Added Successfully!');
      this.GetEventAlertsist();
      this.resetEventAlerts();
    },
    (error) => {
      alert('❌ Error adding Record. Please try again.');
    }
  );
}


getDownloadLinkFileupload(base64Data: string, fileName: string): string {
  const extension = fileName?.split('.').pop()?.toLowerCase();

  const mimeTypes: { [key: string]: string } = {
    pdf: 'application/pdf',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    txt: 'text/plain',
    csv: 'text/csv',
  };

  const mimeType = mimeTypes[extension || ''] || 'application/octet-stream';

  return `data:${mimeType};base64,${base64Data}`;
}

getFileIconFileupload(base64String: string, fileName: string): string {
  if (!base64String || !fileName) {
    return 'assets/images/no-file.png';
  }

  const extension = fileName.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'pdf':
      return 'assets/images/pdf.png';
    case 'doc':
    case 'docx':
      return 'assets/images/word.png';
    case 'xls':
    case 'xlsx':
      return 'assets/images/excel-icon.png';
    case 'jpg':
    case 'jpeg':
    case 'png':
      return 'assets/images/img.png';
    case 'txt':
      return 'assets/images/text-icon.jpg'; 
    case 'csv':
      return 'assets/images/csv.png';
    default:
      return 'assets/images/file.png';
  }
}


deleteEventAlerts(id: number) {
  if (confirm('Are you sure you want to delete this record?')) {
    this.ielc.DeleteeventalertsById(id).subscribe({
      next: () => {
        alert(`Record with ID ${id} deleted successfully!`);
        this.GetEventAlertsist();
      },
      // error: (err) =>  console.error('Error deleting item:', err)
    });
  }
}

EditEventAlerts(id: number) {
  // ////console.log("Edit button clicked, fetching ID:", id); 
  this.ielc.GeteventalertsById(id).subscribe(data => {

    // ////console.log("Fetched Record Session:", data); 

    if (data) {
      // Assign data only if it's valid
      this.eventalertsdata = { 
        alertID: data.alertID || 0,
        alertName: data.alertName || '',
        alertDate: data.alertDate || '',
        toMails: data.toMails || '',
        ccMails: data.ccMails || '',
        mailAlertDay: data.mailAlertDay || 0,
        mailType: data.mailType || '',
        frequency: data.frequency || '',
        alertAttachment: data.alertAttachment || '',
       fileName: data.fileName || '',
        status:data.status||'',
      };
    } else {
      // console.warn("No data received for the given ID.");
    }
  }, error => {
    // console.error("Error fetching record:", error);
  });
}


UpdateEventAlerts() {
  this.ielc.Updateeventalerts(this.eventalertsdata.alertID, this.eventalertsdata).subscribe(
    (response) => {
      // ////console.log("Updated Successfully:", response);
      alert(" ✅ Record updated successfully!");
      this.GetEventAlertsist();
      this.resetEventAlerts();
    },
    (error) => {
      // console.error("Error updating Record:", error);
    }
  );
}
resetEventAlerts(){
  this.eventalertsdata={
    alertID: 0,
    alertName: '',
    alertDate: '',
    toMails: '',
    ccMails: '',
    mailAlertDay: 0,
    mailType: '',
    frequency: '',
    alertAttachment: '',
    fileName: '',
    status:''
   };
       this.selectedFileBase64 = '';

}
getFileIcon(alertAttachment: string): string {
  if (!alertAttachment) {
    return 'assets/icons/default-file-icon.jpg'; // Default icon
  }

  const extension = alertAttachment.split('.').pop()?.toLowerCase(); // Get file extension

  switch (extension) {
    case 'pdf':
      return 'assets/icons/pdf-icon.jpg';
    case 'doc':
    case 'docx':
      return 'assets/icons/word-icon.jpg';
    case 'xls':
    case 'xlsx':
      return 'assets/icons/excel-icon.jpg';
    case 'txt':
      return 'assets/icons/text-icon.jpg';
    case 'jpg':
    case 'jpeg':
    case 'png':
      return 'assets/icons/image-icon.jpg';
    case 'zip':
    case 'rar':
      return 'assets/icons/zip-icon.jpg';
    default:
      return 'assets/icons/default-file-icon.jpg';
  }
}


}



