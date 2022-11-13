import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Movie } from '../../../models/movies';

interface Props {
  movie: Movie;
}

export default function Genre({ movie }: Props) {
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
    <div className="flex justify-center gap-3">
      {movie.genre_ids?.map((id) => {
        let info = genres?.find((ele) => ele.id === id);
        return (
          <div key={id} className="p-2 border rounded-full border-white dark:border-black">
            {info?.name}
          </div>
        );
      })}
    </div>
  );
}
