import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardsState } from '../reducers/boards.reducer';
import { BoardColumn, BoardTask } from '../../boards/models/board.model';

export const selectBoardsState = createFeatureSelector<BoardsState>('boards');

export const selectBoards = createSelector(selectBoardsState, (state: BoardsState) => state.boards);
export const selectBoardColumns = (boardId: string) =>
  createSelector(
    selectBoardsState,
    (state: BoardsState) =>
      state.boards.find((board) => board.id === boardId)?.columns as BoardColumn[],
  );
export const selectTasks = (boardId: string, columnId: string) =>
  createSelector(
    selectBoardColumns(boardId),
    (columns) => columns?.find((column) => column.id === columnId)?.tasks as BoardTask[],
  );
