"use client";
import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
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
import { isValidYouTubeUrl } from "@/lib/utils";

const CreateComment = dynamic(
  () => import("@/app/components/ui/CreateComment"),
  { ssr: false }
);

const Like = dynamic(() => import("@/app/components/ui/Like"), { ssr: false });

type PostSectionProps = {
  showBackbutton?: boolean;
  post: Post;
};

const PostSection = ({ post, showBackbutton = true }: PostSectionProps) => {
  const [commentCount, setCommentCount] = useState<number>(
    post?.commentCount || 0
  );
  const [likes, setLikes] = useState<number>(post?.likes || 0);
  const [likedByUser, setLikedByUser] = useState<boolean>(
    post?.likedByUser || false
  );

  const { user } = post;
  const maxImagesToShow = 4;
  const imageCount = post.images.length;
  const showMoreCount =
    imageCount > maxImagesToShow ? imageCount - maxImagesToShow : 0;
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
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
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

  return (
    <section className="max-w-3xl mx-auto p-4 pt-0">
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
      <div className="flex items-center justify-start gap-3 mb-4">
        {showBackbutton && <BackButton />}
        <div className="flex items-center gap-3">
          <UserAvatar
            src={post.user.profileImageUrl}
            alt={`${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`}
            className="size-10"
          />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold">@{user.username}</span>
            <span className="w-1 h-1 rounded-full bg-gray-500"></span>
            <span className="text-gray-500">
              {moment(post.createdAt).format("MMMM, YYYY")}
            </span>
          </div>
          <div className="text-gray-700">
            {user.firstName} {user.middleName} {user.lastName}
          </div>
        </div>
      </div>

      {/* Post */}
      <h2 className="font-semibold text-xl sm:text-2xl">{post.title}</h2>
      <p className="text-gray-700 mb-4">{post.content}</p>

      {/* YouTube Video Player */}
      {videoId && (
        <div className="mb-5">
          <YouTube
            videoId={videoId}
            opts={{
              width: "100%",
              height: "400",
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
        <div className="mb-5">
          {videoId ? (
            <div className="relative flex items-center">
              {imageCount > 2 && (
                <button
                  className="absolute left-0 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                  onClick={scrollLeft}
                >
                  <FiChevronLeft size={24} />
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
                    className="flex-shrink-0 snap-start w-32 h-32 mx-1 cursor-pointer"
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
                  className="absolute right-0 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                  onClick={scrollRight}
                >
                  <FiChevronRight size={24} />
                </button>
              )}
            </div>
          ) : (
            <div
              className={`grid ${getGridClasses()} gap-x-1 gap-y-1 max-h-[400px] w-full overflow-hidden`}
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
                    width={400}
                    height={400}
                    className="w-full h-full object-cover rounded-lg border border-gray-300"
                    alt={`Post Image ${index + 1}`}
                  />
                  {index === maxImagesToShow - 1 && showMoreCount > 0 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-lg">
                      <span className="text-white text-3xl font-bold">
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
          <div className="relative max-w-4xl w-full h-[80vh] flex items-center justify-center">
            <button
              className="absolute top-4 right-4 text-white text-3xl"
              onClick={closeModal}
            >
              <FiX />
            </button>
            <button
              className="absolute left-4 text-white text-3xl bg-black/50 text-white rounded-full hover:bg-black/70 cursor-pointer p-2"
              onClick={goToPreviousImage}
            >
              <FiChevronLeft />
            </button>
            <button
              className="absolute right-4 text-white text-3xl bg-black/50 text-white rounded-full hover:bg-black/70 cursor-pointer p-2"
              onClick={goToNextImage}
            >
              <FiChevronRight />
            </button>
            <Image
              src={post.images[currentImageIndex]}
              width={800}
              height={800}
              className="w-full h-full object-contain"
              alt={`Post Image ${currentImageIndex + 1}`}
            />
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
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
          replyTo={user}
          replyToContent={post.content}
          postId={post.id}
          onSuccess={() => setCommentCount((prev) => prev + 1)}
        >
          <div className="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-full cursor-pointer hover:bg-gray-200">
            <FiMessageCircle className="text-lg" /> <b>{commentCount}</b>
          </div>
        </CreateComment>
        <div className="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-full cursor-pointer hover:bg-gray-200">
          <FiShare2 className="text-lg" /> <b>{post.shares}</b>
        </div>
      </div>
    </section>
  );
};

export default PostSection;
