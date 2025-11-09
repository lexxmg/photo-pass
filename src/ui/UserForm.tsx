import { type UserFormControls } from '../bll/useUserForm';

type Props = {
  userFormControl: UserFormControls;
};

export const UserForm = (props: Props) => {
  const userFormControl = props.userFormControl;

  return (
    <div className="min-h-screen bg-gray-50 px-2 py-4 sm:px-4 sm:py-8">
      <div className="mx-auto max-w-2xl rounded-lg bg-white p-3 shadow-sm sm:p-6 sm:shadow-md">
        <h1 className="mb-4 text-center text-xl font-bold text-gray-800 sm:mb-6 sm:text-2xl">Регистрационная форма</h1>

        <form onSubmit={userFormControl.handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Название фирмы */}
          <div className="space-y-2">
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
              Название фирмы *
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={userFormControl.formData.companyName}
              onChange={userFormControl.handleInputChange}
              className={`w-full rounded-lg border px-3 py-2 shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                userFormControl.errors.companyName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Введите название вашей компании"
            />
            {userFormControl.errors.companyName && <p className="mt-1 text-xs text-red-500">{userFormControl.errors.companyName}</p>}
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
                value={userFormControl.formData.firstName}
                onChange={userFormControl.handleInputChange}
                className={`w-full rounded-lg border px-3 py-2 shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  userFormControl.errors.firstName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ваше имя"
              />
              {userFormControl.errors.firstName && <p className="mt-1 text-xs text-red-500">{userFormControl.errors.firstName}</p>}
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
                value={userFormControl.formData.lastName}
                onChange={userFormControl.handleInputChange}
                className={`w-full rounded-lg border px-3 py-2 shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  userFormControl.errors.lastName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ваша фамилия"
              />
              {userFormControl.errors.lastName && <p className="mt-1 text-xs text-red-500">{userFormControl.errors.lastName}</p>}
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
              value={userFormControl.formData.middleName}
              onChange={userFormControl.handleInputChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Ваше отчество (если есть)"
            />
          </div>

          {/* Должность (необязательное) */}
          <div className="space-y-2">
            <label htmlFor="position" className="block text-sm font-medium text-gray-700">
              Должность*
            </label>
            <input
              type="text"
              id="position"
              name="position"
              value={userFormControl.formData.position}
              onChange={userFormControl.handleInputChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Ваша должность"
            />
            {userFormControl.errors.position && <p className="mt-1 text-xs text-red-500">{userFormControl.errors.position}</p>}
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
              value={userFormControl.formData.cardNumber}
              onChange={userFormControl.handleCardNumberChange}
              maxLength={16} // 16 цифр + 3 пробела
              className={`w-full rounded-lg border px-3 py-2 shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                userFormControl.errors.cardNumber ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="0000000000"
            />
            {userFormControl.errors.cardNumber && <p className="mt-1 text-xs text-red-500">{userFormControl.errors.cardNumber}</p>}
            <p className="text-xs text-gray-500">Формат: от 6 до 16 цифр</p>
          </div>

          {/* Кнопки */}
          <div className="flex flex-col gap-3 pt-4 sm:flex-row">
            <button
              type="submit"
              className="flex-1 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition duration-200 hover:bg-blue-700 sm:text-base"
            >
              {userFormControl.isLoading ? 'Отправка...' : 'Отправить данные'}
            </button>

            <button
              type="button"
              onClick={userFormControl.handleReset}
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
