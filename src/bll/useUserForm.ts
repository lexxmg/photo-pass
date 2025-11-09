import { type ChangeEvent, type FormEvent, useState, useCallback } from 'react';
import { validateForm, type FormData, type Errors } from '../utils/formValidators';
import { sendDataToServer } from '../dal/api';

export type UserFormControls = {
  isLoading: boolean;
  formData: FormData;
  errors: Errors;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCardNumberChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent) => Promise<void>;
  handleReset: () => void;
};

type Api = 'newCard' | 'removCard';

export const useUserForm = (formSubmit: () => void, croppedImage: Blob | null, sendServer: Api = 'newCard'): UserFormControls => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    firstName: '',
    middleName: '',
    lastName: '',
    position: '',
    cardNumber: '',
  });

  const [errors, setErrors] = useState<Errors>({
    companyName: '',
    firstName: '',
    lastName: '',
    position: '',
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
    async (e: FormEvent): Promise<void> => {
      e.preventDefault();

      if (!validateForm(formData, setErrors)) {
        return;
      }

      if (!croppedImage) {
        console.log('Добавьте и отредактируйте фото');
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
        formDataToSend.append('position', formData.position);
        formDataToSend.append('cardNumber', formData.cardNumber);

        // Добавляем отредактированное фото
        if (croppedImage) {
          formDataToSend.append('photo', croppedImage, 'cropped-image.jpg');

          //           if (false) {
          //             // Если нужно покозать фото в браузере
          //             // ✅ ВРЕМЕННО: Создаем URL для просмотра фото
          //             const tempUrl = URL.createObjectURL(croppedImage);
          //             console.log('📸 Фото для отправки:', tempUrl);
          //
          //             // Открываем фото в новой вкладке
          //             window.open(tempUrl, '_blank');
          //           }
        }

        // Здесь отправляем данные на сервер
        console.log('Данные для отправки:', {
          companyName: formData.companyName,
          firstName: formData.firstName,
          middleName: formData.middleName,
          lastName: formData.lastName,
          position: formData.position,
          cardNumber: formData.cardNumber,
          hasPhoto: !!croppedImage,
        });

        switch (sendServer) {
          case 'newCard':
            const result = await sendDataToServer(formDataToSend);
            console.log('✅ Ответ сервера:', result);
            break;
          case 'removCard':
            console.log('удаление карты');

            break;
          default:
            console.log('Передан неизвестный параметр');
            break;
        }

        // Сброс формы
        setFormData({
          companyName: '',
          firstName: '',
          middleName: '',
          lastName: '',
          position: '',
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
      position: '',
      cardNumber: '',
    });
    setErrors({
      companyName: '',
      firstName: '',
      lastName: '',
      position: '',
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
