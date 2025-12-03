import { Component } from '@angular/core';

@Component({
  selector: 'app-admindept',
  templateUrl: './admindept.component.html',
  styleUrls: ['./admindept.component.css']
})
export class AdmindeptComponent {
  // Track sidebar state
  isSidebarClosed = false;

  // Event handler for sidebar toggle event
   onSidebarToggled(state: boolean) {
    this.isSidebarClosed = state;
  }
}
