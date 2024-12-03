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
        className={`${inter.className} bg-white text-neutral-900 max-w-screen-sm mx-auto`}
      >
        {children}
      </body>
    </html>
  );
}
