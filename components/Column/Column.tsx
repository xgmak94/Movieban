import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Movie } from '../../models/movies';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Card from '../Card/Card';
import { Button, List, Divider } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

interface Props {
  columnData: Movie[];
  setColumnData: React.Dispatch<React.SetStateAction<Movie[]>>;
  columnName: String;
}

export default function Column({ columnData, setColumnData, columnName }: Props) {
  const [listParent] = useAutoAnimate<HTMLUListElement>();

  return (
    <div
      className="flex flex-col overflow-auto text-center p-3 rounded-lg min-h-[50vh]
    bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100
    dark:bg-gradient-to-b dark:from-gray-900 dark:via-blue-gray-600 dark:to-gray-400"
    >
      <div className="font-semibold py-3">
        <div className="text-xl">{columnName}</div>
        <div className="text-lg opacity-50">{columnData.length + ' Movies'}</div>
        <Button
          className="w-full rounded-lg bg-gray-300 dark:bg-gray-500 hover:bg-gray-500 dark:hover:bg-gray-300 text-black dark:text-white"
          variant="contained"
        >
          <AddOutlinedIcon />
        </Button>
      </div>

      <Divider className="bg-black dark:bg-white" />
      <Droppable droppableId={columnName as string}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <List className="flex flex-col min-h-screen my-3 gap-1" ref={listParent}>
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
            </List>
          </div>
        )}
      </Droppable>
    </div>
  );
}
