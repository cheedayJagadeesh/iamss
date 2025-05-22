import { Injectable } from '@angular/core';
import { IelcapiService } from './IELC/ielcapi.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  isLoading = true;
  smtplist: any[] = []; 

  constructor(private ielc: IelcapiService) {
    this.GetSmtplist(); // Call to load the SMTP list when the service is initialized
  }

  // Get the SMTP list from the backend
  GetSmtplist() {
    this.ielc.Getsmtp().subscribe((data) => {
      this.smtplist = data;
      this.smtplist = this.sortlist(data);
      this.isLoading = false; // Mark loading as complete
    });
  }

  // Sort the SMTP list based on the ID
  sortlist(data: any[]): any[] {
    return data.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
  }

  // Decrypt the password (assuming Base64 encoding)
  decryptPassword(encodedPassword: string): string {
    return atob(encodedPassword); // Base64 decode
  }

  // Send the email, but only if the SMTP settings are loaded
  async sendEmail(to: string, cc: string, subject: string, body: string): Promise<void> {
    if (this.isLoading) {
      // console.log("🔄 Waiting for SMTP settings to load...");
      return; // If SMTP settings are still loading, don't proceed
    }

    const smtp = this.smtplist[0]; // Get the first SMTP configuration
    const decryptedPassword = this.decryptPassword(smtp.password);

    const EmailPayload = {
      smtpUserName: smtp.userName,
      smtpPassword: decryptedPassword,
      to,
      // cc: 'jagadeesh.c@inteqsolutions.com',
      // cc: 'akhilpasha.m@inteqsolutions.com',
      cc: 'ramprasadh@inteqsolutions.com',
      subject,
      body
    };

    // console.log("🚀 Payload to backend:", EmailPayload);

    // Send email through backend service
    try {
      await firstValueFrom(this.ielc.sendEmailFromBackend(EmailPayload));
      // console.log('✅ Email sent from backend.');
    } catch (error) {
      // console.error('❌ Email error:', error);
      throw error;
    }
  }
}