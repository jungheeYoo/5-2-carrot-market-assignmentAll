'use server';

import db from '@/lib/db';

export default async function getMoreTweets(page: number) {
  const tweets = await db.tweet.findMany({
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
    skip: page * 1,
    take: 1,
    orderBy: {
      created_at: 'desc',
    },
  });
  return tweets;
}
