import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BoardsService } from 'src/app/boards/services/boards.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
})
export class ConfirmationDialogComponent {
  messages = {
    delete: 'Are you sure want to delete?',
    addTitle: 'Please enter a title',
  };
  confirmButtonText = 'Yes';
  cancelButtonText = 'Cancel';
  isAddModeOn$ = this.apiService.isInfoAddModeOn$;

  get title() {
    return this.boardsService.boardTitle;
  }

  set title(value: string) {
    this.boardsService.boardTitle = value;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    private readonly apiService: ApiService,
    private readonly boardsService: BoardsService,
  ) {
    if (data) {
      this.messages.delete = data.message || this.messages;
      this.title = data.title;
      if (data.buttonText) {
        this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
