import { Component,OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult,PublicClientApplication } from '@azure/msal-browser';
import { Router } from '@angular/router'; 
import { AuthService } from 'src/app/authservice.service';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {
  
// constructor(private msal:MsalService){}

// isLoggedin():boolean{
//   return this.msal.instance.getActiveAccount()!=null
// }
// Login(){
// this.msal.loginPopup().subscribe((response: AuthenticationResult)=>{
//   this.msal.instance.setActiveAccount(response.account)
// });
// }
// Logout(){
//   this.msal.logout();
// }

  // constructor(private msalService: MsalService, private http: HttpClient,) {}

  // login() {
  //   this.msalService.loginRedirect(); // Use redirect or popup
  // }

  // logout() {
  //   this.msalService.logoutRedirect();
  // }


  
  //   getUserProfile() {
  //     const token = this.msalService.instance.getActiveAccount()?.idToken;
  //     return this.http.get('https://graph.microsoft.com/v1.0/me', {
  //       headers: { Authorization: `Bearer ${token}` }
  //     });
  //   }

  constructor(private authService: AuthService, private router: Router, private msalService: MsalService) {}

  ngOnInit(): void {
    // Check if user is already authenticated, then redirect to home
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
  //      const account = this.msalService.instance.getAllAccounts();
  // if (account) {
  //   this.router.navigate(['/home']);
  // }
  }

  login(): void {
    this.authService.login();
  }
  
  }




