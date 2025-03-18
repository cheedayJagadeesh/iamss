import { Component, OnInit } from '@angular/core';
import { IelcapiService } from '../ielcapi.service';

@Component({
  selector: 'app-skillqa',
  templateUrl: './skillqa.component.html',
  styleUrls: ['./skillqa.component.css']
})
export class SkillqaComponent implements OnInit {
  Enrolledskills: any[] = []; 
  skillname='';
  isLoading = true;
  page: number = 1;  
  itemsPerPage: number = 10; 

  constructor(private ielc:IelcapiService) {}

  ngOnInit() {
    this.GetAllSkillsData();
   }
  GetAllSkillsData(){
    this.ielc.GetEnrolledSkills().subscribe((data) => {
      this.Enrolledskills=data;
    });
   }
}
