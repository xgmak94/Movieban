import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useUser, useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';

export default function LoginPage() {
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

  console.log(user, session);
  return (
    <div className="p-3 min-h-screen">
      {user ? (
        <>
          <p>user:</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      ) : (
        <Auth
          redirectTo="http://localhost:3000/"
          appearance={{ theme: ThemeSupa }}
          supabaseClient={supabaseClient}
          providers={['google', 'github']}
        />
      )}
    </div>
  );
}
