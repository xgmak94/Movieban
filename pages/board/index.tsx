import React, { useEffect, useState } from 'react';
import Input from '../../components/Input/Input';
import { Movie, List } from '../../models/movies';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Column from '../../components/Column/Column';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

export default function Board() {
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const [movie, setMovie] = useState<Movie>();

  const [backlog, setBacklog] = useState<Movie[]>([]);
  const [watching, setWatching] = useState<Movie[]>([]);
  const [watched, setWatched] = useState<Movie[]>([]);

  const columns = [
    { label: 'Backlog', columnData: backlog, setColumnData: setBacklog },
    { label: 'Watching', columnData: watching, setColumnData: setWatching },
    { label: 'Watched', columnData: watched, setColumnData: setWatched },
  ];

  // fetch data
  useEffect(() => {
    async function loadInitialData() {
      if (user) {
        let { data, error } = await supabaseClient
          .from('user_board')
          .select('*')
          .eq('user', user.id);

        if (data) {
          let movieInfo = [];
          for (let i = 0; i < data.length; i++) {
            let res = await supabaseClient.from('movie').select('*').eq('id', data[i].movie_id);
            if (res.data) {
              movieInfo.push(res.data[0]);
            }
          }

          let backList = [];
          let watchingList = [];
          let watchedList = [];
          for (let i = 0; i < data.length; i++) {
            if (data[i].movie_status === 'Backlog') {
              backList.push(movieInfo[i]);
            } else if (data[i].movie_status === 'Watching') {
              watchingList.push(movieInfo[i]);
            } else {
              watchedList.push(movieInfo[i]);
            }
          }

          setBacklog(backList);
          setWatching(watchingList);
          setWatched(watchedList);
        }
      }
    }

    loadInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function addToLists(targetList: List) {
    if (!movie || !user) return;

    let column = columns.find((element) => element.label === targetList);
    if (!column) return;

    column.setColumnData((prev) => [movie, ...prev]);

    const movieInfo = await supabaseClient.from('movie').insert(movie);
    const userInfo = await supabaseClient
      .from('user_board')
      .insert({ movie_status: targetList, user: user.id, movie_id: movie.id });

    setMovie(undefined);
  }

  async function handleOnDragEnd(result: DropResult) {
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
    console.log(item);
    const deleteInfo = await supabaseClient
      .from('user_board')
      .delete()
      .match({ movie_id: item.id, user: user?.id });
    const insertInfo = await supabaseClient
      .from('user_board')
      .insert({ movie_status: destination.droppableId, user: user?.id, movie_id: item.id });
  }

  return (
    <>
      <div
        className="text-black dark:text-white bg-gradient-to-tr
        from-red-200 to-blue-500
        dark:from-gray-600 dark:to-blue-900"
      >
        <div className="flex flex-col p-3">
          <Input movie={movie} setMovie={setMovie} addToLists={addToLists} />
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-3 p-3 gap-3">
              {columns.map((col) => (
                <Column
                  key={col.label}
                  columnData={col.columnData}
                  setColumnData={col.setColumnData}
                  columnName={col.label}
                />
              ))}
            </div>
          </DragDropContext>
        </div>
      </div>
    </>
  );
}
