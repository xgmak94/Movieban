import React from 'react';
import { AiFillStar, AiOutlineHeart } from 'react-icons/ai';
import numeral from 'numeral';
import { Movie } from '../../../models/movies';

interface StatsProps {
  movie: Movie;
}

export default function Stats({ movie }: StatsProps) {
  return (
    <div className="flex flex-row justify-around text-center gap-3">
      <div className="font-bold text-2xl text-center">{movie.title}</div>
      <Content
        title="rating"
        content={
          <>
            <div className="flex gap-1 items-center text-lg">
              <AiFillStar className="text-yellow-300" />
              <div>{movie.vote_average} / 10</div>
            </div>
            <div className="text-sm font-4">{numeral(movie.vote_count).format('0a')}</div>
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