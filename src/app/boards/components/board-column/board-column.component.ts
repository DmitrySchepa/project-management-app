import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BoardColumn, BoardTask } from '../../models/board.model';

@Component({
  selector: 'app-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.scss'],
})
export class BoardColumnComponent implements OnInit {
  @Input() column!: BoardColumn;

  constructor() {}

  ngOnInit(): void {}

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
      //action: removeTask
      console.log('prev:');
      Array.from(previousContainer.element.nativeElement.children)
        .filter((child) => !child.classList.contains('cdk-drag-dragging'))
        .forEach((child, index) => {
          if (index >= previousIndex) {
            const id = (child as HTMLElement).dataset['id'];
            console.log(index + 1, id, child.textContent); //Reorder task in prevColumn
          }
        });
      //action: addTask (colId, taskId, order = curentIdx + 1)
      console.log('curr:');
      Array.from(container.element.nativeElement.children).forEach((child, index) => {
        const id = (child as HTMLElement).dataset['id'];
        if (index >= currentIndex) {
          console.log(index + 2, id, child.textContent); //reorder task in currColumn
        }
      });
    } else {
      const tasks = Array.from(container.element.nativeElement.children) as HTMLElement[];
      console.log(tasks[previousIndex].textContent, 'new order', currentIndex + 1);
      console.log(tasks[currentIndex].textContent, 'new order', previousIndex + 1);
      //tasks[previosIndex] order = currentIndex + 1
      //tasks[currentIndex] order = previousIndex + 1
    }
  }

  isAddTitleModeOn = false;

  isAddTaskModeOn = false;

  @ViewChild('taskInput', { static: false })
  set taskInput(element: ElementRef<HTMLInputElement>) {
    if (element) {
      element.nativeElement.focus();
    }
  }

  onTaskAdded(task: string) {
    if (task.length != 0) {
      this.column.tasks.push({ title: task, id: '5' });
      this.taskInput.nativeElement.value = '';
      this.isAddTaskModeOn = !this.isAddTaskModeOn;
    }
  }

  onChangeTitle(value: string) {
    if (value.length != 0) {
      this.column.columnTitle = value;
      this.isAddTitleModeOn = !this.isAddTitleModeOn;
    }
  }
}
