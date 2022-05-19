import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { IEditPomodoro } from '../../models/pomodoro.model';


@Component({
  selector: 'app-pomodoro-edit',
  templateUrl: './pomodoro-edit.component.html',
  styleUrls: ['./pomodoro-edit.component.scss']
})
export class PomodoroEditComponent implements OnInit {
  pomodoroEditform: FormGroup;
  name: string;
  description: string;

  constructor( private fb: FormBuilder,
    private dialogRef: MatDialogRef<PomodoroEditComponent>,
    @Inject(MAT_DIALOG_DATA) { name, description }:IEditPomodoro ) { 
      this.name = name;
      this.description = description; 
  
      this.pomodoroEditform = fb.group({
        name: [name, Validators.required],
        description: [description, Validators.required],
      });
     
    }

  ngOnInit(): void {
  }


  get _name() {
    return this.pomodoroEditform?.get('name');
  }

  get _description() {
    return this.pomodoroEditform?.get('description');
  } 

  onOkClick() {
    this.dialogRef.close(this.pomodoroEditform.value);
  }

  onCancelClick() {
    this.dialogRef.close();
  }

}
