import React, { useState } from 'react';
import { InputLabel, MenuItem, FormControl, Select, SelectChangeEvent } from '@mui/material';

import { List } from '../../models/movies';

interface Props {
  list: string;
  setList: React.Dispatch<React.SetStateAction<string>>;
}
export default function BasicSelect({ list, setList }: Props) {
  const handleChange = (event: SelectChangeEvent) => {
    setList(event.target.value as string);
  };

  return (
    <div className="min-w-[25vw]">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={list}
          label="list"
          onChange={handleChange}
        >
          {Object.values(List).map((value) => {
            if (isNaN(Number(value))) {
              return (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              );
            }
          })}
        </Select>
      </FormControl>
    </div>
  );
}
