import { useState, useCallback } from "react";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";
import debounce from "lodash.debounce";

const Searchbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // Debounced function to handle search navigation
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      const url = `/topics?${query ? `q=${encodeURIComponent(query)}` : ""}`;
      // Use router.push for client-side navigation, fallback to window.location.href
      if (router) {
        router.push(url);
      } else {
        window.location.href = url;
      }
    }, 300), // 300ms debounce delay
    [router]
  );

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query.trim());
  };

  // Handle form submission for immediate search
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

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border-black/40 border-2 text-black rounded-full w-fit max-w-130 m-auto flex-1 flex justify-center items-center mx-auto py-[0px] px-1"
    >
      <input
        className="py-1.5 px-2 w-[100%] outline-none"
        type="text"
        placeholder="Search your interest"
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button
        type="submit"
        className="bg-black/40 text-white rounded-full cursor-pointer p-2 hover:opacity-90 transition"
      >
        <FiSearch className="w-3.5 h-3.5" />
      </button>
    </form>
  );
};

export default Searchbar;
