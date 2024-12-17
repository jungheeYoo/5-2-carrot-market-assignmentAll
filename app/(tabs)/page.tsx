import AddTweet from '@/app/(tabs)/tweets/add/add-tweet';
import TweetPostList from '@/components/tweet/tweet-post-list';
import { getInitialTweets } from '@/lib/tweet';

export default async function Home() {
  const initialTweets = await getInitialTweets();
  return (
    <main className="flex flex-col flex-1">
      <div className="flex-shrink-0">
        <AddTweet />
      </div>
      <div className="flex-1 overflow-hidden">
        <TweetPostList initialTweets={initialTweets} />
      </div>
    </main>
  );
}
