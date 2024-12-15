import Link from 'next/link';
import { formatToTimeAgo } from '@/lib/utils';
import {
  ChatBubbleBottomCenterIcon,
  HandThumbUpIcon,
} from '@heroicons/react/24/solid';

interface TweetPostItemProps {
  id: number;
  tweet: string | null;
  created_at: Date;
  updated_at: Date;
  views: number;
  user: {
    id: number;
    username: string;
  };
  _count: {
    likes: number;
    responses: number;
  };
}

export default function TweetPostItem({
  id,
  tweet,
  created_at,
  views,
  _count,
  user: { username },
}: TweetPostItemProps) {
  return (
    <li className="w-full list-none py-4 border-b border-neutral-500 last:border-b-0 hover:bg-gray-50 transition duration-300">
      <Link href={`/tweets/${id}`} className="flex flex-col gap-4">
        <div className="flex">
          <h4 className="mr-7 font-bold">{username}</h4>
          <p className="w-full">{tweet}</p>
        </div>

        <div className="flex justify-between">
          <div className="flex gap-4 items-center text-sm text-neutral-500">
            <span>{formatToTimeAgo(created_at.toString())}</span>
            <span>조회 {views}</span>
          </div>
          <div className="flex gap-4 text-sm text-neutral-500">
            <span className="flex items-center gap-1">
              <HandThumbUpIcon className="size-4" />
              {_count.likes}
            </span>
            <span className="flex items-center gap-1">
              <ChatBubbleBottomCenterIcon className="size-4" />
              {_count.responses}
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}
