import { Component } from '@angular/core';

@Component({
  selector: 'app-projectreports',
  templateUrl: './projectreports.component.html',
  styleUrls: ['./projectreports.component.css']
})
export class ProjectreportsComponent {
// Track sidebar state
  isSidebarClosed = false;

  // Event handler for sidebar toggle event
   onSidebarToggled(state: boolean) {
    this.isSidebarClosed = state;
  }
}
