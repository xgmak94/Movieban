import Link from 'next/link';

import { type User, useUser } from '@supabase/auth-helpers-react';
import Board from '../components/Board/Board';

export default function Homepage() {
  const user: User | null = useUser();

  return (
    <>
      <div
        className="text-black dark:text-white bg-gradient-to-tr
        from-red-200 to-blue-500
        dark:from-gray-600 dark:to-blue-900"
      >
        {user ? (
          <Board />
        ) : (
          <div className="flex flex-col h-screen justify-center gap-1">
            <div className="flex text-4xl justify-center">Keep track of your favorite movies</div>
            <div className="flex text-3xl justify-center">Login to get started</div>
            <div className="flex text-3xl justify-center">
              <Link href="/login">
                <button className="btn">
                  Login
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
