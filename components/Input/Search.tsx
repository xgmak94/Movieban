import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { Movie } from '../../models/movies';

interface Props {
  movie: Movie | undefined;
  setMovie: React.Dispatch<React.SetStateAction<Movie | undefined>>;
}

export default function Search({ movie, setMovie }: Props) {
  const [text, setText] = useState<string>('');
  const [data, setData] = useState<Movie[]>([]);

  useEffect(() => {
    async function getData() {
      let resp = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${text}`
      );
      let data = await resp.json();
      setData(data.results);
    }
    if (!text) {
      setData([]);
      return;
    }

    getData();
    setMovie(data.find((mov) => mov.title === text));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  useEffect(() => {
    if (movie === undefined) {
      setText('');
    }
  }, [movie]);

  return (
    <Autocomplete
      options={data}
      renderInput={(params) => <TextField {...params} label="Movie" />}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.id}>
            {option.title}
          </li>
        );
      }}
      inputValue={text}
      onInputChange={(event, newInputValue) => setText(newInputValue)}
      isOptionEqualToValue={(option, val) => option.title === val.title}
      getOptionLabel={(option) => option.title}
    />
  );
}
