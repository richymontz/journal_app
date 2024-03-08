export const fileUpload = async (file) => {
  // if (!file) throw new Error('Any file to upload');
  if (!file) return null;

  const cloudUrl = 'https://api.cloudinary.com/v1_1/rick-personal/image/upload';
  const formData = new FormData();

  formData.append('upload_preset', 'react-journal')
  formData.append('file', file)

  const response = await fetch(cloudUrl, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) throw new Error('We are presenting problems to upload the file');

  const cloudResponse = await response.json();

  return cloudResponse.secure_url;
}
