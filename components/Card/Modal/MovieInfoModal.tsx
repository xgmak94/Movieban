import React from 'react';
import { Movie } from '../../../models/movies';
import ModalContent from './ModalContent';

interface Props {
  movie: Movie;
  index: number;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MovieInfoModal({ movie, index, setModal }: Props) {
  function handleClick(e: any) {
    if (e.target.id === 'modal-background') {
      setModal((prev) => !prev);
    }
  }

  return (
    <>
      <div
        className="grid place-items-center fixed top-0 left-0 w-screen h-screen bg-slate-100/40 z-10 cursor-auto"
        id="modal-background"
        onClick={handleClick}
      >
        <div
          className="flex flex-col w-[90vw] h-[90vh] p-5 rounded-lg gap-1 space-evenly
            bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100
          dark:from-gray-300 dark:via-gray-600 dark:to-blue-900"
        >
          <ModalContent movie={movie} />
        </div>
      </div>
    </>
  );
}
