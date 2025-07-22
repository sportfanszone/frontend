"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import InputGroup from "@/app/(admin)/components/add_user/InputGroup";
import PasswordInputGroup from "@/app/(admin)/components/add_user/PasswordInputGroup";
import SelectGroup from "@/app/(admin)/components/add_user/SelectGroup";
import { addUserSchema } from "@/lib/validation/addUserSchema";
import { Button } from "@/app/components/ui/button";

import Swal from "sweetalert2";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/app/components/ui/card";

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    username: "",
    role: "",
    email: "",
    password: "",
    passwordConfirm: "",
    termsAndConditions: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof form, string>>
  >({});

  const validateForm = () => {
    const result = addUserSchema.safeParse(form);
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

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => {
      const updatedForm = { ...prev, [key]: value };
      const result = addUserSchema.safeParse(updatedForm);
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
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/admin/add_user`,
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
          title: "Account created successfully!",
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
        title: "Error signing up",
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Add New User</CardTitle>
        <CardDescription>Manage and review user accounts</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 w-full">
            {[
              { id: "firstName", label: "First Name" },
              { id: "middleName", label: "Middle Name" },
              { id: "lastName", label: "Last Name" },
              { id: "username", label: "Username" },
              { id: "email", label: "Email", type: "email" },
            ].map(({ id, label, type = "text" }) => (
              <InputGroup
                key={id}
                id={id as keyof typeof form}
                label={label}
                type={type}
                errors={errors}
                form={form}
                handleChange={handleChange}
              />
            ))}

            <SelectGroup
              id="role"
              label="Role"
              errors={errors}
              form={form}
              handleChange={handleChange}
              placeholder="Select a role"
              options={[
                { label: "Admin", value: "admin" },
                { label: "User", value: "user" },
              ]}
            />

            {/* Password */}
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

          <Button className="formButtons mt-2 sm:mt-3 md:mt-4" type="submit">
            Create account
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
