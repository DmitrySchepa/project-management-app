import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardColumn } from '../../models/board.model';
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

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  isAddTitleModeOn = false;

  @ViewChild('taskInput', { static: false }) taskInput!: ElementRef;

  onTaskAdded() {
    this.boardsService.isEditModeOn$.next(false);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    // здесь получаем данные из store для кликнутой задачи и
    // заполняем их в data

    dialogConfig.data = {
      title: 'Your title',
      description: 'Description',
      userId: 'null',
    };

    const dialogRef = this.dialog.open(EditTaskComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Здесь сохраняем данные
        console.log('new task data', result);
      }
    });
  }

  onChangeTitle(value: string) {
    if (value.length != 0) {
      this.column.title = value;
      this.isAddTitleModeOn = !this.isAddTitleModeOn;
    }
  }

  onTaskEdit() {
    this.boardsService.isEditModeOn$.next(true);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    // здесь получаем данные из store для кликнутой задачи и
    // заполняем их в data

    dialogConfig.data = {
      title: 'Default title',
      description: 'Default description',
      userId: 'null',
    };

    const dialogRef = this.dialog.open(EditTaskComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
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
