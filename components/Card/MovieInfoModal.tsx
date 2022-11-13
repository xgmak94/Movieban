import React, { useEffect, useRef, useState } from 'react';
import { Movie } from '../../models/movies';
import Image from 'next/image';
import axios from 'axios';
import { createPortal } from 'react-dom';
import ModalContent from './ModalContent';

const imageURL = 'https://image.tmdb.org/t/p/original';

type Props = {
  movie: Movie;
  index: number;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MovieInfoModal({ movie, index, setModal }: Props) {
  return (
    <>
      <div
        className="grid place-items-center fixed top-0 left-0 w-screen h-screen bg-slate-100/40 z-10 cursor-auto"
        id="modal-background"
        onClick={() => setModal((prev) => !prev)}
      >
        <div
          className="flex flex-col w-[90vw] h-[90vh] bg-slate-500 p-5 rounded-lg gap-1 space-evenly"
          id="modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <ModalContent movie={movie} />
        </div>
      </div>
    </>
  );
}
