import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Movie } from '../../models/movies';

interface Option {
  label: string;
  value: Movie;
}

type Props = {
  movie: Movie | undefined;
  setMovie: React.Dispatch<React.SetStateAction<Movie | undefined>>;
  data: Movie[];
};

export default function ReactSelect({ movie, setMovie, data }: Props) {
  const options: Option[] = data.map((movie) => {
    return {
      label: movie.title,
      value: movie,
    };
  });

  function handleChange(e) {
    console.log(e);
    setMovie(e?.value)
  }

  function handleInputChange(e) {
    setMovie((prev) => {
      return { title: e };
    });
  }

  return (
    <Select
      className="h-1/6 w-3/5 rounded-full text-center text-4xl text-black"
      options={options}
      value={{ label: movie?.title, value: movie }}
      onChange={(e) => setMovie(e?.value)}
      onInputChange={(e) => handleInputChange(e)}
      placeholder='Search for a movie'
    />
  );
}
