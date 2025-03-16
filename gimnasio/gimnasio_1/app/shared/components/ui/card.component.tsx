import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  footer,
  className = '',
  onClick,
  hoverable = false,
}) => {
  const cardClasses = `
    bg-white rounded-lg shadow-md overflow-hidden
    ${hoverable ? 'transition-transform hover:scale-105 hover:shadow-lg cursor-pointer' : ''}
    ${className}
  `;

  return (
    <div className={cardClasses} onClick={onClick}>
      {(title || subtitle) && (
        <div className="p-4 border-b">
          {title && <h3 className="text-lg font-semibold">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
      )}
      <div className="p-4">{children}</div>
      {footer && <div className="p-4 bg-gray-50 border-t">{footer}</div>}
    </div>
  );
};

export default Card; 