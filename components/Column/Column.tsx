import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Movie } from '../../models/movies';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Card from '../Card/Card';

interface Props {
  columnData: Movie[];
  setColumnData: React.Dispatch<React.SetStateAction<Movie[]>>;
  columnName: string;
}

export default function Column({columnData, setColumnData, columnName}: Props) {
  // const [listParent] = useAutoAnimate<HTMLUListElement>();

  return (
    <div className="flex flex-col overflow-auto text-center p-3 rounded-lg min-h-screen
    bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100
    dark:bg-gradient-to-b dark:from-gray-900 dark:via-blue-gray-600 dark:to-gray-400">
    <div className="text-2xl font-semibold capitalize">{columnName}</div>
    <Droppable droppableId={columnName}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <ul className="flex flex-col justify-center m-3">
            {columnData.map((movie, index) => {
              return (
                <Draggable key={movie.title} draggableId={movie.title} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Card
                        movie={movie}
                        index={index}
                        column={columnData}
                        setColumn={setColumnData}
                      />
                    </li>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </ul>
        </div>
      )}
    </Droppable>
  </div>
  )
}