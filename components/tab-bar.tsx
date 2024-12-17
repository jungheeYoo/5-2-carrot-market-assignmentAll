'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon as SolidHomeIcon,
  MagnifyingGlassCircleIcon as SolidSearchIcon,
  UserIcon as SolidUserIcon,
} from '@heroicons/react/24/solid';
import {
  HomeIcon as OutlineHomeIcon,
  MagnifyingGlassCircleIcon as OutlineSearchIcon,
  UserIcon as OutlineUserIcon,
} from '@heroicons/react/24/outline';

export default function TabBar({ username }: { username: string }) {
  const pathname = usePathname();
  return (
    <section className="flex-shrink-0 w-full mx-auto grid grid-cols-3 px-3 py-3 *:text-balc bg-[#f0f0f0] border-t border-neutral-300 ">
      <Link href="/" className="flex flex-col items-center gap-px">
        {pathname === '/' ? (
          <SolidHomeIcon className="w-7 h-7" />
        ) : (
          <OutlineHomeIcon className="w-7 h-7" />
        )}
        <span>tweet</span>
      </Link>
      <Link href="/search" className="flex flex-col items-center gap-px">
        {pathname === '/search' ? (
          <SolidSearchIcon className="w-7 h-7" />
        ) : (
          <OutlineSearchIcon className="w-7 h-7" />
        )}
        <span>search</span>
      </Link>
      <Link
        href={`/users/${username}`}
        className="flex flex-col items-center gap-px"
      >
        {pathname === `/users/${username}` ? (
          <SolidUserIcon className="w-7 h-7" />
        ) : (
          <OutlineUserIcon className="w-7 h-7" />
        )}
        <span>user</span>
      </Link>
    </section>
  );
}
