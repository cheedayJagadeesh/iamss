import { Component } from '@angular/core';
import { AuthService } from 'src/app/authservice.service';

@Component({
  selector: 'app-ismsheader',
  templateUrl: './ismsheader.component.html',
  styleUrls: ['./ismsheader.component.css']
})
export class IsmsheaderComponent {
  constructor(private authService: AuthService) {}
  logout(): void {
    this.authService.logout();
  }
}
