"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Label } from "@/app/components/ui/label";

type SelectGroupProps<T extends Record<string, any>> = {
  id: keyof T;
  label: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  errors: Partial<Record<keyof T, string>>;
  form: T;
  handleChange: <K extends keyof T>(key: K, value: T[K]) => void;
};

const SelectGroup = <T extends Record<string, any>>({
  id,
  label,
  placeholder = "Select an option",
  options,
  errors,
  form,
  handleChange,
}: SelectGroupProps<T>) => {
  return (
    <div key={String(id)} className="mb-2 sm:mb-3 md:mb-4">
      <Label htmlFor={id as string}>{label}</Label>
      <Select
        value={form[id] as string}
        onValueChange={(value) => handleChange(id, value as T[keyof T])}
      >
        <SelectTrigger
          className={`mt-1 w-full ${errors[id] ? "border-red-500" : ""}`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors[id] && (
        <p className="text-red-500 text-left text-sm mt-1">{errors[id]}</p>
      )}
    </div>
  );
};

export default SelectGroup;
