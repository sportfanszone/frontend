"use client";
import { useState } from "react";
import PasswordInputGroup from "@/app/(admin)/components/PasswordInputGroup";
import { resetUserPasswordSchema } from "@/lib/validation/resetUserPasswordSchema";
import { Button } from "@/app/components/ui/button";
import { DialogFooter, DialogClose } from "@/app/components/ui/dialog";
import UserAvatar from "@/app/components/ui/UserAvatar";

import Swal from "sweetalert2";
import { User } from "@/types";

interface ResetUserPasswordFormProps {
  user: User;
  setData?: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function ResetUserPasswordForm({
  user,
  setData,
}: ResetUserPasswordFormProps) {
  const [form, setForm] = useState({
    password: "",
    passwordConfirm: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof form, string>>
  >({});

  const validateForm = () => {
    const result = resetUserPasswordSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof typeof form;
        fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleChange = <K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K]
  ) => {
    setForm((prev) => {
      const updatedForm = { ...prev, [key]: value };
      const result = resetUserPasswordSchema.safeParse(updatedForm);
      if (!result.success) {
        const fieldError = result.error.issues.find(
          (issue) => issue.path[0] === key
        );
        setErrors((prevErrors) => ({
          ...prevErrors,
          [key]: fieldError?.message || "",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [key]: "",
        }));
      }
      return updatedForm;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("Form submitted:", form);
    e.preventDefault();

    if (!validateForm()) return;

    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/admin/reset_user_password/${user.id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();

      console.log("Response data:", res);
      console.log("Response data:", data);
      if (res.ok || data.status === "success") {
        Toast.fire({
          icon: "success",
          title: data.message || "Password reset successfully!",
        });
      } else {
        if (data.message) {
          Toast.fire({
            icon: "error",
            title: data.message,
          });
        }
        if (data.errors.length > 0) {
          console.log("Field errors:", data.errors);
          const fieldErrors: Partial<typeof errors> = {};
          data.errors.forEach(
            (error: { field: keyof typeof form; message: string }) => {
              fieldErrors[error.field] = error.message;
            }
          );
          setErrors((prevErrors) => ({ ...prevErrors, ...fieldErrors }));
        }
      }
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: "Error resetting password. Please try again.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-2 my-2 mb-4">
        <UserAvatar
          src={user.profileImageUrl}
          alt={`${user.firstName?.[0]}${user.lastName?.[0]}`}
          className="w-8 h-8 rounded-full border border-gray-300 shadow-sm"
        />
        <p className="text-sm text-black/50 font-medium">
          {user.firstName} {user.middleName} {user.lastName}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 w-full">
        {["password", "passwordConfirm"].map((id) => (
          <PasswordInputGroup
            key={id}
            id={id as keyof typeof form}
            errors={errors}
            form={form}
            handleChange={handleChange}
          />
        ))}
      </div>

      <DialogFooter className="mt-2 sm:mt-3 md:mt-4">
        <DialogClose asChild>
          <Button variant="secondary">Cancel</Button>
        </DialogClose>
        <Button variant="default" type="submit">
          Continue
        </Button>
      </DialogFooter>
    </form>
  );
}
