import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import ModeSwitch from './ModeSwitch';

export default function Navbar() {
  const user = useUser();
  const supabaseClient = useSupabaseClient();

  return (
    <nav className="p-3 text-black dark:text-white bg-slate-200 dark:bg-slate-900">
      <div className="flex flex-row justify-between items-center">
        <div className="container flex justify-start gap-3">
          <Link href="/">
            <span className="text-xl font-semibold">Movie Board</span>
          </Link>
        </div>
        <div className="flex justify-end gap-3">
          {user ? (
            <button className="" onClick={() => supabaseClient.auth.signOut()}>
              Sign out
            </button>
          ) : null}
          <ModeSwitch />
        </div>
      </div>
    </nav>
  );
}
