import { Component } from '@angular/core';

@Component({
  selector: 'app-monthlyempreport',
  templateUrl: './monthlyempreport.component.html',
  styleUrls: ['./monthlyempreport.component.css']
})
export class MonthlyempreportComponent {
// Track sidebar state
  isSidebarClosed = false;

  // Event handler for sidebar toggle event
   onSidebarToggled(state: boolean) {
    this.isSidebarClosed = state;
  }
}
