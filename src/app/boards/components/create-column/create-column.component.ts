import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EditTaskComponent } from '../edit-task/edit-task.component';

@Component({
  selector: 'app-create-column',
  templateUrl: './create-column.component.html',
  styleUrls: ['./create-column.component.scss'],
})
export class CreateColumnComponent implements OnInit {
  createForm!: FormGroup;

  title: string = 'Columnt title';

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<EditTaskComponent>) {}

  get _title() {
    return this.createForm?.get('title');
  }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      title: [this.title, Validators.required],
    });
  }

  onOkClick() {
    this.dialogRef.close(this.createForm.value);
  }

  onCancelClick() {
    this.dialogRef.close();
  }
}
