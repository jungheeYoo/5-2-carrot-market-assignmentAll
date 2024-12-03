import TweetPostList from '@/components/tweet-post-list';
import db from '@/lib/db';
import { Prisma } from '@prisma/client';

async function getInitialTweets() {
  const Tweets = await db.tweet.findMany({
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
    take: 1,
    orderBy: {
      created_at: 'desc',
    },
  });
  return Tweets;
}

export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>;

export default async function Home() {
  const initialTweets = await getInitialTweets();
  return (
    <div>
      <TweetPostList initialTweets={initialTweets} />
    </div>
  );
}
