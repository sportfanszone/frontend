"use client";

import { useState } from "react";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { FiEye, FiEyeOff } from "react-icons/fi";

// Define a union of allowed value types for the form fields
type FormValue = string | File | null;

// Generic props type, where T is constrained to a record with FormValue types
type PasswordInputGroupProps<
  T extends Record<string, FormValue>,
  K extends keyof T
> = {
  id: K;
  errors: Partial<Record<keyof T, string>>;
  form: T;
  handleChange: (key: K, value: T[K]) => void;
};

const PasswordInputGroup = <
  T extends Record<string, FormValue>,
  K extends keyof T
>({
  id,
  errors,
  form,
  handleChange,
}: PasswordInputGroupProps<T, K>) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div key={String(id)} className="mb-2 sm:mb-3 md:mb-4">
      <Label className={`${errors[id] ? "" : ""} mb-1`} htmlFor={String(id)}>
        {id === "passwordConfirm" ? "Confirm Password" : "Password"}
      </Label>
      <div
        className={`${
          errors[id]
            ? "addUserFormPasswordGroupError"
            : "addUserFormPasswordGroup"
        } flex items-center justify-between`}
      >
        <Input
          className="border-none"
          id={String(id)}
          type={showPassword ? "text" : "password"}
          placeholder={
            id === "passwordConfirm" ? "Confirm Your Password" : "Your Password"
          }
          value={typeof form[id] === "string" ? form[id] : ""}
          onChange={(e) => {
            const value = e.target.value as T[K];
            handleChange(id, value);
          }}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="p-2"
        >
          {showPassword ? <FiEye /> : <FiEyeOff />}
        </button>
      </div>
      {errors[id] && (
        <p className="text-red-500 text-left text-sm">{errors[id]}</p>
      )}
    </div>
  );
};

export default PasswordInputGroup;
