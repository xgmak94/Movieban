import Link from 'next/link';

export default function Homepage() {
  return (
    <>
      <div className="grid place-items-center h-screen text-black dark:text-white bg-gradient-to-r from-red-300 to-blue-500 p-3">
        <div className="flex flex-col justify-center">
          <div className="flex text-4xl justify-center m-1">Keep track of your favorite movies</div>
          <div className="flex text-3xl justify-center m-1">Login to get started</div>
          <div className="flex text-3xl justify-center m-1">
            <Link href="/api/auth/login">
              <button className="font-bold py-2 px-4 rounded-full bg-blue-500 m-1">Login</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
