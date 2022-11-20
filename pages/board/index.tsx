import React, { useState } from 'react';
import Input from '../../components/Input/Input';
import { Movie, List } from '../../models/movies';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Column from '../../components/Column/Column';

export default function Board() {
  const [movie, setMovie] = useState<Movie>();

  const [backlog, setBacklog] = useState<Movie[]>([]);
  const [watching, setWatching] = useState<Movie[]>([]);
  const [watched, setWatched] = useState<Movie[]>([]);

  const columns = [
    { columnName: 'Backlog', columnData: backlog, setColumnData: setBacklog },
    { columnName: 'Watching', columnData: watching, setColumnData: setWatching },
    { columnName: 'Watched', columnData: watched, setColumnData: setWatched },
  ];

  function addToLists(targetList: List) {
    if (!movie) return;

    columns
      .find((element) => element.columnName === targetList)
      ?.setColumnData((prev) => [movie, ...prev]);

    setMovie({ title: '' });
  }

  function handleOnDragEnd(result: DropResult) {
    const { destination, source } = result;
    if (!destination) return;

    let backlogClone: Movie[] = Array.from(backlog);
    let watchingClone: Movie[] = Array.from(watching);
    let watchedClone: Movie[] = Array.from(watched);

    let item: Movie;
    if (source.droppableId === List.Backlog) {
      [item] = backlogClone.splice(source.index, 1);
    } else if (source.droppableId === List.Watching) {
      [item] = watchingClone.splice(source.index, 1);
    } else {
      [item] = watchedClone.splice(source.index, 1);
    }

    if (destination.droppableId === List.Backlog) {
      backlogClone.splice(destination.index, 0, item);
    } else if (destination.droppableId === List.Watching) {
      watchingClone.splice(destination.index, 0, item);
    } else {
      watchedClone.splice(destination.index, 0, item);
    }

    setBacklog(backlogClone);
    setWatching(watchingClone);
    setWatched(watchedClone);
  }

  return (
    <>
      <div
        className="text-black dark:text-white
      bg-gradient-to-tr from-red-200 via-gray-200 to-blue-500
      dark:from-gray-400 dark:via-gray-600 dark:to-blue-900"
      >
        <div className="flex flex-col p-3">
          <Input movie={movie} setMovie={setMovie} addToLists={addToLists} />
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3">
              {columns.map((col) => (
                <Column
                  key={col.columnName}
                  columnData={col.columnData}
                  setColumnData={col.setColumnData}
                  columnName={col.columnName}
                />
              ))}
            </div>
          </DragDropContext>
        </div>
      </div>
    </>
  );
}
