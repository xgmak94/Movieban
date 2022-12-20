import React, { useState } from 'react';
import Search from './Search';
import { Movie } from '../../models/movies';
import {
  type User,
  type SupabaseClient,
  useSupabaseClient,
  useUser,
} from '@supabase/auth-helpers-react';
import Modal from '../Modal/Modal';
import MovieInfo from '../Movie/MovieInfo';

// modal form version of adding a movie to list
interface Props {
  columnName: String;
  modal: Boolean;
  setModal: React.Dispatch<React.SetStateAction<Boolean>>;
  columnData: Movie[];
  setColumnData: React.Dispatch<React.SetStateAction<Movie[]>>;
}

export default function ModalInput({
  columnName,
  modal,
  setModal,
  columnData,
  setColumnData,
}: Props) {
  const user: User = useUser() as User;
  const [movie, setMovie] = useState<Movie>();
  const supabaseClient: SupabaseClient = useSupabaseClient();

  async function handleSave(e: React.MouseEvent<HTMLButtonElement>) {
    if (movie) {
      const movieInfo = await supabaseClient.from('movie').insert(movie);
      const userInfo = await supabaseClient
        .from('user_board')
        .insert({
          movie_status: columnName,
          user: user.id,
          movie_id: movie.id,
        });
      setModal(false);
      setColumnData((prev) => [movie, ...prev]);
      setMovie(undefined);
    }
  }

  return (
    <>
      <Modal
        modal={modal}
        setModal={setModal}
      >
        <div className='text-4xl font-semibold self-center'>{columnName}</div>
        <Search
          movie={movie}
          setMovie={setMovie}
        />
        <button
          className='bg-white dark:bg-black'
          onClick={handleSave}
        >
          Add
        </button>
        {movie && <MovieInfo movie={movie} />}
      </Modal>
    </>
  );
}
