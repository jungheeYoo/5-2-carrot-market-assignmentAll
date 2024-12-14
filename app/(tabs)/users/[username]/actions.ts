import db from '@/lib/db';
import getSession from '@/lib/session';
import { notFound } from 'next/navigation';

export async function getUserInfo() {
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

export async function getUser(username: string) {
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
      },
    },
  });

  // console.log('Fetched user:', user);

  if (user) {
    return user;
  }

  notFound();
}
