'use server';

import db from '@/lib/db';
import getSession from '@/lib/session';
import { Prisma } from '@prisma/client';
import { notFound } from 'next/navigation';

export async function getLoggedInUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

export async function getUserByUsername(username: string) {
  console.log('Username parameter:', username);
  const user = await db.user.findUnique({
    where: {
      username,
    },
    include: {
      tweets: {
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
      },
    },
  });

  // console.log('Fetched user:', user);

  if (user) {
    return user;
  }

  notFound();
}

export type InitialUserInfoType = Prisma.PromiseReturnType<
  typeof getLoggedInUser
>;
