import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
//import { App } from './App.tsx';
import { ImageCropper } from './ui/ImageCropper.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ImageCropper />
    {/* <App /> */}
  </StrictMode>,
);
