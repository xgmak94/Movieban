import React from 'react';

interface Props {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}

export default function InputSearch({ name, setName }: Props) {
  return (
    <input
      className="rounded-2xl border w-full p-3 border-black dark:border-white"
      type="text"
      value={name}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
      placeholder="Enter movie"
    />
  );
}
