import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  createBoard,
  createColumn,
  deleteBoard,
  deleteColumn,
  getBoards,
  getColumns,
} from 'src/app/state/actions/boards.actions';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  boardTitle: string = '';

  constructor(private readonly store: Store) {}

  getBoards() {
    this.store.dispatch(getBoards());
  }

  createBoard(title: string) {
    title = this.boardTitle;
    this.store.dispatch(createBoard({ title }));
  }

  deleteBoard(boardId: string) {
    this.store.dispatch(deleteBoard({ id: boardId }));
  }

  getColumns(boardId: string) {
    this.store.dispatch(getColumns({ boardId }));
  }

  getColumn() {}

  createColumn(title: string, order: number, boardId: string) {
    this.store.dispatch(createColumn({ title, order, boardId }));
  }

  deleteColumn(boardId: string, columnId: string) {
    this.store.dispatch(deleteColumn({ boardId, columnId }));
  }

  updateColumn() {}

  getTasks() {}

  getTask() {}

  updateTask() {}

  deleteTask() {}
}
