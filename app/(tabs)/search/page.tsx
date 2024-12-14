'use client';

import { useFormState } from 'react-dom';
import { getSearchTweets } from './actions';
import FormInput from '@/components/form/form-input';
import { TweetSearch } from '@/components/icons/user-icon';
import Link from 'next/link';

export default function Search() {
  const [state, dispatch] = useFormState(
    async (_: unknown, fromData: FormData) => {
      const keyword = fromData.get('keyword') as string;
      return await getSearchTweets(keyword);
    },
    null
  );

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <div className="max-w-md w-full -mt-52">
        <div className="flex flex-col gap-2 mb-5 *:font-medium text-center">
          <h1 className="text-xl">Searching for Tweets... </h1>
        </div>
        <form action={dispatch} className="flex flex-col gap-3">
          <FormInput
            type="text"
            name="keyword"
            placeholder="Search tweets..."
            required={true}
            errors={state?.error ? [state.error] : []}
            icon={<TweetSearch />}
          />
          <button
            type="submit"
            className="mt-4 bg-[#d8d3ff] text-white px-4 py-2 rounded-full"
          >
            Search
          </button>

          {state?.data && (
            <ul className="mt-4">
              {state.data.length > 0 ? (
                state.data.map((tweet) => (
                  <li className="py-2" key={tweet.id}>
                    <Link href={`/tweets/${tweet.id}`}>
                      {tweet.tweet} by {tweet.user.username}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="py-2 text-gray-500 text-center">
                  No tweets found. Try another keyword.
                </li>
              )}
            </ul>
          )}
        </form>
      </div>
    </div>
  );
}
