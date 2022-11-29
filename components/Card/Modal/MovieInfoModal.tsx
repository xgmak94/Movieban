import React from 'react';
import { Movie } from '../../../models/movies';
import Modal from '../../Modal/Modal';
import MovieInfo from '../../Movie/MovieInfo';

interface Props {
  movie: Movie;
  index: Number;
  modal: Boolean;
  setModal: React.Dispatch<React.SetStateAction<Boolean>>;
}

export default function MovieInfoModal({ movie, index, modal, setModal }: Props) {
  return (
    <>
      <Modal modal={modal} setModal={setModal}>
        <MovieInfo movie={movie} />
      </Modal>
    </>
  );
}
