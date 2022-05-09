import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, switchMapTo } from 'rxjs/operators';
import { BoardModel } from 'src/app/boards/models/board.model';
import { ApiService } from 'src/app/core/services/api.service';
import {
  createBoard,
  createBoardSuccess,
  deleteBoard,
  deleteBoardSuccess,
  getBoards,
  getBoardsSuccess,
} from '../actions/boards.actions';
import { tokenOutdated } from '../actions/user.actions';

@Injectable()
export class BoardsEffects {
  constructor(private actions$: Actions, private readonly apiService: ApiService) {}

  getBoards$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getBoards),
      switchMapTo(
        this.apiService.getBoards().pipe(
          map((boards: BoardModel[]) => getBoardsSuccess({ boards })),
          catchError((err) => {
            if (err.error.statusCode === 401) return of(tokenOutdated());
            return of(err);
          }),
        ),
      ),
    );
  });

  createBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createBoardSuccess),
      switchMap(({ board }) => {
        return this.apiService.createBoard(board.title).pipe(map(() => createBoard()));
      }),
    );
  });

  deleteBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteBoard),
      switchMap(({ id }) => {
        return this.apiService.deleteBoard(id).pipe(map(() => deleteBoardSuccess()));
      }),
    );
  });
}
