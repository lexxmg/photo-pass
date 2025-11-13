import { ImageCropper } from './ui/ImageCropper';
import { UserForm } from './ui/UserForm';
import { useImageCropper } from './bll/useImageCropper';
import { useUserForm } from './bll/useUserForm';
//import testPhoto from './assets/test_image.jpg';

const TARGET_WIDTH = 478;
const TARGET_HEIGHT = 638;

export function App() {
  const imageCropperControl = useImageCropper(TARGET_WIDTH, TARGET_HEIGHT);
  const userFormControl = useUserForm(formSubmit, imageCropperControl.croppedImageBlob);

  function formSubmit(): void {
    imageCropperControl.imageReset();
  }

  return (
    <div className="m-auto max-w-6xl bg-gray-50 max-lg:px-2">
      <div className="flex min-h-screen gap-3 pb-5 max-lg:flex-wrap">
        <ImageCropper imageCropperControl={imageCropperControl} isAdmin={false} />

        <div className="w-full">
          <UserForm userFormControl={userFormControl} />
        </div>
      </div>
    </div>
  );
}
