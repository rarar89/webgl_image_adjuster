import type { Metadata } from 'next';
import './globals.css';
import Image from 'next/image';
import Providers from '@/utils/provider';

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
          <div className='py-2 px-2 bg-gray-400 flex'>
            <Image
              priority
              src='/webgl.svg'
              width={100}
              height={41}
              alt='Follow us on Twitter'
            />
            <div className='px-4 py-2'>
              <h1 className='font-semibold text-slate-800'>
                WEBGL IMAGE EDITOR
              </h1>
            </div>
          </div>
          <div>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
