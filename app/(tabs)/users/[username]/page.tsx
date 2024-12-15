import Link from 'next/link';
import { getLoggedInUser, getUserByUsername } from './actions';
import TweetPostItem from '@/components/tweet/tweet-post';

export default async function User({
  params,
}: {
  params: { username: string };
}) {
  const user = await getUserByUsername(params.username);
  const userInfo = await getLoggedInUser();

  return (
    <div className="flex flex-col gap-5 *:w-full">
      <section className="mt-10 p-3 border-b border-neutral-700">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xl font-bold">{user.username}</span>
          {userInfo.username === user.username && (
            <Link
              href={`/users/${userInfo.username}/edit`}
              className="bg-[#d8d3ff] p-2 border border-neutral-700 rounded-full text-sm hover:bg-[#d8d3ff94] transition"
            >
              Edit Profile
            </Link>
          )}
        </div>
        <ul>
          <li>
            <span>{user.email}</span>
          </li>
          <li>
            <span className="text-sm text-gray-400">
              {user.bio ? user.bio : '아직 자기 소개가 없습니다.'}
            </span>
          </li>
        </ul>
      </section>
      <section>
        <ul>
          {user.tweets?.map((tweet, index) => (
            <div
              key={tweet.id}
              className={`border-b border-neutral-200 ${
                index === user.tweets.length - 1 ? '' : 'pb-4'
              }`}
            >
              <TweetPostItem {...tweet} />
            </div>
          ))}
        </ul>
      </section>
    </div>
  );
}
