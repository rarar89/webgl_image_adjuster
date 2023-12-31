import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { imageDirectory } from '@/_services/serverActions/getFiles';

export async function GET(
  request: Request,
  options: { params: { name: string } }
) {
  try {
    const imageName = options.params.name;
    const file = await readFile(`${imageDirectory}/${imageName}`);

    return new NextResponse(file, {
      headers: {
        'Content-Type': 'image/png',
      },
    });
  } catch (err) {
    console.error('Error reading file:', err);
    return NextResponse.json(
      { message: 'Error reading file' },
      { status: 500 }
    );
  }
}
