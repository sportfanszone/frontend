"use client";

import { useState, useCallback, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";
import debounce from "lodash.debounce";
import { cn } from "@/lib/utils";
import { tv, VariantProps } from "tailwind-variants";

// Define the variants
const searchbarVariants = tv({
  base: "rounded-full flex justify-center items-center py-0 px-1",
  variants: {
    size: {
      default: "w-fit max-w-130",
      full: "w-full",
      sm: "max-w-sm",
    },
    align: {
      center: "mx-auto",
      left: "ml-0",
      right: "mr-0",
    },
    color: {
      default: "border-black/40 text-black",
      primary: "border-primary text-primary",
      secondary: "border-secondary text-secondary",
      accent: "border-accent text-accent",
    },
  },
  defaultVariants: {
    size: "default",
    align: "center",
    color: "default",
  },
});

interface SearchbarProps extends VariantProps<typeof searchbarVariants> {
  className?: string;
}

const Searchbar = ({ className, size, align, color }: SearchbarProps) => {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q")
    ? decodeURIComponent(searchParams.get("q")!)
    : "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const router = useRouter();

  // Update searchQuery when URL query changes (e.g., browser back/forward)
  useEffect(() => {
    const query = searchParams.get("q")
      ? decodeURIComponent(searchParams.get("q")!)
      : "";
    setSearchQuery(query);
  }, [searchParams]);

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      const url = `/topics?${query ? `q=${encodeURIComponent(query)}` : ""}`;
      if (router) {
        router.push(url);
      } else {
        window.location.href = url;
      }
    }, 300),
    [router]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query.trim());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = `/topics?${
      searchQuery ? `q=${encodeURIComponent(searchQuery)}` : ""
    }`;
    if (router) {
      router.push(url);
    } else {
      window.location.href = url;
    }
  };

  // Map button background classes to the color variant
  const buttonColorClasses: Record<string, string> = {
    default: "bg-black/40 text-white",
    primary: "bg-primary text-white",
    secondary: "bg-secondary text-white",
    accent: "bg-accent text-white",
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "border-2 bg-white",
        searchbarVariants({ size, align, color }),
        className
      )}
    >
      <input
        className="py-1.5 px-2 w-full outline-none"
        type="text"
        placeholder="Search your interest"
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button
        type="submit"
        className={cn(
          "rounded-full cursor-pointer p-2 hover:opacity-90 transition",
          buttonColorClasses[color || "default"]
        )}
      >
        <FiSearch className="w-3.5 h-3.5" />
      </button>
    </form>
  );
};

export default Searchbar;
