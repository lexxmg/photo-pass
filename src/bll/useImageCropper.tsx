import { useState, useRef, useCallback, type ChangeEvent, type RefObject } from 'react';
import { type Point, type Area } from 'react-easy-crop';
import { getCroppedImg } from '../utils/cropUtils';

export type ImageCropperControl = {
  imageSrc: string | null;
  crop: Point;
  zoom: number;
  croppedAreaPixels: Area | null;
  croppedImage: string | null;
  croppedImageBlob: Blob | null;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onCropComplete: (_croppedArea: Area, croppedAreaPixels: Area) => void;
  showCroppedImage: () => Promise<void>;
  downloadImage: () => void;
  handleNewImage: () => void;
  imageReset: () => void;
  backToEdit: () => void;
  setCrop: ({}: Point) => void;
  setZoom: (zoom: number) => void;
};

export function useImageCropper(targetWidth: number, targetHeight: number): ImageCropperControl {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [croppedImageBlob, setCroppedImageBlob] = useState<Blob | null>(null);
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
      const croppedImageUrl = await getCroppedImg(imageSrc, croppedAreaPixels, targetWidth, targetHeight);
      setCroppedImage(croppedImageUrl.url);
      setCroppedImageBlob(croppedImageUrl.blob);
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

  const imageReset = useCallback(() => {
    setImageSrc(null);
    setCroppedImage(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Это сбрасывает значение input[type="file"]
      console.log(fileInputRef.current.value);
    }
  }, []);

  const backToEdit = useCallback(() => {
    setCroppedImage(null);
  }, []);

  return {
    imageSrc,
    crop,
    zoom,
    croppedAreaPixels,
    croppedImage,
    croppedImageBlob,
    fileInputRef,
    onFileChange,
    onCropComplete,
    showCroppedImage,
    downloadImage,
    handleNewImage,
    imageReset,
    backToEdit,
    setCrop,
    setZoom,
  };
}
