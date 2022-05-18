import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatAll, concatMap, of, take } from 'rxjs';
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
  getTasksSuccess,
  createTask,
  createTaskSuccess,
  deleteTask,
  deleteTaskSuccess,
  editTask,
  editTaskSuccess,
  reorderTaskSuccess,
  reorderTask,
} from '../actions/boards.actions';
import { tokenOutdated } from '../actions/user.actions';
import { Store } from '@ngrx/store';
import { selectBoardColumns, selectTasks } from '../selectors/boards.selectors';

@Injectable()
export class BoardsEffects {
  constructor(
    private actions$: Actions,
    private readonly apiService: ApiService,
    private readonly store: Store,
  ) {}

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
            columns = columns.map((column) => ({ ...column, tasks: [] }));
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
            return createColumnSuccess({ column: { ...column, tasks: [] }, boardId });
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
      concatMap(({ boardId, columnId, order }) => {
        return this.apiService
          .deleteColumn(boardId, columnId)
          .pipe(map(() => deleteColumnSuccess({ boardId, order })));
      }),
    );
  });

  reorderColumns$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteColumnSuccess),
      concatMap(({ boardId, order }) =>
        this.store.select(selectBoardColumns(boardId)).pipe(
          map((columns) => columns.slice(order - 1)),
          take(1),
          concatAll(),
          concatMap((column) => {
            return this.apiService
              .editColumn(boardId, { ...column, order: column.order - 1 })
              .pipe(map((editedColumn) => editColumnSuccess({ column: editedColumn, boardId })));
          }),
        ),
      ),
    );
  });

  getTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getColumnsSuccess),
      concatMap(({ boardId, columns }) =>
        of(columns).pipe(
          take(1),
          concatAll(),
          concatMap((column) => {
            return this.apiService.getTasks(boardId, column.id).pipe(
              map((tasks) => {
                tasks.sort((a, b) => a.order - b.order);
                return getTasksSuccess({ boardId, columnId: column.id, tasks });
              }),
            );
          }),
        ),
      ),
    );
  });

  createTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createTask),
      concatMap(({ boardId, columnId, task }) =>
        this.apiService
          .createTask(boardId, columnId, task)
          .pipe(map((newTask) => createTaskSuccess({ task: newTask }))),
      ),
    );
  });

  editTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(editTask),
      concatMap(({ task }) =>
        this.apiService
          .editTask(task)
          .pipe(map((editedTask) => editTaskSuccess({ task: editedTask }))),
      ),
    );
  });

  reorderTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteTaskSuccess),
      concatMap(({ task }) =>
        this.store.select(selectTasks(task.boardId, task.columnId)).pipe(
          map((tasks) => tasks.slice(task.order - 1)),
          take(1),
          concatAll(),
          concatMap((currentTask) => {
            return this.apiService
              .editTask({ ...currentTask, order: currentTask.order - 1 })
              .pipe(map((editedTask) => editTaskSuccess({ task: editedTask })));
          }),
        ),
      ),
    );
  });

  reorderTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(reorderTask),
      concatMap(({ task, last }) => {
        return this.apiService
          .editTask(task)
          .pipe(map((reorderedTask) => reorderTaskSuccess({ task: reorderedTask, last })));
      }),
    );
  });

  deleteTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteTask),
      concatMap(({ task }) => {
        return this.apiService.deleteTask(task).pipe(map(() => deleteTaskSuccess({ task })));
      }),
    );
  });
}
