import React from 'react';
import { Movie } from '../../../models/movies';
import Image from 'next/image';
import Stats from './Stats';
import Genre from './Genre';

const imageURL = 'https://image.tmdb.org/t/p/original';

interface Props {
  movie: Movie;
}

export default function ModalContent({ movie }: Props) {
  return (
    <div className="w-full flex flex-col justify-center gap-1">
      <div className="flex flex-col justify-center">
        <Image
          src={`${imageURL}${movie.poster_path}`}
          className="self-center object-contain w-auto h-auto"
          alt="poster"
          width="200"
          height="200"
        />
      </div>
      <Genre movie={movie} />
      <Stats movie={movie} />
    </div>
  );
}
