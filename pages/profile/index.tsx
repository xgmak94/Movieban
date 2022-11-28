import React from 'react';
import { type User, useUser } from '@supabase/auth-helpers-react';

export default function ProfilePage() {
  const user: User | null = useUser();

  return (
    <div
      className="p-3 min-h-screen text-black dark:text-white bg-gradient-to-tr
      from-red-200 via-gray-200 to-blue-500
    dark:from-gray-400 dark:via-gray-600 dark:to-blue-900"
    >
      {user ? <div>{JSON.stringify(user)}</div> : null}
    </div>
  );
}
