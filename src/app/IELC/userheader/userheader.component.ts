import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/authservice.service';
import { MsalService } from '@azure/msal-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userheader',
  templateUrl: './userheader.component.html',
  styleUrls: ['./userheader.component.css']
})
export class UserheaderComponent {
 userName: string | null = null;
  userEmail: string | null = null;
   @Input() pageTitle: string = '';

  constructor(private msalService: MsalService, private authService: AuthService, private router: Router) {}

async ngOnInit() {
  try {
    await this.msalService.instance.initialize();  
    await this.msalService.instance.handleRedirectPromise();
    const activeAccount = this.msalService.instance.getActiveAccount();
    if (!activeAccount) {
      this.router.navigate(['/login']);
      return;
    }
  
      this.authService.setActiveAccount();
  
      this.authService.userDetails$.subscribe(userDetails => {
        this.userName = userDetails?.displayName ;
        this.userEmail = userDetails?.email ;
      });
     
  
    } catch (error) {
      // console.error("MSAL initialization error in HeaderComponent:", error);
    }
  
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.sticky-header');
    if (window.scrollY > 9) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });
}
}
