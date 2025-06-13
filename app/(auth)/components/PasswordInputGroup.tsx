import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import ResponsiveIcon from "@/app/(auth)/components/ResponsiveIcon";

type PasswordInputGroupProps = {
  id: string;
  errors: Record<string, string>;
  form: Record<string, string>;
  handleChange: (key: any, value: string) => void;
};

const PasswordInputGroup = ({
  id,
  errors,
  form,
  handleChange,
}: PasswordInputGroupProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div key={id} className="mb-5 sm:mb-6 md:mb-8.5">
      <div
        className={`${
          errors[id as keyof typeof form] ? "formGroupError" : "formGroup"
        } flex items-center justify-between`}
      >
        <label
          className={
            errors[id as keyof typeof form] ? "formLabelError" : "formLabel"
          }
          htmlFor={id}
        >
          {id === "passwordConfirm" ? "Confirm Password" : "Password"}
        </label>
        <input
          className="formInput"
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={
            id === "passwordConfirm" ? "Confirm Your Password" : "Your Password"
          }
          value={form[id as keyof typeof form]}
          onChange={(e) =>
            handleChange(id as keyof typeof form, e.target.value)
          }
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="formInputIcon"
        >
          {showPassword ? (
            <ResponsiveIcon Icon={FiEye} className="text-inherit" />
          ) : (
            <ResponsiveIcon Icon={FiEyeOff} className="text-inherit" />
          )}
        </button>
      </div>
      {errors[id as keyof typeof form] && (
        <p className="text-red-500 text-left text-sm">
          {errors[id as keyof typeof form]}
        </p>
      )}
    </div>
  );
};

export default PasswordInputGroup;
