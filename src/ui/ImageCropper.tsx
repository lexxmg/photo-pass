import { useState, useCallback, useRef, type ChangeEvent } from 'react';
import Cropper from 'react-easy-crop';
import { type Point, type Area } from 'react-easy-crop';
import { getCroppedImg } from '../utils/cropUtils';

type Props = {
  isReset: boolean;
};

const TARGET_WIDTH = 478;
const TARGET_HEIGHT = 638;

export const ImageCropper = ({ isReset }: Props) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        if (typeof reader.result === 'string') {
          setImageSrc(reader.result);
          setCrop({ x: 0, y: 0 });
          setZoom(1.01);
          setCroppedImage(null);
        }
      });

      reader.readAsDataURL(file);
      e.target.value = '';
    }
  }, []);

  const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    // Проверяем, что imageSrc и croppedAreaPixels не null
    if (!imageSrc || !croppedAreaPixels) {
      console.error('Image source or crop area is missing');
      return;
    }

    try {
      const croppedImageUrl = await getCroppedImg(imageSrc, croppedAreaPixels, TARGET_WIDTH, TARGET_HEIGHT);
      setCroppedImage(croppedImageUrl);
    } catch (e) {
      console.error('Ошибка при обрезке:', e);
      alert('Ошибка при обрезке изображения');
    }
  }, [imageSrc, croppedAreaPixels]);

  const downloadImage = useCallback(() => {
    if (croppedImage) {
      const link = document.createElement('a');
      link.download = 'cropped-image.jpg';
      link.href = croppedImage;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [croppedImage]);

  const handleNewImage = useCallback(() => {
    setImageSrc(null);
    setCroppedImage(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    fileInputRef.current?.click();
  }, []);

  const imageReset = () => {
    setImageSrc(null);
    setCroppedImage(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  if (isReset && imageSrc) imageReset();

  const backToEdit = useCallback(() => {
    setCroppedImage(null);
  }, []);

  return (
    <div className="m-auto min-w-lg bg-gray-50 px-4 py-8 max-md:min-w-full">
      <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-md">
        {!croppedImage && <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">Редактор фотографий</h2>}

        <input type="file" accept="image/*" onChange={onFileChange} ref={fileInputRef} className="hidden" />

        {!imageSrc && (
          <div className="py-12 text-center">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="rounded-lg bg-blue-600 px-8 py-3 text-lg font-medium text-white transition duration-200 hover:bg-blue-700"
            >
              Выберите фотографию
            </button>
            <p className="mt-4 text-gray-600">
              Размер после обрезки: {TARGET_WIDTH}×{TARGET_HEIGHT}px
            </p>
          </div>
        )}

        {imageSrc && !croppedImage && (
          <div className="space-y-6">
            <div className="rounded-lg bg-gray-100 p-4">
              <h3 className="mb-3 text-lg font-semibold text-gray-800">Обрежьте изображение</h3>

              <div className="relative h-100 overflow-hidden rounded-lg bg-gray-200 max-[25rem]:h-62.5">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={TARGET_WIDTH / TARGET_HEIGHT}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                  cropShape="rect"
                  showGrid={true}
                />
              </div>

              <div className="mt-4 space-y-2">
                <label className="block text-sm font-medium text-gray-700">Масштаб: {Math.round(zoom * 100)}%</label>
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
                />
              </div>
            </div>

            <div className="flex gap-5 max-sm:flex-wrap">
              <button
                onClick={showCroppedImage}
                className="grow rounded-lg bg-green-600 px-8 py-3 font-medium text-white transition duration-200 hover:bg-green-700 max-sm:w-full"
              >
                Применить обрезку
              </button>
              <button
                onClick={handleNewImage}
                className="grow rounded-lg bg-gray-500 px-8 py-3 font-medium text-white transition duration-200 hover:bg-gray-600 max-sm:w-full"
              >
                Новое фото
              </button>
              <button
                onClick={imageReset}
                className="grow rounded-lg bg-gray-500 px-8 py-3 font-medium text-white transition duration-200 hover:bg-gray-600 max-sm:w-full"
              >
                Сброс
              </button>
            </div>
          </div>
        )}

        {croppedImage && (
          <div className="space-y-6">
            <h3 className="text-center text-xl font-semibold text-gray-800">Результат обрезки</h3>

            <div className="flex flex-col items-center space-y-4">
              <img src={croppedImage} alt="Обрезанное изображение" className="rounded-lg border-2 border-gray-300 object-contain" />

              <div className="text-center">
                <div className="text-lg font-medium text-gray-700">
                  Размер: {TARGET_WIDTH} × {TARGET_HEIGHT} пикселей
                </div>
              </div>

              <div className="flex flex-wrap gap-5">
                <button
                  onClick={downloadImage}
                  className="grow rounded-lg bg-blue-600 px-8 py-3 font-medium text-white transition duration-200 hover:bg-blue-700 max-sm:w-full"
                >
                  Скачать фото
                </button>
                <button
                  onClick={backToEdit}
                  className="max-2m:w-full grow rounded-lg bg-gray-500 px-8 py-3 font-medium text-white transition duration-200 hover:bg-gray-600"
                >
                  Вернуться к редактированию
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
