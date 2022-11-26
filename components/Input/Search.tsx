import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { Movie } from '../../models/movies';
import axios from 'axios';

interface Props {
  movie: Movie | undefined;
  setMovie: React.Dispatch<React.SetStateAction<Movie | undefined>>;
}

export default function Search({ movie, setMovie }: Props) {
  const [text, setText] = useState('');
  const [data, setData] = useState<any[]>([]);

  function handleInputChange(event: any, val: string) {
    setText(val);
  }

  useEffect(() => {
    async function getData() {
      let req = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${text}`
      );
      setData(req.data.results);
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
      onInputChange={handleInputChange}
      isOptionEqualToValue={(option, val) => option.title === val.title}
      getOptionLabel={(option) => option.title}
    />
  );
}
