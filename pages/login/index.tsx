import React from 'react';
import { type NextRouter, useRouter } from 'next/router';
import { type SupabaseClient, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useTheme } from 'next-themes';
import type { UseThemeProps } from 'next-themes/dist/types';

export default function Login() {
  const router: NextRouter = useRouter();
  const { theme, setTheme }: UseThemeProps = useTheme();
  const supabaseClient: SupabaseClient = useSupabaseClient();

  supabaseClient.auth.onAuthStateChange(async (event: String) => {
    if (event === 'SIGNED_IN') {
      router.push('/board');
    }
  });

  return (
    <div
      className="min-h-screen p-3 text-black dark:text-white bg-gradient-to-tr
    from-red-200 via-gray-200 to-blue-500
    dark:from-gray-400 dark:via-gray-600 dark:to-blue-900"
    >
      <Auth
        redirectTo={process.env.NEXT_PUBLIC_SUPABASE_REDIRECT_URL}
        appearance={{ theme: ThemeSupa }}
        supabaseClient={supabaseClient}
        providers={['google', 'github']}
        socialLayout="vertical"
        theme={theme}
        localization={{ lang: 'en' }}
      />
    </div>
  );
}
