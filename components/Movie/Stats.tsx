import React from 'react';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import numeral from 'numeral';
import { Movie } from '../../models/movies';

interface StatsProps {
  movie: Movie;
}

export default function Stats({ movie }: StatsProps) {
  return (
    <div className="grid grid-cols-4">
      <div className="font-bold text-2xl text-center">{movie.title}</div>
      <Content
        title="rating"
        content={
          <>
            <div className="flex justify-center gap-1 items-center text-lg">
              <StarOutlineOutlinedIcon className="text-yellow-500" />
              <div>{movie.vote_average} / 10</div>
            </div>
            <div className="text-sm font-4">{numeral(movie.vote_count).format('0a')}</div>
          </>
        }
      />
      <Content
        title="release date"
        content={<div>{new Date(movie.release_date as Date).toLocaleDateString('en-US')}</div>}
      />
      <Content
        title="popularity"
        content={
          <div className="flex gap-1 items-center text-lg">
            <FavoriteBorderOutlinedIcon className="text-red-500" />
            <div>{numeral(movie.popularity).format('0.')}</div>
          </div>
        }
      />
    </div>
  );
}

interface ContentProps {
  content: React.ReactNode;
  title: String;
}

function Content({ content, title }: ContentProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="capitalize font-bold">{title}</div>
      {content}
    </div>
  );
}
