import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";

type InputGroupProps<T extends Record<string, any>, K extends keyof T> = {
  id: K;
  label: string;
  type?: string;
  errors: Partial<Record<keyof T, string>>;
  form: T;
  handleChange: (key: K, value: T[K]) => void;
};

const InputGroup = <T extends Record<string, any>, K extends keyof T>({
  id,
  errors,
  label,
  type = "text",
  form,
  handleChange,
}: InputGroupProps<T, K>) => {
  return (
    <div key={String(id)}>
      <div>
        <Label
          className={`${errors[id] ? "" : ""} mb-1`}
          htmlFor={id as string}
        >
          {label}
        </Label>
        <Input
          className={errors[id] ? "border-red-500" : ""}
          id={id as string}
          type={type}
          placeholder={`Your ${label}`}
          value={typeof form[id] === "string" ? (form[id] as string) : ""}
          onChange={(e) => {
            const value: T[K] =
              type === "file"
                ? (e.target.files?.[0] as T[K])
                : (e.target.value as T[K]);

            handleChange(id, value);
          }}
        />
      </div>
      {errors[id] && (
        <p className="text-red-500 text-left text-sm">{errors[id]}</p>
      )}
    </div>
  );
};

export default InputGroup;
