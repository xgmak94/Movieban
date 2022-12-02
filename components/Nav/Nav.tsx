import Link from 'next/link';
import ModeSwitch from './ModeSwitch';
import AvatarButton from './AvatarButton';
import { type User, useUser } from '@supabase/auth-helpers-react';
import { Button } from '@mui/material';

export default function Navbar() {
  const user: User | null = useUser();

  return (
    <nav className="flex flex-row items-center p-2 text-black dark:text-white max-w-screen bg-slate-200 dark:bg-slate-900">
      <div className="container flex justify-start gap-3">
        <Link href="/">
          <Button variant="text" className="text-xl font-semibold capitalize">
            Movie Board
          </Button>
        </Link>
      </div>
      <div className="container flex items-center justify-end gap-3">
        <Link href="/search">
          <Button className="text-lg capitalize hover:text-gray-50 dark:hover:text-gray-400">
            Search
          </Button>
        </Link>
        {user ? (
          <AvatarButton />
        ) : (
          <Link href="/login">
            <Button className="hover:text-gray-50 dark:hover:text-gray-400">Login</Button>
          </Link>
        )}
        <ModeSwitch />
      </div>
    </nav>
  );
}
