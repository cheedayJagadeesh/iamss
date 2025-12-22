import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authservice.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

     isSidebarClosed = false;
     onSidebarToggled(state: boolean) {
    this.isSidebarClosed = state;
  }

    userName: string | null = '';
  userEmail: string | null = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.userDetails$.subscribe(user => {
      this.userName = user.displayName;
      this.userEmail = user.email;
    });
  }
}

