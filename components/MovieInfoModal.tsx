import React from 'react';
import { Movie } from '../models/movies';

type Props = {
  movie: Movie;
  closeModal: Function;
};

export default function MovieInfoModal({ movie, closeModal }: Props) {
  return <div>MovieInfoModal</div>;
}
