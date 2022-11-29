import React, { useState } from 'react';
import Search from '../../components/Input/Search';
import MovieInfo from '../../components/Movie/MovieInfo';
import { Movie } from '../../models/movies';

interface Props {}

export default function SearchPage({}: Props) {
  const [movie, setMovie] = useState<Movie>();

  return (
    <div
      className="min-h-screen p-3 text-black dark:text-white bg-gradient-to-tr
  from-red-200 via-gray-200 to-blue-500
  dark:from-gray-400 dark:via-gray-600 dark:to-blue-900"
    >
      <Search movie={movie} setMovie={setMovie} />
      {movie && <MovieInfo movie={movie} />}
    </div>
  );
}
