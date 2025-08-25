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
pdfUrl: any = null;
 loadingId: number | null = null;
openDocument(id: number) {
  this.loadingId = id; 
  this.ielc.getWordAsPdf(id).subscribe({
    next: (blob) => {
      const pdfBlob = new Blob([blob], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, '_blank');
    },
    error: (err) => {
      console.error('Failed to load PDF:', err);
      alert('Error loading PDF.');
    },
    complete: () => {
      this.loadingId = null; 
    }
  });
}
}