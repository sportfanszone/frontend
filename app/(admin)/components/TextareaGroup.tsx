import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";

type FormValue = string | File | null;

type TextareaGroupProps<
  T extends Record<string, FormValue>,
  K extends keyof T
> = {
  id: K;
  label: string;
  errors: Partial<Record<keyof T, string>>;
  form: T;
  handleChange: (key: K, value: T[K]) => void;
};

const TextareaGroup = <T extends Record<string, FormValue>, K extends keyof T>({
  id,
  errors,
  label,
  form,
  handleChange,
}: TextareaGroupProps<T, K>) => {
  return (
    <div key={String(id)} className="mb-2 sm:mb-3 md:mb-4">
      <Label htmlFor={id as string} className="mb-1">
        {label}
      </Label>
      <Textarea
        className={errors[id] ? "border-red-500" : ""}
        id={id as string}
        placeholder={`Your ${label}`}
        value={typeof form[id] === "string" ? form[id] : ""}
        onChange={(e) => handleChange(id, e.target.value as T[K])}
      />
      {errors[id] && (
        <p className="text-red-500 text-left text-sm">{errors[id]}</p>
      )}
    </div>
  );
};

export default TextareaGroup;
