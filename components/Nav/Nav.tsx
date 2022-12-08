import Link from 'next/link';
import ModeSwitch from './ModeSwitch';
import AvatarButton from './AvatarButton';
import { type User, useUser } from '@supabase/auth-helpers-react';

export default function Navbar() {
  const user: User | null = useUser();

  return (
    <nav className="flex flex-row items-center p-2 text-black dark:text-white max-w-screen bg-slate-200 dark:bg-slate-900">
      <div className="container flex justify-start gap-3">
        <Link href="/">
          <button className="text-xl text-black dark:text-white font-semibold capitalize">
            Movie Board
          </button>
        </Link>
        <Link href="/search">
          <button className="text-lg text-black dark:text-white capitalize hover:text-gray-50 dark:hover:text-gray-400">
            Search
          </button>
        </Link>
      </div>
      <div className="container flex items-center justify-end gap-5">
        {user ? (
          <AvatarButton />
        ) : (
          <Link href="/login">
            <button className="hover:text-gray-50 dark:hover:text-gray-400">Login</button>
          </Link>
        )}
        <ModeSwitch />
      </div>
    </nav>
  );
}
