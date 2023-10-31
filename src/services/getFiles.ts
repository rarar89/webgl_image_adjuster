import { FileEntry } from '@/models/FileEntry';

export const getFiles = async (): Promise<FileEntry[]> => {
  const res = await fetch(process.env.BACKEND_URL + '/api/image', {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};
