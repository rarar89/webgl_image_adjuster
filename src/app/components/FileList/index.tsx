import NavigatedList from '@/components/NavigatedList';
import { FileEntry } from '@/models/FileEntry';

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
  const data = await getData();

  return (
    <div className='flex w-full flex-wrap p-4 bg-slate-600 rounded'>
      <NavigatedList data={data} url='`/image/[target]`' />
    </div>
  );
};

export default FileList;
