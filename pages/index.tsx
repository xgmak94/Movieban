import Link from 'next/link';

import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import Board from './board';
import Button from '@mui/material/Button';

export default function Homepage() {
  const user = useUser();

  return (
    <>
      {user ? (
        <Board />
      ) : (
        <div
          className="text-black dark:text-white
        bg-gradient-to-tr from-red-200 via-gray-200 to-blue-500
        dark:from-gray-400 dark:via-gray-600 dark:to-blue-900"
        >
          <div className="flex flex-col h-screen justify-center gap-1">
            <div className="flex text-4xl justify-center">
              Keep track of your favorite movies
            </div>
            <div className="flex text-3xl justify-center">Login to get started</div>
            <div className="flex text-3xl justify-center">
              <Link href="/login">
                <Button variant="contained" className="hover:text-gray-50 dark:hover:text-gray-400">Login</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
