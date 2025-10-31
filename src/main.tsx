import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
//import { App } from './App.tsx';
import { ImageCropper } from './ui/ImageCropper.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="m-auto max-w-6xl max-lg:px-2">
      <div className="flex gap-2.5 max-md:flex-wrap">
        <ImageCropper />

        <div className="w-full p-4">
          <div className="h-56 bg-amber-100 pt-4">
            <h2 className="text-center text-2xl">Какаято форма</h2>
          </div>
        </div>
      </div>
    </div>
    {/* <App /> */}
  </StrictMode>,
);
