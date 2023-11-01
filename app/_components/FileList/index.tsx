import NavigatedList from '@/_components/NavigatedList';
import { getFiles } from '@/_services/serverActions/getFiles';

export default async function FileList() {
  const data = await getFiles();

  return (
    <div className='flex w-full flex-wrap p-4 bg-slate-600 rounded'>
      <NavigatedList data={data} url='/image/[target]' />
    </div>
  );
}
