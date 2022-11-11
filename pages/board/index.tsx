import React, { useRef, useState } from 'react';
import Input from '../../components/Input/Input';
import { Movie, List } from '../../models/movies';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Column from '../../components/Column/Column';

export default function Board() {
  const [name, setName] = useState<string>('');

  const [backlog, setBacklog] = useState<Movie[]>([]);
  const [watching, setWatching] = useState<Movie[]>([]);
  const [watched, setWatched] = useState<Movie[]>([]);

  const columns = [
    { columnData: backlog, setColumnData: setBacklog, columnName: 'Backlog' },
    { columnData: watching, setColumnData: setWatching, columnName: 'Watching' },
    { columnData: watched, setColumnData: setWatched, columnName: 'Watched' },
  ];

  function addToLists(targetList: List) {
    if (!name) return;
    const newMovie: Movie = {
      title: name,
    };

    columns
      .find((element) => element.columnName === targetList)
      ?.setColumnData((prev) => [newMovie, ...prev]);

    setName('');
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
      <div className="flex flex-col p-3">
        <Input name={name} setName={setName} addToLists={addToLists} />
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
    </>
  );
}
