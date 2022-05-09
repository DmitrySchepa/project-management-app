import { createAction, props } from '@ngrx/store';
import { BoardModel } from '../../boards/models/board.model';

export const getBoards = createAction('[Boards] Get boards');
export const getBoardsSuccess = createAction(
  '[Boards] Get boards successfully',
  props<{ boards: BoardModel[] }>(),
);
export const createBoard = createAction('[Boards] Create a board');
export const createBoardSuccess = createAction(
  '[Boards] Create a board successfully',
  props<{ board: BoardModel }>(),
);
export const deleteBoard = createAction('[Boards] Delete a board', props<{ id: string }>());
export const getCurrentBoard = createAction(
  '[Boards] Get current board',
  props<{ boardId: string }>(),
);
