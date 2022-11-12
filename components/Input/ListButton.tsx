import React from 'react';
import { List } from '../../models/movies';

interface Props {
  list: string;
  setList: React.Dispatch<React.SetStateAction<string>>;
}

export default function ListButton({ list, setList }: Props) {
  return (
    <div>
      <select
        className="rounded-lg p-3 border border-black dark:border-white"
        name="list"
        value={list}
        onChange={(e) => setList(e.target.value)}
      >
        {Object.values(List).map((value) => {
          if (isNaN(Number(value))) {
            return <option key={value}>{value}</option>;
          }
        })}
      </select>
    </div>
  );
}
