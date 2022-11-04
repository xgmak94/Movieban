import Link from 'next/link';
import { MdOutlineLightMode, MdOutlineModeNight } from 'react-icons/md';

import { useTheme } from 'next-themes';

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="sticky top-0 p-3 text-black dark:text-white bg-slate-200 dark:bg-slate-600">
      <div className="container flex flex-row justify-between items-center">
        <div className="container flex justify-start gap-3">
          <Link href="/">
            <span className="text-xl font-semibold">Movie Board</span>
          </Link>
          <Link href="/board">
            <span className="text-xl font-semibold capitalize">placeholder link to board</span>
          </Link>
        </div>
        <div className="container flex justify-end gap-3">
          <button className="hover:animate-bounce">Search</button>
          <button className="hover:animate-bounce">Login</button>
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'light' ? <MdOutlineLightMode /> : <MdOutlineModeNight />}
          </button>
        </div>
      </div>
    </nav>
  );
}
