import { useUser, useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function Login() {
  const router = useRouter();
  const { theme } = useTheme();
  const supabaseClient = useSupabaseClient();

  supabaseClient.auth.onAuthStateChange(async (event) => {
    if (event === 'SIGNED_IN') {
      router.push('/board');
    }
  });

  return (
    <div
      className="grid place-items-center h-screen text-black dark:text-white
    bg-gradient-to-tr from-red-200 via-gray-200 to-blue-500
    dark:from-gray-400 dark:via-gray-600 dark:to-blue-900"
    >
      <Auth
        redirectTo={window.location.origin}
        appearance={{ theme: ThemeSupa }}
        supabaseClient={supabaseClient}
        providers={['google', 'github']}
        socialLayout="horizontal"
        theme={theme}
      />
    </div>
  );
}
