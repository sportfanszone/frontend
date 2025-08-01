"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import BackButton from "@/app/components/ui/BackButton";
import UserAvatar from "@/app/components/ui/UserAvatar";
import {
  FiMessageCircle,
  FiThumbsUp,
  FiShare2,
  FiChevronLeft,
  FiChevronRight,
  FiX,
} from "react-icons/fi";

import moment from "moment";
import { Post } from "@/types";

const CreateComment = dynamic(
  () => import("@/app/components/ui/CreateComment"),
  { ssr: false }
);

type PostSectionProps = {
  showBackbutton?: boolean;
  post: Post;
};

const PostSection = ({ post, showBackbutton = true }: PostSectionProps) => {
  const [commentCount, setCommentCount] = useState<number>(
    post?.commentCount || 0
  );

  const { user } = post;
  const maxImagesToShow = 4;
  const imageCount = post.images.length;
  const showMoreCount =
    imageCount > maxImagesToShow ? imageCount - maxImagesToShow : 0;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
      {post.images && post.images.length > 0 && (
        <div
          className={`grid ${getGridClasses()} gap-x-1 gap-y-1 max-h-[400px] w-full overflow-hidden mb-5`}
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
              className="absolute left-4 text-white text-3xl"
              onClick={goToPreviousImage}
            >
              <FiChevronLeft />
            </button>
            <button
              className="absolute right-4 text-white text-3xl"
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
        <div className="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-full cursor-pointer hover:bg-gray-200">
          <FiThumbsUp className="text-lg" /> <b>{post.likes}</b>
        </div>
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
