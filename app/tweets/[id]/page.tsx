import db from '@/lib/db';
import { notFound } from 'next/navigation';

async function getTweet(id: number) {
  // await new Promise((resolve) => setTimeout(resolve, 10000));
  const tweet = await db.tweet.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      tweet: true,
      created_at: true,
      updated_at: true,
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
  return tweet;
}

export default async function TweetPostDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const tweet = await getTweet(id);
  if (!tweet) {
    return notFound();
  }

  return (
    <div>
      <div>
        <h3 className="p-5 flex items-center gap-3 border-b border-neutral-700">
          {tweet.user.username}
        </h3>
        <p className="p-5 ">{tweet.tweet}</p>
      </div>
    </div>
  );
}
