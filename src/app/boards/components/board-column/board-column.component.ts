import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BoardColumn } from '../../models/board.model';

@Component({
  selector: 'app-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.scss'],
})
export class BoardColumnComponent implements OnInit {
  @Input() column!: BoardColumn;

  constructor() {}

  ngOnInit(): void {}

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

  @ViewChild('taskInput') taskInput!: ElementRef;

  onTaskAdded(task: string) {
    if (task.length != 0) {
      this.column.tasks.push(task);
      this.taskInput.nativeElement.value = '';
    }
  }

  onChangeTitle(value: string) {
    if (value.length != 0) {
      this.column.columnTitle = value;
      this.isAddTitleModeOn = !this.isAddTitleModeOn;
    }
  }
}
