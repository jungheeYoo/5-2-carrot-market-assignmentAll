'use server';

import db from '@/lib/db';
import getSession from '@/lib/session';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';

const responseSchema = z.object({
  response: z
    .string({
      required_error: 'Please enter your content.',
    })
    .max(150, 'You can enter up to 150 characters.'),
  tweetId: z.coerce.number(),
});

export async function uploadResponse(formData: FormData) {
  const data = {
    response: formData.get('response'),
    tweetId: formData.get('tweetId'),
  };

  const tweetId = formData.get('tweetId');
  const result = responseSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      await db.response.create({
        data: {
          payload: result.data.response,
          user: {
            connect: {
              id: session.id,
            },
          },
          tweet: {
            connect: {
              id: result.data.tweetId,
            },
          },
        },
        select: {
          id: true,
          payload: true,
        },
      });
      revalidateTag(`tweet-responses-${tweetId}`);
    }
  }
}
