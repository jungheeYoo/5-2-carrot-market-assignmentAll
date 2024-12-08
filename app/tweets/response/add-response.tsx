'use client';

import { useFormState } from 'react-dom';
import FormButton from '../../../components/form-btn';
import { addResponse } from './actions';

export default function AddResponse() {
  const [state, dispatch] = useFormState(addResponse, null);
  return (
    <form action={dispatch} className="p-5 flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <textarea
          name="response"
          required
          placeholder="Please write a reply."
          className="w-full p-5 rounded-md resize-none"
        />
        {state?.fieldErrors?.response && (
          <span className="text-red-400">{state.fieldErrors.response}</span>
        )}
      </div>
      <FormButton text="Add Reply" />
    </form>
  );
}
