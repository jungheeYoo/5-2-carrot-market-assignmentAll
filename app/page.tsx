import FormButton from '@/components/form-btn';
import FormInput from '@/components/form-input';
import { UserEmail, UserIcon, UserPassword } from '@/components/user-icon';

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="max-w-md w-full">
        <div className="flex flex-col gap-2 items-center mb-4">
          <span className="text-4xl">🔮</span>
        </div>
        <form className="flex flex-col gap-3">
          <FormInput
            type="email"
            placeholder="Email"
            required
            errors={[]}
            icon={<UserEmail />}
          />
          <FormInput
            type="text"
            placeholder="Username"
            required
            errors={[]}
            icon={<UserIcon />}
          />
          <FormInput
            type="password"
            placeholder="Password"
            required
            errors={[]}
            icon={<UserPassword />}
          />
          <FormButton loading={false} text="Log In" />
        </form>
      </div>
    </div>
  );
}
