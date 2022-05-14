import { Injectable, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { createBoardSuccess, getBoards } from 'src/app/state/actions/boards.actions';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  boardTitle: string = '';

  @Output() openDialogEvent = new EventEmitter();

  constructor(private readonly store: Store) {}

  getBoards() {
    this.store.dispatch(getBoards());
  }

  createBoard(title: string) {
    title = this.boardTitle;
    this.store.dispatch(createBoardSuccess({ board: { id: '', title } }));
  }

  openCreateBoardDialog() {
    this.openDialogEvent.emit('');
  }
}
