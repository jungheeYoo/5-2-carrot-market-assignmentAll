'use client';

import { useState } from 'react';
import getMoreTweets from '@/app/(tabs)/actions';
import TweetPostItem from './tweet-post';
import { InitialTweets } from '@/lib/tweet';

interface TweetPostListProps {
  initialTweets: InitialTweets;
}

export default function TweetPostList({ initialTweets }: TweetPostListProps) {
  const [tweets, setTweets] = useState(initialTweets);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLoadable, setIsLoadable] = useState(true);

  const fetchTweets = async (targetPage: number) => {
    setIsLoading(true);
    try {
      const newTweets = await getMoreTweets(targetPage);
      setTweets(newTweets);
      setPage(targetPage);
      setIsLoadable(newTweets.length === 5);
    } catch (error) {
      console.error('Error fetching tweets:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevClick = () => {
    if (page > 0) {
      fetchTweets(page - 1);
    }
  };

  const handleNextClick = () => {
    if (isLoadable) {
      fetchTweets(page + 1);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto">
        {tweets.map((tweet) => (
          <TweetPostItem key={tweet.id} {...tweet} />
        ))}
      </div>
      <div className="flex-shrink-0 p-5">
        <ul className="flex flex-row gap-5 justify-end items-center">
          <li>
            <button
              onClick={handlePrevClick}
              disabled={page === 0 || isLoading}
            >
              &lt;
            </button>
          </li>
          <li>
            <span className="font-medium">{page + 1}</span>
          </li>
          <li>
            <button
              onClick={handleNextClick}
              disabled={!isLoadable || isLoading}
            >
              &gt;
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
