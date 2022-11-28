import React, { useState } from 'react';
import { List, Movie } from '../../models/movies';
import ListButton from './ListButton';
import Search from './Search';
import Button from '@mui/material/Button';

interface props {
  movie: Movie | undefined;
  setMovie: React.Dispatch<React.SetStateAction<Movie | undefined>>;
  addToLists: Function;
}

export default function Input({ movie, setMovie, addToLists }: props) {
  const [list, setList] = useState<String>(List.Backlog);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addToLists(list);
  }

  return (
    <div className="flex flex-col">
      <form className="flex justify-center items-center" onSubmit={handleSubmit}>
        <div className="w-full">
          <Search movie={movie} setMovie={setMovie} />
        </div>
        <div className="w-full">
          <ListButton list={list} setList={setList} />
        </div>
        <div>
          <Button
            className="bg-blue-600 dark:bg-blue-300 text-black dark:text-white font-semibold rounded-lg p-3"
            variant="contained"
            type="submit"
          >
            Add
          </Button>
        </div>
      </form>
    </div>
  );
}
