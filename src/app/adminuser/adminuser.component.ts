import { Component,ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { FormControl, FormGroup, NgForm } from '@angular/forms';




@Component({
  selector: 'app-adminuser',
  templateUrl: './adminuser.component.html',
  styleUrls: ['./adminuser.component.css']
})
export class AdminuserComponent {
  selectedDate:string=''
//  selectedDate= new Date().toISOString().split('T')[0]
  searchname=''
  searchid=''
  time1=''
  time2=''
  leave=''
  addholidays=''
  editholidays=''
// adminform=new FormGroup({
//   searchname:new FormControl(''),
//   searchid:new FormControl(''),
//   time1:new FormControl(''),
//   time2:new FormControl(''),
//   leave:new FormControl(''),
// })

@ViewChild('adminform') adminform!: NgForm;

  submitdata(adminform:any)
  {
    console.log(adminform);
  }
  clearData()
  {
    // console.log(this.adminform.value);
    // this.adminform.resetForm({
    //   leave:''
    // });
   
  }



  project=''
  projects=[
    {
      name: 'NNA'
    },
    {
      name: 'RTL'
    }
  ]

  employee:any
  employees=[
    {
      id: 'T815', name: 'Akhilpasha'
    },
    {
      id: 'T823', name: 'Jagadeesh',
    }
  ]
 
  searchEmployee() {
    // if (this.searchname) {
    //   this.employee = this.employees.find(emp => emp.name.toLowerCase() === this.searchname.toLowerCase());
    // } else if (this.searchid) {
    //   this.employee = this.employees.find(emp => emp.id === this.searchid);
    // } else {
    //   this.employee = null; // No match found or empty search
    // }

    // // If no employee found, reset employee object
    // if (!this.employee) {
    //   alert('Employee not found');
    // }
  }
 
 

  addholiday() {
    console.log(this.adminform.value);
    this.adminform.resetForm();
  }

  // addholiday(adminform: NgForm)
  // {
  //   console.log(adminform);
  //    adminform.resetForm()
    
   
    
  // }

  editholiday()
  {
    console.log(this.adminform.value);
    this.adminform.resetForm();
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
