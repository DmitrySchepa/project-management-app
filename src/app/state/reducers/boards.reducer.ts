/* eslint-disable @typescript-eslint/no-unused-expressions */
import { createReducer, on } from '@ngrx/store';
import { BoardColumn, BoardModel } from '../../boards/models/board.model';
import {
  createBoardSuccess,
  createColumnSuccess,
  deleteBoard,
  deleteColumn,
  editBoardSuccess,
  getBoardsSuccess,
  getColumnsSuccess,
} from '../actions/boards.actions';

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
  on(editBoardSuccess, (state, { board }): BoardsState => {
    const boardIndex = state.boards.findIndex((item) => item.id === board.id);
    return {
      ...state,
      boards: [...state.boards.slice(0, boardIndex), board, ...state.boards.slice(boardIndex + 1)],
    };
  }),
  on(deleteBoard, (state, { id }): BoardsState => {
    const newBoards = state.boards.filter((board) => board.id != id);
    return {
      ...state,
      boards: newBoards,
    };
  }),
  on(getColumnsSuccess, (state, { columns, boardId }): BoardsState => {
    const currentBoard = state.boards.find(
      (board: BoardModel) => board.id === boardId,
    ) as BoardModel;
    if (currentBoard.columns.length === columns.length) return state;
    const currentBoardIdx = state.boards.findIndex((board) => board.id === boardId);
    return {
      ...state,
      boards: [
        ...state.boards.slice(0, currentBoardIdx),
        { ...currentBoard, columns: [...currentBoard.columns, ...columns] },
        ...state.boards.slice(currentBoardIdx + 1),
      ],
    };
  }),
  on(createColumnSuccess, (state, { column, boardId }) => {
    const currentBoard = state.boards.find(
      (board: BoardModel) => board.id === boardId,
    ) as BoardModel;
    const currentBoardIdx = state.boards.findIndex((board) => board.id === boardId);
    return {
      ...state,
      boards: [
        ...state.boards.slice(0, currentBoardIdx),
        { ...currentBoard, columns: [...currentBoard.columns, column] },
        ...state.boards.slice(currentBoardIdx + 1),
      ],
    };
  }),
  on(deleteColumn, (state, { boardId, columnId }) => {
    const currentBoard = state.boards.find(
      (board: BoardModel) => board.id === boardId,
    ) as BoardModel;
    const currentBoardIdx = state.boards.findIndex((board) => board.id === boardId);
    const currentColumnIdx = currentBoard.columns.findIndex(
      (column: BoardColumn) => column.id === columnId,
    );
    return {
      ...state,
      boards: [
        ...state.boards.slice(0, currentBoardIdx),
        {
          ...currentBoard,
          columns: [
            ...currentBoard.columns.slice(0, currentColumnIdx),
            ...currentBoard.columns.slice(currentColumnIdx + 1),
          ],
        },
        ...state.boards.slice(currentBoardIdx + 1),
      ],
    };
  }),
);
