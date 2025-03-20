import { Component } from '@angular/core';
import { AuthService } from 'src/app/authservice.service';

@Component({
  selector: 'app-attendanceheader',
  templateUrl: './attendanceheader.component.html',
  styleUrls: ['./attendanceheader.component.css']
})
export class AttendanceheaderComponent {
  constructor(private authService: AuthService) {}
  logout(): void {
    this.authService.logout();
  }
}
