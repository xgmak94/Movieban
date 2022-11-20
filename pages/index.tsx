import Link from 'next/link';

import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useSession, useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import Board from './board';

export default function Homepage() {
  const user = useUser();
  const supabase = useSupabaseClient();

  return (
    <>
      {user ? (
        <Board />
      ) : (
        <div className="text-black dark:text-white
        bg-gradient-to-tr from-red-200 via-gray-200 to-blue-500
        dark:from-gray-400 dark:via-gray-600 dark:to-blue-900">
          <div className="flex flex-col h-screen justify-center">
            <div className="flex text-4xl justify-center m-1">
              Keep track of your favorite movies
            </div>
            <div className="flex text-3xl justify-center m-1">Login to get started</div>
            <div className="flex text-3xl justify-center m-1">
              <Link href="/login">
                <button className="font-bold py-2 px-4 rounded-full bg-blue-500 m-1">Login</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
