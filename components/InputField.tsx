import axios from 'axios';
import React, { useRef, useEffect, useState } from 'react';
import { List, MovieData } from '../models/movies';

import { useAutoAnimate } from '@formkit/auto-animate/react';

interface props {
  name: string;
  setName: Function;
  addNew: Function;
}

export default function Inputfield({ name, setName, addNew }: props) {
  const [data, setdata] = useState<MovieData[]>([]);
  const listRef = useRef<HTMLSelectElement>(null);

  const [searchParent] = useAutoAnimate<HTMLUListElement>();

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

    addNew(listRef.current?.value);
  }

  function handleSelectOption(e: React.MouseEvent) {
    e.preventDefault();

    let selectedMovieInfo: MovieData = data[Number((e.target as HTMLOptionElement).value)];
    setName(selectedMovieInfo.title);
  }

  return (
    <div className="flex flex-col">
      <form
        className="flex justify-center my-3"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
      >
        <div className="w-[50vw]">
          <input
            type="text"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            placeholder="Enter movie"
            className="rounded-2xl border w-full p-3 border-black dark:border-white"
          />
          <ul
            className="rounded-lg shadow-lg p-1 w-full h-[50vh] overflow-auto border border-black dark:border-white border-t-0"
            onClick={(e) => handleSelectOption(e)}
            ref={searchParent}
          >
            {data.map((movie: MovieData, index: number) => {
              return (
                <>
                  <li
                    key={movie.id}
                    className="flex flex-start min-h-10 w-full border-b-[1px] border-solid border-l-gray-300 py-2 text-ellipsis hover:bg-blue-300 cursor-pointer"
                    value={index}
                  >
                    {movie.title}
                  </li>
                </>
              );
            })}
          </ul>
        </div>
        <div>
          <select
            className="rounded-lg p-3 border border-black dark:border-white"
            name="list"
            ref={listRef}
          >
            {Object.values(List).map((value) => {
              if (isNaN(Number(value))) {
                return <option key={value}>{value}</option>;
              }
            })}
          </select>
        </div>
        <div>
          <button className="rounded-lg p-3 bg-blue-300 hover:bg-blue-400" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
