"use client";

import React, { useState, useCallback } from "react";
import Swal from "sweetalert2";
import { FiHeart } from "react-icons/fi";

type Props = {
  children?: React.ReactNode;
  postId?: string;
  commentId?: string;
  initialLiked?: boolean;
  initialLikeCount?: number;
  onSuccess?: (liked: boolean, likeCount: number) => void;
};

const Like = ({
  children,
  postId,
  commentId,
  initialLiked = false,
  initialLikeCount = 0,
  onSuccess,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [likedByUser, setLikedByUser] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

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

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (isLoading) return;

      // Optimistic update
      const newLiked = !likedByUser;
      const newLikeCount = newLiked ? likeCount + 1 : likeCount - 1;
      setLikedByUser(newLiked);
      setLikeCount(newLikeCount);
      setIsLoading(true);

      try {
        const body = postId ? { postId } : { commentId };

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/create_like`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          }
        );

        const data = await res.json();

        if (res.ok && data.status === "success") {
          setLikedByUser(data.data.liked); // Sync with server
          setLikeCount(data.data.likeCount);
          Toast.fire({
            icon: "success",
            title: data.data.liked
              ? "Liked successfully!"
              : "Unliked successfully!",
          });
          if (onSuccess) onSuccess(data.data.liked, data.data.likeCount);
        } else {
          // Revert optimistic update on failure
          setLikedByUser(likedByUser);
          setLikeCount(likeCount);
          Toast.fire({
            icon: "error",
            title: data.message || "Failed to toggle like",
          });
        }
      } catch (err: any) {
        // Revert optimistic update on error
        setLikedByUser(likedByUser);
        setLikeCount(likeCount);
        Toast.fire({
          icon: "error",
          title: err?.message || "Error toggling like",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [postId, commentId, isLoading, onSuccess, likedByUser, likeCount]
  );

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" disabled={isLoading} className="flex items-center">
        {children || (
          <>
            <FiHeart
              className={`w-5 h-5 ${
                likedByUser ? "text-red-500 fill-red-500" : "text-gray-500"
              }`}
            />
            <span className="ml-1 text-gray-600">{likeCount}</span>
          </>
        )}
      </button>
    </form>
  );
};

export default Like;
