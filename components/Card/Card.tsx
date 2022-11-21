import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { Movie } from '../../models/movies';
import MovieInfoModal from './Modal/MovieInfoModal';
import { Button } from '@material-tailwind/react';

interface props {
  movie: Movie;
  index: number;
  column: Movie[];
  setColumn: React.Dispatch<React.SetStateAction<Movie[]>>;
}

export default function Card({ movie, index, column, setColumn }: props) {
  const [edit, setEdit] = useState<boolean>(false);
  const [editInfo, setEditInfo] = useState<string>(movie.title);
  const [modal, setModal] = useState(false);

  function editMovie(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    setColumn((prev: Movie[]) => {
      let clone = Array.from(prev);
      let item: Movie = clone[index];
      item.title = editInfo;

      return [...clone.slice(0, index), item, ...clone.slice(index + 1)];
    });

    setEdit((prev) => !prev);
  }

  function deleteMovie(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    setColumn((prev: Movie[]) => {
      return [...prev.slice(0, index), ...prev.slice(index + 1)];
    });
  }

  function handleEditText(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    setEditInfo(e.target.value);
  }

  return (
    <>
      {modal &&
        createPortal(
          <MovieInfoModal movie={movie} index={index} setModal={setModal} />,
          document.querySelector<HTMLElement>('#portal')!
        )}
      <Button
        className="flex flex-row justify-between rounded-md text-black dark:text-white bg-blue-300 dark:bg-blue-gray-500 w-full p-3 m-3 gap-3 transition hover:scale-105 hover:shadow-lg items-center py-5"
        onClick={() => setModal((prev) => !prev)}
      >
        <div className="flex flex-start col-span-10">{movie.title}</div>
        <Button
          className="text-lg p-1 rounded-lg border border-black dark:border-white hover:scale-110"
          onClick={(e) => deleteMovie(e)}
        >
          <AiFillDelete />
        </Button>
      </Button>
    </>
  );
}
