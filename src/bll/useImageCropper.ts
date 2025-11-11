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
  fileInputKey: number;
  fileCameraKey: number;
  fileInputRef: RefObject<HTMLInputElement | null>;
  fileCameraRef: RefObject<HTMLInputElement | null>;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onCropComplete: (_croppedArea: Area, croppedAreaPixels: Area) => void;
  showCroppedImage: () => Promise<void>;
  downloadImage: () => void;
  handleNewImage: () => void;
  imageReset: () => void;
  backToEdit: () => void;
  setCrop: ({}: Point) => void;
  setZoom: (zoom: number) => void;
  setIsLoading: (value: boolean) => void;
  isLoading: boolean;
};

export function useImageCropper(targetWidth: number, targetHeight: number): ImageCropperControl {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [croppedImageBlob, setCroppedImageBlob] = useState<Blob | null>(null);
  const [fileInputKey, setFileInputKey] = useState<number>(0);
  const [fileCameraKey, setFileCameraKey] = useState<number>(10);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileCameraRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsLoading(true);
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        if (typeof reader.result === 'string') {
          setImageSrc(reader.result);
          setCrop({ x: 0, y: 0 });
          setZoom(1.01);
          setCroppedImage(null);
          setIsLoading(false);
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
    setCroppedImageBlob(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setFileInputKey((prev) => prev + 1); // Пересоздает input
    setFileCameraKey((prev) => prev + 1);
  }, []);

  const backToEdit = useCallback(() => {
    setCroppedImage(null);
    setCroppedImageBlob(null);
  }, []);

  return {
    imageSrc,
    crop,
    zoom,
    croppedAreaPixels,
    croppedImage,
    croppedImageBlob,
    fileInputKey,
    fileCameraKey,
    fileInputRef,
    fileCameraRef,
    isLoading,
    setIsLoading,
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
