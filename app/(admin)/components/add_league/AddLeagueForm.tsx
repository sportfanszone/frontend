"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import InputGroup from "@/app/(admin)/components/add_league/InputGroup";
import { addLeagueSchema } from "@/lib/validation/addLeagueSchema";
import { Button } from "@/app/components/ui/button";
import DropzoneUploader from "@/app/(admin)/components/add_league/DropzoneUploader";

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
    name: "",
    description: "",
    logo: null as File | null,
    backgroundImage: null as File | null,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof form, string>>
  >({});

  const validateForm = () => {
    const result = addLeagueSchema.safeParse(form);
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
      const result = addLeagueSchema.safeParse(updatedForm);
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
    console.log("Error?:", validateForm());
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
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      if (form.logo) formData.append("logo", form.logo);
      if (form.backgroundImage)
        formData.append("backgroundImage", form.backgroundImage);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/admin/add_league`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );
      const data = await res.json();

      console.log("Response data:", res);
      console.log("Response data:", data);
      if (res.ok || data.status === "success") {
        Toast.fire({
          icon: "success",
          title: "League added successfully!",
        });
      } else {
        if (data.message) {
          Toast.fire({
            icon: "error",
            title: data.message,
          });
        }
        if (data?.errors?.length > 0) {
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
    } catch (err: { message?: string } | any) {
      console.error("Error adding league:", err);
      Toast.fire({
        icon: "error",
        title: err?.message,
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Add New League</CardTitle>
        <CardDescription>Manage and review leagues</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { id: "name", label: "League Name" },
              { id: "description", label: "Description" },
            ].map(
              ({
                id,
                label,
                type = "text",
              }: {
                id: string;
                label: string;
                type?: string;
              }) => (
                <InputGroup
                  key={id}
                  id={id as keyof typeof form}
                  label={label}
                  type={type}
                  errors={errors}
                  form={form}
                  handleChange={handleChange}
                />
              )
            )}
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 w-full">
            <DropzoneUploader
              label="Logo"
              file={form.logo}
              accept={{ "image/*": [] }}
              error={errors.logo}
              onFileSelect={(file) => handleChange("logo", file)}
            />
            <DropzoneUploader
              label="Background Image"
              file={form.backgroundImage}
              accept={{ "image/*": [] }}
              error={errors.backgroundImage}
              onFileSelect={(file) => handleChange("backgroundImage", file)}
            />
          </div>

          <Button className="formButtons mt-2" type="submit">
            Add league
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
