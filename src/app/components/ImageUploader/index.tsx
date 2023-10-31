'use client';

import { useRouter } from 'next/navigation';
import React, { FormEvent, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import DefaultButton from '@/components/Button/Default';
import { uploadImage } from '@/services/uploadImage';

const ImageUploader = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();

    const input = ref.current!;

    const formData = new FormData();
    for (const file of Array.from(input.files ?? [])) {
      formData.append('file', file);
    }

    try {
      await uploadImage(formData);
      toast('Image uploaded successfully', { type: 'success' });
      router.refresh();
      setIsLoading(false);
    } catch (error: unknown) {
      toast((error as Error)?.message ?? 'An Error occured', {
        type: 'error',
      });
      setIsLoading(false);
    }
  };

  return (
    <div className='bg-gray-500 p-2 rounded max-w-sm'>
      <form onSubmit={handleSubmit}>
        <div className='flex'>
          <div>
            <input
              type='file'
              name='files'
              ref={ref}
              accept='image/png, image/jpeg'
            />
          </div>
          <div>
            <DefaultButton disabled={isLoading} type='submit'>
              Upload
            </DefaultButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ImageUploader;
