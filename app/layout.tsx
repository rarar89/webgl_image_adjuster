import type { Metadata } from 'next';
import '@/globals.css';
import Providers from '@/_utils/provider';
import Head from '@/_components/Head';

export const metadata: Metadata = {
  title: 'WebGL Image Editor',
  description: 'Have fun editing images with WebGL',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <Providers>
          <Head />
          <div>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
