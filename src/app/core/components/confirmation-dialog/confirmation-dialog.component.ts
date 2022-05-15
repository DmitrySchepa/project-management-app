import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BoardsService } from 'src/app/boards/services/boards.service';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent implements OnInit {
  messages = {
    delete: 'Are you sure want to delete?',
    addTitle: 'Please enter a title',
  };

  confirmButtonText = 'Yes';

  cancelButtonText = 'Cancel';

  isAddModeOn$ = this.apiService.isInfoAddModeOn$;

  formGroup!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    private readonly apiService: ApiService,
    private readonly boardsService: BoardsService,
    private readonly fb: FormBuilder,
  ) {
    if (data) {
      this.messages.delete = data.message || this.messages;
      if (data.buttonText) {
        this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      title: [this.boardsService.boardData?.title || '', [Validators.required]],
      description: [this.boardsService.boardData?.description || ' ', Validators.maxLength(255)],
    });
  }

  get title() {
    return this.formGroup.get('title');
  }

  get description() {
    return this.formGroup.get('description');
  }

  onConfirmClick(): void {
    this.boardsService.boardData = this.formGroup.value;
    this.dialogRef.close(true);
  }
}
