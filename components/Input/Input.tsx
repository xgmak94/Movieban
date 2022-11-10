import axios from 'axios';
import React, { useRef, useEffect, useState } from 'react';
import { List, Movie, MovieData } from '../../models/movies';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import SubmitButton from './SubmitButton';
import ListButton from './ListButton';
import SearchResults from './SearchResults';
import InputSearch from './InputSearch';

interface props {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  addToLists: Function;
}

export default function Inputfield({ name, setName, addToLists }: props) {
  const [data, setdata] = useState<MovieData[]>([]);
  const listRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    async function getData() {
      let req = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${name}`
      );
      setdata(req.data.results);
    }
    if (!name) {
      setdata([]);
      return;
    }

    getData();
  }, [name]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!listRef.current) return;

    addToLists(listRef.current.value);
  }

  return (
    <div className="flex flex-col">
      <form
        className="flex justify-center my-3"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
      >
        <div className="w-[50vw]">
          <InputSearch name={name} setName={setName} />
          <SearchResults data={data} setName={setName} />
        </div>
        <ListButton listRef={listRef} />
        <SubmitButton />
      </form>
    </div>
  );
}
