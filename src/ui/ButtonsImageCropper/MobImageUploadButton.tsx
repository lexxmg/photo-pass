type Props = {
  isLoading: boolean;
  handelClick: () => void;
  handelClickCamera: () => void;
};

export const MobImageUploadButton = ({ handelClickCamera, handelClick, isLoading }: Props) => {
  return (
    <div className="flex justify-between gap-2.5">
      <button
        type="button"
        onClick={handelClickCamera}
        disabled={isLoading}
        className="cursor-pointer rounded-lg bg-blue-600 px-8 py-3 text-lg font-medium text-white transition duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400 disabled:hover:bg-blue-400"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            {/* Индикатор загрузки */}
            <svg className="mr-3 -ml-1 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Подождите...
          </span>
        ) : (
          '📷 Открыть камеру'
        )}
      </button>

      <button
        type="button"
        onClick={handelClick}
        disabled={isLoading}
        className="cursor-pointer rounded-lg bg-blue-600 px-8 py-3 text-lg font-medium text-white transition duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400 disabled:hover:bg-blue-400"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            {/* Индикатор загрузки */}
            <svg className="mr-3 -ml-1 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Подождите...
          </span>
        ) : (
          '📷 Выберите фотографию'
        )}
      </button>
    </div>
  );
};
