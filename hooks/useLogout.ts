import { useRouter } from "next/navigation";
import clientFetcher from "@/lib/clientFetcher";
import Swal from "sweetalert2";

export function useLogout() {
  const router = useRouter();

  return async () => {
    const data: any = await clientFetcher(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/auth/logout`,
      "POST"
    );

    if (data.status === "success") {
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
        title: "Logout successful",
      });
      router.push("/auth/login");
    }
  };
}
