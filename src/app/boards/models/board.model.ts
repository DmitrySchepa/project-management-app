export interface BoardData {
  title: string;
  description: string;
}

export interface BoardModel extends BoardData {
  id: string;
  participants?: Participant[];
  columns: BoardColumn[];
}

export interface BoardColumn {
  id: string;
  title: string;
  order: number;
  tasks: BoardTask[];
}

export interface BoardTask {
  title: string;
  id: string;
  done: boolean;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

export interface CreateTask {
  title: string;
  description: string;
  done: boolean;
  order: number;
  userId: string;
}

export interface Participant {
  name: string;
  email: string;
}
