import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardsState } from '../reducers/boards.reducer';

export const selectBoardsState = createFeatureSelector<BoardsState>('boards');

export const selectBoards = createSelector(selectBoardsState, (state: BoardsState) => state.boards);
export const selectBoardColumns = (boardId: string) =>
  createSelector(
    selectBoardsState,
    (state: BoardsState) => state.boards.find((board) => board.id === boardId)?.columns,
  );
