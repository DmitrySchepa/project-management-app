import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { IAssignedUser } from '../../models/assigneduser.model';
import { ApiService } from '../../../core/services/api.service';
import { UserDB } from '../../../auth/models/auth.model';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  taskEditform: FormGroup;
  title: string;
  description: string;
  users: UserDB[] = [];
  selected: string = '';

  constructor( 
    private fb: FormBuilder,
    private readonly apiService: ApiService,
    private dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) { title, description, userId }: IAssignedUser ) {

    this.title = title;
    this.description = description; 

    this.taskEditform = fb.group({
      title: [title, Validators.required],
      description: [description, Validators.required],
      userId: [userId, Validators.required]
    });

    this.apiService.getUsers().subscribe({
      next: (users) => {
        users.sort((a, b) => a.name.localeCompare(b.name));        
        this.users = users;
      }
    });

    this.selected = userId ?? 'null'; 
  }

  get _title() {
    return this.taskEditform?.get('title');
  }

  get _description() {
    return this.taskEditform?.get('description');
  }

  ngOnInit(): void {
  }

  onOkClick() {
    this.dialogRef.close(this.taskEditform.value);
  }

  onCancelClick() {
    this.dialogRef.close();
  }

}

