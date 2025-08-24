"use client";

import React, { useState, useCallback } from "react";
import Swal from "sweetalert2";
import { FiLink } from "react-icons/fi";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";

type Props = {
  children?: React.ReactNode;
  postId?: string;
  commentId?: string;
  initialShareCount?: number;
  shareUrl?: string;
  onSuccess?: (shareCount: number) => void;
};

const Share = ({
  children,
  postId,
  commentId,
  initialShareCount = 0,
  shareUrl,
  onSuccess,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [shareCount, setShareCount] = useState(initialShareCount);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Construct shareUrl based on postId or commentId if not provided
  const computedShareUrl =
    shareUrl ||
    (postId
      ? `${process.env.NEXT_PUBLIC_FRONTEND_URL}/post/${postId}`
      : commentId
      ? `${process.env.NEXT_PUBLIC_FRONTEND_URL}/comment/${commentId}`
      : "");

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

  const handleShare = useCallback(
    async (action: "copy" | "native") => {
      if (isLoading || !computedShareUrl) {
        console.log("isLoading or no computedShareUrl, exiting");
        if (!computedShareUrl) {
          Toast.fire({
            icon: "error",
            title: "No URL available to share",
          });
        }
        return;
      }

      // Optimistic update
      const newShareCount = shareCount + 1;
      setShareCount(newShareCount);
      setIsLoading(true);

      let wasNativeShareSuccessful = false;

      try {
        if (action === "copy") {
          console.log("Copying link to clipboard:", computedShareUrl);
          await navigator.clipboard.writeText(computedShareUrl);
          Toast.fire({
            icon: "success",
            title: "Link copied to clipboard!",
          });
        } else if (action === "native") {
          console.log("Attempting native share with URL:", computedShareUrl);
          if (typeof navigator.share === "function") {
            await navigator.share({
              title: postId ? "Share Post" : "Share Comment",
              url: computedShareUrl,
            });
            wasNativeShareSuccessful = true; // Mark native share as successful
          } else {
            console.log(
              "Native share not available, falling back to clipboard"
            );
            await navigator.clipboard.writeText(computedShareUrl);
            Toast.fire({
              icon: "success",
              title: "Link copied to clipboard!",
            });
          }
        }

        // Register share with API
        console.log("Making API call to register share");
        const body = postId ? { postId } : { commentId };
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/create_share`,
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
        console.log("API response:", data);

        if (res.ok && data.status === "success") {
          setShareCount(data.data.shareCount);
          if (onSuccess) onSuccess(data.data.shareCount);
          // Only show toast for copy action or native share fallback
          if (
            action === "copy" ||
            (action === "native" && !wasNativeShareSuccessful)
          ) {
            // Toast already shown above for these cases
          } else if (action === "native" && wasNativeShareSuccessful) {
            // No toast for successful native share, mimicking X.com
            console.log(
              `${postId ? "Post" : "Comment"} share completed, no toast shown`
            );
          }
        } else {
          setShareCount(shareCount); // Revert on failure
          Toast.fire({
            icon: "error",
            title: data.message || "Failed to share",
          });
        }
      } catch (err: any) {
        console.error("Error in handleShare:", err);
        setShareCount(shareCount); // Revert on error
        Toast.fire({
          icon: "error",
          title: err?.message || "Error sharing",
        });
      } finally {
        setIsLoading(false);
        setIsPopupOpen(false);
        console.log("handleShare completed");
      }
    },
    [postId, commentId, isLoading, onSuccess, shareCount, computedShareUrl]
  );

  return (
    <div className="flex items-center gap-2">
      {/* Primary Share Button (Direct Native Share) */}

      {/* Secondary Button for Copy Link */}
      <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>

        <DialogContent
          aria-description="Share Post Dialog"
          className="w-full max-w-full sm:max-w-[425px] rounded-none sm:rounded-lg overflow-y-auto"
        >
          <DialogTitle>Share this post</DialogTitle>
          <div className="flex flex-col gap-4">
            <Button
              onClick={() => {
                handleShare("copy");
              }}
              disabled={isLoading}
              className="flex items-center gap-2 p-2 bg-primary text-white hover:bg-primary/80 transition-all"
            >
              <FiLink className="w-5 h-5" />
              <span>Copy link</span>
            </Button>
            <Button
              onClick={() => {
                handleShare("native");
              }}
              disabled={isLoading || !computedShareUrl}
              className="flex items-center gap-2 p-2 bg-primary text-white hover:bg-primary/80 transition-all"
            >
              <span>Share via</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Share;
