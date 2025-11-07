import { type ChangeEvent, type FormEvent, useState, useCallback } from 'react';
import { validateForm, type FormData, type Errors } from '../utils/formValidators';

export type UserFormControls = {
  isLoading: boolean;
  formData: FormData;
  errors: Errors;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCardNumberChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent) => Promise<void>;
  handleReset: () => void;
};

export const useUserForm = (formSubmit: () => void, croppedImage: Blob | null): UserFormControls => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    firstName: '',
    middleName: '',
    lastName: '',
    cardNumber: '',
  });

  const [errors, setErrors] = useState<Errors>({
    companyName: '',
    firstName: '',
    lastName: '',
    cardNumber: '',
  });

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      // Очищаем ошибку при вводе
      if (errors[name as keyof typeof errors]) {
        setErrors((prev) => ({
          ...prev,
          [name]: '',
        }));
      }
    },
    [errors],
  );

  const handleCardNumberChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const numbersOnly = e.target.value.replace(/\D/g, '');
      setFormData((prev) => ({
        ...prev,
        cardNumber: numbersOnly,
      }));

      if (errors.cardNumber) {
        setErrors((prev) => ({
          ...prev,
          cardNumber: '',
        }));
      }
    },
    [errors.cardNumber],
  );

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      if (!validateForm(formData, setErrors)) {
        return;
      }

      setIsLoading(true);
      try {
        // Создаем FormData для отправки
        const formDataToSend = new FormData();

        // Добавляем данные формы
        formDataToSend.append('companyName', formData.companyName);
        formDataToSend.append('firstName', formData.firstName);
        formDataToSend.append('middleName', formData.middleName);
        formDataToSend.append('lastName', formData.lastName);
        formDataToSend.append('cardNumber', formData.cardNumber);

        // Добавляем отредактированное фото
        if (croppedImage) {
          // Конвертируем Data URL в Blob
          // const response = await fetch(croppedImage);
          // const blob = await response.blob();
          formDataToSend.append('photo', croppedImage, `${formData.companyName}_${formData.firstName}.jpg`);

          // ✅ ВРЕМЕННО: Создаем URL для просмотра фото
          const tempUrl = URL.createObjectURL(croppedImage);
          console.log('📸 Фото для отправки:', tempUrl);

          // Открываем фото в новой вкладке
          window.open(tempUrl, '_blank');
        }

        // Здесь отправляем данные на сервер
        console.log('Данные для отправки:', {
          companyName: formData.companyName,
          firstName: formData.firstName,
          middleName: formData.middleName,
          lastName: formData.lastName,
          cardNumber: formData.cardNumber,
          hasPhoto: !!croppedImage,
        });

        // Имитация отправки на сервер
        await new Promise((resolve) => setTimeout(resolve, 2000));

        alert('Данные успешно отправлены!');

        // Сброс формы
        setFormData({
          companyName: '',
          firstName: '',
          middleName: '',
          lastName: '',
          cardNumber: '',
        });
        formSubmit();
      } catch (error) {
        console.error('Ошибка при отправке:', error);
        alert('Произошла ошибка при отправке данных');
      } finally {
        setIsLoading(false);
      }
    },
    [formData, croppedImage],
  );

  const handleReset = useCallback(() => {
    setFormData({
      companyName: '',
      firstName: '',
      middleName: '',
      lastName: '',
      cardNumber: '',
    });
    setErrors({
      companyName: '',
      firstName: '',
      lastName: '',
      cardNumber: '',
    });
  }, []);

  return {
    isLoading,
    formData,
    errors,
    handleInputChange,
    handleCardNumberChange,
    handleSubmit,
    handleReset,
  };
};
