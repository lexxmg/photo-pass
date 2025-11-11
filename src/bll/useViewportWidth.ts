import { useEffect, useState } from 'react';

type MinWidth = {
  isMinWidth: boolean;
};

export function useViewportWidth(breakpoint: number = 768): MinWidth {
  const [isMinWidth, setIsMinWidth] = useState<boolean>(() => {
    // Инициализация состояния на основе текущей ширины
    return window.matchMedia(`(min-width: ${breakpoint}px)`).matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${breakpoint}px)`);

    // Функция для обновления состояния
    const handleChange = (event: MediaQueryListEvent) => {
      setIsMinWidth(event.matches);
    };

    // Слушаем изменения
    mediaQuery.addEventListener('change', handleChange);

    // Очистка при размонтировании
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [breakpoint]); // Добавляем breakpoint в зависимости

  return {
    isMinWidth,
  };
}
