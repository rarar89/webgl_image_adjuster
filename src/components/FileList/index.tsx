import { FileEntry } from '@/models/FileEntry';
import Link from 'next/link';

const maxFileNameLength = 20;

const formatFileName = (fileName: string) =>
  fileName.length > maxFileNameLength
    ? fileName.substring(0, maxFileNameLength) + '...'
    : fileName;

async function getData(): Promise<FileEntry[]> {
  const res = await fetch(process.env.BACKEND_URL + '/api/image', {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const FileList = async () => {
  const fileList = await getData();

  return (
    <div className='flex w-full flex-wrap p-4 bg-slate-600 rounded'>
      {fileList.map((file: any, i: number) => (
        <Link key={i} href={`/image/${file.name}`} className='block'>
          <div className='p-2 w-52 rounded bg-gray-700 mr-4 mb-4'>
            {formatFileName(file.name)}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FileList;
