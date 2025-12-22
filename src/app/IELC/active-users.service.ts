import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

export interface IActiveUser {
  id: string;
  name: string;
  role: string;
  loginTime: Date;
  logoutTime: Date | null;
  status: 'online' | 'idle' | 'offline';
  sessionId: string;
}

@Injectable({
  providedIn: 'root'
})
export class ActiveUsersService {
  getAADUserName() {
    throw new Error('Method not implemented.');
  }

  private hubConnection!: signalR.HubConnection;
  private connectionLogs: any[] = [];

  activeCount: number = 0;
  activeUsers: IActiveUser[] = [];
  filteredUsers: IActiveUser[] = [];
  isConnected: boolean = false;
  isConnecting: boolean = false;
  lastUpdated: Date = new Date();
  countChanged: boolean = false;

  startConnection(userName: string) {
    if (this.isConnecting) return;
    
    this.isConnecting = true;
    this.logConnectionAttempt('Connecting', userName);

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5024/activeUsersHub?user=" + userName, {
        withCredentials: false,  // Changed from true to bypass CORS issue
        skipNegotiation: false,
        transport: signalR.HttpTransportType.WebSockets | signalR.HttpTransportType.LongPolling
      })
      .withAutomaticReconnect([0, 2000, 10000])
      .build();

    this.hubConnection.start()
      .then(() => {
        this.isConnected = true;
        this.isConnecting = false;
        this.logConnectionAttempt('Connected', userName);
        //console.log("Connected to Active Users Hub");
      })
      .catch(err => {
        this.isConnecting = false;
        this.logConnectionAttempt('Connection Failed', userName, err.message);
        //console.log("Error connecting:", err);
      });

    // Receive real-time updates
    this.hubConnection.on("ActiveUsersUpdated", (data: any) => {
      const oldCount = this.activeCount;
      this.activeCount = data.count;
      this.activeUsers = this.mapActiveUsers(data.users);
      this.filteredUsers = [...this.activeUsers];
      this.lastUpdated = new Date();
      
      // Trigger animation if count changed
      if (oldCount !== this.activeCount) {
        this.countChanged = true;
        setTimeout(() => this.countChanged = false, 600);
      }
    });

    this.hubConnection.onreconnecting((error) => {
      this.isConnected = false;
      this.logConnectionAttempt('Reconnecting', userName, error?.message);
      //console.log("Reconnecting to hub...", error);
    });

    this.hubConnection.onreconnected((connectionId) => {
      this.isConnected = true;
      this.logConnectionAttempt('Reconnected', userName);
      //console.log("Reconnected to hub with connection ID:", connectionId);
    });

    this.hubConnection.onclose((error) => {
      this.isConnected = false;
      this.logConnectionAttempt('Connection Closed', userName, error?.message);
      //console.log("Connection closed:", error);
    });
  }

  stopConnection() {
    if (this.hubConnection) {
      this.hubConnection.stop();
      this.isConnected = false;
    }
  }

  private mapActiveUsers(data: any[]): IActiveUser[] {
    return data.map(user => ({
      id: user.id || '',
      name: user.name || user.userName || 'Unknown',
      role: user.role || 'User',
      loginTime: new Date(user.loginTime || new Date()),
      logoutTime: user.logoutTime ? new Date(user.logoutTime) : null,
      status: user.status || 'online',
      sessionId: user.sessionId || ''
    }));
  }

  filterUsers(searchTerm: string): void {
    if (!searchTerm || searchTerm.trim() === '') {
      this.filteredUsers = [...this.activeUsers];
    } else {
      const term = searchTerm.toLowerCase();
      this.filteredUsers = this.activeUsers.filter(user =>
        user.name.toLowerCase().includes(term)
      );
    }
  }

  getUsersByRole(role: string): IActiveUser[] {
    if (!role || role === '') {
      return this.activeUsers;
    }
    return this.activeUsers.filter(user => user.role === role);
  }

  getConnectionStatus(): string {
    if (this.isConnecting) return 'Connecting...';
    return this.isConnected ? 'Connected' : 'Disconnected';
  }

  getConnectionStatusClass(): string {
    if (this.isConnecting) return 'warning';
    return this.isConnected ? 'success' : 'danger';
  }

  logConnectionAttempt(event: string, userName: string, details?: string): void {
    const log = {
      timestamp: new Date(),
      event: event,
      userName: userName,
      details: details || '',
      connectionState: this.isConnected ? 'Connected' : 'Disconnected'
    };
    this.connectionLogs.push(log);
    
    // Keep only last 10 logs
    if (this.connectionLogs.length > 10) {
      this.connectionLogs.shift();
    }

    //console.log('Connection Log:', log);
  }

  getConnectionLogs(): any[] {
    return this.connectionLogs;
  }

  reconnect(userName: string): void {
    this.stopConnection();
    setTimeout(() => {
      this.startConnection(userName);
    }, 1000);
  }
}
