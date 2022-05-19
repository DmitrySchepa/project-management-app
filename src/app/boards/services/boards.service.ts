import { Injectable, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import {
  createBoard,
  createColumn,
  createTask,
  deleteBoard,
  deleteColumn,
  editBoard,
  editColumn,
  editTask,
  getBoards,
  getColumns, insertTask,
  reorderColumn,
  reorderTask, reorderTasks,
} from 'src/app/state/actions/boards.actions';
import { BoardColumn, BoardData, BoardTask, CreateTask } from '../models/board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  boardData!: BoardData;

  isEditModeOn$ = new BehaviorSubject<boolean>(true);

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

  deleteColumn(boardId: string, columnId: string, order: number) {
    this.store.dispatch(deleteColumn({ boardId, columnId, order }));
  }

  createTask(boardId: string, columnId: string, task: CreateTask) {
    this.store.dispatch(createTask({ boardId, columnId, task }));
  }

  editTask(task: BoardTask) {
    this.store.dispatch(editTask({ task }));
  }

  reorderTask(task: BoardTask, last: boolean = false) {
    this.store.dispatch(reorderTask({ task, last }));
  }

  reorderTasks(columnId: string, index: number, boardId: string) {
    this.store.dispatch(reorderTasks({columnId, index, boardId}))
  }

  insertTask(boardId: string, columnId: string, task: CreateTask) {
    this.store.dispatch(insertTask({boardId, columnId, task}))
  }
}
