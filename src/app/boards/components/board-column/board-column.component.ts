import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BoardColumn, BoardTask } from '../../models/board.model';
import { ActivatedRoute } from '@angular/router';
import { BoardsService } from '../../services/boards.service';
import { Store } from '@ngrx/store';
import { selectTasks } from '../../../state/selectors/boards.selectors';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { ConfirmationDialogComponent } from '../../../core/components/confirmation-dialog/confirmation-dialog.component';
import { deleteTask } from '../../../state/actions/boards.actions';
import { TranslateService } from '@ngx-translate/core';
import { translateText, translateParamText } from 'src/app/core/helpers/translate.function';

@Component({
  selector: 'app-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.scss'],
})
export class BoardColumnComponent implements OnInit {
  @Input() column!: BoardColumn;

  boardId: string = '';

  columnId: string = '';

  public tasks$!: Observable<BoardTask[]>;

  public tasks!: BoardTask[];

  constructor(
    public dialog: MatDialog,
    private readonly route: ActivatedRoute,
    private readonly boardsService: BoardsService,
    private readonly store: Store,
    protected readonly translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.boardId = this.route.snapshot.params['id'];
    this.columnId = this.column.id;
    this.tasks$ = this.store.select(selectTasks(this.boardId, this.columnId));
    this.tasks$.subscribe((tasks) => {
      if (tasks) this.tasks = [...tasks];
    });
  }

  drop(event: CdkDragDrop<BoardTask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.updateTasks(event);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.updateTasks(event, true);
    }
  }

  updateTasks(event: CdkDragDrop<BoardTask[]>, transfer: boolean = false) {
    const { previousIndex, currentIndex, container, item } = event;
    const taskId = item.element.nativeElement.dataset['id'];
    if (transfer) {
      const task = this.tasks.find((taskItem) => taskItem.id === taskId) as BoardTask;
      this.store.dispatch(deleteTask({ task }));
      //action: move task to column (colId, taskId, order = currentIdx + 1)
      const columnId = container.element.nativeElement.closest<HTMLElement>('app-board-column')
        ?.dataset['id'] as string;
      this.boardsService.reorderTasks(columnId, currentIndex, this.boardId);
      console.log(columnId);
      this.boardsService.createTask(this.boardId, columnId, {
        title: task.title,
        description: task.description,
        userId: task.userId,
        order: currentIndex + 1,
        done: task.done,
      });
    } else {
      const tasks = Array.from(container.element.nativeElement.children) as HTMLElement[];
      //tasks[previousIndex] = currentIndex + 1
      const eventTask = this.tasks.find((task) => task.id === taskId) as BoardTask;
      this.boardsService.editTask({ ...eventTask, order: 0 });
      if (previousIndex < currentIndex) {
        for (let i = previousIndex + 1; i <= currentIndex; i += 1) {
          //tasks[i] order = i
          const editTask = this.tasks.find(
            (task) => task.id === (tasks[i].dataset['id'] as string),
          ) as BoardTask;
          this.boardsService.editTask({ ...editTask, order: i });
        }
        this.boardsService.editTask({ ...eventTask, order: currentIndex + 1 });
      } else {
        for (let i = currentIndex; i < previousIndex; i += 1) {
          // tasks[i] order = i + 2
          const editTask = this.tasks.find(
            (task) => task.id === (tasks[i].dataset['id'] as string),
          ) as BoardTask;
          this.boardsService.editTask({ ...editTask, order: i + 2 });
        }
        this.boardsService.editTask({ ...eventTask, order: currentIndex + 1 });
      }
    }
  }

  isAddTitleModeOn = false;

  @ViewChild('taskInput', { static: false }) taskInput!: ElementRef;

  onTaskAdded() {
    this.boardsService.isEditModeOn$.next(false);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      title: 'Your title',
      description: 'Description',
      userId: localStorage.getItem('pma-user-id'),
    };

    const dialogRef = this.dialog.open(EditTaskComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.boardsService.createTask(this.boardId, this.columnId, {
          title: result.title,
          description: result.description,
          userId: result.userId,
          order: this.tasks.length + 1,
          done: false,
        });
      }
    });
  }

  onChangeTitle(value: string) {
    if (value.length != 0) {
      this.boardsService.editColumn({ ...this.column, title: value }, this.boardId);
      this.isAddTitleModeOn = !this.isAddTitleModeOn;
    }
  }

  onDeleteColumn() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: translateParamText(
          'BOARD_COLUMN.wantdeletecolumn',
          this.translate,
          this.column.title,
        ),
        buttonText: {
          ok: translateText('BOARD_COLUMN.okbtntext', this.translate),
          cancel: translateText('BOARD_COLUMN.cancelbtntext', this.translate),
        },
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.boardsService.deleteColumn(this.boardId, this.columnId, this.column.order);
      }
    });
  }
}
