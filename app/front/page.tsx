import Link from 'next/link';
import { pacifico } from '../layout';

export default function FrontPage() {
  return (
    <div className="flex flex-col items-center justify-between bg-[#f0f0f0] w-full h-full">
      <header className="ml-96 text-xs text-neutral-600">
        A community for culture and arts 🩰
      </header>
      <main className="my-auto mt-32 flex flex-col items-center gap-28 *:font-medium mt">
        <div className="relative group">
          <h1
            className={`${pacifico.className} font-bold text-9xl text-gray-300 transition-transform duration-300 group-hover:translate-y-2`}
          >
            welcome
          </h1>
          <span
            className={`${pacifico.className} font-bold text-9xl absolute top-0 left-0 text-neutral-900 transition-transform duration-300 group-hover:-translate-y-2`}
          >
            welcome
          </span>
        </div>
        <div className="flex flex-col items-center gap-4 w-96 text-sm">
          <Link
            href="/create-account"
            className="border rounded-xl w-full text-center bg-neutral-900 text-white py-2 hover:text-[#d7acc6] transition-all duration-300 ease-in-out"
          >
            <span>Create Account</span>
          </Link>

          <Link
            href="/login"
            className="border rounded-xl w-full text-center bg-neutral-900 text-white py-2 hover:text-[#d7acc6] transition-all duration-300 ease-in-out"
          >
            <span>Login</span>
          </Link>
        </div>
      </main>
      <footer className="flex-shrink-0 text-center text-sm text-neutral-300 bg-[#f0f0f0] p-2">
        2024 Last Assignment-34 by Joy
      </footer>
    </div>
  );
}
