export interface Movie {
  id: string;
  name: string;
  status: List;
}

export enum List {
  Backlog = 'Backlog',
  Watching = 'Watching',
  Watched = 'Watched',
}
