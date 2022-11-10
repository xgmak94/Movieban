import React, { useRef, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import Card from '../../components/Card';
import InputField from '../../components/Input/Input';
import { Movie, List } from '../../models/movies';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

export default function Board() {
  const [name, setName] = useState<string>('');

  const [backlog, setBacklog] = useState<Movie[]>([]);
  const [watching, setWatching] = useState<Movie[]>([]);
  const [watched, setWatched] = useState<Movie[]>([]);

  const lists = {
    [List.Backlog]: { list: backlog, setList: setBacklog },
    [List.Watching]: { list: watching, setList: setWatching },
    [List.Watched]: { list: watched, setList: setWatched },
  };

  // not sure if this actually animates
  const [backlogParent] = useAutoAnimate<HTMLUListElement>();
  const [watchingParent] = useAutoAnimate<HTMLUListElement>();
  const [watchedParent] = useAutoAnimate<HTMLUListElement>();

  function addToLists(targetList: List) {
    console.log(lists[targetList]);
    if (!name) return;
    const newMovie: Movie = {
      id: name,
      name,
      status: List.Backlog,
      rating: undefined,
    };

    lists[targetList].setList((prev) => [newMovie, ...prev]);
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
        <div className="flex flex-col justify-center">
          <div className="text-4xl">Movieban</div>
          <InputField name={name} setName={setName} addToLists={addToLists} />
        </div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3">
            <div className="flex flex-col overflow-auto text-center bg-gray-400 p-3 rounded-lg">
              <div className="text-2xl font-semibold">Backlog</div>
              <Droppable droppableId="Backlog">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    <ul className="m-3 h-[80vh]" ref={backlogParent}>
                      {backlog.map((movie, index) => {
                        return (
                          <Draggable key={movie.id} draggableId={movie.id} index={index}>
                            {(provided) => (
                              <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <Card
                                  movie={movie}
                                  index={index}
                                  list={backlog}
                                  setList={setBacklog}
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
            <div className="flex flex-col text-center bg-gray-400 p-3 rounded-lg">
              <div className="text-2xl font-semibold">Watching</div>
              <Droppable droppableId="Watching">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    <ul className="m-3 h-[80vh]" ref={watchingParent}>
                      {watching.map((movie, index) => {
                        return (
                          <Draggable key={movie.id} draggableId={movie.id} index={index}>
                            {(provided) => (
                              <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <Card
                                  movie={movie}
                                  index={index}
                                  list={watching}
                                  setList={setWatching}
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
            <div className="flex flex-col text-center bg-gray-400 p-3 rounded-lg">
              <div className="text-2xl font-semibold">Watched</div>
              <Droppable droppableId="Watched">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    <ul className="m-3 h-[80vh]" ref={watchedParent}>
                      {watched.map((movie, index) => {
                        return (
                          <Draggable key={movie.id} draggableId={movie.id} index={index}>
                            {(provided) => (
                              <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <Card
                                  movie={movie}
                                  index={index}
                                  list={watched}
                                  setList={setWatched}
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
          </div>
        </DragDropContext>
      </div>
    </>
  );
}
