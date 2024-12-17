'use client';

import FormButton from '@/components/form/form-btn';
import FormInput from '@/components/form/form-input';
import { login } from './actions';
import { useFormState } from 'react-dom';
import { UserEmail, UserPassword } from '@/components/icons/user-icon';

export default function Login() {
  const [state, action] = useFormState(login, null);

  return (
    <div className="flex flex-col h-screen bg-[#f0f0f0] mt-40">
      <header className="flex items-center justify-center h-16">
        <h1 className="text-xl font-medium">Please log in! 🎭</h1>
      </header>
      <main className="flex-1 flex flex-col items-center p-6 overflow-auto">
        <div className="flex flex-col items-center w-full">
          <div className="max-w-md w-full">
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
      </main>
      <footer className="flex-shrink-0 text-center text-sm text-neutral-300 bg-[#f0f0f0] p-2 mt-auto">
        2024 Last Assignment-34 by Joy
      </footer>
    </div>
  );
}
