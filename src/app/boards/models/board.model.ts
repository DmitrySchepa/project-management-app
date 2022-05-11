export interface BoardModel {
  id: string;
  title: string;
  participants?: Participant[];
  columns?: BoardColumn[];
}

export interface BoardColumn {
  columnTitle: string;
  tasks: BoardTask[];
  id: string;
}

export interface BoardTask {
  title: string;
  id: string;
}

export interface Participant {
  name: string;
  email: string;
}
