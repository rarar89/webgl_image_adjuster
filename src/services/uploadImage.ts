export const uploadImage = async (formData: FormData) => {
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
