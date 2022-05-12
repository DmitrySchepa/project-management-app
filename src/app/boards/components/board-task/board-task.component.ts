import { Component, Input, OnInit } from '@angular/core';
import { BoardTask } from '../../models/board.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../core/components/confirmation-dialog/confirmation-dialog.component';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-board-task',
  templateUrl: './board-task.component.html',
  styleUrls: ['./board-task.component.scss'],
})
export class BoardTaskComponent implements OnInit {
  @Input() task!: BoardTask;

  constructor(private readonly dialog: MatDialog, private readonly store: Store) {}

  ngOnInit(): void {}

  deleteTask() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: `Are you sure want to delete task '${this.task.title}'?`,
        buttonText: {
          ok: 'Delete',
          cancel: 'Cancel',
        },
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        console.log('delete task', this.task.id);
        //this.store.dispatch(deleteTask({ id: this.task.id }));
      }
    });
  }
}
