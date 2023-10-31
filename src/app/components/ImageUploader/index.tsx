'use client';

import { useRouter } from 'next/navigation';
import React, { FormEvent, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import DefaultButton from '../../../components/Button/Default';

const uploadImageService = async (formData: FormData) => {
  const response = await fetch('/api/image', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw errorData?.message ?? 'an error occured';
  }

  return response.json();
};

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
      await uploadImageService(formData);
      toast('Image uploaded successfully', { type: 'success' });
      router.refresh();
      setIsLoading(false);
    } catch (error: unknown) {
      toast((error as Error)?.message ?? error ?? 'An Error occured', {
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
            <input type='file' name='files' ref={ref} accept='.png' />
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
