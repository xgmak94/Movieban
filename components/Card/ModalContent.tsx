import React, { useEffect, useState } from 'react';
import { Movie } from '../../models/movies';
import Image from 'next/image';
import axios from 'axios';

const imageURL = 'https://image.tmdb.org/t/p/original';

interface Props {
  movie: Movie;
}

export default function ModalContent({ movie }: Props) {
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
    <div className="w-full flex flex-col justify-center">
      <div className="flex flex-col justify-center">
        <Image
          src={`${imageURL}${movie.backdrop_path}`}
          className="self-center object-contain"
          alt="poster"
          width="200"
          height="200"
        />
      </div>
      <div className="text-center">{movie.title}</div>
      <div className="flex flex-row justify-center text-center gap-3">
        <div>
          <div>Score</div>
          <div>{movie.vote_average}</div>
        </div>
        <div>
          <div>Release Date</div>
          <div>{movie.release_date?.toString()}</div>
        </div>
      </div>
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
  );
}
