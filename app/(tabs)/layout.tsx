import TabBar from '@/components/tab-bar';
import { getUserInfo } from './users/[username]/actions';

export default async function TabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserInfo();
  return (
    <div>
      {children}
      <TabBar username={user.username} />
    </div>
  );
}
