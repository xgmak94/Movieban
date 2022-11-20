import { SupabaseClient, useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import ModeSwitch from './ModeSwitch';
import { Button } from "@material-tailwind/react";
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  supabaseClient.auth.onAuthStateChange(async (event) => {
    if (event === 'SIGNED_OUT') {
      router.push('/');
    }
  });

  return (
    <nav className="text-black dark:text-white max-w-screen bg-slate-200 dark:bg-slate-900">
      <div className="flex flex-row items-center">
        <div className="container flex justify-start gap-3">
          <Link href="/">
            <Button variant="text" className="text-xl font-semibold capitalize">movie board</Button>
          </Link>
        </div>
        <div className="flex justify-end gap-3 mr-5 p-3">
          {user ? (
            <Button className="hover:text-gray-50 dark:hover:text-gray-400 capitalize" onClick={() => supabaseClient.auth.signOut()}>
              logout
            </Button>
          ) : (
            <Link href="/login">
              <Button className="hover:text-gray-50 dark:hover:text-gray-400">Login</Button>
            </Link>
          )}
          <ModeSwitch/>
        </div>
      </div>
    </nav>
  );
}
