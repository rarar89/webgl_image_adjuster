import FileList from '@/app/components/FileList';
import ImageUploader from '@/app/components/ImageUploader';

export default async function Home() {
  return (
    <main className='p-2'>
      <div className='py-2'>
        <h1 className='text-lg'>File Upload</h1>
      </div>
      <div className='py-2'>
        <ImageUploader />
      </div>
      <div className='py-2'>
        <FileList />
      </div>
    </main>
  );
}
