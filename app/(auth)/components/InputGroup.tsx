type InputGroupProps<T extends Record<string, any>> = {
  id: keyof T;
  label: string;
  type?: string;
  errors: Partial<Record<keyof T, string>>;
  form: T;
  handleChange: <K extends keyof T>(key: K, value: T[K]) => void;
};

const InputGroup = <T extends Record<string, any>>({
  id,
  errors,
  label,
  type = "text",
  form,
  handleChange,
}: InputGroupProps<T>) => {
  return (
    <div className="mb-5 sm:mb-6 md:mb-8.5">
      <div className={errors[id] ? "formGroupError" : "formGroup"}>
        <label
          className={errors[id] ? "formLabelError" : "formLabel"}
          htmlFor={id as string}
        >
          {label}
        </label>
        <input
          className="formInput"
          id={id as string}
          type={type}
          placeholder={`Your ${label}`}
          value={form[id] as string}
          onChange={(e) => handleChange(id, e.target.value as T[keyof T])}
        />
      </div>
      {errors[id] && (
        <p className="text-red-500 text-left text-sm">{errors[id]}</p>
      )}
    </div>
  );
};

export default InputGroup;
