"use client";
import { useState } from "react";
import InputGroup from "@/app/components/ui/InputGroup";
import SelectGroup from "@/app/(admin)/components/add_user/SelectGroup";
import { editUserSchema } from "@/lib/validation/editUserSchema";
import { Button } from "@/app/components/ui/button";
import DropzoneUploader from "@/app/components/ui/DropzoneUploader";
import { DialogFooter, DialogClose } from "@/app/components/ui/dialog";

import Swal from "sweetalert2";
import { User } from "@/types";

interface EditUserFormProps {
  user: User;
  setData?: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function EditUserForm({ user, setData }: EditUserFormProps) {
  const [form, setForm] = useState({
    firstName: user.firstName || "",
    middleName: user.middleName || "",
    lastName: user.lastName || "",
    username: user.username || "",
    role: user.role || "",
    email: user.email || "",
    termsAndConditions: "",
    profilePhoto: null as File | null,
    coverPhoto: null as File | null,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof form, string>>
  >({});

  const validateForm = () => {
    const result = editUserSchema.safeParse(form);
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
      const result = editUserSchema.safeParse(updatedForm);
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

      formData.append("firstName", form.firstName);
      formData.append("middleName", form.middleName);
      formData.append("lastName", form.lastName);
      formData.append("username", form.username);
      formData.append("role", form.role);
      formData.append("email", form.email);
      formData.append("termsAndConditions", form.termsAndConditions);
      if (form.profilePhoto) formData.append("profilePhoto", form.profilePhoto);
      if (form.coverPhoto) formData.append("coverPhoto", form.coverPhoto);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/admin/edit_user/${user.id}`,
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
          title: "Account updated successfully!",
        });

        if (setData) {
          setData((prevData) =>
            prevData.map((u) =>
              u.id === user.id
                ? {
                    ...u,
                    ...form,
                    profileImageUrl: form.profilePhoto
                      ? URL.createObjectURL(form.profilePhoto)
                      : u.profileImageUrl,
                    coverPhotoUrl: form.coverPhoto
                      ? URL.createObjectURL(form.coverPhoto)
                      : u.coverPhotoUrl,
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

        <DropzoneUploader
          label="Profile Photo"
          file={form.profilePhoto}
          accept={{ "image/*": [] }}
          error={errors.profilePhoto}
          onFileSelect={(file) => handleChange("profilePhoto", file)}
          initialUrl={user.profileImageUrl || ""}
        />
        <DropzoneUploader
          label="Cover Photo"
          file={form.coverPhoto}
          accept={{ "image/*": [] }}
          error={errors.coverPhoto}
          onFileSelect={(file) => handleChange("coverPhoto", file)}
          initialUrl={user.coverPhotoUrl || ""}
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
