import NavigatedList from '@/components/NavigatedList';
import { getFiles } from '@/services/getFiles';

const FileList = async () => {
  const data = await getFiles();

  return (
    <div className='flex w-full flex-wrap p-4 bg-slate-600 rounded'>
      <NavigatedList data={data} url='/image/[target]' />
    </div>
  );
};

export default FileList;
