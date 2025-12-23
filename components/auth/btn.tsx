"use client";

const Button = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <button
      className={`w-full  gap-2 flex justify-center text-base items-center px-3 py-2 text-center bg-primary-500 text-white  font-medium border-none transition-colors ease-linear duration-200 rounded-[100px] hover:bg-primary-600 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
