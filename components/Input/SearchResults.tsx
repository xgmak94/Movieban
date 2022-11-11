import { useAutoAnimate } from '@formkit/auto-animate/react';
import React from 'react';
import { Movie } from '../../models/movies';

interface Props {
  data: Movie[];
  setName: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchResults({ data, setName }: Props) {
  const [searchParent] = useAutoAnimate<HTMLUListElement>();

  function handleSelectOption(e: React.MouseEvent) {
    e.preventDefault();

    let selectedMovieInfo: Movie = data[Number((e.target as HTMLOptionElement).value)];
    setName(selectedMovieInfo.title);
  }

  return (
    <ul
      className="rounded-lg shadow-lg p-1 w-full h-[50vh] overflow-auto border border-black dark:border-white border-t-0"
      onClick={(e) => handleSelectOption(e)}
      ref={searchParent}
    >
      {data.map((movie: Movie, index: number) => {
        return (
          <>
            <li
              key={movie.id}
              className="flex flex-start min-h-10 w-full border-b-[1px] border-solid border-l-gray-300 py-2 text-ellipsis hover:bg-blue-300 cursor-pointer"
              value={movie.title}
            >
              {movie.title}
            </li>
          </>
        );
      })}
    </ul>
  );
}
