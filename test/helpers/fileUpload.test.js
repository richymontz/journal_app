import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from "../../src/helpers"

cloudinary.config({
  cloud_name: 'rick-personal',
  api_key: '227559698344284',
  api_secret: '-BTdKYW0KrVcSqh9u0b0M8DPn5Y',
  secure: true
});

describe('File Upload', () => {
  test('should upload a file', async () => {
    const imageURL = 'https://media.istockphoto.com/id/636379014/es/foto/manos-la-formaci%C3%B3n-de-una-forma-de-coraz%C3%B3n-con-silueta-al-atardecer.jpg?s=612x612&w=0&k=20&c=R2BE-RgICBnTUjmxB8K9U0wTkNoCKZRi-Jjge8o_OgE='

    const resp = await fetch(imageURL);
    const blob = await resp.blob();
    const file = new File([blob], 'image.jpg');

    const url = await fileUpload(file);

    const imageId = url.substring(url.lastIndexOf('/') + 1).split('.')[0]

    expect(typeof url).toBe('string');


    await cloudinary.api.delete_resources([`journal/${imageId}`], {
      resource_type: 'image'
    })


  })

  test('should return an exception', async () => {
    const file = new File([], 'photo.jpg');

    await expect(fileUpload(file))
      .rejects
      .toThrow('We are presenting problems to upload the file');
  })
})
