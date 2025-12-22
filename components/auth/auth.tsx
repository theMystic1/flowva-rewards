"use client";

import { useState } from "react";
import { useLocation, useParams, useMatches, Link } from "react-router";
import type { AuthCardType, ChildrenType, InputType } from "types/type";
import Button from "./btn";

const AuthCard = ({ header, description }: AuthCardType) => {
  const { pathname } = useLocation();

  const [value, setValue] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const isLogin = pathname.includes("/login");

  const handleChange = (
    name: "email" | "password" | "confirmPassword",
    v: string
  ) =>
    setValue((prev) => ({
      ...prev,
      [name]: v,
    }));

  return (
    <form className="w-full shadow-[0_4px_6px_rgba(0,0,0,0.1)] py-7.5 px-5 lg:p-10 bg-white rounded-[10px] animate-fadeIn h-fit flex-col-center gap-5!">
      <ColumnDiv>
        <h1 className="text-primary-600 text-2xl font-bold">{header}</h1>

        <p className="text-sm text-dark-300">{description}</p>
      </ColumnDiv>
      <div className="flex-col-center gap-4! items-start! w-full">
        <Input
          label="Email"
          type="email"
          value={value.email}
          onHandleChange={(v: string) => handleChange("email", v)}
          placeholder="user@example.com"
        />
        <Input
          label="Password"
          type="password"
          value={value.password}
          onHandleChange={(v: string) => handleChange("password", v)}
          placeholder="********"
        />
        <Input
          label="Confirm Password"
          type="password"
          value={value.confirmPassword}
          onHandleChange={(v: string) => handleChange("confirmPassword", v)}
          placeholder="********"
        />
      </div>
      <Button>Sign up</Button>
      <div className="relative flex items-center w-full my-5">
        <div className="grow h-px bg-primary-200" />
        <span className=" text-[13px] text-primary-300 font-medium bg-white px-3">
          or
        </span>
        <div className="grow h-px bg-primary-200" />
      </div>

      <button className="input-container flex items-center justify-center gap-4 text-sm">
        <img src="/icons/google.png" className="h-5 w-5" />
        <span>Sign in with Google</span>
      </button>

      <span className="text-sm flex items-center gap-0.5">
        <p>{isLogin ? "" : "Already have an account"}</p>

        <Link to={isLogin ? "/signup" : "/login"} className="text-primary-500 ">
          {isLogin ? "Signup" : "Log in"}
        </Link>
      </span>
    </form>
  );
};

export default AuthCard;

export const ColumnDiv = ({ children }: ChildrenType) => {
  return <div className="flex-col-center gap-1! w-full">{children}</div>;
};

export const Input = ({
  label,
  type,
  value,
  onHandleChange,
  required = true,
  placeholder,
}: InputType) => {
  return (
    <div className="w-full flex-col-center gap-2! items-start!">
      <label htmlFor={type} className="text-sm">
        {label}
      </label>

      <div
        className="input-container transition-colors duration-200
                focus-within:border-primary-500 "
      >
        <input
          value={value}
          type={type}
          onChange={(e) => onHandleChange(e.target.value)}
          required={required}
          className="w-[80%]  outline-none text-base bg-transparent"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};
