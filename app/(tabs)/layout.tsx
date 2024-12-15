import TabBar from '@/components/tab-bar';
import { getLoggedInUser } from './users/[username]/actions';

export default async function TabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getLoggedInUser();
  return (
    <div>
      {children}
      <TabBar username={user.username} />
    </div>
  );
}
