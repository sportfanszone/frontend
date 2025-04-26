import Link from "next/link";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";

const Header = () => {
  return (
    <>
      <header className="flex justify-between items-center absolute w-full text-white py-7 px-17 z-1">
        <Image src="/images/logo.png" alt="Logo" width={140} height={140} />

        <div className="font-light flex justify-between items-center gap-6">
          <Link href="#">Properties</Link>
          <Link href="#">Properties</Link>
          <Link href="#">Buy</Link>
          <Link href="#">Rent</Link>
          <Link href="#">About</Link>
        </div>

        <div className="flex justify-between items-center gap-1">
          <span className="font-light">contact us</span>
          <button className="bg-white font-semibold text-black py-1 px-4 ml-3 rounded-3xl flex justify-between items-center gap-1 cursor-pointer">
            <span>Booking now</span>
            <FiSearch className="size-5.5" />
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
