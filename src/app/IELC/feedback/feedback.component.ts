import { Component } from '@angular/core';
import { IelcapiService } from '../ielcapi.service';
import { Router } from '@angular/router'; 
import { AuthService } from 'src/app/authservice.service';
import { MsalService } from '@azure/msal-angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  selectedSkill: string = '';
  enrollmentID: number | null = null;
  constructor(private ielc:IelcapiService,private msalService: MsalService, private authService: AuthService, private router: Router,private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.selectedSkill = params['skill'];
      this.enrollmentID = params['enrollment'] ? Number(params['enrollment']) : null;
    });
  }
}
