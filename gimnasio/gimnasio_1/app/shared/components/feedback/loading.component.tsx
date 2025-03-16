import React from 'react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
  text?: string;
  color?: 'primary' | 'secondary' | 'white';
}

const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  fullScreen = false,
  text,
  color = 'primary',
}) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const colorClasses = {
    primary: 'text-blue-900',
    secondary: 'text-gray-600',
    white: 'text-white',
  };

  const spinner = (
    <svg
      className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div className="flex flex-col items-center">
          {spinner}
          {text && <p className="mt-4 text-white font-medium">{text}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      {spinner}
      {text && <p className={`ml-3 ${colorClasses[color]}`}>{text}</p>}
    </div>
  );
};

export default Loading; 