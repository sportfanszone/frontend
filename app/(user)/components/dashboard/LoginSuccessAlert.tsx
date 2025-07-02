"use client";
import { useEffect } from "react";
import Swal from "sweetalert2";

const LoginSuccessAlert = () => {
  useEffect(() => {
    if (sessionStorage.getItem("showLoginSuccessAlert") === "true") {
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
  return null;
};

export default LoginSuccessAlert;
