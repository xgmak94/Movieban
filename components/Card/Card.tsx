import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { Movie } from '../../models/movies';
import MovieInfoModal from './Modal/MovieInfoModal';

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
      <form
        className="grid grid-cols-10 justify-between rounded-md text-black dark:text-white bg-slate-300 dark:bg-slate-700 w-full p-3 m-3 gap-3 transition hover:scale-105 hover:shadow-lg items-center"
        onClick={() => setModal((prev) => !prev)}
      >
        <div className="grid grid-cols-10 col-span-7">
          {edit ? (
            <input
              autoFocus
              className="rounded-lg py-3 col-span-10 text-black dark:text-white"
              type="text"
              value={editInfo}
              onChange={(e) => handleEditText(e)}
            />
          ) : (
            <div className="flex flex-start col-span-10 py-3">{movie.title}</div>
          )}
        </div>
        <div className="flex justify-evenly gap-2 col-span-3">
          <button
            className="text-lg p-1 rounded-lg border border-black dark:border-white hover:border-blue-300"
            onClick={(e) => editMovie(e)}
          >
            <AiFillEdit />
          </button>
          <button
            className="text-lg p-1 rounded-lg border border-black dark:border-white"
            onClick={(e) => deleteMovie(e)}
          >
            <AiFillDelete />
          </button>
        </div>
      </form>
    </>
  );
}
