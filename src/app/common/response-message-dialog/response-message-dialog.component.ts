import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResponseMessage, ResponseMessageType } from 'src/Interfaces/response-message';

@Component({
  selector: 'app-response-message-dialog',
  templateUrl: './response-message-dialog.component.html',
  styleUrls: ['./response-message-dialog.component.scss']
})
export class ResponseMessageDialogComponent implements OnInit{
  dialogImage!: string;
  message!: string;
  isInfoDialog: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ResponseMessage
  ){}

  ngOnInit(): void {
    this.setDialogImage();
    this.setDialogMessage();
  }

  setDialogImage(): void {
    if (this.data.messageType === ResponseMessageType.Error) {
      this.dialogImage = 'https://cdn0.iconfinder.com/data/icons/shift-interfaces/32/Error-512.png';
    }
    if (this.data.messageType === ResponseMessageType.Success) {
      this.dialogImage = 'https://cdn-icons-png.flaticon.com/512/148/148767.png';
    }
    if (this.data.messageType === ResponseMessageType.Info) {
      this.dialogImage = 'https://static-00.iconduck.com/assets.00/info-icon-2048x2048-tcgtx810.png';
    }
  }

  setDialogMessage(): void {
    this.message = this.data.message.toString();
  }
}
