"use client";

const Button = ({
  children,
  className,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}) => {
  return (
    <button
      className={`w-full  gap-2 flex justify-center text-base items-center px-3 py-2 text-center  font-medium border-none transition-colors ease-linear duration-200 rounded-[100px]  ${disabled ? " bg-gray-300 text-gray-500 cursor-not-allowed" : " bg-primary-500 text-white hover:bg-primary-600"} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
