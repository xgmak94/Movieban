import React, { useEffect, useState } from 'react';
import { Movie } from '../../models/movies';
import { Chip, CircularProgress } from '@mui/material';

interface Props {
  movie: Movie;
}

interface Genre {
  id: Number;
  name: String;
}

export default function Genre({ movie }: Props) {
  const [genres, setGenres] = useState<Genre[]>();

  useEffect(() => {
    async function getGenres() {
      let resp : Response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      let data = await resp.json();
      setGenres(data.genres);
    }
    getGenres();
  }, [movie]);

  return (
    <>
      <div className="flex justify-center gap-3">
        {genres === undefined ? (
          <CircularProgress />
        ) : (
          movie.genre_ids?.map((id) => {
            let info = genres.find((ele) => ele.id === id);

            if (info !== undefined) {
              return <Chip key={id} label={info.name} color="primary" />;
            }
          })
        )}
      </div>
    </>
  );
}
