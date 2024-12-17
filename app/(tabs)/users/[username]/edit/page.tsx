import FormEditProfile from '@/components/form/form-edit-profile';
import { getLoggedInUser } from '../actions';
import { notFound } from 'next/navigation';

export default async function EditProfile({
  params,
}: {
  params: { username: string };
}) {
  const userInfo = await getLoggedInUser();
  if (userInfo.username !== params.username) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center h-screen bg-[#f0f0f0] mt-40">
      <h2>
        <span className="font-bold text-lg">{userInfo.username}🌱</span>
      </h2>
      <section className="w-full max-w-md p-6 ">
        <FormEditProfile initialUserInfo={userInfo} />
      </section>
    </div>
  );
}
