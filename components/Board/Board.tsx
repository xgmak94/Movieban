import React, { useEffect, useState } from 'react';
import { Movie, List } from '../../models/movies';
import {
  type User,
  type SupabaseClient,
  useSupabaseClient,
  useUser,
} from '@supabase/auth-helpers-react';
import { useMediaQuery } from '@mui/material';
import MultiColumn from './MultiColumn';
import SingleColumn from './SingleColumn';
import { DropResult } from 'react-beautiful-dnd';

export default function Board() {
  const user: User | null = useUser();
  const supabaseClient: SupabaseClient = useSupabaseClient();
  const mdScreen: boolean = useMediaQuery('(min-width:768px)');

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
      if (!user) return;

      let { data } = await supabaseClient
        .from('user_board')
        .select('*')
        .eq('user', user.id)
        .order('created_at', { ascending: false });

      if (!data) return;

      let movieInfo = [];

      // loop through each user entry, get accompanying movie info
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

    loadInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

    const updateInfo = await supabaseClient
      .from('user_board')
      .update({ movie_status: destination.droppableId, created_at: new Date() })
      .match({ user: user?.id, movie_id: item.id });
  }

  return (
    <>
      {mdScreen ? (
        <MultiColumn columns={columns} handleOnDragEnd={handleOnDragEnd} />
      ) : (
        <SingleColumn columns={columns} handleOnDragEnd={handleOnDragEnd} />
      )}
    </>
  );
}
