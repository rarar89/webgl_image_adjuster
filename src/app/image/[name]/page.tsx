'use client';
import ImageEditor from "@/components/ImageEditor";

export default function ImagePage() {

  console.log('ImagePage');

  return (
    <main className="h-screen items-center">
      <div>
        <ImageEditor />
      </div>
    </main>
  )
}
