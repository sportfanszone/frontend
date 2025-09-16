"use client";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import ResponsiveIcon from "@/app/(auth)/components/ResponsiveIcon";

type PasswordInputGroupProps<T extends Record<string, string>> = {
  id: keyof T;
  label: string;
  errors: Partial<Record<keyof T, string>>;
  form: T;
  handleChange: <K extends keyof T>(key: K, value: T[K]) => void;
};

const PasswordInputGroup = <T extends Record<string, string>>({
  id,
  label,
  errors,
  form,
  handleChange,
}: PasswordInputGroupProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div key={String(id)} className="mb-5 sm:mb-6 md:mb-8.5">
      <label
        className={errors[id] ? "formLabelError" : "formLabel"}
        htmlFor={String(id)}
      >
        {label}
      </label>
      <div
        className={`${
          errors[id] ? "formGroupError" : "formGroup"
        } flex items-center justify-between`}
      >
        <input
          className="formInput"
          id={String(id)}
          type={showPassword ? "text" : "password"}
          placeholder={`Your ${label}`}
          value={form[id]}
          onChange={(e) => handleChange(id, e.target.value as T[typeof id])}
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
      {errors[id] && (
        <p className="text-red-500 text-left text-sm">{errors[id]}</p>
      )}
    </div>
  );
};

export default PasswordInputGroup;
