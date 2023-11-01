import EditorControls from '@/image/[name]/_components/EditorControls';
import ImageEditor from '@/image/[name]/_components/ImageEditor';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Image Edit',
  description: 'Adjust brightness, exposure of the image',
};

export default function ImagePage() {
  return (
    <main>
      <EditorControls />
      <ImageEditor />
    </main>
  );
}
