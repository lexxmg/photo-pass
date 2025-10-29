import { useState, type ChangeEvent } from 'react';
//import { Slider } from '@mui/material';
import Cropper from 'react-easy-crop';
import { type Point, type Area } from 'react-easy-crop';
//import testPhoto from './assets/test_image.jpg';

export function App() {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    console.log(croppedArea, croppedAreaPixels);

    if (croppedArea.height < 100 && croppedArea.width < 100) {
      console.log('все верно');
    } else {
      console.log('ошибка, изображение длжно занимать все пространство внутри сетки');
    }
  };

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file: File = e.target.files[0];
      let imageDataUrl = await readFile(file);

      if (imageDataUrl) {
        setImageSrc(imageDataUrl as string);
      }
    }
  };

  return (
    <>
      <h1 className="mt-5 mb-5 text-center text-2xl">Фото к пропускам</h1>
      <div className="relative m-auto mb-5 h-96 w-2xs bg-gray-400">
        {imageSrc && (
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            // aspect={3 / 4}
            cropSize={{ width: 250, height: 300 }}
            objectFit={'contain'}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        )}
      </div>
      <label className="m-auto block size-12 cursor-pointer bg-amber-300">
        Выбрать фото
        <input className="hidden" type="file" onChange={onFileChange} accept="image/*" />
      </label>

      <div className="controls">
        <input
          className="slider m-auto block h-1 w-lg cursor-pointer appearance-none rounded-lg bg-gray-200"
          type="range"
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby="Zoom"
          onChange={(e) => setZoom(Number(e.target.value))}
        />
      </div>
    </>
  );

  function readFile(file: File) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  }
}
