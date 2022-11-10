export interface Movie {
  id: string;
  movie_id?: number;
  name: string;
  status: List;
  rating?: number;
}

export enum List {
  Backlog = 'Backlog',
  Watching = 'Watching',
  Watched = 'Watched',
}

export interface MovieData {
  adult: boolean;
  genre_ids: number[];
  id: number;
  original_language: string;
  originial_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: false;
  vote_average: number;
  vote_count: number;
}