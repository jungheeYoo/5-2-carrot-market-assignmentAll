'use client';

import FormButton from '@/components/form-btn';
import FormInput from '@/components/form-input';
import { login } from './actions';
import { useFormState } from 'react-dom';
import { UserEmail, UserPassword } from '@/components/user-icon';
// import '@/lib/db';

export default function Login() {
  const [state, action] = useFormState(login, null);

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <div className="max-w-md w-full -mt-52">
        <div className="flex flex-col gap-2 items-center mb-4">
          <span className="text-4xl">🔮</span>
        </div>
        <form action={action} className="flex flex-col gap-3">
          <FormInput
            name="email"
            type="email"
            placeholder="Email"
            required
            errors={state?.fieldErrors?.email ?? []}
            icon={<UserEmail />}
          />
          <FormInput
            name="password"
            type="password"
            placeholder="Password"
            required
            errors={state?.fieldErrors?.password ?? []}
            icon={<UserPassword />}
          />
          <FormButton text="Log In" />
          {state === undefined && (
            <div className="text-center mb-4">
              <div className="inline-block px-4 py-2 font-semibold text-[#a399f1]">
                Welcome back! 👍
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
