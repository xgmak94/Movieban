import React from 'react';
import { Movie } from '../../models/movies';

interface Props {
  name: Movie;
  setName: React.Dispatch<React.SetStateAction<Movie | undefined>>;
}

export default function InputSearch({ name, setName }: Props) {
  return (
    <input
      className="rounded-2xl border w-full p-3 border-black dark:border-white"
      type="text"
      value={name?.title}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName({ title: e.target.value })}
      placeholder="Enter movie"
    />
  );
}
