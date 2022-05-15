import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardColumn, BoardModel } from '../../models/board.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import { selectBoards } from 'src/app/state/selectors/boards.selectors';
import { BoardsService } from '../../services/boards.service';
import { getColumns } from 'src/app/state/actions/boards.actions';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit {
  public boardId!: string;

  columsLength: number = 0;

  columns: BoardColumn[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store,
    private readonly boardsService: BoardsService,
  ) {}

  ngOnInit() {
    this.boardId = this.route.snapshot.params['id'];
    this.store.dispatch(getColumns({ boardId: this.boardId }));
    this.store.select(selectBoards).subscribe((boards) => {
      const columns = boards.find((board) => board.id === this.boardId)?.columns as BoardColumn[];
      this.columns = [...columns];
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    this.updateColumns(event);
  }

  updateColumns(event: CdkDragDrop<string[]>) {
    const { previousIndex, currentIndex, item, container } = event;
    const columnId = item.element.nativeElement.dataset['id'];
    const columns = (Array.from(container.element.nativeElement.children) as HTMLElement[]).filter(
      (item) => item.tagName !== 'BUTTON',
    );
    if (previousIndex < currentIndex) {
      for (let i = previousIndex + 1; i <= currentIndex; i += 1) {
        console.log(columns[i], i); //tasks[i] order = i
      }
    } else {
      for (let i = currentIndex; i < previousIndex; i += 1) {
        console.log(columns[i], i + 2); // tasks[i] order = i + 2
      }
    }
  }

  onAddColumn() {
    const column = {
      title: 'New column',
      order: this.columns.length + 1,
    };
    this.boardsService.createColumn(column.title, column.order, this.boardId);
  }

  onDeleteColumn() {
    this.boardsService.deleteColumn(this.boardId, '');
  }
}
