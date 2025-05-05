import { Component,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pmadminuser',
  templateUrl: './pmadminuser.component.html',
  styleUrls: ['./pmadminuser.component.css']
})
export class PmadminuserComponent {
    selectedDate:string=''
    searchname=''
    searchid=''
    time1=''
    time2=''
    leave=''

    @ViewChild('pmadminform') pmadminform!: NgForm;

  submitdata(pmadminform:any)
  {
    // console.log(pmadminform);
  }
  clearData()
  {
    // this.pmadminform.resetForm();
   
  }
  
 isSecondSelectDisabled: boolean = false;
 isTimeInputDisabled: boolean = true;
 onSelect1Change() {
  this.isSecondSelectDisabled = !!this.leave
 

 // if(this.isSecondSelectDisabled){
 //   this.leave=''
 // }
 if(this.leave==='Half Day')
   {
    this.isSecondSelectDisabled=false
   this.isTimeInputDisabled=false
 } 
}
}
