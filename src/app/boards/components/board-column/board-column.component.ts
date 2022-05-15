import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BoardColumn, BoardTask } from '../../models/board.model';
import { ActivatedRoute } from '@angular/router';
import { BoardsService } from '../../services/boards.service';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.scss'],
})
export class BoardColumnComponent implements OnInit {
  @Input() column!: BoardColumn;

  boardId: string = '';

  columnId: string = '';

  constructor(
    public dialog: MatDialog,
    private readonly route: ActivatedRoute,
    private readonly boardsService: BoardsService,
  ) {}

  ngOnInit(): void {
    this.boardId = this.route.snapshot.params['id'];
    this.columnId = this.column.id;
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
    const { previousIndex, currentIndex, previousContainer, container, item } = event;
    const taskId = item.element.nativeElement.dataset['id'];
    const [prevColId, colId] = [previousContainer, container].map(
      (elem) => elem.element.nativeElement.closest<HTMLElement>('app-board-column')?.dataset['id'],
    );
    if (transfer) {
      console.log('prev:');
      Array.from(previousContainer.element.nativeElement.children)
        .filter((child) => !child.classList.contains('cdk-drag-dragging'))
        .forEach((child, index) => {
          if (index >= previousIndex) {
            const id = (child as HTMLElement).dataset['id'];
            console.log(index + 1, id, child.textContent); //Reorder task in prevColumn
          }
        });
      //action: move task to column (colId, taskId, order = currentIdx + 1)
      console.log('curr:');
      Array.from(container.element.nativeElement.children).forEach((child, index) => {
        const id = (child as HTMLElement).dataset['id'];
        if (index >= currentIndex) {
          console.log(index + 2, id, child.textContent); //reorder task in currColumn
        }
      });
    } else {
      const tasks = Array.from(container.element.nativeElement.children) as HTMLElement[];
      //tasks[previousIndex] = currentIndex + 1
      console.log(tasks[previousIndex].textContent, currentIndex + 1);
      if (previousIndex < currentIndex) {
        for (let i = previousIndex + 1; i <= currentIndex; i += 1) {
          console.log(tasks[i].textContent, i); //tasks[i] order = i
        }
      } else {
        for (let i = currentIndex; i < previousIndex; i += 1) {
          console.log(tasks[i].textContent, i + 2); // tasks[i] order = i + 2
        }
      }
    }
  }

  isAddTitleModeOn = false;

  isAddTaskModeOn = false;

  @ViewChild('taskInput', { static: false }) taskInput!: ElementRef;

  onTaskAdded(task: string) {
    if (task.length != 0) {
      this.column.tasks?.push(task);
      this.taskInput.nativeElement.value = '';
      this.isAddTaskModeOn = !this.isAddTaskModeOn;
    }
  }

  onChangeTitle(value: string) {
    if (value.length != 0) {
      this.column.title = value;
      this.isAddTitleModeOn = !this.isAddTitleModeOn;
    }
  }

  onTaskEdit() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    // здесь получаем данные из store для кликнутой задачи и
    // заполняем их в data

    dialogConfig.data = {
      title: 'Default task',
      description: 'Default description',
      userId: 'null'
    };

    const dialogRef = this.dialog.open(EditTaskComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Здесь сохраняем данные
        console.log('new task data', result);
      }
    });
  }

  onDeleteColumn() {
    console.log(this.columnId, this.boardId);
    this.boardsService.deleteColumn(this.boardId, this.columnId);
  }
}
