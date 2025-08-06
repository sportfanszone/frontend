// app/auth/signup/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import InputGroup from "@/app/(auth)/components/InputGroup";
import PasswordInputGroup from "@/app/(auth)/components/PasswordInputGroup";
import { signupSchema } from "@/lib/validation/signupSchema";
import Swal from "sweetalert2";

type FormFields = {
  firstName: string;
  middleName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  termsAndConditions: boolean;
};

type PasswordFormFields = Pick<FormFields, "password" | "passwordConfirm">;

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState<FormFields>({
    firstName: "",
    middleName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    termsAndConditions: false,
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormFields, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const showAlert = sessionStorage.getItem("showLoginSuccessAlert");
    if (showAlert === "true") {
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
      Toast.fire({
        icon: "success",
        title: "Sign up successful",
      });
      sessionStorage.removeItem("showLoginSuccessAlert");
    }
  }, []);

  const handleGoogleAuth = async () => {
    sessionStorage.setItem("showLoginSuccessAlert", "true");
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`;
  };

  const validateForm = () => {
    const result = signupSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof FormFields;
        fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleChange = <K extends keyof FormFields>(
    key: K,
    value: FormFields[K]
  ) => {
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
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(form),
        }
      );
      const data = await response.json();

      if (response.ok && data.status === "success") {
        const { sessionId } = data.data || {};
        console.log("Data");
        console.log(data.data);
        console.log(`/auth/otp?session=${sessionId}`);
        if (!sessionId) {
          throw new Error("No session ID returned");
        }
        router.push(`/auth/otp?session=${sessionId}`);
        Toast.fire({
          icon: "success",
          title: "An OTP has been sent to your email",
        });
      } else {
        Toast.fire({
          icon: "error",
          title: data.message || "Error signing up",
        });
        if (data.errors?.length > 0) {
          const fieldErrors: Partial<typeof errors> = {};
          data.errors.forEach(
            (error: { field: keyof FormFields; message: string }) => {
              fieldErrors[error.field] = error.message;
            }
          );
          setErrors(fieldErrors);
        }
      }
    } catch (error) {
      console.error("Signup error:", error);
      Toast.fire({
        icon: "error",
        title: "Error signing up",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="p-7 font-medium max-w-400 mx-auto min-h-screen pt-21 sm:pt-27 md:pt-35">
      <div className="text-center max-w-xs sm:max-w-sm md:max-w-md mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-7 md:mb-10">
          Sign up
        </h1>

        <div onClick={handleGoogleAuth} className="googleButtonContainer">
          <Image
            className="w-6 h-6 sm:w-6 sm:h-6 md:w-7.5 md:h-7.5"
            src="/svgs/google-icon-logo.svg"
            alt="Google logo"
            width={24}
            height={24}
          />
          <span className="text-sm sm:text-md md:text-lg font-bold">
            Sign up with Google
          </span>
        </div>

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
              id={id as keyof FormFields}
              label={label}
              type={type}
              errors={errors}
              form={form}
              handleChange={handleChange}
            />
          ))}

          {[
            { id: "password", label: "Password" },
            { id: "passwordConfirm", label: "Confirm Password" },
          ].map(({ id, label }) => (
            <PasswordInputGroup
              key={id}
              id={id as keyof PasswordFormFields}
              label={label}
              errors={
                errors as Partial<Record<keyof PasswordFormFields, string>>
              }
              form={{
                password: form.password,
                passwordConfirm: form.passwordConfirm,
              }}
              handleChange={handleChange}
            />
          ))}

          <label
            htmlFor="termsAndConditions"
            className="font-bold text-center flex items-center justify-center gap-2 cursor-pointer text-sm text-gray-700"
          >
            <input
              id="termsAndConditions"
              type="checkbox"
              className="w-5 h-5 accent-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
              onChange={(e) =>
                handleChange("termsAndConditions", e.target.checked)
              }
              checked={form.termsAndConditions}
            />
            <span className="text-sm sm:text-md md:text-lg">
              Accept{" "}
              <Link className="text-green-500" href="/terms">
                terms and conditions
              </Link>
            </span>
          </label>
          {errors.termsAndConditions && (
            <p className="text-red-500 text-sm">{errors.termsAndConditions}</p>
          )}

          <button
            className="formButton mt-6"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Sign Up"}
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
