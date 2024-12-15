'use client';

import { addResponse } from '@/app/(tabs)/tweets/response/actions';
import { ResponseType } from '@/lib/response';
import { useOptimistic } from 'react';
import TweetResponseItem from './tweet-response';

interface TweetResponseListProps {
  tweetId: number;
  responses: ResponseType[];
  responseCount: number;
  currentUser: {
    id: number;
    username: string;
  };
}

type NewResponseType = ResponseType;

export default function TweetResponseList({
  tweetId,
  responses,
  responseCount,
  currentUser,
}: TweetResponseListProps) {
  const [state, reducerFn] = useOptimistic(
    { responses, responseCount },
    (state, newResponse: NewResponseType) => ({
      responses: [newResponse, ...state.responses],
      responseCount: state.responseCount + 1,
    })
  );

  const handleSubmit = async (formData: FormData) => {
    const response = formData.get('response')?.toString();
    if (!response) return;

    const optimisticResponse: NewResponseType = {
      id: Date.now(),
      payload: response,
      created_at: new Date(),
      user: {
        id: currentUser.id,
        username: currentUser.username,
      },
    };

    reducerFn(optimisticResponse);

    const result = await addResponse(null, formData);

    if (result.success) {
      const textarea = document.querySelector(
        'textarea[name="response"]'
      ) as HTMLTextAreaElement;
      if (textarea) {
        textarea.value = '';
      }
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-end">Comments {state.responseCount}</h3>

      <form action={handleSubmit}>
        <input type="hidden" name="tweetId" value={tweetId} />
        <textarea
          name="response"
          className="w-full p-2 border rounded"
          placeholder="Write a comment..."
        />
        <button
          type="submit"
          className="self-end px-6 py-2 w-full bg-[#d8d3ff] text-white rounded-md"
        >
          Add Comment
        </button>
      </form>

      {state.responses.map((comment) => (
        <TweetResponseItem
          key={comment.id}
          id={comment.id}
          tweet={comment.payload}
          created_at={comment.created_at}
          user={comment.user}
        />
      ))}

      {state.responses.length === 0 && <p>No comments yet.</p>}
    </section>
  );
}
