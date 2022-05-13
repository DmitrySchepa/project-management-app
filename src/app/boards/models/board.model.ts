export interface BoardModel {
  id: string;
  title: string;
  participants?: Participant[];
  columns: BoardColumn[];
}

export interface BoardColumn {
  id: string;
  title: string;
  order: number;
  tasks: string[];
}

export interface Participant {
  name: string;
  email: string;
}
