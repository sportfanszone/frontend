import Image from "next/image";
import BackButton from "@/app/(pages)/components/BackButton";

import {
  FiChevronDown,
  FiChevronUp,
  FiMessageCircle,
  FiThumbsUp,
  FiShare2,
} from "react-icons/fi";

type PostSectionProps = {
  showBackbutton?: boolean;
};

const PostSection = ({ showBackbutton = true }: PostSectionProps) => {
  return (
    <section className="max-w-180 2xl:max-w-200 mx-auto p-4 pt-0">
      {/* Profile */}
      <div className="flex items-center justify-start gap-3 mb-1">
        {showBackbutton && <BackButton />}
        <Image
          src="/images/blankProfile.png"
          width={100}
          height={100}
          className="rounded-full w-10 h-10 object-cover"
          alt="User Profile"
        />
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold">@username</span>
            <span className="w-1 h-1 rounded-full bg-black/40 inline-block"></span>
            <span className="text-black/40">4 days ago</span>
          </div>
          <div className="">John Doe Nnn</div>
        </div>
      </div>

      {/* Post */}
      <h2 className="font-semibold text-2xl sm:text-3xl md:text-3xl mb-2">
        Lorem, ipsum dolor.
      </h2>
      <div className="relative max-h-80 w-full rounded-3xl overflow-hidden mb-5">
        {/* Blurred Background Layer */}
        <div
          className="absolute inset-0 bg-cover bg-center blur-2xl scale-110"
          style={{ backgroundImage: "url('/images/postImage1.jpg')" }}
        />

        {/* Foreground Image */}
        <Image
          src="/images/postImage1.jpg"
          width={800}
          height={600}
          className="relative w-full h-full md:h-80 object-contain rounded-3xl border border-black/40"
          alt="Post Image"
        />
      </div>
      <div className="flex items-center gap-2">
        <div className="flex justify-between items-center gap-1 bg-black/10 px-2.5 py-1 rounded-full">
          <FiThumbsUp /> <b>10</b>
        </div>
        <div className="flex justify-between items-center gap-1 bg-black/10 px-2.5 py-1 rounded-full">
          <FiMessageCircle /> <b>9</b>
        </div>
        <div className="flex justify-between items-center gap-2 bg-black/10 px-2.5 py-1 rounded-full">
          <FiChevronUp /> <b>7</b> <FiChevronDown />
        </div>
        <div className="flex justify-between items-center gap-1 bg-black/10 px-2.5 py-1 rounded-full">
          <FiShare2 /> <b>Sshare</b>
        </div>
      </div>
    </section>
  );
};

export default PostSection;
