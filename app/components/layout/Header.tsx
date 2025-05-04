import Image from "next/image";
import HeaderNav from "../ui/HeaderNav";

const Header = () => {
  return (
    <>
      <header className="flex justify-between items-center absolute w-full text-white py-7 px-17 z-1">
        <Image src="/images/logo.png" alt="Logo" width={160} height={160} />
        <HeaderNav />
      </header>
    </>
  );
};

export default Header;
