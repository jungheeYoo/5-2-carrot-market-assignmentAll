import TabBar from '@/components/tab-bar';
import { getLoggedInUser } from './users/[username]/actions';

export default async function TabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getLoggedInUser();
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-hidden">{children}</div>
      <TabBar username={user.username} />
    </div>
  );
}
