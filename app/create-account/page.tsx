'use client';

import FormButton from '@/components/form-btn';
import FormInput from '@/components/form-input';
import { createAccount } from '././actions';
import { useFormState } from 'react-dom';
import { UserEmail, UserIcon, UserPassword } from '@/components/user-icon';
// import '@/lib/db';

export default function CreateAccount() {
  const [state, action] = useFormState(createAccount, null);

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <div className="max-w-md w-full -mt-52">
        <div className="flex flex-col gap-2 mb-5 *:font-medium text-center">
          <h1 className="text-xl">Fill in the form below to join!</h1>
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
            name="username"
            type="text"
            placeholder="Username"
            required
            errors={state?.fieldErrors?.username ?? []}
            icon={<UserIcon />}
          />
          <FormInput
            name="password"
            type="password"
            placeholder="Password"
            required
            errors={state?.fieldErrors?.password ?? []}
            icon={<UserPassword />}
          />
          <FormInput
            name="confirm_password"
            type="password"
            placeholder="Confirm Password"
            required
            errors={state?.fieldErrors?.confirm_password ?? []}
            icon={<UserPassword />}
          />
          <FormButton text="Create Account" />
          {state === undefined && (
            <div className="text-center mb-4">
              <div className="inline-block px-4 py-2 font-semibold text-[#a399f1]">
                Welcome! 🤗
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
