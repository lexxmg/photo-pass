import { type Area } from 'react-easy-crop';

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

type ImageResult = {
  url: string;
  blob: Blob | null;
};

export const getCroppedImg = async (imageSrc: string, pixelCrop: Area, targetWidth = 478, targetHeight = 638): Promise<ImageResult> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Проверяем, что контекст не null
  if (!ctx) {
    throw new Error('Не удалось получить контекст canvas 2d');
  }

  canvas.width = targetWidth;
  canvas.height = targetHeight;

  ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, targetWidth, targetHeight);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Не удалось создать blob из canvas'));
          return;
        }

        const url = URL.createObjectURL(blob);
        resolve({ url, blob });
      },
      'image/jpeg',
      0.2,
    );
  });
};
