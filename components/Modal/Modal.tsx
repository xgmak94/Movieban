import React from 'react';

interface Props {
  modal: Boolean;
  setModal: React.Dispatch<React.SetStateAction<Boolean>>;
  children: React.ReactNode;
}

export default function Modal({ modal, setModal, children }: Props) {
  function handleClose(e: React.MouseEvent<HTMLDivElement>) {
    if ((e.target as HTMLDivElement).id === 'modal-background') {
      setModal((prev) => !prev);
    }
  }

  if (modal === false) return null;
  return (
    <>
      <div
        className="grid place-items-center fixed top-0 left-0 w-screen h-screen bg-slate-100/40 z-10 cursor-auto"
        id="modal-background"
        onClick={handleClose}
      >
        <div
          className="flex flex-col w-[90vw] h-[90vh] p-5 rounded-lg gap-1 space-evenly
            bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100
          dark:from-gray-300 dark:via-gray-600 dark:to-blue-900"
        >
          {children}
        </div>
      </div>
    </>
  );
}
