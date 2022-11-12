import React from 'react';
import { Movie } from '../../models/movies';

interface Props {
  movie: Movie | undefined;
  setMovie: React.Dispatch<React.SetStateAction<Movie | undefined>>;
}

export default function InputSearch({ movie, setMovie }: Props) {
  return (
    <input
      className="rounded-2xl border w-full p-3 border-black dark:border-white"
      type="text"
      value={movie?.title}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMovie({ title: e.target.value })}
      placeholder="Enter movie"
    />
  );
}
