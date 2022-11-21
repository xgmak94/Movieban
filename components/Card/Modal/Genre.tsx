import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Movie } from '../../../models/movies';
import { Chip } from '@material-tailwind/react';

interface Props {
  movie: Movie;
}

export default function Genre({ movie }: Props) {
  const [genres, setGenres] = useState<any[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getGenres() {
      let req = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      setGenres(req.data.genres);
      setLoading(false);
    }
    getGenres();
  }, [movie]);

  return (
    <div className="flex justify-center gap-3 asp">
      {loading ? (
        <div>Loading genres...</div>
      ) : (
        movie.genre_ids?.map((id) => {
          let info = genres?.find((ele) => ele.id === id);
          return <Chip key={id} value={info.name} color="cyan" />;
        })
      )}
    </div>
  );
}
