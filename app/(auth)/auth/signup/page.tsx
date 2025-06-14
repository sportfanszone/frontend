"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import InputGroup from "@/app/(auth)/components/InputGroup";
import PasswordInputGroup from "@/app/(auth)/components/PasswordInputGroup";
import { signupSchema } from "@/lib/validation/signupSchema";
import Swal from "sweetalert2";

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    termsAndConditions: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof form, string>>
  >({});

  const validateForm = () => {
    const result = signupSchema.safeParse(form);
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
      const result = signupSchema.safeParse(updatedForm);
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
      const res = await fetch("http://localhost:3001/api/auth/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      console.log("Response data:", res);
      console.log("Response data:", data);
      if (res.ok || data.status === "success") {
        router.push("/auth/otp");
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
    <main className="p-7 font-medium max-w-400 mx-auto min-h-screen pt-21 sm:pt-27 md:pt-35">
      <div className="text-center max-w-xs sm:max-w-sm md:max-w-md mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-7 md:mb-10">
          Sign up
        </h1>

        {/* Google button */}
        <div className="googleButtonContainer">
          <Image
            className="width-6 h-6 sm:w-6 sm:h-6 md:w-7.5 md:h-7.5"
            src="/svgs/google-icon-logo.svg"
            alt="Google logo"
            width={25}
            height={25}
          />
          <span className="text-sm sm:text-md md:text-lg font-bold">
            Continue with Google
          </span>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mb-6 sm:mb-7 md:mb-10">
          <hr className="border-b w-full border-black/20" />
          <span className="md:text-lg">or</span>
          <hr className="border-b w-full border-black/20" />
        </div>

        <form onSubmit={handleSubmit}>
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

          {/* Terms */}
          <label
            htmlFor="rememberMe"
            className="font-bold text-center flex items-center justify-center gap-2 cursor-pointer text-sm text-gray-700"
          >
            <input
              id="rememberMe"
              type="checkbox"
              className="w-5 h-5 accent-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
              onChange={(e) =>
                handleChange(
                  "termsAndConditions",
                  e.target.checked ? "true" : "false"
                )
              }
              checked={form.termsAndConditions === "true"}
            />
            <span className="text-sm sm:text-md md:text-lg">
              Accept{" "}
              <Link className="text-green-500" href="#">
                terms and conditions
              </Link>
            </span>
          </label>
          {errors.termsAndConditions && (
            <p className="text-red-500 text-sm">{errors.termsAndConditions}</p>
          )}

          <button className="formButton mt-6" type="submit">
            Sign Up
          </button>
        </form>

        <div className="text-sm sm:text-md md:text-lg font-bold flex items-center justify-center gap-4 mb-6">
          <span>Already have an account?</span>
          <Link className="text-green-500" href="/auth/login">
            Login Now
          </Link>
        </div>
      </div>
    </main>
  );
}
