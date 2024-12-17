'use client';

import FormButton from '@/components/form/form-btn';
import FormInput from '@/components/form/form-input';
import { createAccount } from './actions';
import { useFormState } from 'react-dom';
import {
  UserEmail,
  UserIcon,
  UserPassword,
} from '@/components/icons/user-icon';

export default function CreateAccount() {
  const [state, dispatch] = useFormState(createAccount, null);

  return (
    <div className="flex flex-col h-screen bg-[#f0f0f0] mt-40">
      <header className="*:font-medium text-center items-center p-2">
        <h1 className="text-xl">Fill in the form below to join! 🎨</h1>
      </header>
      <main className="flex-1 flex flex-col items-center p-6 overflow-auto">
        <div className="flex flex-col items-center w-full">
          <div className="max-w-md w-full">
            <form action={dispatch} className="flex flex-col gap-3">
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
                  <div className="inline-block px-4 py-2 font-semibold text-neutral-900">
                    Welcome! 🤗
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </main>
      <footer className="text-center text-sm text-neutral-300 bg-[#f0f0f0] p-2">
        2024 Last Assignment-34 by Joy
      </footer>
    </div>
  );
}
