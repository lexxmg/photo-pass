export type FormData = {
  companyName: string;
  firstName: string;
  middleName: string;
  lastName: string;
  position: string;
  cardNumber: string;
};

export type Errors = {
  companyName: string;
  firstName: string;
  lastName: string;
  position: string;
  cardNumber: string;
};

export const validateForm = (formData: FormData, setErrors: (value: Errors) => void): boolean => {
  const newErrors = {
    companyName: '',
    firstName: '',
    lastName: '',
    position: '',
    cardNumber: '',
    croppedImage: '',
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

  if (!formData.position.trim()) {
    newErrors.position = 'Название должности обязательно';
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
