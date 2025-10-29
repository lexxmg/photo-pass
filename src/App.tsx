import { useState } from 'react';
//import { Slider } from '@mui/material';
import Cropper from 'react-easy-crop';
import { type Point, type Area } from 'react-easy-crop';
import testPhoto from './assets/test_image.jpg';

export function App() {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    console.log(croppedArea, croppedAreaPixels);
  };

  return (
    <>
      <h1 className="mt-5 text-center text-2xl">Фото к пропускам</h1>

      <div className="relative m-auto mb-5 h-160 w-lg">
        <Cropper
          image={testPhoto}
          crop={crop}
          zoom={zoom}
          // aspect={3 / 4}
          cropSize={{ width: 300, height: 400 }}
          objectFit={'cover'}
          onCropChange={setCrop}
          //onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>

      <div className="controls">
        <input
          className="m-auto block w-lg"
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
}
