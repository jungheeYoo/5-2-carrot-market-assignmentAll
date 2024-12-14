import db from '@/lib/db';
import getSession from '@/lib/session';
import { notFound } from 'next/navigation';
import { unstable_cache as nextCache } from 'next/cache';
import LikeButton from '@/components/tweet/tweet-like-button';
import TweetResponseList from '@/components/tweet/tweet-response-list';
import Link from 'next/link';

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
    tags: [`tweet-detail-${id}`],
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

async function getResponses(tweetId: number) {
  const responses = await db.response.findMany({
    where: {
      tweetId,
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
  const responseCount = await db.response.count({
    where: {
      tweetId,
    },
  });
  return { responses, responseCount };
}

async function getCachedResponses(tweetId: number) {
  const cachedOperation = nextCache(getResponses, ['tweet-response-status'], {
    tags: [`tweet-response-${tweetId}`],
  });
  return cachedOperation(tweetId);
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

  const session = await getSession();
  const sessionId = session?.id;

  if (!sessionId) {
    return notFound();
  }

  const tweet = await getCachedTweet(id);
  if (!tweet) {
    return notFound();
  }

  const { likeCount, isLiked } = await getCachedLikeStatus(id);
  const { responseCount, responses } = await getCachedResponses(id);

  return (
    <div>
      <div>
        <Link
          href={`/users/${tweet.user.username}`}
          className="p-5 flex items-center gap-3 border-b border-neutral-700"
        >
          <h3>{tweet.user.username}</h3>
        </Link>
        <p className="p-5 ">{tweet.tweet}</p>
        <div className="flex flex-col gap-5">
          <LikeButton isLiked={isLiked} likeCount={likeCount} tweetId={id} />
          <TweetResponseList
            tweetId={id}
            responses={responses}
            responseCount={responseCount}
          />
        </div>
      </div>
    </div>
  );
}
