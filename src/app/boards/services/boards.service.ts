import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createBoardSuccess, deleteBoard, getBoards } from 'src/app/state/actions/boards.actions';

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
    this.store.dispatch(createBoardSuccess({ board: { id: '', title } }));
  }

  deleteBoard(boardId: string) {
    this.store.dispatch(deleteBoard({ id: boardId }));
  }
}
