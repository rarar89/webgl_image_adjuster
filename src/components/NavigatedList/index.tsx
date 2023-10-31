import { FileEntry } from '@/models/FileEntry';
import Link from 'next/link';

const maxFileNameLength = 20;

type Entry = {
  name: string;
};

const formatFileName = (fileName: string) =>
  fileName.length > maxFileNameLength
    ? fileName.substring(0, maxFileNameLength) + '...'
    : fileName;

const NavigatedList = ({ data, url }: { data: Entry[]; url: string }) => {
  return data.map((entry: FileEntry, i: number) => (
    <Link key={i} href={url.replace('[target]', entry.name)} className='block'>
      <div className='p-2 w-52 rounded bg-gray-700 mr-4 mb-4'>
        {formatFileName(entry.name)}
      </div>
    </Link>
  ));
};

export default NavigatedList;
