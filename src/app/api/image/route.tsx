import { NextResponse } from 'next/server';
import { readdir } from 'fs/promises';
import fs from 'fs';
import { FileEntry } from '@/models/FileEntry';

const imageDirectory = 'uploads';
const chunkSize = 1 * 1024 * 1024;

export async function GET(request: Request) {
  try {
    const result: FileEntry[] = [];
    const files = await readdir(imageDirectory);

    for (const file of files) {
      result.push({ name: file });
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error('Error reading directory:', err);
    return NextResponse.json(
      { errorMessage: 'Error reading directory' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false });
    }

    const path = `${imageDirectory}/${file.name}`;
    const writeStream = fs.createWriteStream(path);

    let start = 0;

    while (start < file.size) {
      const chunkBlob = file.slice(start, start + chunkSize);
      const chunkArrayBuffer = await chunkBlob.arrayBuffer();
      writeStream.write(Buffer.from(chunkArrayBuffer));

      start += chunkSize;
    }

    writeStream.end();
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { errorMessage: 'Error processing file' },
      { status: 500 }
    );
  }
}
