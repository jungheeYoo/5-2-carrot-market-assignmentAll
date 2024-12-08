import { formatToTimeAgo } from '@/lib/utils';
import Link from 'next/link';

interface TweetResponseItemProps {
  id: number;
  tweet: string;
  created_at: Date;
  user: {
    username: string;
  };
}

export default function TweetResponseItem({
  id,
  tweet,
  created_at,
  user,
}: TweetResponseItemProps) {
  return (
    <li className="w-full">
      <Link
        href={`/tweets/${id}`}
        className="flex gap-5 border-b-gray-500 border-b-[1px] pb-4"
      >
        <div className="bg-gray-500 size-28 rounded-md" />
        <div className="flex flex-col gap-2 ">
          <h4>{user.username}</h4>
          <span>{formatToTimeAgo(created_at.toString())}</span>
        </div>
        <p className="w-full">{tweet}</p>
      </Link>
    </li>
  );
}
