import { Component, Input } from '@angular/core';
import { BoardTask } from '../../models/board.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../core/components/confirmation-dialog/confirmation-dialog.component';
import { Store } from '@ngrx/store';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { deleteTask } from '../../../state/actions/boards.actions';
import { BoardsService } from '../../services/boards.service';

@Component({
  selector: 'app-board-task',
  templateUrl: './board-task.component.html',
  styleUrls: ['./board-task.component.scss'],
})
export class BoardTaskComponent {
  @Input() task!: BoardTask;

  constructor(
    private readonly dialog: MatDialog,
    private readonly store: Store,
    private readonly boardsService: BoardsService,
  ) {}

  onTaskEdit(event: Event) {
    const target = event.target as HTMLElement;
    if (target.tagName !== 'DIV') return;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      title: this.task.title,
      description: this.task.description,
      userId: this.task.userId,
    };

    const dialogRef = this.dialog.open(EditTaskComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const editedTask = {
          ...this.task,
          ...result,
        };
        delete editedTask.files;
        this.boardsService.editTask(editedTask);
      }
    });
  }

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
        this.store.dispatch(deleteTask({ task: this.task }));
      }
    });
  }
}
