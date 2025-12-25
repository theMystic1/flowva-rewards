import { useState } from "react";
import {
  useLocation,
  useParams,
  useMatches,
  Link,
  useNavigate,
} from "react-router";
import type { AuthCardType, ChildrenType, InputType } from "types/type";
import Button from "./btn";
import {
  getUserById,
  handleLogin,
  handleSignupWithEmail,
  signinWithOAuth,
  updateUser,
} from "lib/auth";
import { MdOutlineErrorOutline } from "react-icons/md";
import { isEmail, isStrongPwd } from "lib/helpers";
// import { LoadingUi } from "components/ui/loading";

const AuthCard = ({ header, description }: AuthCardType) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [value, setValue] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [authState, seAuthState] = useState({
    error: "",
    loading: false,
  });
  const isLogin = pathname.includes("/login");

  // console.log(new Date(1766438148).getDate());
  // console.log(new Date(1766438148).getMonth());
  // console.log(new Date(1766438148).getFullYear());
  // console.log(!isLogin);

  const handleChange = (
    name: "email" | "password" | "confirmPassword" | "name",
    v: string
  ) =>
    setValue((prev) => ({
      ...prev,
      [name]: v,
    }));

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLogin) {
      if (!value.name) {
        seAuthState((prev) => ({ ...prev, error: "Kindly Enter your name" }));
        return;
      }
      if (!isEmail(value.email)) {
        seAuthState((prev) => ({ ...prev, error: "Invalid email address" }));
        return;
      }

      if (value.password.length < 8) {
        seAuthState((prev) => ({
          ...prev,
          error: "Password must be at least 8 characters",
        }));
        return;
      }

      if (!isStrongPwd(value.password)) {
        seAuthState((prev) => ({
          ...prev,
          error:
            "Password must include uppercase, lowercase, number, and symbol",
        }));
        return;
      }

      if (value.password !== value.confirmPassword) {
        seAuthState((prev) => ({ ...prev, error: "Passwords do not match" }));
        return;
      }
    }

    seAuthState((prev) => ({
      ...prev,
      loading: true,
      error: "",
    }));
    try {
      const data = isLogin
        ? await handleLogin({
            email: value.email.trim(),
            password: value.password,
          })
        : await handleSignupWithEmail({
            email: value.email.trim(),
            password: value.password,
          });

      const user = await getUserById(data?.user?.id!);

      // console.log(user);

      if (!user?.name) {
        const usrData = await updateUser(user?.id, { name: value.name });
      }

      navigate("/reward");
    } catch (error: any) {
      console.error(error);
      seAuthState((prev) => ({
        ...prev,
        error: error?.message || error,
      }));
    } finally {
      seAuthState((prev) => ({
        ...prev,
        loading: false,
      }));
    }
  };

  return (
    <form
      className="w-full shadow-[0_4px_6px_rgba(0,0,0,0.1)] lg:py-7.5 py-4 px-2 lg:p-10 bg-white rounded-[10px] animate-fadeIn h-fit flex-col-center gap-5! p-2"
      onSubmit={(e) => handleAuth(e)}
    >
      <ColumnDiv>
        <h1 className="text-primary-600 text-2xl font-bold">{header}</h1>

        <p className="text-xs text-dark-300 text-center">{description}</p>
      </ColumnDiv>

      <div className="flex-col-center gap-4! items-start! w-full">
        {authState.error ? (
          <div className=" bg-red-500/10 text-red-500 border-red-500/20   border p-3 rounded-md mb-5 text-xs flex items-center gap-2 w-full">
            <MdOutlineErrorOutline className="text-red-500" size={20} />
            <p className=" text-red-600 ">{authState.error?.toString()}</p>
          </div>
        ) : null}
        {isLogin ? null : (
          <Input
            label="Name"
            type="text"
            value={value.name}
            onHandleChange={(v: string) => handleChange("name", v)}
            placeholder="Lucky"
          />
        )}
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
          showPassword={showPassword}
          onShowPassword={setShowPassword}
        />

        {isLogin ? null : (
          <Input
            label="Confirm Password"
            type="password"
            value={value.confirmPassword}
            onHandleChange={(v: string) => handleChange("confirmPassword", v)}
            placeholder="********"
            required={!isLogin}
            showPassword={showPassword}
            onShowPassword={setShowPassword}
          />
        )}

        {isLogin ? (
          <div className="flex justify-end w-full">
            <span className="text-primary-500 text-sm cursor-pointer hover:text-primary-600 hover:underline transition-all duration-300">
              Forgot Password?
            </span>
          </div>
        ) : null}
      </div>
      <div className="w-full flex-col-center gap-px!">
        <Button>
          {authState.loading ? "loading" : isLogin ? "Login" : "Sign up"}
        </Button>
        <div className="relative flex items-center w-full my-2">
          <div className="grow h-px bg-primary-200" />
          <span className=" text-[13px] text-primary-300 font-medium bg-white px-3">
            or
          </span>
          <div className="grow h-px bg-primary-200" />
        </div>

        <button
          className="input-container flex items-center justify-center gap-4 text-sm hover:bg-primary-200 transition-all duration-300"
          onClick={signinWithOAuth}
          type="button"
        >
          <img src="/icons/google.png" className="h-5 w-5" />
          <span>Sign in with Google</span>
        </button>

        <span className="text-sm flex items-center gap-0.5 mt-3">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account"}
          </p>

          <Link
            to={isLogin ? "/signup" : "/login"}
            className="text-primary-500 hover:underline transition-all duration-200"
          >
            {isLogin ? "Sign up" : "Log in"}
          </Link>
        </span>
      </div>
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
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full flex-col-center gap-2! items-start!">
      <label htmlFor={type} className="text-sm">
        {label}
      </label>

      <div
        className="input-container transition-colors duration-200
                focus-within:border-primary-500 justify-between!"
      >
        <input
          value={value}
          type={type !== "password" ? type : showPassword ? "text" : type}
          onChange={(e) => onHandleChange(e.target.value)}
          required={required}
          className="w-[85%]  outline-none text-base bg-transparent"
          placeholder={placeholder}
        />
        {type === "password" ? (
          <button
            className="text-primary-300 text-xs "
            onClick={() => setShowPassword((v) => !v)}
            type="button"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        ) : null}
      </div>
    </div>
  );
};
