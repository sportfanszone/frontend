"use client";
import { useState } from "react";
import InputGroup from "@/app/(admin)/components/InputGroup";
import TextareaGroup from "@/app/(admin)/components/TextareaGroup";
import { editClubSchema } from "@/lib/validation/editClubSchema";
import { Button } from "@/app/components/ui/button";
import DropzoneUploader from "@/app/(admin)/components/DropzoneUploader";

import {
  DialogFooter,
  DialogClose,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";

import Swal from "sweetalert2";
import { Club } from "@/types";

interface EditClubFormProps {
  club: Club;
  setData?: React.Dispatch<React.SetStateAction<Club[]>>;
}

export default function EditClubForm({ club, setData }: EditClubFormProps) {
  const [form, setForm] = useState({
    name: club.name || "",
    description: club.description || "",
    logo: null as File | null,
    backgroundImage: null as File | null,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof form, string>>
  >({});

  const validateForm = () => {
    const result = editClubSchema.safeParse(form);
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
      const result = editClubSchema.safeParse(updatedForm);
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
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("description", form.description);
      if (form.logo) formData.append("logo", form.logo);
      if (form.backgroundImage)
        formData.append("backgroundImage", form.backgroundImage);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/admin/edit_club/${club.id}`,
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
          title: data.message || "Club updated successfully!",
        });

        if (setData) {
          setData((prevData) =>
            prevData.map((u) =>
              u.id === club.id
                ? {
                    ...u,
                    ...form,
                    logo: form.logo ? URL.createObjectURL(form.logo) : u.logo,
                    backgroundImage: form.backgroundImage
                      ? URL.createObjectURL(form.backgroundImage)
                      : u.backgroundImage,
                  }
                : u
            )
          );
        }
      } else {
        if (data.message) {
          Toast.fire({
            icon: "error",
            title: data.message,
          });
        }
        if (data.errors?.length > 0) {
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
    } catch {
      Toast.fire({
        icon: "error",
        title: "Error updating club",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader className="mb-4 md:mb-6">
        <DialogTitle>Edit Club</DialogTitle>
      </DialogHeader>
      <div className="mb-5">
        <InputGroup
          id={"name" as keyof typeof form}
          label="Name"
          type="text"
          errors={errors}
          form={form}
          handleChange={handleChange}
        />
      </div>

      <TextareaGroup
        id={"description" as keyof typeof form}
        label="Description"
        form={form}
        errors={errors}
        handleChange={handleChange}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 w-full">
        <DropzoneUploader
          label="Logo"
          file={form.logo}
          accept={{ "image/*": [] }}
          error={errors.logo}
          onFileSelect={(file) => handleChange("logo", file)}
          initialUrl={club.logo || ""}
        />
        <DropzoneUploader
          label="Background Image"
          file={form.backgroundImage}
          accept={{ "image/*": [] }}
          error={errors.backgroundImage}
          onFileSelect={(file) => handleChange("backgroundImage", file)}
          initialUrl={club.backgroundImage || ""}
        />
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
