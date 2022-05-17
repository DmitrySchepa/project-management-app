import { Injectable, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  createBoard,
  createColumn,
  deleteBoard,
  deleteColumn,
  editBoard,
  editColumn,
  getBoards,
  getColumns,
  reorderColumn,
} from 'src/app/state/actions/boards.actions';
import { BoardColumn, BoardData } from '../models/board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  boardData!: BoardData;

  @Output() openDialogEvent = new EventEmitter<string[]>();

  constructor(private readonly store: Store) {}

  openBoardDialog(type: string, id: string = '') {
    this.openDialogEvent.emit([type, id]);
  }

  getBoards() {
    this.store.dispatch(getBoards());
  }

  createBoard(data: BoardData) {
    this.store.dispatch(createBoard({ data }));
  }

  editBoard(boardId: string) {
    this.store.dispatch(editBoard({ data: this.boardData, boardId }));
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

  editColumn(column: BoardColumn, boardId: string) {
    this.store.dispatch(editColumn({ column, boardId }));
  }

  reorderColumn(column: BoardColumn, boardId: string, last: boolean = false) {
    this.store.dispatch(reorderColumn({ column, boardId, last }));
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
