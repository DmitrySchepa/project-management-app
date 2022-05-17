import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, switchMapTo } from 'rxjs/operators';
import { BoardModel } from 'src/app/boards/models/board.model';
import { ApiService } from 'src/app/core/services/api.service';
import {
  createBoard,
  createBoardSuccess,
  deleteBoard,
  deleteBoardSuccess,
  getBoards,
  getBoardsSuccess,
  createColumn,
  createColumnSuccess,
  getColumns,
  getColumnsSuccess,
  deleteColumn,
  deleteColumnSuccess,
  editBoard,
  editBoardSuccess,
  editColumn,
  editColumnSuccess,
  reorderColumn,
  reorderColumnSuccess,
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
          map((boards) =>
            boards.map((item) => {
              return { ...item, columns: [] };
            }),
          ),
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
      ofType(createBoard),
      switchMap(({ data }) => {
        return this.apiService
          .createBoard(data)
          .pipe(map((board) => createBoardSuccess({ board: { ...board, columns: [] } })));
      }),
    );
  });

  editBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(editBoard),
      switchMap(({ data, boardId }) =>
        this.apiService.editBoard(data, boardId).pipe(map((board) => editBoardSuccess({ board }))),
      ),
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

  getColumns$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getColumns),
      switchMap(({ boardId }) => {
        return this.apiService.getColumns(boardId).pipe(
          map((columns) => {
            columns.sort((a, b) => a.order - b.order);
            return getColumnsSuccess({ columns, boardId });
          }),
        );
      }),
    );
  });

  createColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createColumn),
      mergeMap(({ title, order, boardId }) => {
        return this.apiService.createColumn(boardId, { title, order }).pipe(
          map((column) => {
            return createColumnSuccess({ column, boardId });
          }),
        );
      }),
    );
  });

  editColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(editColumn),
      concatMap(({ boardId, column }) =>
        this.apiService.editColumn(boardId, column).pipe(
          map((editedColumn) => {
            return editColumnSuccess({ column: editedColumn, boardId });
          }),
        ),
      ),
    );
  });

  reorderColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(reorderColumn),
      concatMap(({ boardId, column, last }) =>
        this.apiService
          .editColumn(boardId, column)
          .pipe(
            map((editedColumn) => reorderColumnSuccess({ column: editedColumn, boardId, last })),
          ),
      ),
    );
  });

  deleteColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteColumn),
      concatMap(({ boardId, columnId }) => {
        return this.apiService
          .deleteColumn(boardId, columnId)
          .pipe(map(() => deleteColumnSuccess()));
      }),
    );
  });
}
