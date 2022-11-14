import Link from 'next/link';
import ModeSwitch from './ModeSwitch';

export default function Navbar() {
  return (
    <nav className="p-3 text-black dark:text-white bg-slate-200 dark:bg-slate-600">
      <div className="flex flex-row justify-between items-center">
        <div className="container flex justify-start gap-3">
          <Link href="/">
            <span className="text-xl font-semibold">Movie Board</span>
          </Link>
          <Link href="/board">
            <span className="text-xl font-semibold capitalize">placeholder link to board</span>
          </Link>
        </div>
        <div className="flex justify-end gap-3">
          <button className="hover:animate-bounce">Search</button>
          <button className="hover:animate-bounce">Login</button>
          <ModeSwitch />
        </div>
      </div>
    </nav>
  );
}
