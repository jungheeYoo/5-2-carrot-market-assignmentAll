'use client';

import { InitialUserInfoType } from '@/app/(tabs)/users/[username]/actions';
import FormInput from './form-input';
import { editProfile } from '@/app/(tabs)/users/[username]/edit/actions';
import { useFormState } from 'react-dom';
import FormButton from './form-btn';

type FormState = {
  formErrors: string[];
  fieldErrors: {
    username?: string[];
    email?: string[];
    password?: string[];
    new_password?: string[];
    bio?: string[];
  };
};

export default function FormEditProfile({
  initialUserInfo,
}: {
  initialUserInfo: InitialUserInfoType;
}) {
  const [state, dispatch] = useFormState<FormState | null, FormData>(
    editProfile,
    {
      formErrors: [],
      fieldErrors: {},
    }
  );

  return (
    <form
      action={dispatch}
      className="flex flex-col gap-y-2 w-full max-w-lg mx-auto "
    >
      {state?.formErrors && state.formErrors.length > 0 && (
        <div className="text-red-500 mb-4">
          {state.formErrors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}

      <FormInput
        type="text"
        name="username"
        placeholder="Username"
        required={true}
        errors={state?.fieldErrors?.username}
        defaultValue={initialUserInfo.username}
      />

      <FormInput
        type="email"
        name="email"
        placeholder="Email"
        required={true}
        errors={state?.fieldErrors?.email}
        defaultValue={initialUserInfo.email}
      />

      <FormInput
        type="password"
        name="password"
        placeholder="Current Password"
        required={false}
        errors={state?.fieldErrors?.password}
      />

      <FormInput
        type="password"
        name="newPassword"
        placeholder="New Password"
        required={false}
        errors={state?.fieldErrors?.new_password}
      />

      <FormInput
        type="text"
        name="bio"
        placeholder="Bio"
        required={false}
        errors={state?.fieldErrors?.bio}
        defaultValue={initialUserInfo.bio}
      />

      <FormButton text="Modify" />
    </form>
  );
}
