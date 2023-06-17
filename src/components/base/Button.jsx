import React from 'react';


const Button = ({
  Text = '',
  onClick = () => {},
  isLink = false,
  outline = false,
  signIn = false,
  color = 'primary',
  startIcon = null,
  endIcon = null,
}) => {
  const handleClick = () => {
    onClick();
  };

  const variantClasses = outline
    ? 'border'
    : isLink
    ? 'underline'
    : signIn
    ? 'bg-sign-in'
    : 'bg';
  const colorClasses =
    color === 'primary' ? 'bg-primary text-white' : `bg-${color}`;

  return (
    <button
      onClick={handleClick}
      className={`w-full rounded-lg py-2 px-4 ${colorClasses} ${variantClasses}`}
    >
      {startIcon && <span className="mr-1">{startIcon}</span>}
      {Text}
      {endIcon && <span className="ml-1">{endIcon}</span>}
    </button>
  );
};

export default Button;
