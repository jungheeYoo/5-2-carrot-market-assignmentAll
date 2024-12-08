import db from '@/lib/db';
import getSession from '@/lib/session';
import { notFound } from 'next/navigation';
import { unstable_cache as nextCache } from 'next/cache';
import LikeButton from '@/components/tweet-like-button';

async function getTweet(id: number) {
  // await new Promise((resolve) => setTimeout(resolve, 10000));
  try {
    const tweet = await db.tweet.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        tweet: true,
        created_at: true,
        updated_at: true,
        likes: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
    return tweet;
  } catch (e) {
    return null;
  }
}

async function getCachedTweet(id: number) {
  const session = await getSession();
  const userId = session.id;
  console.log(userId);
  const cachedOperation = nextCache(getTweet, ['tweet-detail'], {
    tags: [`like-status-${id}`],
  });
  return cachedOperation(id);
}

async function getLikeStatus(tweetId: number, userId: number) {
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        tweetId,
        userId,
      },
    },
  });
  const likeCount = await db.like.count({
    where: {
      tweetId,
    },
  });
  return {
    likeCount,
    isLiked: Boolean(isLiked),
  };
}

async function getCachedLikeStatus(tweetId: number) {
  const session = await getSession();
  const userId = session.id;
  const cachedOperation = nextCache(getLikeStatus, ['tweet-like-status'], {
    tags: [`like-status-${tweetId}`],
  });
  return cachedOperation(tweetId, userId!);
}

export default async function TweetPostDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const tweet = await getCachedTweet(id);
  if (!tweet) {
    return notFound();
  }

  const { likeCount, isLiked } = await getCachedLikeStatus(id);
  return (
    <div>
      <div>
        <h3 className="p-5 flex items-center gap-3 border-b border-neutral-700">
          {tweet.user.username}
        </h3>
        <p className="p-5 ">{tweet.tweet}</p>
        <div className="flex flex-col gap-5 items-end">
          <LikeButton isLiked={isLiked} likeCount={likeCount} tweetId={id} />
        </div>
      </div>
    </div>
  );
}
