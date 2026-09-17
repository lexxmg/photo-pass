import { type ChangeEvent, useState } from 'react';

export const AuthForms = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Очищаем ошибку при изменении поля
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (isLogin) {
      if (!formData.username) newErrors.username = 'Имя пользователя обязательно';
      if (!formData.password) newErrors.password = 'Пароль обязателен';
    } else {
      if (!formData.firstName) newErrors.firstName = 'Имя обязательно';
      if (!formData.lastName) newErrors.lastName = 'Фамилия обязательна';
      if (!formData.email) newErrors.email = 'Email обязателен';
      if (!formData.username) newErrors.username = 'Имя пользователя обязательно';
      if (!formData.password) newErrors.password = 'Пароль обязателен';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Пароли не совпадают';
      }
      if (formData.password && formData.password.length < 6) {
        newErrors.password = 'Пароль должен быть не менее 6 символов';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const authenticated = await keycloak.login({
        loginHint: formData.username,
        password: formData.password,
      });

      if (authenticated) {
        onAuthenticated();
      }
    } catch (error) {
      setErrors({ submit: 'Неверное имя пользователя или пароль' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      console.log('regist');
      // В реальном приложении здесь был бы вызов API регистрации
      // Пока используем Keycloak регистрацию
    } catch (error) {
      setErrors({ submit: 'Ошибка регистрации. Попробуйте другой email или имя пользователя' });
    } finally {
      setIsLoading(false);
    }
  };

  const switchToLogin = () => {
    setIsLogin(true);
    setErrors({});
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    });
  };

  const switchToRegister = () => {
    setIsLogin(false);
    setErrors({});
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Photo Pass System</h1>
          <p className="mt-2 text-gray-600">{isLogin ? 'Войдите в свой аккаунт' : 'Создайте новый аккаунт'}</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-md sm:p-8">
          <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-4">
            {!isLogin && (
              <>
                {/* Имя и Фамилия */}
                <div className="grid grid-cols-2 gap-4">
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
                    {errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}
                  </div>

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
                    {errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full rounded-lg border px-3 py-2 shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                </div>
              </>
            )}

            {/* Имя пользователя */}
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Имя пользователя *
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className={`w-full rounded-lg border px-3 py-2 shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  errors.username ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="username"
              />
              {errors.username && <p className="text-xs text-red-500">{errors.username}</p>}
            </div>

            {/* Пароль */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Пароль *
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full rounded-lg border px-3 py-2 shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="••••••"
              />
              {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
            </div>

            {/* Подтверждение пароля (только для регистрации) */}
            {!isLogin && (
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Подтверждение пароля *
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full rounded-lg border px-3 py-2 shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="••••••"
                />
                {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
              </div>
            )}

            {/* Общая ошибка */}
            {errors.submit && (
              <div className="rounded-lg bg-red-50 p-3">
                <p className="text-sm text-red-700">{errors.submit}</p>
              </div>
            )}

            {/* Кнопка отправки */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? 'Загрузка...' : isLogin ? 'Войти' : 'Зарегистрироваться'}
            </button>

            {/* Переключение между формами */}
            <div className="text-center">
              <button
                type="button"
                onClick={isLogin ? switchToRegister : switchToLogin}
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                {isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
              </button>
            </div>

            {/* Информация о обязательных полях */}
            <div className="rounded-lg bg-blue-50 p-3">
              <p className="text-xs text-blue-700">* Поля, отмеченные звездочкой, обязательны для заполнения</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
