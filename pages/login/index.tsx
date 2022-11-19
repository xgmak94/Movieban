import React from 'react';
import { useTheme } from 'next-themes';

import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { createClient } from '@supabase/supabase-js';

export default function Login() {
  const { theme } = useTheme();

  const session = useSession();
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  );

  return (
    <div className="p-3 dark:text-white h-screen">
      <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme={theme} />
    </div>
  );
}
