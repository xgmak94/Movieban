import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Movie } from '../../models/movies';
import Column from '../Column/Column';

interface Props {
  columns: Column[];
  handleOnDragEnd: (result: DropResult) => any;
}

interface Column {
  label: String;
  columnData: Movie[];
  setColumnData: React.Dispatch<React.SetStateAction<Movie[]>>;
}

export default function MultiColumn({ columns, handleOnDragEnd }: Props) {
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 p-3 gap-3">
        {columns.map((col) => (
          <Column
            key={col.label as string}
            columnData={col.columnData}
            setColumnData={col.setColumnData}
            columnName={col.label}
          />
        ))}
      </div>
    </DragDropContext>
  );
}
