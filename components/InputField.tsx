import React, { FormEventHandler, useRef } from 'react';
import { setTokenSourceMapRange } from 'typescript';
import { List } from '../models/movies';

interface props {
  name: string;
  setName: Function;
  addNew: Function;
}

export default function Inputfield({ name, setName, addNew }: props) {
  const listRef = useRef<HTMLSelectElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    addNew(listRef.current?.value);
  }

  return (
    <form className="flex justify-center my-3" onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        placeholder="Enter movie"
        className="rounded-2xl border border-black dark:border-white"
      />
      <select className="rounded-2xl" name="list" ref={listRef}>
        {Object.values(List).map((value) => {
          if (isNaN(Number(value))) {
            return (
              <option key={value}>
                {value}
              </option>
            );
          }
        })}
      </select>
      <button className="bg-blue-300 rounded-2xl p-3" type="submit">
        Submit
      </button>
    </form>
  );
}
