import React, { useEffect, useRef, useState } from 'react';
import { Movie } from '../../models/movies';
import Image from 'next/image';
import axios from 'axios';
import { createPortal } from 'react-dom';

const imageURL = 'https://image.tmdb.org/t/p/original';

type Props = {
  movie: Movie;
  index: number;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MovieInfoModal({ movie, index, modal, setModal }: Props) {
  const [genres, setGenres] = useState<any[]>();

  useEffect(() => {
    async function getGenres() {
      let req = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      setGenres(req.data.genres);
    }

    getGenres();
  }, [movie]);

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
          <div className="w-full flex flex-col justify-center text-center">
            <Image
              src={`${imageURL}${movie.backdrop_path}`}
              className="self-center object-contain"
              alt="poster"
              width="200"
              height="200"
            />
            <div className="justify-center">{movie.title}</div>
            <div>Score</div>
            <div>Release Date</div>
            <div className="grid grid-cols-10 justify-between">
              <div className="m-3 capitalize col-start-1 col-span-2">genres</div>
              <div className="col-start-5">
                {movie.genre_ids?.map((id) => {
                  let info = genres?.find((ele) => ele.id === id);
                  return <div key={id}>{info?.name}</div>;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
