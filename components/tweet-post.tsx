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
      <Link href={`/tweets/${id}`} className="flex gap-6">
        <div className="flex gap-4 ">
          <h4>{username}</h4>
          <span className="text-sm text-neutral-500">
            {formatToTimeAgo(created_at.toString())}
          </span>
        </div>
      </Link>
    </li>
  );
}
