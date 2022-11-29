import React from 'react';
import { Movie } from '../../../models/movies';
import Modal from '../../Modal/Modal';
import ModalContent from './ModalContent';

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
        <ModalContent movie={movie} />
      </Modal>
    </>
  );
}
