import db from '@/lib/db';
import { Prisma } from '@prisma/client';

export async function getInitialTweets() {
  const Tweets = await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      created_at: true,
      updated_at: true,
      views: true,
      user: {
        select: {
          id: true,
          username: true,
        },
      },
      _count: {
        select: {
          likes: true,
          responses: true,
        },
      },
    },
    take: 5,
    skip: 0,
    orderBy: {
      created_at: 'desc',
    },
  });
  return Tweets;
}

export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>;
