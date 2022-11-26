import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { Movie } from '../../models/movies';
import MovieInfoModal from './Modal/MovieInfoModal';
import Button from '@mui/material/Button';
import { motion } from 'framer-motion';

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
      <motion.div
        className="flex flex-row justify-between rounded-md text-black dark:text-white bg-blue-300 w-full p-3 m-3 gap-3 transition hover:scale-105 hover:shadow-lg items-center py-5"
        onClick={() => setModal((prev) => !prev)}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        transition={{
          duration: 2,
        }}
      >
        <div className="flex flex-start font-medium">{movie.title}</div>
        <Button
          variant="contained"
          className="text-lg p-1 rounded-lg border border-black dark:border-white text-black dark:text-white
          bg-blue-400 hover:scale-110"
          onClick={(e) => deleteMovie(e)}
        >
          <AiFillDelete />
        </Button>
      </motion.div>
    </>
  );
}
