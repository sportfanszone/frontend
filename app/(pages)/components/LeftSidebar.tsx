import { FiChevronRight } from "react-icons/fi";

const LeftSidebar = () => {
  return (
    <div>
      <div>Left bar</div>
      <button className="bg-white absolute top-[50%] right-0 w-8 h-8 border-black/40 border-2 rounded-full cursor-pointer grid place-content-center -translate-y-[100%] translate-x-[50%]">
        <FiChevronRight />
      </button>
    </div>
  );
};

export default LeftSidebar;
