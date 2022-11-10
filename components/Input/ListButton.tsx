import React from 'react';
import { List } from '../../models/movies';

interface Props {
  listRef: any;
}

export default function ListButton({ listRef }: Props) {
  return (
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
  );
}
