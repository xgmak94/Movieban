import React from 'react';
import Image from 'next/image';
import { Movie } from '../../models/movies';
import Genre from './Genre';
import Stats from './Stats';

const imageURL: String = 'https://image.tmdb.org/t/p/original';

interface Props {
  movie: Movie;
}

export default function MovieInfo({ movie }: Props) {

  return (
    <div className="w-full flex flex-col justify-center gap-1 overflow-auto">
      <div className="grid grid-cols-2 gap-1 justify-center place-items-center">
        <Image
          src={`${imageURL}${movie.poster_path}`}
          className="self-center object-contain w-auto h-auto"
          alt="poster"
          width="200"
          height="200"
          placeholder="blur"
          blurDataURL={`${imageURL}${movie.poster_path}`}
        />
        <Genre movie={movie} />
      </div>
      <Stats movie={movie} />
      <div>{movie.overview}</div>
    </div>
  );
}
