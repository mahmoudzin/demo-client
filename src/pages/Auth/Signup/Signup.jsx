import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ApiSignUp } from "../../../UsersData";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../store/GlobalPrvider/GlobalProvider";

import { mapValidationToState, schema } from "./validation";

const isStateEmpty = (state) => {
  return Object.keys(state).some((key) => !state[key]);
};

export default function Signup() {
  //global state
  const { signUp } = useContext(GlobalContext);
  //private state
  const [userData, setUSerData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  const [errors, setErrors] = useState(null);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (!isStateEmpty(userData) && !errors) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [userData, errors]);
  //hooks
  const navigate = useNavigate();
  //handlers
  const handleChange = useCallback(
    (e) => {
      const errorsObject = mapValidationToState({
        ...userData,
        [e.target.name]: e.target.value,
      });
      setErrors(errorsObject);
      setUSerData({ ...userData, [e.target.name]: e.target.value });
    },
    [userData]
  );

  //data
  const inputsData = useMemo(
    () => [
      {
        label: "Username",
        value: userData.username,
        name: "username",
        type: "text",
        className:
          "w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm",
        placeholder: "Enter Username",
        icon: (
          <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          </span>
        ),
        error: errors?.username,
        onChange: handleChange,
      },
      {
        label: "Email",
        value: userData.email,
        name: "email",
        type: "email",
        className:
          "w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm",
        placeholder: "Enter email",
        icon: (
          <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          </span>
        ),
        error: errors?.email,
        onChange: handleChange,
      },
      {
        label: "Password",
        value: userData.password,
        name: "password",
        type: "password",
        className:
          "w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm",
        placeholder: "Enter password",
        icon: (
          <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </span>
        ),
        error: errors?.password,
        onChange: handleChange,
      },
      {
        label: "Cofirm Password",
        value: userData.confirmPass,
        name: "confirmPass",
        type: "password",
        className:
          "w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm",
        placeholder: "Enter password",
        icon: (
          <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </span>
        ),
        error: errors?.confirmPass,
        onChange: handleChange,
      },
    ],
    [
      userData.username,
      userData.password,
      userData.email,
      userData.confirmPass,
      errors,
      handleChange,
    ]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(null);
    if (!errors) {
      const response = ApiSignUp({
        username: userData.username,
        email: userData.email,
        password: userData.password,
      });
      if (response.success) {
        signUp(response.user, navigate);
      }
    }
  };

  return (
    <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>

        <p className="mt-4 text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero
          nulla eaque error neque ipsa culpa autem, at itaque nostrum!
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mb-0 mt-8 max-w-md space-y-4"
      >
        {inputsData.map((input) => (
          <AppInput key={input.name} {...input} />
        ))}

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            You Have an account already
            <Link className="underline" to={"/auth"}>
              Sign in
            </Link>
          </p>

          <button
            disabled={disabled}
            type="submit"
            className="disabled:opacity-50  disabled:cursor-not-allowed inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

function AppInput({
  label,
  type,
  name,
  value,
  onChange,
  className,
  placeholder,
  icon,
  error,
}) {
  const [isErrorShow, setIsErrorShow] = useState(false);

  return (
    <div>
      <label htmlFor="email" className="sr-only">
        {label}
      </label>

      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={className}
          placeholder={placeholder}
          onBlur={() => setIsErrorShow(true)}
          onFocus={() => setIsErrorShow(false)}
        />
        {icon}
      </div>

      {error && isErrorShow && value && (
        <div
          class="p-4 my-4  text-sm text-red-800 rounded-lg bg-red-50"
          role="alert"
        >
          {error}
        </div>
      )}
    </div>
  );
}
