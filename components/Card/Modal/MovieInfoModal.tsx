import { Dialog } from '@mui/material';
import React from 'react';
import { Movie } from '../../../models/movies';
import ModalContent from './ModalContent';

interface Props {
  movie: Movie;
  index: Number;
  modal: Boolean;
  setModal: React.Dispatch<React.SetStateAction<Boolean>>;
}

export default function MovieInfoModal({ movie, index, modal, setModal }: Props) {
  function handleClose(_event: object, _reason: 'backdropClick' | 'escapeKeyDown') {
    setModal(false);
  }

  return (
    <Dialog onClose={handleClose} open={modal as boolean}>
      <ModalContent movie={movie} />
    </Dialog>
  );
}
