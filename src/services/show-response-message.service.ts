import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ResponseMessageType } from 'src/Interfaces/response-message';
import { ResponseMessageDialogComponent } from 'src/app/common/response-message-dialog/response-message-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ShowResponseMessageService {
  constructor(public dialog: MatDialog) {}

  openDialog(messageType: ResponseMessageType, message: string): void {
    this.dialog.open(ResponseMessageDialogComponent, {
      panelClass: 'response-message-dialog',
      data: {
        messageType: messageType,
        message: message
      }
    });
  }
}