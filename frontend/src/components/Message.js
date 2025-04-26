import React from 'react';

const Message = ({ variant = 'info', children }) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'success':
        return 'bg-green-100 border-green-500 text-green-700';
      case 'danger':
        return 'bg-red-100 border-red-500 text-red-700';
      case 'warning':
        return 'bg-yellow-100 border-yellow-500 text-yellow-700';
      default:
        return 'bg-blue-100 border-blue-500 text-blue-700';
    }
  };

  return (
    <div className={`${getVariantClass()} px-4 py-3 rounded border-l-4 mb-4`} role="alert">
      {children}
    </div>
  );
};

export default Message;