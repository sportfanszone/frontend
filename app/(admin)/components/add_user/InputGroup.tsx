import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";

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
    <div key={String(id)} className="mb-2 sm:mb-3 md:mb-4">
      <div>
        <Label
          className={`${errors[id] ? "" : ""} mb-1`}
          htmlFor={id as string}
        >
          {label}
        </Label>
        <Input
          className={`${errors[id] && "border-red-500"}`}
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
