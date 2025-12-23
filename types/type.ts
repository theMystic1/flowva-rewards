import type { Dispatch, ReactNode, SetStateAction } from "react";

export type AuthCardType = { header: string; description: string };
export type ChildrenType = {
  children: ReactNode;
};
export type InputType = {
  label: string;
  type: "email" | "text" | "password";
  value: string;
  onHandleChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
  onShowPassword?: SetStateAction<Dispatch<boolean>>;
  showPassword?: boolean;
};
