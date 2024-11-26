import FormButton from '@/components/form-btn';
import FormInput from '@/components/form-input';
import { UserEmail, UserIcon, UserPassword } from '@/components/user-icon';

export default function Login() {
  async function handleForm(formData: FormData) {
    'use server';
    console.log(
      formData.get('email'),
      formData.get('username'),
      formData.get('password')
    );
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log('logged in!');
  }
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="max-w-md w-full">
        <div className="flex flex-col gap-2 items-center mb-4">
          <span className="text-4xl">🔮</span>
        </div>
        <form action={handleForm} className="flex flex-col gap-3">
          <FormInput
            name="email"
            type="email"
            placeholder="Email"
            required
            errors={[]}
            icon={<UserEmail />}
          />
          <FormInput
            name="username"
            type="text"
            placeholder="Username"
            required
            errors={[]}
            icon={<UserIcon />}
          />
          <FormInput
            name="password"
            type="password"
            placeholder="Password"
            required
            errors={[]}
            icon={<UserPassword />}
          />
          <FormButton text="Log In" />
        </form>
      </div>
    </div>
  );
}
