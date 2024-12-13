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

type ActionState = {
  fieldErrors?: {
    response?: string[];
    tweetId?: string[];
  };
  success?: boolean;
  data?: {
    id: number;
    payload: string;
    created_at: Date;
    user: {
      id: number;
      username: string;
    };
  };
  error?: string;
};

export async function addResponse(
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  try {
    const data = {
      response: formData.get('response'),
      tweetId: formData.get('tweetId'),
    };

    const result = responseSchema.safeParse(data);

    if (!result.success) {
      return {
        fieldErrors: result.error.flatten().fieldErrors as {
          response?: string[];
          tweetId?: string[];
        },
      };
    }

    const session = await getSession();
    if (!session.id) {
      return {
        success: false,
        error: 'Unauthorized',
      };
    }

    const response = await db.response.create({
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
        created_at: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    revalidateTag(`tweet-response-${result.data.tweetId}`);

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    console.error('Error creating response:', error);
    return {
      success: false,
      error: 'Failed to create response',
    };
  }
}
