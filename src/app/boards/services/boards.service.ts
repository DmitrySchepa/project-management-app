import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../auth/services/auth.service';
import { Store } from '@ngrx/store';
import {
  createBoardSuccess,
  getBoardsSuccess,
  deleteBoard,
} from 'src/app/state/actions/boards.actions';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  boardTitle: string = '';

  constructor(
    private readonly apiService: ApiService,
    private readonly authService: AuthService,
    private readonly store: Store,
  ) {}

  getBoards() {
    this.apiService.getBoards().subscribe({
      next: (boards) => {
        console.log(boards);
        return this.store.dispatch(getBoardsSuccess({ boards }));
      },
      error: () => {
        this.authService.logout();
      },
    });
  }

  createBoard(title: string) {
    this.apiService.createBoard(title).subscribe({
      next: (board: any) =>
        this.store.dispatch(createBoardSuccess({ board: { id: board.id, title: board.title } })),
      error: (error) => {
        // TODO: imlement error
        // this.authService.logout();
        console.log(error);
      },
    });
  }

  deleteBoard(boardId: string) {
    this.apiService.deleteBoard(boardId).subscribe({
      next: (board: any) => this.store.dispatch(deleteBoard({ id: board.id })),
      error: (error) => {
        // TODO: imlement error
        // this.authService.logout();
        console.log(error);
      },
    });
  }
}
