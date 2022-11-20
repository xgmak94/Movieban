import { useUser, useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function Login() {
  const router = useRouter();
  const { theme } = useTheme();
  const user = useUser();
  const [data, setData] = useState();
  const supabaseClient = useSupabaseClient();

  supabaseClient.auth.onAuthStateChange(async (event) => {
    if (event === 'SIGNED_IN') {
      router.push('/board');
    }
  });

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
    <div className="grid place-items-center h-screen text-black dark:text-white
    bg-gradient-to-tr from-red-200 via-gray-200 to-blue-500
    dark:from-gray-400 dark:via-gray-600 dark:to-blue-900">
      <Auth
        redirectTo="http://localhost:3000/"
        appearance={{ theme: ThemeSupa }}
        supabaseClient={supabaseClient}
        providers={['google', 'github']}
        socialLayout="horizontal"
        theme={theme}
      />
    </div>
  );
}
