"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { FiArrowRight, FiMic, FiImage, FiX } from "react-icons/fi";
import { FaPlay, FaPause } from "react-icons/fa6";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Textarea } from "@/app/components/ui/textarea";
import UserAvatar from "@/app/components/ui/UserAvatar";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { commentSchema, CommentSchema } from "@/lib/validation/commentSchema";
import Swal from "sweetalert2";
import { useReactMediaRecorder } from "react-media-recorder";
import WaveSurfer from "wavesurfer.js";

type Props = {
  children: React.ReactNode;
  postId?: string;
  parentCommentId?: string;
  replyTo: {
    firstName: string;
    middleName: string;
    lastName: string;
    username: string;
    profileImageUrl: string;
  };
  replyToContent: string;
  onSuccess?: () => void;
};

const CreateComment = ({
  children,
  postId,
  parentCommentId,
  replyTo,
  replyToContent,
  onSuccess,
}: Props) => {
  const user = {
    firstName: "John",
    middleName: "Doe",
    lastName: "Nna",
    profileImageUrl: "string",
  };
  const [postData, setPostData] = useState<CommentSchema>({
    content: "",
    image: undefined,
    audio: undefined,
    PostId: postId,
    ParentCommentId: parentCommentId,
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof CommentSchema, string>>
  >({});
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlobUrl, setAudioBlobUrl] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const dropRef = useRef<HTMLDivElement | null>(null);

  const { startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({
      audio: true,
      onStop: (blobUrl, blob) => {
        setAudioBlobUrl(blobUrl);
        setAudioBlob(blob);
        setIsRecording(false);
        clearInterval(timerRef.current!);
        setPostData((prev) => ({
          ...prev,
          audio: new File([blob], "comment-audio.webm", { type: "audio/webm" }),
        }));
      },
    });

  const startTimer = useCallback(() => {
    setRecordingTime(0);
    timerRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const resetAudioState = useCallback(() => {
    setAudioBlobUrl(null);
    setAudioBlob(null);
    setIsPlaying(false);
    setIsRecording(false);
    setRecordingTime(0);
    clearBlobUrl();
    if (wavesurferRef.current) {
      wavesurferRef.current.destroy();
      wavesurferRef.current = null;
    }
  }, [clearBlobUrl]);

  useEffect(() => {
    if (audioBlobUrl && waveformRef.current) {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
        wavesurferRef.current = null;
      }

      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#aaa",
        progressColor: "#3b82f6",
        cursorColor: "#3b82f6",
        barWidth: 2,
        barGap: 1,
        height: 40,
        hideScrollbar: true,
        minPxPerSec: 20,
      });

      wavesurferRef.current.load(audioBlobUrl);

      wavesurferRef.current.on("play", () => setIsPlaying(true));
      wavesurferRef.current.on("pause", () => setIsPlaying(false));
      wavesurferRef.current.on("finish", () => setIsPlaying(false));

      return () => {
        if (wavesurferRef.current) {
          wavesurferRef.current.destroy();
          wavesurferRef.current = null;
          setIsPlaying(false);
        }
      };
    }
  }, [audioBlobUrl]);

  const handlePlayPause = useCallback(() => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause();
    }
  }, []);

  const handleStopRecording = useCallback(() => {
    if (isRecording) {
      stopRecording();
      stopTimer();
      setIsRecording(false);
    }
  }, [isRecording, stopRecording, stopTimer]);

  const validatePostData = useCallback(() => {
    const result = commentSchema.safeParse(postData);
    console.log(postData);
    console.log(result);
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof typeof postData;
        fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      console.log(errors);
      return false;
    }
    setErrors({});
    return true;
  }, [postData]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = e.target;
      setPostData((prev) => ({ ...prev, content: value }));
    },
    []
  );

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        setPostData((prev) => ({ ...prev, image: selectedFile }));
      }
    },
    []
  );

  const handleRemoveImage = useCallback(() => {
    setPostData((prev) => ({ ...prev, image: undefined }));
  }, []);

  const handleRemoveAudio = useCallback(() => {
    resetAudioState();
    setPostData((prev) => ({ ...prev, audio: undefined }));
  }, [resetAudioState]);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        setPostData((prev) => ({ ...prev, image: file }));
      } else {
        Swal.fire({
          icon: "error",
          title: "Invalid file type",
          text: "Please drop an image file",
        });
      }
    }
  }, []);

  const formatTime = useCallback((seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

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

      if (!postData.content && !postData.image && !postData.audio) {
        Toast.fire({
          icon: "warning",
          title: "Add text, image, or audio to comment!",
        });
        return;
      }

      console.log(validatePostData());
      if (!validatePostData()) return;

      try {
        const formData = new FormData();
        if (postData.content) formData.append("content", postData.content);
        if (postData.image) formData.append("image", postData.image);
        if (postData.audio) formData.append("audio", postData.audio);
        if (postData.PostId) formData.append("PostId", postData.PostId);
        if (postData.ParentCommentId)
          formData.append("ParentCommentId", postData.ParentCommentId);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/create_comment`,
          {
            method: "POST",
            credentials: "include",
            body: formData,
          }
        );

        const data = await res.json();

        if (res.ok || data.status === "success") {
          Toast.fire({
            icon: "success",
            title: "Comment created successfully!",
          });
          setPostData({
            content: "",
            image: undefined,
            audio: undefined,
            PostId: postId,
            ParentCommentId: parentCommentId,
          });
          resetAudioState();
          if (onSuccess) onSuccess();
        } else {
          Toast.fire({
            icon: "error",
            title: data.message || "Failed to create comment",
          });
        }
      } catch (err: any) {
        Toast.fire({
          icon: "error",
          title: err?.message || "Error creating comment",
        });
      }
    },
    [postData, postId, parentCommentId, validatePostData, resetAudioState]
  );

  const handleDialogChange = useCallback(
    (open: boolean) => {
      if (!open) {
        if (isRecording) {
          stopRecording();
          stopTimer();
          setIsRecording(false);
        }
        resetAudioState();
        setPostData({
          content: "",
          image: undefined,
          audio: undefined,
          PostId: postId,
          ParentCommentId: parentCommentId,
        });
      }
    },
    [
      postId,
      parentCommentId,
      isRecording,
      stopRecording,
      stopTimer,
      resetAudioState,
    ]
  );

  return (
    <Dialog onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="w-full max-w-full h-full sm:max-h-[90vh] sm:h-fit sm:max-w-[425px] rounded-none sm:rounded-lg overflow-y-auto">
        <VisuallyHidden>
          <DialogTitle>Create Comment</DialogTitle>
        </VisuallyHidden>

        <form onSubmit={handleSubmit}>
          <div className="mb-9">
            <div className="flex items-start gap-3">
              <UserAvatar
                src={replyTo.profileImageUrl}
                alt={`${replyTo.firstName?.[0]}${replyTo.lastName?.[0]}`}
                className="size-13"
              />
              <div className="flex flex-col">
                <div className="flex items-center max-w-[250px] overflow-hidden whitespace-nowrap gap-2">
                  <span className="font-bold truncate">
                    {`${replyTo.firstName} ${replyTo.middleName} ${replyTo.lastName}`}
                  </span>
                  <span className="text-black/60 ml-1 truncate flex-1">
                    @{replyTo.username}
                  </span>
                </div>

                <p className="text-[0.95em] leading-tight mb-4">
                  {replyToContent}
                </p>
                <p>
                  <span className="text-black/60">Replying to</span>{" "}
                  <span className="font-bold">@{replyTo.username}</span>
                </p>
              </div>
            </div>
          </div>

          <div
            ref={dropRef}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`flex items-start gap-3 rounded-lg ${
              isDragging ? "bg-blue-100 border-2 border-blue-500" : "bg-white"
            }`}
          >
            {!isRecording && (
              <div className="flex items-center gap-3 mb-4">
                <UserAvatar
                  src={user.profileImageUrl}
                  alt={`${user.firstName?.[0]}${user.lastName?.[0]}`}
                  className="size-13"
                />
              </div>
            )}
            {!isRecording && !audioBlob && (
              <div className="w-full">
                <Textarea
                  name="content"
                  value={postData.content}
                  onChange={handleInputChange}
                  placeholder="Write your comment here..."
                  className="resize-none border-none shadow-none focus:outline-none p-0 outline-0"
                />
                {errors.content && (
                  <p className="text-red-500 text-sm mt-1">{errors.content}</p>
                )}
                {postData.image && (
                  <div className="mt-2 relative">
                    <img
                      src={URL.createObjectURL(postData.image)}
                      alt="Selected"
                      className="max-w-full h-auto rounded"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-black transition"
                    >
                      <FiX />
                    </button>
                  </div>
                )}
                {isDragging && (
                  <div className="text-center text-blue-500 mt-2">
                    Drop image here
                  </div>
                )}
              </div>
            )}

            {audioBlobUrl && (
              <div className="flex items-center gap-2 mb-2 w-full self-center">
                <Button
                  type="button"
                  onClick={handlePlayPause}
                  className="p-2 bg-black/20 size-8 text-white rounded-full hover:bg-black/30"
                >
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </Button>
                <div
                  ref={waveformRef}
                  className="w-full max-w-[80%] h-10 bg-gray-100 rounded"
                ></div>
                <button
                  type="button"
                  onClick={handleRemoveAudio}
                  className="bg-black/50 text-white rounded-full p-1 hover:bg-black transition"
                >
                  <FiX />
                </button>
              </div>
            )}
          </div>

          <DialogFooter>
            <div className="flex items-center justify-between w-full mt-4">
              <div className="flex items-center gap-2">
                {!audioBlob && !isRecording && (
                  <>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <div className="p-2 hover:bg-primary/20 rounded-lg">
                        <FiImage />
                      </div>
                    </label>
                  </>
                )}
                <div
                  onClick={() => {
                    if (isRecording) {
                      handleStopRecording();
                    } else {
                      setIsRecording(true);
                      startRecording();
                      startTimer();
                      setPostData((prev) => ({
                        ...prev,
                        content: "",
                        image: undefined,
                        audio: undefined,
                      }));
                      setAudioBlob(null);
                      setAudioBlobUrl(null);
                      if (wavesurferRef.current) {
                        wavesurferRef.current.destroy();
                        wavesurferRef.current = null;
                        setIsPlaying(false);
                      }
                    }
                  }}
                  className={`p-2 rounded-lg cursor-pointer bg-black/10 ${
                    isRecording
                      ? "hover:bg-red-200 bg-red-100"
                      : "hover:bg-primary/20"
                  }`}
                >
                  <FiMic
                    className={`${
                      isRecording
                        ? "text-red-500 animate-pulse"
                        : "hover:bg-primary/20"
                    }`}
                  />
                </div>

                {isRecording && (
                  <div className="flex justify-center items-center space-x-4">
                    <span className="text-sm text-gray-600">
                      Recording... {formatTime(recordingTime)}
                    </span>
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="bg-primary text-white hover:bg-primary/80"
              >
                Comment <FiArrowRight className="ml-2" />
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateComment;
