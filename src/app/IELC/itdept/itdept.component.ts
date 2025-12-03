import { Component } from '@angular/core';

@Component({
  selector: 'app-itdept',
  templateUrl: './itdept.component.html',
  styleUrls: ['./itdept.component.css']
})
export class ItdeptComponent {
  // Track sidebar state
  isSidebarClosed = false;

  // Event handler for sidebar toggle event
   onSidebarToggled(state: boolean) {
    this.isSidebarClosed = state;
  }
}
