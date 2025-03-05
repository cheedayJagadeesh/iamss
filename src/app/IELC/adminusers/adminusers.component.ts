import { Component } from '@angular/core';
import { IelcapiService } from '../ielcapi.service';

interface smtpinfo{
  id: number;
  userName: string;
  password: string;
}
@Component({
  selector: 'app-adminusers',
  templateUrl: './adminusers.component.html',
  styleUrls: ['./adminusers.component.css']
})
export class AdminusersComponent {
  selectedOption: string = '';
  isContactSelected: boolean = false;

onSelectionChange() {
  this.isContactSelected = this.selectedOption === 'Contact';
}
  isLoading = true;
  smtplist: any[] = []; 
  smtpdata:smtpinfo={
   id: 0,
   userName: '',
   password: '',
  }
  constructor(private ielc:IelcapiService) {

  }
  ngOnInit(): void {
    this.GetSmtplist();
  }
  GetSmtplist(){
    this.ielc.Getsmtp().subscribe((data) => {
      this.smtplist=data;
      this.isLoading = false;
    });
   }
   AddSmtp(): void {
    this.ielc.Postsmtp(this.smtpdata).subscribe(
      (response) => {
        alert('✅ Record Added Successfully!');
        this.GetSmtplist();
        this.resetsmtp();
      },
      (error) => {
        alert('❌ Error adding Record. Please try again.');
      }
    );
  }
  deletesmtp(id: number) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.ielc.DeletesmtpById(id).subscribe({
        next: () => {
          alert(`Record with ID ${id} deleted successfully!`);
          this.GetSmtplist();
        },
        error: (err) => console.error('Error deleting item:', err)
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
}
