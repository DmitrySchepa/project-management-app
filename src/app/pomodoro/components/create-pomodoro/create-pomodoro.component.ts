import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { ICreatePomodoro, ITimer } from '../../models/pomodoro.model';

@Component({
  selector: 'app-create-pomodoro',
  templateUrl: './create-pomodoro.component.html',
  styleUrls: ['./create-pomodoro.component.scss']
})
export class CreatePomodoroComponent implements OnInit {
  pomodoroCreateform: FormGroup;
  name: string;
  description: string;
  start: string;
  duration: number;
  constructor(
    @Inject(MAT_DIALOG_DATA) { name, description, duration, start }:ICreatePomodoro,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreatePomodoroComponent>,    
    private dialog: MatDialog
    ) { 
      this.name = name;
      this.description = description;
      this.start = start;
      this.duration = duration;
  
      this.pomodoroCreateform = fb.group({
        name: [name, Validators.required],
        description: [description, Validators.required],
        duration: [duration, [
          Validators.required,
          Validators.min(1),
          Validators.max(120)        
        ]],
      });
    }

  ngOnInit(): void {
  }
  get _name() {
    return this.pomodoroCreateform?.get('name');
  }

  get _description() {
    return this.pomodoroCreateform?.get('description');
  } 

  get _duration() {
    return this.pomodoroCreateform?.get('duration');
  } 

  onStartClick() {
    this.dialogRef.close(this.pomodoroCreateform.value);    
  }

  onCancelClick() {
    this.dialogRef.close();
  }  

}
