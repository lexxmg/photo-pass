import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
//import { App } from './App.tsx';
import { ImageCropper } from './ui/ImageCropper.tsx';
import { UserForm } from './ui/UserForm.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="m-auto max-w-6xl max-lg:px-2">
      <div className="flex min-h-screen gap-2.5 max-md:flex-wrap">
        <ImageCropper />

        <div className="w-full">
          <UserForm />
        </div>
      </div>
    </div>
    {/* <App /> */}
  </StrictMode>,
);
