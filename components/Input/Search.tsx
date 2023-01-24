import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { Movie } from '../../models/movies';

interface Props {
  movie: Movie | undefined;
  setMovie: React.Dispatch<React.SetStateAction<Movie | undefined>>;
}

export default function Search({ movie, setMovie }: Props) {
  const [text, setText] = useState<String>('');
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

  // TODO: Find out why autocomplete is not being cleared
  useEffect(() => {
    if (movie === undefined || movie === null) {
      setText('');
    }
  }, [movie]);

  return (
    <div className="p-3">
      <Autocomplete
        options={data}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Movie"
            placeholder="Search for a movie..."
            InputProps={{ ...params.InputProps, type: 'search' }}
          />
        )}
        renderOption={(props, option) => {
          return (
            <>
              <li {...props} key={option.id}>
                <div>{option.title}</div>
              </li>
            </>
          );
        }}
        inputValue={text as string}
        onInputChange={(event, newInputValue) => setText(newInputValue)}
        isOptionEqualToValue={(option, val) => option.title === val.title}
        getOptionLabel={(option) => option.title}
      />
    </div>
  );
}
