import { NextResponse } from "next/server";
import { Readable } from "stream";
import { writeFile, readFile } from 'fs/promises'

export async function GET(request: Request, options: {params: {name: string} }) {

  const imageName = options.params.name;

  const file = await readFile(`uploads/${imageName}`);

  return new NextResponse(file, {
    headers: {
      "Content-Type": 'image/png',
    },
  });
}