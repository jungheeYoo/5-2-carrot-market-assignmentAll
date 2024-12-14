'use server';

import db from '@/lib/db';
import { z } from 'zod';

const keywordSchema = z.string().min(1, 'Keyword must not be empty');

export async function getSearchTweets(keyword: string) {
  const result = keywordSchema.safeParse(keyword);

  if (!result.success) {
    return {
      data: null,
      error: result.error.flatten().formErrors.join(', '),
    };
  }

  try {
    const tweets = await db.tweet.findMany({
      where: {
        tweet: {
          contains: result.data,
        },
      },
      select: {
        id: true,
        created_at: true,
        updated_at: true,
        tweet: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });

    return { data: tweets, error: null };
  } catch (e) {
    return { data: null, error: 'Failed to fetch tweets' };
  }
}
