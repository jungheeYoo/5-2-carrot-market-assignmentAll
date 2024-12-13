import Link from 'next/link';
import { formatToTimeAgo } from '@/lib/utils';

interface TweetPostItemProps {
  id: number;
  tweet: string;
  created_at: Date;
  updated_at: Date;
  user: {
    id: number;
    username: string;
  };
}

export default function TweetPostItem({
  id,
  tweet,
  created_at,
  user: { username },
}: TweetPostItemProps) {
  return (
    <li className="w-full list-none">
      <Link href={`/tweets/${id}`} className="flex gap-6">
        <div className="flex gap-4 ">
          <div className="flex flex-col text-center">
            <h4>{username}</h4>
            <span className="text-sm text-neutral-500">
              {formatToTimeAgo(created_at.toString())}
            </span>
          </div>
        </div>
        <p className="w-full">{tweet}</p>
      </Link>
    </li>
  );
}
