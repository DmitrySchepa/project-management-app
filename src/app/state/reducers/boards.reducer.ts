import { createReducer, on } from '@ngrx/store';
import { BoardModel } from '../../boards/models/board.model';
import { createBoardSuccess, deleteBoard, getBoardsSuccess } from '../actions/boards.actions';

export interface BoardsState {
  boards: BoardModel[];
}

export const InitialBoardsState: BoardsState = {
  boards: [],
};

export const BoardsReducer = createReducer(
  InitialBoardsState,
  on(getBoardsSuccess, (state, { boards }): BoardsState => {
    return {
      ...state,
      boards,
    };
  }),
  on(createBoardSuccess, (state, { board }): BoardsState => {
    const newBoards = [...state.boards.concat(board)];
    return {
      ...state,
      boards: newBoards,
    };
  }),
  on(deleteBoard, (state, { id }): BoardsState => {
    const newBoards = state.boards.filter((board) => board.id != id);
    return {
      ...state,
      boards: newBoards,
    };
  }),
);
