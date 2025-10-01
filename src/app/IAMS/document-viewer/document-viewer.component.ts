import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IelcapiService } from '../../IELC/ielcapi.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.css']
})
export class DocumentViewerComponent {
  @Input() pdfUrl: string | null = null;
  @Output() closePopup = new EventEmitter<void>();


  close() {
    this.closePopup.emit();
  }
}