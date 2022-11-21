import React from 'react';
import { useUser } from '@supabase/auth-helpers-react';

export default function ProfilePage() {
  const user = useUser();

  return (
    <div className="min-h-screen">
      <div>{JSON.stringify(user)}</div>
    </div>
  );
}
