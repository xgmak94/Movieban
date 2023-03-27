import React from 'react';
import { type NextRouter, useRouter } from 'next/router';
import {
  type SupabaseClient,
  useSupabaseClient,
} from '@supabase/auth-helpers-react';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useTheme } from 'next-themes';
import type { UseThemeProps } from 'next-themes/dist/types';
import type { GetServerSideProps } from 'next';
import { RedirectTo } from '@supabase/auth-ui-react/dist/esm/src/types';

type ServeSideProps = { host: string | null };

interface Props {
  host: string | null;
}

export const getServerSideProps: GetServerSideProps<ServeSideProps> = async (
  context
) => ({ props: { host: context.req.headers.host || null } });

export default function Login({ host }: Props) {
  const router: NextRouter = useRouter();
  const { theme, setTheme }: UseThemeProps = useTheme();
  const supabaseClient: SupabaseClient = useSupabaseClient();

  supabaseClient.auth.onAuthStateChange(async (event: String) => {
    if (event === 'SIGNED_IN') {
      router.push('/');
    }
  });

  return (
    <div
      className='min-h-screen p-3 text-black dark:text-white bg-gradient-to-tr
    from-red-200 via-gray-200 to-blue-500
    dark:from-gray-400 dark:via-gray-600 dark:to-blue-900'
    >
      <Auth
        redirectTo={host as RedirectTo}
        appearance={{ theme: ThemeSupa }}
        supabaseClient={supabaseClient}
        providers={['google', 'github']}
        socialLayout='vertical'
        theme={theme}
        localization={{ lang: 'en' }}
      />
    </div>
  );
}
