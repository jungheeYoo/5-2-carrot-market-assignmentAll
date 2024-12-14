import { getUser } from './actions';
import TweetPostItem from '@/components/tweet/tweet-post';

export default async function User({
  params,
}: {
  params: { username: string };
}) {
  // console.log('Params:', params);
  const user = await getUser(params.username);

  return (
    <div className="flex flex-col gap-5 *:w-full">
      <section className="mt-10 p-3 border-b border-neutral-700">
        <ul>
          <li>
            <span className="text-xl font-bold">{user.username}</span>
          </li>
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
            <li
              key={tweet.id}
              className={`border-b border-neutral-200 ${
                index === user.tweets.length - 1 ? '' : 'pb-4'
              }`}
            >
              <TweetPostItem {...tweet} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
