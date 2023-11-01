import { FileEntry } from '@/_models/FileEntry';
import { readdir } from 'fs/promises';

export const imageDirectory = 'uploads';

export const getFiles = async (): Promise<FileEntry[]> => {
  const result: FileEntry[] = [];
  const files = await readdir(imageDirectory);

  for (const file of files) {
    result.push({ name: file });
  }

  return result;
};
