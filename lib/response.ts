import db from '@/lib/db';
import { Prisma } from '@prisma/client';

export async function getInitialResponse() {
  const Response = await db.response.findMany({
    select: {
      id: true,
      payload: true,
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
  return Response;
}

export async function getResponses(tweetId: number) {
  const Response = await db.response.findMany({
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
    where: {
      tweetId,
    },
    orderBy: {
      created_at: 'desc',
    },
  });

  return Response;
}

export type InitialResponse = Prisma.PromiseReturnType<
  typeof getInitialResponse
>;
export type ResponseType = Prisma.PromiseReturnType<
  typeof getResponses
>[number];
