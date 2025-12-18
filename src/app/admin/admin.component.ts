import { ActiveUsersService } from './../IELC/active-users.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  constructor(public activeUsersService: ActiveUsersService) {}

ngOnInit() {}

}
