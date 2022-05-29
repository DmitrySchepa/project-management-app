import { createReducer, on } from '@ngrx/store';
import { BoardColumn, BoardModel, BoardTask } from '../../boards/models/board.model';
import {
  createBoardSuccess,
  createColumnSuccess,
  createTaskSuccess,
  deleteBoard,
  deleteColumn,
  deleteTaskSuccess,
  editBoardSuccess,
  editColumnSuccess,
  editTaskSuccess,
  getBoardsSuccess,
  getColumnsSuccess,
  getTasksSuccess,
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
      boards: [
        ...state.boards.slice(0, boardIndex),
        { ...state.boards[boardIndex], title: board.title, description: board.description },
        ...state.boards.slice(boardIndex + 1),
      ],
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
  on(editColumnSuccess, (state, { column, boardId }) => {
    const currentBoard = state.boards.find(
      (board: BoardModel) => board.id === boardId,
    ) as BoardModel;
    const currentBoardIdx = state.boards.findIndex((board) => board.id === boardId);
    const currentColumn = currentBoard.columns.find((col) => col.id === column.id) as BoardColumn;
    const currentColumnIdx = currentBoard.columns.findIndex((col) => col.id === column.id);
    return {
      ...state,
      boards: [
        ...state.boards.slice(0, currentBoardIdx),
        {
          ...currentBoard,
          columns: [
            ...currentBoard.columns.slice(0, currentColumnIdx),
            {
              ...currentColumn,
              title: column.title,
              order: column.order,
            },
            ...currentBoard.columns.slice(currentColumnIdx + 1),
          ],
        },
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
  on(getTasksSuccess, (state, { boardId, columnId, tasks }) => {
    const currentBoard = state.boards.find((board) => board.id === boardId) as BoardModel;
    const currentBoardIdx = state.boards.findIndex((board) => board.id === boardId);
    const currentColumn = currentBoard.columns.find(
      (column) => column.id === columnId,
    ) as BoardColumn;
    const currentColumnIdx = currentColumn.order - 1;
    return {
      ...state,
      boards: [
        ...state.boards.slice(0, currentBoardIdx),
        {
          ...currentBoard,
          columns: [
            ...currentBoard.columns.slice(0, currentColumnIdx),
            {
              ...currentColumn,
              tasks: [...tasks],
            },
            ...currentBoard.columns.slice(currentColumnIdx + 1),
          ],
        },
        ...state.boards.slice(currentBoardIdx + 1),
      ],
    };
  }),
  on(createTaskSuccess, (state, { task }) => {
    const currentBoard = state.boards.find((board) => board.id === task.boardId) as BoardModel;
    const currentBoardIdx = state.boards.findIndex((board) => board.id === task.boardId);
    const currentColumn = currentBoard.columns.find(
      (column) => column.id === task.columnId,
    ) as BoardColumn;
    const currentColumnIdx = currentColumn.order - 1;
    return {
      ...state,
      boards: [
        ...state.boards.slice(0, currentBoardIdx),
        {
          ...currentBoard,
          columns: [
            ...currentBoard.columns.slice(0, currentColumnIdx),
            {
              ...currentColumn,
              tasks: [...currentColumn.tasks, task],
            },
            ...currentBoard.columns.slice(currentColumnIdx + 1),
          ],
        },
        ...state.boards.slice(currentBoardIdx + 1),
      ],
    };
  }),
  on(editTaskSuccess, (state, { task }) => {
    const currentBoard = state.boards.find((board) => board.id === task.boardId) as BoardModel;
    const currentBoardIdx = state.boards.findIndex((board) => board.id === task.boardId);
    const currentColumn = currentBoard.columns.find(
      (column) => column.id === task.columnId,
    ) as BoardColumn;
    const currentColumnIdx = currentColumn.order - 1;
    const currentTask = currentColumn.tasks.find(
      (storeTask) => storeTask.id === task.id,
    ) as BoardTask;
    const currentTaskIdx = currentColumn.tasks.findIndex((storeTask) => storeTask.id === task.id);
    return {
      ...state,
      boards: [
        ...state.boards.slice(0, currentBoardIdx),
        {
          ...currentBoard,
          columns: [
            ...currentBoard.columns.slice(0, currentColumnIdx),
            {
              ...currentColumn,
              tasks: [
                ...currentColumn.tasks.slice(0, currentTaskIdx),
                {
                  ...currentTask,
                  ...task,
                },
                ...currentColumn.tasks.slice(currentTaskIdx + 1),
              ],
            },
            ...currentBoard.columns.slice(currentColumnIdx + 1),
          ],
        },
        ...state.boards.slice(currentBoardIdx + 1),
      ],
    };
  }),
  on(deleteTaskSuccess, (state, { task }) => {
    const currentBoard = state.boards.find((board) => board.id === task.boardId) as BoardModel;
    const currentBoardIdx = state.boards.findIndex((board) => board.id === task.boardId);
    const currentColumn = currentBoard.columns.find(
      (column) => column.id === task.columnId,
    ) as BoardColumn;
    const currentColumnIdx = currentColumn.order - 1;
    return {
      ...state,
      boards: [
        ...state.boards.slice(0, currentBoardIdx),
        {
          ...currentBoard,
          columns: [
            ...currentBoard.columns.slice(0, currentColumnIdx),
            {
              ...currentColumn,
              tasks: [
                ...currentColumn.tasks.slice(0, task.order - 1),
                ...currentColumn.tasks.slice(task.order),
              ],
            },
            ...currentBoard.columns.slice(currentColumnIdx + 1),
          ],
        },
        ...state.boards.slice(currentBoardIdx + 1),
      ],
    };
  }),
);
