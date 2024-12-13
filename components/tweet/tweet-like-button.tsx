'use client';

import { HandThumbUpIcon } from '@heroicons/react/24/solid';
import { HandThumbUpIcon as OutlineHandThumbUpIcon } from '@heroicons/react/24/outline';
import { useOptimistic } from 'react';
import { dislikeTweet, likeTweet } from '@/app/(tabs)/tweets/[id]/actions';
import { startTransition } from 'react';

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  tweetId: number;
}

export default function LikeButton({
  isLiked,
  likeCount,
  tweetId,
}: LikeButtonProps) {
  const [state, reducerFn] = useOptimistic(
    { isLiked, likeCount },
    (previousState) => ({
      isLiked: !previousState.isLiked,
      likeCount: previousState.isLiked
        ? previousState.likeCount - 1
        : previousState.likeCount + 1,
    })
  );

  const onClick = async () => {
    startTransition(() => {
      reducerFn(undefined);
    });
    if (isLiked) {
      await dislikeTweet(tweetId);
    } else {
      await likeTweet(tweetId);
    }
  };
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center text-neutral-500 text-sm border border-neutral-500 rounded-full p-2 ml-[550px] transition-colors ${
        state.isLiked
          ? 'bg-[#d8d3ff] text-white border-[#d8d3ff]'
          : 'hover:bg-[#d8d3ff]'
      }`}
    >
      {state.isLiked ? (
        <HandThumbUpIcon className="size-5" />
      ) : (
        <OutlineHandThumbUpIcon className="size-5" />
      )}
      {state.isLiked ? (
        <span>{state.likeCount}</span>
      ) : (
        <span className="w-8">like</span>
      )}
    </button>
  );
}
