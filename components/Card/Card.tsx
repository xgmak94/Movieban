import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { Movie } from '../../models/movies';
import MovieInfoModal from './Modal/MovieInfoModal';
import Button from '@mui/material/Button';
import { ListItem } from '@mui/material';

interface Props {
  movie: Movie;
  index: number;
  column: Movie[];
  setColumn: React.Dispatch<React.SetStateAction<Movie[]>>;
}

export default function Card({ movie, index, column, setColumn }: Props) {
  const [modal, setModal] = useState(false);

  function deleteMovie(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    setColumn((prev: Movie[]) => {
      return [...prev.slice(0, index), ...prev.slice(index + 1)];
    });
  }

  return (
    <>
      {modal &&
        createPortal(
          <MovieInfoModal movie={movie} index={index} setModal={setModal} />,
          document.querySelector<HTMLElement>('#portal')!
        )}
      <ListItem
        className="flex flex-row justify-between rounded-lg text-black dark:text-white bg-blue-300 w-full p-3 transition hover:scale-105 hover:shadow-lg items-center"
        onClick={() => setModal((prev) => !prev)}
      >
        <div className="flex flex-start font-medium">{movie.title}</div>
        <Button
          variant="contained"
          className="text-lg p-1 rounded-lg border border-black dark:border-white text-black dark:text-white
          bg-blue-400 hover:scale-110"
          onClick={(e) => deleteMovie(e)}
        >
          <DeleteForeverOutlinedIcon />
        </Button>
      </ListItem>
    </>
  );
}
