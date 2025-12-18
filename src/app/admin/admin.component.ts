import { ActiveUsersService } from './../IELC/active-users.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  searchTerm: string = '';
  selectedRole: string = '';
  userName: string = '';
  isReconnecting: boolean = false;

  constructor(public activeUsersService: ActiveUsersService) {
    // Get username from session/auth service if available
    this.userName = sessionStorage.getItem('userName') || 'admin';
  }

  ngOnInit() {
    this.activeUsersService.startConnection(this.userName);
  }

  ngOnDestroy() {
    this.activeUsersService.stopConnection();
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.activeUsersService.filterUsers(term);
    
    // If role filter is active, apply it to filtered results
    if (this.selectedRole) {
      this.onFilterByRole(this.selectedRole);
    }
  }

  onFilterByRole(role: string): void {
    this.selectedRole = role;
    
    if (!role || role === '') {
      this.activeUsersService.filteredUsers = [...this.activeUsersService.activeUsers];
    } else {
      this.activeUsersService.filteredUsers = this.activeUsersService.activeUsers.filter(
        user => user.role === role
      );
    }

    // Apply search filter on top of role filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      this.activeUsersService.filteredUsers = this.activeUsersService.filteredUsers.filter(
        user => user.name.toLowerCase().includes(term)
      );
    }
  }

  reconnect(): void {
    this.isReconnecting = true;
    this.activeUsersService.reconnect(this.userName);
    
    setTimeout(() => {
      this.isReconnecting = false;
    }, 3000);
  }

  formatTime(date: Date | null | undefined): string {
    if (!date) return '-';
    
    try {
      const d = new Date(date);
      return d.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    } catch (e) {
      return '-';
    }
  }

  getUniqueRoles(): string[] {
    const roles = new Set<string>();
    this.activeUsersService.activeUsers.forEach(user => {
      if (user.role) roles.add(user.role);
    });
    return Array.from(roles).sort();
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'online': return 'success';
      case 'idle': return 'warning';
      case 'offline': return 'danger';
      default: return 'secondary';
    }
  }

}
