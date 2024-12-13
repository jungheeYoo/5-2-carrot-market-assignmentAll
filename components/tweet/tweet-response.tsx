import { formatToTimeAgo } from '@/lib/utils';

interface TweetResponseItemProps {
  id: number;
  tweet: string;
  created_at: Date;
  user: {
    username: string;
  };
}

export default function TweetResponseItem({
  tweet,
  created_at,
  user,
}: TweetResponseItemProps) {
  return (
    <li className="w-full list-none">
      <div className="flex gap-2 ">
        <h4>{user.username}</h4>
        <span>{formatToTimeAgo(created_at.toString())}</span>
      </div>
      <p className="w-full">{tweet}</p>
    </li>
  );
}
