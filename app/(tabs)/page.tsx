import AddTweet from '@/app/(tabs)/tweets/add/add-tweet';
import TweetPostList from '@/components/tweet/tweet-post-list';
import { getInitialTweets } from '@/lib/tweet';

export default async function Home() {
  const initialTweets = await getInitialTweets();
  return (
    <div>
      <AddTweet />
      <TweetPostList initialTweets={initialTweets} />
    </div>
  );
}
