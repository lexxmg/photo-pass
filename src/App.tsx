import { useState } from 'react';
import { ImageCropper } from './ui/ImageCropper';
import { UserForm } from './ui/UserForm';
//import testPhoto from './assets/test_image.jpg';

export function App() {
  const [isReset, setIsReset] = useState<boolean>(false);

  const formSubmit = (): void => {
    setIsReset(true);
  };

  return (
    <div className="m-auto max-w-6xl max-lg:px-2">
      <div className="flex min-h-screen gap-2.5 max-md:flex-wrap">
        <ImageCropper isReset={isReset} />

        <div className="w-full">
          <UserForm formSubmit={formSubmit} />
        </div>
      </div>
    </div>
  );
}
