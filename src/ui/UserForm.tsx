import { useState, useCallback, type ChangeEvent, type FormEvent } from 'react';

type Props = {
  formSubmit: () => void;
};

export const UserForm = ({ formSubmit }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const croppedImage = null;
  const [formData, setFormData] = useState({
    companyName: '',
    firstName: '',
    middleName: '',
    lastName: '',
    cardNumber: '',
  });

  const [errors, setErrors] = useState({
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

  const validateForm = (): boolean => {
    const newErrors = {
      companyName: '',
      firstName: '',
      lastName: '',
      cardNumber: '',
    };

    let isValid = true;

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Название фирмы обязательно';
      isValid = false;
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Имя обязательно';
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Фамилия обязательна';
      isValid = false;
    }

    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Номер карты обязателен';
      isValid = false;
    } else if (!/^\d{6,16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Номер карты должен содержать 6 до 16 цифр';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

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

      if (!validateForm()) {
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
          const response = await fetch(croppedImage);
          const blob = await response.blob();
          formDataToSend.append('photo', blob, 'cropped-photo.jpg');
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

  return (
    <div className="min-h-screen bg-gray-50 px-2 py-4 sm:px-4 sm:py-8">
      <div className="mx-auto max-w-2xl rounded-lg bg-white p-3 shadow-sm sm:p-6 sm:shadow-md">
        <h1 className="mb-4 text-center text-xl font-bold text-gray-800 sm:mb-6 sm:text-2xl">Регистрационная форма</h1>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Название фирмы */}
          <div className="space-y-2">
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
              Название фирмы *
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              className={`w-full rounded-lg border px-3 py-2 shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.companyName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Введите название вашей компании"
            />
            {errors.companyName && <p className="mt-1 text-xs text-red-500">{errors.companyName}</p>}
          </div>

          {/* Личные данные */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Имя */}
            <div className="space-y-2">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                Имя *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`w-full rounded-lg border px-3 py-2 shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  errors.firstName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ваше имя"
              />
              {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>}
            </div>

            {/* Фамилия */}
            <div className="space-y-2">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Фамилия *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`w-full rounded-lg border px-3 py-2 shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  errors.lastName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ваша фамилия"
              />
              {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>}
            </div>
          </div>

          {/* Отчество (необязательное) */}
          <div className="space-y-2">
            <label htmlFor="middleName" className="block text-sm font-medium text-gray-700">
              Отчество
            </label>
            <input
              type="text"
              id="middleName"
              name="middleName"
              value={formData.middleName}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Ваше отчество (если есть)"
            />
          </div>

          {/* Номер карты */}
          <div className="space-y-2">
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
              Номер карты *
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleCardNumberChange}
              maxLength={16} // 16 цифр + 3 пробела
              className={`w-full rounded-lg border px-3 py-2 shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.cardNumber ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="0000000000"
            />
            {errors.cardNumber && <p className="mt-1 text-xs text-red-500">{errors.cardNumber}</p>}
            <p className="text-xs text-gray-500">Формат: от 6 до 16 цифр</p>
          </div>

          {/* Кнопки */}
          <div className="flex flex-col gap-3 pt-4 sm:flex-row">
            <button
              type="submit"
              className="flex-1 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition duration-200 hover:bg-blue-700 sm:text-base"
            >
              Отправить данные {isLoading ? 'Отправка...' : 'Отправить'}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 rounded-lg bg-gray-500 px-6 py-3 text-sm font-medium text-white transition duration-200 hover:bg-gray-600 sm:text-base"
            >
              Очистить форму
            </button>
          </div>

          {/* Информация о обязательных полях */}
          <div className="mt-4 rounded-lg bg-blue-50 p-3">
            <p className="text-xs text-blue-700 sm:text-sm">* Поля, отмеченные звездочкой, обязательны для заполнения</p>
          </div>
        </form>
      </div>
    </div>
  );
};
