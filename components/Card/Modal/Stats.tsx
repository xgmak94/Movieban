import React from 'react';
import { AiFillStar, AiOutlineHeart } from 'react-icons/ai';
import numeral from 'numeral';
import { Movie } from '../../../models/movies';
import { Rating } from '@mui/material';

interface StatsProps {
  movie: Movie;
}

export default function Stats({ movie }: StatsProps) {
  console.log(movie);
  return (
    <div className="flex flex-row justify-around text-center gap-3">
      <div className="font-bold text-2xl text-center">{movie.title}</div>
      <Content
        title="rating"
        content={
          <>
            <div className="flex justify-center gap-1 items-center text-lg">
              <AiFillStar className="text-yellow-300" />
              <div>{movie.vote_average} / 10</div>
            </div>
            <div className="text-sm font-4">{numeral(movie.vote_count).format('0a')}</div>
            <Rating value={movie.vote_average} precision={0.1} max={10} readOnly />
          </>
        }
      />
      <Content title="release date" content={<div>{movie.release_date?.toString()}</div>} />
      <Content
        title="popularity"
        content={
          <div className="flex gap-1 items-center text-lg">
            <AiOutlineHeart className="text-red-500" />
            <div>{numeral(movie.popularity).format('0.')}</div>
          </div>
        }
      />
    </div>
  );
}

interface ContentProps {
  content: React.ReactNode;
  title: string;
}

function Content({ content, title }: ContentProps) {
  return (
    <div className="flex flex-col">
      <div className="capitalize font-bold">{title}</div>
      {content}
    </div>
  );
}
