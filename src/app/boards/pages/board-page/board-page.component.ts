import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardColumn, BoardModel } from '../../models/board.model';
import { boardsMock } from 'src/mocks/board-model.mock';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit {
  public boardId!: string;

  columns: BoardColumn[] = [];

  boards: BoardModel[] = boardsMock;

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit() {
    this.boardId = this.route.snapshot.params['id'];
    this.boards.forEach((elem: BoardModel) => {
      this.columns = elem.columns as BoardColumn[];
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }

  dropList(event: CdkDragDrop<string[]>) {
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

  onAddColumn() {
    this.columns?.push({ columnTitle: 'New column', tasks: [] });
  }
}
