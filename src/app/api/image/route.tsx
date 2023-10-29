import { NextResponse } from "next/server";
import { Readable } from "stream";
import { writeFile, readFile, readdir } from 'fs/promises'

const imageDirectory = 'uploads';

type FileEntry = { name: string };

export async function GET(request: Request) {

  try {
    
    const result: FileEntry[] = [];

    const files = await readdir(imageDirectory);

    for (const file of files) {
      result.push({name: file})
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error('Error reading directory:', err);
    return NextResponse.json('Error reading directory:');
  }

}

export async function POST(request: Request) {

  console.log('image POST');

  const data = await request.formData()
  const file: File | null = data.get('file') as unknown as File

  if (!file) {
    return NextResponse.json({ success: false })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  const path = `uploads/${file.name}`
  await writeFile(path, buffer)
  console.log(`open ${path} to see the uploaded file`)

  return NextResponse.json({ success: true })

 /* const { bucket } = await connectToDb();
  // get the form data
  const data = await req.formData();

  // map through all the entries
  for (const entry of Array.from(data.entries())) {
    const [key, value] = entry;
    // FormDataEntryValue can either be type `Blob` or `string`
    // if its type is object then it's a Blob
    const isFile = typeof value == "object";

    if (isFile) {
      const blob = value as Blob;
      const filename = blob.name;

    //  const existing = await fileExists(filename);
      if (existing) {
        // If file already exists, let's skip it.
        // If you want a different behavior such as override, modify this part.
        continue;
      }

      //conver the blob to stream
      const buffer = Buffer.from(await blob.arrayBuffer());
      const stream = Readable.from(buffer);

      const uploadStream = bucket.openUploadStream(filename, {
        // make sure to add content type so that it will be easier to set later.
        contentType: blob.type,
        metadata: {}, //add your metadata here if any
      });

      // pipe the readable stream to a writeable stream to save it to the database
      await stream.pipe(uploadStream);
    }
  }

  // return the response after all the entries have been processed.
  return NextResponse.json({ success: true });*/
}