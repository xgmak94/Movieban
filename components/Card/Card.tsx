import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { Movie } from '../../models/movies';
import MovieInfoModal from './Modal/MovieInfoModal';
import Button from '@mui/material/Button';
import { Tooltip } from '@mui/material';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

interface Props {
  movie: Movie;
  index: number;
  column: Movie[];
  setColumn: React.Dispatch<React.SetStateAction<Movie[]>>;
}

export default function Card({ movie, index, column, setColumn }: Props) {
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  const [modal, setModal] = useState<boolean>(false);

  async function deleteMovie(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    setColumn((prev: Movie[]) => {
      return [...prev.slice(0, index), ...prev.slice(index + 1)];
    });

    const res = await supabaseClient
      .from('user_board')
      .delete()
      .match({ movie_id: movie.id, user: user?.id });
  }

  return (
    <>
      {createPortal(
        <MovieInfoModal movie={movie} index={index} modal={modal} setModal={setModal} />,
        document.querySelector<HTMLElement>('#portal')!
      )}
      <div
        className="flex flex-row justify-between rounded-lg text-black dark:text-white bg-blue-300 w-full p-3 transition hover:scale-105 hover:shadow-lg items-center"
        onClick={() => setModal((prev) => !prev)}
      >
        <div className="flex flex-start font-medium">{movie.title}</div>
        <Tooltip title="Delete" arrow>
          <Button
            variant="contained"
            className="text-lg p-1 rounded-lg border border-black dark:border-white text-black dark:text-white
          bg-blue-400 hover:scale-110"
            onClick={(e) => deleteMovie(e)}
          >
            <DeleteForeverOutlinedIcon />
          </Button>
        </Tooltip>
      </div>
    </>
  );
}
