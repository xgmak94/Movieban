import Link from 'next/link';

import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useSession, useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import Board from './board';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export default function Homepage() {
  const { theme } = useTheme();

  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const session = useSession();
  const [data, setData] = useState();

  useEffect(() => {
    async function loadData() {
      const { data } = await supabaseClient.from('test').select('*');
      setData(data as any);
    }
    // Only run query once user is logged in.
    if (user) loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      {user ? (
        <Board />
      ) : (
        <div className="grid place-items-center h-screen text-black dark:text-white bg-gradient-to-r from-red-200 to-blue-500 p-3">
          <Auth
            redirectTo="http://localhost:3000/"
            appearance={{ theme: ThemeSupa }}
            supabaseClient={supabaseClient}
            providers={['google', 'github']}
            socialLayout="horizontal"
            theme={theme}
          />
        </div>
      )}
    </>
  );
}
