'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon as SolidHomeIcon,
  UserIcon as SolidUserIcon,
} from '@heroicons/react/24/solid';
import {
  HomeIcon as OutlineHomeIcon,
  UserIcon as OutlineUserIcon,
} from '@heroicons/react/24/outline';

export default function TabBar() {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 w-full mx-auto max-w-screen-sm grid grid-cols-2 border-neutral-600 border-t px-3 py-3 *:text-balc">
      <Link href="/" className="flex flex-col items-center gap-px">
        {pathname === '/' ? (
          <SolidHomeIcon className="w-7 h-7" />
        ) : (
          <OutlineHomeIcon className="w-7 h-7" />
        )}
        <span>tweet</span>
      </Link>
      <Link href="/profile" className="flex flex-col items-center gap-px">
        {pathname === '/profile' ? (
          <SolidUserIcon className="w-7 h-7" />
        ) : (
          <OutlineUserIcon className="w-7 h-7" />
        )}
        <span>profile</span>
      </Link>
    </div>
  );
}
