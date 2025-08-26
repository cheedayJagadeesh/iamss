import { Component } from '@angular/core';
import { IelcapiService } from '../ielcapi.service';


interface docs{
  documentID: string;
  documentName: string;
  url: string;
}
@Component({
  selector: 'app-varcmts',
  templateUrl: './varcmts.component.html',
  styleUrls: ['./varcmts.component.css']
})
export class VarcmtsComponent {
 isLoading = true;
 isLoadingPdf: boolean = false;
  varcmtlist: any[] = []; 
 
  docsdata:docs={
   documentID:'',
   documentName: '',
   url: '',
  }
  constructor(private ielc:IelcapiService) {
  }
  ngOnInit(): void {
    this.GetVarcmtlist();
  }
  
   GetVarcmtlist(){
    this.ielc.Getvarcmt().subscribe((data) => {
      this.varcmtlist=data;
      this.isLoading = false;
    });
   }
// pdfUrl: any = null;
//  loadingId: number | null = null;
//   openDocument(id: number) {
//     this.ielc.getWordAsPdf(id).subscribe(blob => {
//       const pdfBlob = new Blob([blob], { type: 'application/pdf' });
//       const pdfUrl = URL.createObjectURL(pdfBlob);
//       // Open PDF in a new tab 
//       window.open(pdfUrl, '_blank');
//       // Optional: revoke the URL after some time to free memory // 
//       setTimeout(() => URL.revokeObjectURL(pdfUrl),);
//     });
//   }
pdfUrl: string | null = null;

openDocument(id: number) {
  this.ielc.getWordAsPdf(id).subscribe(blob => {
    const pdfBlob = new Blob([blob], { type: 'application/pdf' });
    this.pdfUrl = URL.createObjectURL(pdfBlob);
  });
}

closePdf() {
  this.pdfUrl = null;
}
}
