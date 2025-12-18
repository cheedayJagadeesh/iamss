import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class ActiveUsersService {

  private hubConnection!: signalR.HubConnection;

  activeCount: number = 0;
  activeUsers: string[] = [];

  startConnection(userName: string) {

    this.hubConnection = new signalR.HubConnectionBuilder()
  .withUrl("https://localhost:5024/activeUsersHub?user=" + userName, {
    withCredentials: true
  })
  .withAutomaticReconnect()
  .build();


    this.hubConnection.start()
      .then(() => console.log("Connected to Active Users Hub"))
      .catch(err => console.log("Error connecting:", err));

    // Receive real-time updates
    this.hubConnection.on("ActiveUsersUpdated", (data: any) => {
      this.activeCount = data.count;
      this.activeUsers = data.users;
    });
  }
}
