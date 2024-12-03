import Link from 'next/link';
import { formatToTimeAgo } from '@/lib/utils';

interface TweetPostItemProps {
  id: number;
  created_at: Date;
  updated_at: Date;
  user: {
    id: number;
    username: string;
  };
}

export default function TweetPostItem({
  id,
  created_at,
  user: { username },
}: TweetPostItemProps) {
  return (
    <li className="w-full">
      <Link
        href={`/tweets/${id}`}
        className="flex gap-5 border-b-gray-500 border-b-[1px] pb-4"
      >
        <div className="bg-gray-500 size-28 rounded-md" />
        <div className="flex flex-col gap-2 ">
          <h4>{username}</h4>
          <span>{formatToTimeAgo(created_at.toString())}</span>
        </div>
      </Link>
    </li>
  );
}
