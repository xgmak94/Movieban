import React from 'react';
import { Movie } from '../../models/movies';

type Props = {
  movie: Movie;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MovieInfoModal({ movie, closeModal }: Props) {
  return <div>MovieInfoModal</div>;
}
