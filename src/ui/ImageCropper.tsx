import Cropper from 'react-easy-crop';
import { type ImageCropperControl } from '../bll/useImageCropper';

const TARGET_WIDTH = 478;
const TARGET_HEIGHT = 638;

type Props = {
  imageCropperControl: ImageCropperControl;
};

export const ImageCropper = ({ imageCropperControl }: Props) => {
  return (
    <div className="min-w-lg bg-gray-50 px-4 py-8 max-md:min-w-full">
      <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-md">
        {!imageCropperControl.croppedImage && <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">Редактор фотографий</h2>}

        <input type="file" accept="image/*" onChange={imageCropperControl.onFileChange} ref={imageCropperControl.fileInputRef} className="hidden" />

        {!imageCropperControl.imageSrc && (
          <div className="py-12 text-center">
            <button
              onClick={() => imageCropperControl.fileInputRef.current?.click()}
              className="rounded-lg bg-blue-600 px-8 py-3 text-lg font-medium text-white transition duration-200 hover:bg-blue-700"
            >
              Выберите фотографию
            </button>
            <p className="mt-4 text-gray-600">
              Размер после обрезки: {TARGET_WIDTH}×{TARGET_HEIGHT}px
            </p>
          </div>
        )}

        {imageCropperControl.imageSrc && !imageCropperControl.croppedImage && (
          <div className="space-y-6">
            <div className="rounded-lg bg-gray-100 p-4">
              <h3 className="mb-3 text-lg font-semibold text-gray-800">Обрежьте изображение</h3>

              <div className="relative h-100 overflow-hidden rounded-lg bg-gray-200 max-[25rem]:h-62.5">
                <Cropper
                  image={imageCropperControl.imageSrc}
                  crop={imageCropperControl.crop}
                  zoom={imageCropperControl.zoom}
                  aspect={TARGET_WIDTH / TARGET_HEIGHT}
                  onCropChange={imageCropperControl.setCrop}
                  onZoomChange={imageCropperControl.setZoom}
                  onCropComplete={imageCropperControl.onCropComplete}
                  cropShape="rect"
                  showGrid={true}
                />
              </div>

              <div className="mt-4 space-y-2">
                <label className="block text-sm font-medium text-gray-700">Масштаб: {Math.round(imageCropperControl.zoom * 100)}%</label>
                <input
                  type="range"
                  value={imageCropperControl.zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  onChange={(e) => imageCropperControl.setZoom(Number(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
                />
              </div>
            </div>

            <div className="flex gap-5 max-sm:flex-wrap">
              <button
                onClick={imageCropperControl.showCroppedImage}
                className="grow rounded-lg bg-green-600 px-8 py-3 font-medium text-white transition duration-200 hover:bg-green-700 max-sm:w-full"
              >
                Применить обрезку
              </button>
              <button
                onClick={imageCropperControl.handleNewImage}
                className="grow rounded-lg bg-gray-500 px-8 py-3 font-medium text-white transition duration-200 hover:bg-gray-600 max-sm:w-full"
              >
                Новое фото
              </button>
              <button
                onClick={imageCropperControl.imageReset}
                className="grow rounded-lg bg-gray-500 px-8 py-3 font-medium text-white transition duration-200 hover:bg-gray-600 max-sm:w-full"
              >
                Сброс
              </button>
            </div>
          </div>
        )}

        {imageCropperControl.croppedImage && (
          <div className="space-y-6">
            <h3 className="text-center text-xl font-semibold text-gray-800">Результат обрезки</h3>

            <div className="flex flex-col items-center space-y-4">
              <img
                src={imageCropperControl.croppedImage}
                alt="Обрезанное изображение"
                className="rounded-lg border-2 border-gray-300 object-contain"
              />

              <div className="text-center">
                <div className="text-lg font-medium text-gray-700">
                  Размер: {TARGET_WIDTH} × {TARGET_HEIGHT} пикселей
                </div>
              </div>

              <div className="flex flex-wrap gap-5">
                <button
                  onClick={imageCropperControl.downloadImage}
                  className="grow rounded-lg bg-blue-600 px-8 py-3 font-medium text-white transition duration-200 hover:bg-blue-700 max-sm:w-full"
                >
                  Скачать фото
                </button>
                <button
                  onClick={imageCropperControl.backToEdit}
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
