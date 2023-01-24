import Link from 'next/link';
import ModeSwitch from './ModeSwitch';
import AvatarButton from './AvatarButton';
import { type User, useUser } from '@supabase/auth-helpers-react';

export default function Navbar() {
  const user: User | null = useUser();

  return (
    <nav className="flex flex-row items-center p-2 text-black dark:text-white max-w-screen
    bg-gradient-to-r from-rose-300 via-violet-600 to-pink-300
    dark:bg-gradient-to-l dark:from-gray-900 dark:to-gray-600">
      <div className="container flex justify-start gap-3">
        <Link href="/">
          <button className="nav-item font-bold">
            Movie Board
          </button>
        </Link>
        <Link href="/search">
          <button className="nav-item">
            Search
          </button>
        </Link>
      </div>
      <div className="container flex items-center justify-end gap-5">
        {user ? (
          <AvatarButton />
        ) : (
          <Link href="/login">
            <button className="nav-item">Login</button>
          </Link>
        )}
        <ModeSwitch />
      </div>
    </nav>
  );
}
