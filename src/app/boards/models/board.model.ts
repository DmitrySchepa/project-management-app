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
  tasks: string[];
}

export interface BoardTask {
  title: string;
  id: string;
}

export interface Participant {
  name: string;
  email: string;
}
