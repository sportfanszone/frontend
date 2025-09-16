"use client";

import { ReactNode } from "react";

type InputGroupProps<T extends Record<string, string | boolean>> = {
  id: keyof T;
  label: string | ReactNode;
  type?: string;
  errors: Partial<Record<keyof T, string>>;
  form: T;
  handleChange: <K extends keyof T>(key: K, value: T[K]) => void;
};

const InputGroup = <T extends Record<string, string | boolean>>({
  id,
  errors,
  label,
  type = "text",
  form,
  handleChange,
}: InputGroupProps<T>) => {
  return (
    <div className="mb-5 sm:mb-6 md:mb-8.5">
      <label
        className={errors[id] ? "formLabelError" : "formLabel"}
        htmlFor={id as string}
      >
        {label}
      </label>
      <div className={errors[id] ? "formGroupError" : "formGroup"}>
        <input
          className="formInput"
          id={id as string}
          type={type}
          placeholder={typeof label === "string" ? `Your ${label}` : undefined}
          value={
            typeof form[id] === "boolean" ? undefined : (form[id] as string)
          }
          onChange={(e) =>
            handleChange(
              id,
              (type === "checkbox"
                ? e.target.checked
                : e.target.value) as T[typeof id]
            )
          }
        />
      </div>
      {errors[id] && (
        <p className="text-red-500 text-left text-sm">{errors[id]}</p>
      )}
    </div>
  );
};

export default InputGroup;
