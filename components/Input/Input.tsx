import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { List, Movie } from '../../models/movies';

import SubmitButton from './SubmitButton';
import ListButton from './ListButton';
import SearchResults from './SearchResults';
import InputSearch from './InputSearch';

interface props {
  name: Movie;
  setName: React.Dispatch<React.SetStateAction<Movie | undefined>>;
  addToLists: Function;
}

export default function Inputfield({ name, setName, addToLists }: props) {
  const [data, setdata] = useState<Movie[]>([]);
  const [list, setList] = useState<string>(List.Backlog);

  useEffect(() => {
    async function getData() {
      let req = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${name.title}`
      );
      setdata(req.data.results);
    }
    if (!name?.title) {
      setdata([]);
      return;
    }

    getData();
  }, [name]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    addToLists(list);
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
        <ListButton list={list} setList={setList} />
        <SubmitButton />
      </form>
    </div>
  );
}
