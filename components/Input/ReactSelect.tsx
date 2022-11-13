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

  function handleChange(e: { value: React.SetStateAction<Movie | undefined>; }) {
    console.log(e);
    setMovie(e?.value)
  }

  function handleInputChange(e: any) {
    setMovie((prev) => {
      return { title: e };
    });
  }

  return (
    <Select
      className="h-full w-full text-center text-xl text-black"
      options={options}
      value={{ label: movie?.title, value: movie }}
      onChange={(e) => setMovie(e?.value)}
      onInputChange={(e) => handleInputChange(e)}
      placeholder='Search for a movie'
    />
  );
}
