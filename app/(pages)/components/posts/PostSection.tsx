"use client";
import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import YouTube from "react-youtube";
import BackButton from "@/app/components/ui/BackButton";
import UserAvatar from "@/app/components/ui/UserAvatar";
import {
  FiMessageCircle,
  FiShare2,
  FiChevronLeft,
  FiChevronRight,
  FiX,
} from "react-icons/fi";
import moment from "moment";
import { Post } from "@/types";
import { isValidYouTubeUrl, cn } from "@/lib/utils";

const CreateComment = dynamic(
  () => import("@/app/components/ui/CreateComment"),
  { ssr: false }
);
const Like = dynamic(() => import("@/app/components/ui/Like"), { ssr: false });
const Share = dynamic(() => import("@/app/components/ui/Share"), {
  ssr: false,
});

type PostSectionProps = {
  showBackbutton?: boolean;
  post: Post;
  className?: string;
};

const PostSection = ({
  post,
  showBackbutton = true,
  className,
}: PostSectionProps) => {
  const [commentCount, setCommentCount] = useState<number>(
    post?.commentCount || 0
  );
  const [likes, setLikes] = useState<number>(post?.likes || 0); // eslint-disable-line @typescript-eslint/no-unused-vars
  const [likedByUser, setLikedByUser] = useState<boolean>(
    post?.likedByUser || false
  ); // eslint-disable-line @typescript-eslint/no-unused-vars
  const [shareCount, setShareCount] = useState<number>(post?.shares || 0); // eslint-disable-line @typescript-eslint/no-unused-vars
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Extract YouTube video ID from link
  const getYouTubeVideoId = (url: string): string | null => {
    const youtubeRegex =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(youtubeRegex);
    return match ? match[1] : null;
  };

  const videoId =
    post.link && isValidYouTubeUrl(post.link)
      ? getYouTubeVideoId(post.link)
      : null;

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? imageCount - 1 : prev - 1));
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prev) => (prev === imageCount - 1 ? 0 : prev + 1));
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -100, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 100, behavior: "smooth" });
    }
  };

  const getGridClasses = () => {
    if (imageCount === 1) return "grid-cols-1 auto-rows-[minmax(0,1fr)]";
    if (imageCount === 2) return "grid-cols-2 auto-rows-[minmax(0,1fr)]";
    if (imageCount === 3) return "grid-cols-2 auto-rows-[minmax(0,1fr)]";
    return "grid-cols-2 grid-rows-2 auto-rows-[minmax(0,1fr)]";
  };

  const getImageStyles = (index: number) => {
    if (imageCount === 3 && index === 0) {
      return "row-span-2";
    }
    return "";
  };

  const imageCount = post.images.length;
  const maxImagesToShow = 4;
  const showMoreCount =
    imageCount > maxImagesToShow ? imageCount - maxImagesToShow : 0;

  return (
    <section className={cn("max-w-2xl mx-auto p-3 sm:p-4 pt-0", className)}>
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
      `}</style>

      {/* Profile */}
      <div className="flex items-center justify-start gap-2 sm:gap-3 mb-3 sm:mb-4">
        {showBackbutton && <BackButton />}
        {post.user ? (
          <Link
            href={`/account/@${post.user.username}`}
            className="flex items-center gap-2 sm:gap-3 hover:underline hover:text-primary"
          >
            <UserAvatar
              src={post.user.profileImageUrl ?? ""}
              alt={`${post.user.firstName?.[0] ?? ""}${
                post.user.lastName?.[0] ?? ""
              }`}
              className="size-8 sm:size-10"
            />
            <div className="flex-1">
              <div className="flex items-center gap-1 sm:gap-2 overflow-hidden">
                <span className="font-bold text-sm sm:text-base truncate">
                  @{post.user.username}
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                <span className="text-gray-500 text-xs sm:text-sm flex-shrink-0">
                  {moment(post.createdAt).format("MMM, YY")}
                </span>
              </div>
              <div className="text-gray-700 text-xs sm:text-sm truncate">
                {post.user.firstName ?? ""} {post.user.middleName ?? ""}{" "}
                {post.user.lastName ?? ""}
              </div>
            </div>
          </Link>
        ) : (
          <div className="text-gray-500 text-xs sm:text-sm">
            User information not available
          </div>
        )}
      </div>

      {/* Post */}
      <Link href={`/post/${post.id}`}>
        <h2 className="font-semibold text-lg sm:text-2xl">{post.title}</h2>
        <p className="text-gray-700 text-sm sm:text-base mb-3 sm:mb-4">
          {post.content}
        </p>
      </Link>

      {/* YouTube Video Player */}
      {videoId && (
        <div className="mb-4 sm:mb-5">
          <YouTube
            videoId={videoId}
            opts={{
              width: "100%",
              height: "200",
              playerVars: {
                autoplay: 0,
              },
            }}
            className="w-full max-w-full rounded-lg overflow-hidden"
          />
        </div>
      )}

      {/* Images */}
      {post.images && post.images.length > 0 && (
        <div className="mb-4 sm:mb-5">
          {videoId ? (
            <div className="relative flex items-center">
              {imageCount > 2 && (
                <button
                  className="absolute left-0 z-10 bg-black/50 text-white p-1 sm:p-2 rounded-full hover:bg-black/70"
                  onClick={scrollLeft}
                >
                  <FiChevronLeft size={20} />
                </button>
              )}
              <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar"
                style={{ scrollBehavior: "smooth" }}
              >
                {post.images.map((image, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 snap-start w-24 h-24 sm:w-32 sm:h-32 mx-1 cursor-pointer"
                    onClick={() => openModal(index)}
                  >
                    <Image
                      src={image}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover rounded-lg border border-gray-300"
                      alt={`Post Image ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
              {imageCount > 2 && (
                <button
                  className="absolute right-0 z-10 bg-black/50 text-white p-1 sm:p-2 rounded-full hover:bg-black/70"
                  onClick={scrollRight}
                >
                  <FiChevronRight size={20} />
                </button>
              )}
            </div>
          ) : (
            <div
              className={`grid ${getGridClasses()} gap-x-1 gap-y-1 max-h-[300px] sm:max-h-[400px] w-full overflow-hidden`}
            >
              {post.images.slice(0, maxImagesToShow).map((image, index) => (
                <div
                  key={index}
                  className={`relative h-full overflow-hidden cursor-pointer ${getImageStyles(
                    index
                  )}`}
                  onClick={() => openModal(index)}
                >
                  <Image
                    src={image}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover rounded-lg border border-gray-300"
                    alt={`Post Image ${index + 1}`}
                  />
                  {index === maxImagesToShow - 1 && showMoreCount > 0 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-lg">
                      <span className="text-white text-xl sm:text-3xl font-bold">
                        +{showMoreCount}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Image Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="relative max-w-[90vw] w-full h-[60vh] sm:h-[80vh] flex items-center justify-center">
            <button
              className="absolute top-2 sm:top-4 right-2 sm:right-4 text-white text-xl sm:text-3xl"
              onClick={closeModal}
            >
              <FiX />
            </button>
            <button
              className="absolute left-2 sm:left-4 text-white text-xl sm:text-3xl bg-black/50 rounded-full hover:bg-black/70 cursor-pointer p-1 sm:p-2"
              onClick={goToPreviousImage}
            >
              <FiChevronLeft />
            </button>
            <button
              className="absolute right-2 sm:right-4 text-white text-xl sm:text-3xl bg-black/50 rounded-full hover:bg-black/70 cursor-pointer p-1 sm:p-2"
              onClick={goToNextImage}
            >
              <FiChevronRight />
            </button>
            <Image
              src={post.images[currentImageIndex]}
              width={600}
              height={600}
              className="w-full h-full object-contain"
              alt={`Post Image ${currentImageIndex + 1}`}
            />
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 sm:gap-3">
        <Like
          postId={post.id}
          initialLiked={post.likedByUser}
          initialLikeCount={post.likes}
          onSuccess={(liked, likeCount) => {
            setLikedByUser(liked);
            setLikes(likeCount);
          }}
        />
        <CreateComment
          replyTo={post.user}
          replyToContent={post.content}
          postId={post.id}
          onSuccess={() => setCommentCount((prev) => prev + 1)}
        >
          <div className="flex items-center gap-1 bg-gray-100 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full cursor-pointer hover:bg-gray-200">
            <FiMessageCircle className="text-base sm:text-lg" />{" "}
            <b>{commentCount}</b>
          </div>
        </CreateComment>
        <Share
          postId={post.id}
          initialShareCount={post.shares}
          shareUrl={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/post/${post.id}`}
          onSuccess={() => setShareCount((prev) => prev + 1)}
        >
          <div className="flex items-center gap-1 bg-gray-100 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full cursor-pointer hover:bg-gray-200">
            <FiShare2 className="text-base sm:text-lg" /> <b>{shareCount}</b>
          </div>
        </Share>
      </div>
    </section>
  );
};

export default PostSection;
