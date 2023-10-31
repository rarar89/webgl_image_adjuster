'use client';
import EditorControls from '@/app/(imageEditor)/components/EditorControls';
import WebGLEditor from '@/app/(imageEditor)/components/ImageEditor';

export default function ImagePage() {
  return (
    <main>
      <EditorControls />
      <WebGLEditor />
    </main>
  );
}
