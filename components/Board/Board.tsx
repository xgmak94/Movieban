/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Movie, List } from '../../models/movies';
import {
  type User,
  type SupabaseClient,
  useSupabaseClient,
  useUser,
} from '@supabase/auth-helpers-react';
import { useMediaQuery } from '@mui/material';
import { DropResult } from 'react-beautiful-dnd';

const SingleColumn = dynamic(() => import('./SingleColumn'));
const MultiColumn = dynamic(() => import('./MultiColumn'));

export default function Board() {
  const user: User = useUser() as User;
  const supabaseClient: SupabaseClient = useSupabaseClient();
  const mdScreen: Boolean = useMediaQuery('(min-width:768px)');

  const [backlog, setBacklog] = useState<Movie[]>([]);
  const [watching, setWatching] = useState<Movie[]>([]);
  const [watched, setWatched] = useState<Movie[]>([]);

  const columns = [
    { label: 'Backlog', columnData: backlog, setColumnData: setBacklog },
    { label: 'Watching', columnData: watching, setColumnData: setWatching },
    { label: 'Watched', columnData: watched, setColumnData: setWatched },
  ];

  useEffect(() => {
    async function loadData() {
      const user_info = await supabaseClient
        .from('user_board')
        .select()
        .eq('user', user.id);

      if (user_info.data == null) return;

      let movieInfo = [];
      for (let i = 0; i < user_info.data.length; i++) {
        let resp = await supabaseClient
          .from('movie')
          .select()
          .eq('id', user_info.data[i].movie_id)
          .single();

        movieInfo.push(resp.data);
      }
      let backList: Movie[] = [];
      let watchingList: Movie[] = [];
      let watchedList: Movie[] = [];
      for (let i = 0; i < user_info.data.length; i++) {
        if (user_info.data[i].movie_status === 'Backlog') {
          backList.push(movieInfo[i]);
        } else if (user_info.data[i].movie_status === 'Watching') {
          watchingList.push(movieInfo[i]);
        } else {
          watchedList.push(movieInfo[i]);
        }
      }

      setBacklog(backList);
      setWatching(watchingList);
      setWatched(watchedList);
    }
    loadData();
  }, [user]);

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
        <MultiColumn
          columns={columns}
          handleOnDragEnd={handleOnDragEnd}
        />
      ) : (
        <SingleColumn
          columns={columns}
          handleOnDragEnd={handleOnDragEnd}
        />
      )}
    </>
  );
}
