import { useState } from "react";

import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { FiEye, FiEyeOff } from "react-icons/fi";

type PasswordInputGroupProps<T extends Record<string, any>> = {
  id: keyof T;
  errors: Partial<Record<keyof T, string>>;
  form: T;
  handleChange: <K extends keyof T>(key: K, value: T[K]) => void;
};

const PasswordInputGroup = <T extends Record<string, any>>({
  id,
  errors,
  form,
  handleChange,
}: PasswordInputGroupProps<T>) => {
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
        } flex items-center justify-between `}
      >
        <Input
          className="border-none "
          id={String(id)}
          type={showPassword ? "text" : "password"}
          placeholder={
            id === "passwordConfirm" ? "Confirm Your Password" : "Your Password"
          }
          value={form[id] as string}
          onChange={(e) => handleChange(id, e.target.value as T[keyof T])}
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
