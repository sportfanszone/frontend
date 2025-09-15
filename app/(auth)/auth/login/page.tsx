"use client";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import InputGroup from "@/app/(auth)/components/InputGroup";
import PasswordInputGroup from "@/app/(auth)/components/PasswordInputGroup";
import { loginSchema } from "@/lib/validation/loginSchema";
import Swal from "sweetalert2";
import { UserContext } from "@/app/context/UserContext";

type FormFields = {
  email: string;
  password: string;
  rememberMe: boolean;
};

type PasswordFormFields = Pick<FormFields, "password">;

export default function Login() {
  const { setUser } = useContext(UserContext);
  const router = useRouter();

  const [form, setForm] = useState<FormFields>({
    email: "",
    password: "",
    rememberMe: false,
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
        title: "Login successful",
      });
      sessionStorage.removeItem("showLoginSuccessAlert");
    }
  }, []);

  const handleGoogleAuth = async () => {
    sessionStorage.setItem("showLoginSuccessAlert", "true");
    window.location.href = `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/auth/google`;
  };

  const validateForm = () => {
    const result = loginSchema.safeParse(form);
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
      const result = loginSchema.safeParse(updatedForm);
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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/auth/login`,
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

      if (res.ok || data.status === "success") {
        const isProd = process.env.NODE_ENV === "production";
        const expires = new Date();
        expires.setHours(expires.getHours() + 2);

        document.cookie = `userToken=${encodeURIComponent(
          data.token
        )}; expires=${expires.toUTCString()}; path=/; ${
          isProd ? "Domain=sportfanszone.com;" : ""
        } SameSite=${isProd ? "None" : "Lax"}; ${isProd ? "Secure" : ""}`;

        setUser({ ...data.user });

        router.push("/user/dashboard");
        Toast.fire({
          icon: "success",
          title: "Login successful",
        });
      } else {
        if (data.message) {
          Toast.fire({
            icon: "error",
            title: data.message,
          });
        }
        if (data.errors?.length > 0) {
          const fieldErrors: typeof errors = {};
          data.errors.forEach(
            (error: { field: keyof FormFields; message: string }) => {
              fieldErrors[error.field] = error.message;
            }
          );
          setErrors((prevErrors) => ({ ...prevErrors, ...fieldErrors }));
        }
      }
    } catch {
      Toast.fire({
        icon: "error",
        title: "Error signing in",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main
      className="p-7 font-medium max-w-400 mx-auto min-h-screen pt-21 sm:pt-27 md:pt-35 bg-no-repeat bg-cover"
      style={{ backgroundImage: "url(/images/animated-world-map.gif)" }}
    >
      <div className="text-center max-w-xs sm:max-w-sm md:max-w-md mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-7 md:mb-10">
          Welcome Back
        </h1>

        {/* Google button */}
        <div onClick={handleGoogleAuth} className="googleButtonContainer">
          <Image
            className="w-6 h-6 sm:w-6 sm:h-6 md:w-7.5 md:h-7.5"
            src="/svgs/google-icon-logo.svg"
            alt="Google logo"
            width={24}
            height={24}
          />
          <span className="text-sm sm:text-md md:text-lg font-bold">
            Login with Google
          </span>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mb-6 sm:mb-7 md:mb-10">
          <hr className="border-b w-full border-black/20" />
          <span className="md:text-lg">or</span>
          <hr className="border-b w-full border-black/20" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <InputGroup
            id="email"
            label="Email"
            type="email"
            errors={errors}
            form={form}
            handleChange={handleChange}
          />

          <PasswordInputGroup
            id="password"
            label="Password"
            errors={errors as Partial<Record<keyof PasswordFormFields, string>>}
            form={{ password: form.password }}
            handleChange={handleChange}
          />

          {/* Remember Me */}
          <label
            htmlFor="rememberMe"
            className="font-bold text-center flex items-center justify-center gap-2 cursor-pointer text-sm text-gray-700"
          >
            <input
              id="rememberMe"
              type="checkbox"
              className="w-5 h-5 accent-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
              onChange={(e) => handleChange("rememberMe", e.target.checked)}
              checked={form.rememberMe}
            />
            <span className="text-sm sm:text-md md:text-lg">Remember me</span>
          </label>

          <button
            className="formButton mt-6"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Login"}
          </button>
        </form>

        <div className="text-sm sm:text-md md:text-lg font-bold flex items-center justify-center gap-4 mb-6">
          <span>Don&apos;t have an account?</span>
          <Link className="text-green-500" href="/auth/signup">
            Sign Up Now
          </Link>
        </div>
      </div>
    </main>
  );
}
