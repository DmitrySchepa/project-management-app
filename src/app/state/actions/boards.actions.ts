import { createAction, props } from '@ngrx/store';
import { BoardColumn, BoardModel, BoardData } from '../../boards/models/board.model';

export const getBoards = createAction('[Boards] Get boards');
export const getBoardsSuccess = createAction(
  '[Boards] Get boards successfully',
  props<{ boards: BoardModel[] }>(),
);
export const createBoard = createAction('[Boards] Create a board', props<{ data: BoardData }>());
export const createBoardSuccess = createAction(
  '[Boards] Create a board successfully',
  props<{ board: BoardModel }>(),
);
export const editBoard = createAction(
  '[Boards] Edit a board',
  props<{ data: BoardData; boardId: string }>(),
);
export const editBoardSuccess = createAction(
  '[Boards] Edit a board success',
  props<{ board: BoardModel }>(),
);
export const deleteBoard = createAction('[Boards] Delete a board', props<{ id: string }>());
export const deleteBoardSuccess = createAction('[Boards] Delete a board success');
// columns
export const getColumns = createAction('[Boards] Get columns', props<{ boardId: string }>());
export const getColumnsSuccess = createAction(
  '[Boards] Get columns success',
  props<{ columns: BoardColumn[]; boardId: string }>(),
);
export const editColumn = createAction(
  '[Boards] Edit column',
  props<{ column: BoardColumn; boardId: string }>(),
);
export const editColumnSuccess = createAction(
  '[Boards] Edit column success',
  props<{ column: BoardColumn; boardId: string }>(),
);
export const getColumn = createAction(
  '[Boards] Get column',
  props<{ boardId: string; columnId: string }>(),
);
export const getColumnSuccess = createAction('[Boards] Get column success');
export const createColumn = createAction(
  '[Boards] Create column',
  props<{ title: string; order: number; boardId: string }>(),
);
export const createColumnSuccess = createAction(
  '[Boards] Create column success',
  props<{ column: BoardColumn; boardId: string }>(),
);
export const deleteColumn = createAction(
  '[Boards] Delete column',
  props<{ boardId: string; columnId: string }>(),
);
export const deleteColumnSuccess = createAction('[Boards] Delete column success');
export const updateColumn = createAction(
  '[Boards] Update column',
  props<{ boardId: string; columnId: string }>(),
);
export const updateColumnSuccess = createAction('[Boards] Update column success');

// tasks
export const getTasks = createAction(
  '[Boards] Get tasks',
  props<{ boardId: string; columnId: string }>(),
);
export const getTasksSuccess = createAction('[Boards] Get tasks success');
export const getTask = createAction(
  '[Boards] Get task',
  props<{ boardId: string; columnId: string; taskId: string }>(),
);
export const getTaskSuccess = createAction('[Boards] Get task success');
export const createTask = createAction(
  '[Boards] Create task',
  props<{ boardId: string; columnId: string; taskId: string }>(),
);
export const createTaskSuccess = createAction('[Boards] Create task success');
export const deleteTask = createAction(
  '[Boards] Delete task',
  props<{ boardId: string; columnId: string; taskId: string }>(),
);
export const deleteTaskSuccess = createAction('[Boards] Delete task success');
export const updateTask = createAction(
  '[Boards] Update task',
  props<{ boardId: string; columnId: string; taskId: string }>(),
);
export const updateTaskSuccess = createAction('[Boards] Update task success');
