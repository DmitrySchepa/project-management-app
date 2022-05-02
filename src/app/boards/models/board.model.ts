export interface BoardModel {
  id: string;
  title: string;
  participants?: Participant[];
  columns?: BoardColumn[];
}

export interface BoardColumn {
  columnTitle: string;
  tasks: string[];
}

export interface Participant {
  name: string;
  email: string;
}
