import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.scss'],
})
export class BoardColumnComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  columnTitle = 'todo';

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

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
      this.todo.push(task);
      this.taskInput.nativeElement.value = '';
    }
  }

  onChangeTitle(value: string) {
    this.columnTitle = value;
    this.isAddTitleModeOn = false;
  }
}
