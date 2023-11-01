import { NextResponse } from 'next/server';
import fs from 'fs';
import { imageDirectory } from '@/_services/serverActions/getFiles';
const chunkSize = 1 * 1024 * 1024;

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

    // Write the file in chunks to avoid "maximum stack size exceeded"
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
