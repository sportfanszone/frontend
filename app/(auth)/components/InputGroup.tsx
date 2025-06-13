type InputGroupProps = {
  id: string;
  label: string;
  type?: string;
  errors: Record<string, string>;
  form: Record<string, string>;
  handleChange: (key: any, value: string) => void;
};

const InputGroup = ({
  id,
  errors,
  label,
  type,
  form,
  handleChange,
}: InputGroupProps) => {
  return (
    <div className="mb-5 sm:mb-6 md:mb-8.5">
      <div
        className={
          errors[id as keyof typeof form] ? "formGroupError" : "formGroup"
        }
      >
        <label
          className={
            errors[id as keyof typeof form] ? "formLabelError" : "formLabel"
          }
          htmlFor={id}
        >
          {label}
        </label>
        <input
          className="formInput"
          id={id}
          type={type}
          placeholder={`Your ${label}`}
          value={form[id as keyof typeof form]}
          onChange={(e) =>
            handleChange(id as keyof typeof form, e.target.value)
          }
        />
      </div>
      {errors[id as keyof typeof form] && (
        <p className="text-red-500 text-left text-sm">
          {errors[id as keyof typeof form]}
        </p>
      )}
    </div>
  );
};

export default InputGroup;
