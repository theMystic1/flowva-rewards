"use client";

import type { ChildrenType } from "types/type";

const Button = ({ children }: ChildrenType) => {
  return (
    <button
      className={`w-full h-13.75 gap-2 flex justify-center text-base items-center p-2.75 text-center bg-primary-500 text-white  font-medium border-none transition-colors ease-linear duration-200 rounded-[100px] hover:bg-primary-600`}
    >
      {children}
    </button>
  );
};

export default Button;
