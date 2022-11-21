import { SupabaseClient, useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import ModeSwitch from './ModeSwitch';
import { useRouter } from 'next/router';

import { Avatar, Button, Menu, MenuHandler, MenuList, MenuItem } from '@material-tailwind/react';

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
    <nav className="flex flex-row items-center m-1 text-black dark:text-white max-w-screen bg-slate-200 dark:bg-slate-900">
      <div className="container flex justify-start gap-3">
        <Link href="/">
          <Button variant="text" className="text-xl font-semibold capitalize">
            movie board
          </Button>
        </Link>
      </div>
      <div className="container flex justify-end gap-3">
        {user ? (
          <Menu>
            <MenuHandler>
              <Avatar
                className="cursor-pointer hover:opacity-75"
                src={user.user_metadata.avatar_url}
                referrerPolicy="no-referrer"
              />
            </MenuHandler>
            <MenuList>
              <MenuItem>
                <Link href="/profile">Edit Profile</Link>
              </MenuItem>
              <MenuItem onClick={() => supabaseClient.auth.signOut()}>Logout</MenuItem>
            </MenuList>
          </Menu>
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
