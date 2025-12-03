import { Component } from '@angular/core';

@Component({
  selector: 'app-hrdept',
  templateUrl: './hrdept.component.html',
  styleUrls: ['./hrdept.component.css']
})
export class HrdeptComponent {
  // Track sidebar state
  isSidebarClosed = false;

  // Event handler for sidebar toggle event
   onSidebarToggled(state: boolean) {
    this.isSidebarClosed = state;
  }
}
