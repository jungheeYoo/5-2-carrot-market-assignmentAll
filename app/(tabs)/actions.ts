'use server';

import db from '@/lib/db';

export default async function getMoreTweets(page: number) {
  const tweetsPerPage = 5;
  const skip = page * tweetsPerPage;

  const tweets = await db.tweet.findMany({
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
    take: tweetsPerPage,
    skip: skip,
    orderBy: {
      created_at: 'desc',
    },
  });
  return tweets;
}
