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
    <div>
      <h2>프로필 수정</h2>
      <section>
        <FormEditProfile initialUserInfo={userInfo} />
      </section>
    </div>
  );
}
