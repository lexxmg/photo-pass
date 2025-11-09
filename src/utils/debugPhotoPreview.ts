export const debugPhotoPreview = (croppedImage: Blob | null): void => {
  if (!croppedImage) return;

  const tempUrl = URL.createObjectURL(croppedImage);
  console.log('📸 Фото для отправки:', tempUrl);
  window.open(tempUrl, '_blank');
};
