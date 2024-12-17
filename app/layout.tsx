import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | Tweets',
    default: 'Tweets',
  },
  description: 'Assignment',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-[#d7acc6] text-neutral-900 flex flex-col max-w-screen-sm mx-auto h-screen`}
      >
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 flex flex-col overflow-hidden bg-[#f0f0f0] p-5">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
