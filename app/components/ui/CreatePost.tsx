"use client";
import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FiArrowRight, FiPlus, FiLink, FiImage } from "react-icons/fi";
import { getYouTubeThumbnail, isValidYouTubeUrl } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import UserAvatar from "@/app/components/ui/UserAvatar";
import ClubsDropdown from "@/app/components/ui/ClubsDropdown";
import PostFiles from "@/app/components/ui/PostFiles";

import { postSchema, PostSchema } from "@/lib/validation/postSchema";
import Swal from "sweetalert2";

// Maximum number of files allowed
const MAX_FILES = 10;

type Props = {
  user: {
    firstName: string;
    middleName: string;
    lastName: string;
    profileImageUrl: string;
  };
};

const CreatePost = ({ user }: Props) => {
  const [postData, setPostData] = useState<PostSchema>({
    title: "",
    content: "",
    link: "",
    clubId: "",
    files: [] as File[],
  });
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState<
    Partial<Record<keyof PostSchema, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // Handle file drop with limit
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setPostData((prev) => {
      const currentFileCount = prev.files.length;
      const filesToAdd = acceptedFiles.slice(0, MAX_FILES - currentFileCount);
      if (acceptedFiles.length > MAX_FILES - currentFileCount) {
        Toast.fire({
          icon: "warning",
          title: `You can only upload up to ${MAX_FILES} files.`,
        });
      }
      const updatedFiles = [...prev.files, ...filesToAdd];
      return { ...prev, files: updatedFiles };
    });
  }, []);

  // Configure react-dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "video/*": [],
    },
    multiple: true,
    noClick: true,
    maxFiles: MAX_FILES,
  });

  // Update thumbnail when link changes
  useEffect(() => {
    if (postData.link) {
      if (isValidYouTubeUrl(postData.link)) {
        const thumbnail = getYouTubeThumbnail(postData.link);
        setThumbnailUrl(thumbnail);
        setErrors((prev) => ({ ...prev, link: "" }));
      } else {
        setThumbnailUrl(null);
        setErrors((prev) => ({
          ...prev,
          link: "Please enter a valid YouTube URL",
        }));
      }
    } else {
      setThumbnailUrl(null);
      setErrors((prev) => ({ ...prev, link: "" }));
    }
  }, [postData.link]);

  const validatePostData = () => {
    const result = postSchema.safeParse(postData);
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof typeof postData;
        fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return false;
    }

    if (postData.link && !isValidYouTubeUrl(postData.link)) {
      setErrors((prev) => ({
        ...prev,
        link: "Please enter a valid YouTube URL",
      }));
      return false;
    }

    setErrors({});
    return true;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPostData((prev) => {
      const updated = { ...prev, [name]: value };
      const result = postSchema.safeParse(updated);
      if (!result.success) {
        const fieldError = result.error.issues.find((i) => i.path[0] === name);
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: fieldError?.message || "",
        }));
      } else if (name === "link" && value && !isValidYouTubeUrl(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          link: "Please enter a valid YouTube URL",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      }
      return updated;
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const newFiles = Array.from(selectedFiles);
    setPostData((prev) => {
      const currentFileCount = prev.files.length;
      const filesToAdd = newFiles.slice(0, MAX_FILES - currentFileCount);
      if (newFiles.length > MAX_FILES - currentFileCount) {
        Toast.fire({
          icon: "warning",
          title: `You can only upload up to ${MAX_FILES} files.`,
        });
      }
      const updatedFiles = [...prev.files, ...filesToAdd];
      return { ...prev, files: updatedFiles };
    });
  };

  const handleChange = <K extends keyof typeof postData>(
    key: K,
    value: (typeof postData)[K]
  ) => {
    setPostData((prev) => {
      const updatedForm = { ...prev, [key]: value };
      const result = postSchema.safeParse(updatedForm);
      if (!result.success) {
        const fieldError = result.error.issues.find(
          (issue) => issue.path[0] === key
        );
        setErrors((prevErrors) => ({
          ...prevErrors,
          [key]: fieldError?.message || "",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [key]: "",
        }));
      }
      return updatedForm;
    });
  };

  const handleRemoveFile = (index: number) => {
    setPostData((prev) => {
      const updatedFiles = [...prev.files];
      updatedFiles.splice(index, 1);
      return { ...prev, files: updatedFiles };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePostData()) {
      Toast.fire({
        icon: "error",
        title: "Invalid YouTube URL or form data",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", postData.title);
      formData.append("content", postData.content);
      formData.append("link", postData.link);
      formData.append("clubId", postData.clubId);
      postData.files.forEach((file) => {
        formData.append("files", file);
      });

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/create_post`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const data = await res.json();

      console.log("res");
      console.log(res);
      console.log("data");
      console.log(data);

      if (res.ok || data.status === "success") {
        Toast.fire({
          icon: "success",
          title: "Post created successfully!",
        });
      } else {
        if (data.message) {
          Toast.fire({
            icon: "error",
            title: data.message,
          });
        }
        if (data?.errors?.length > 0) {
          const fieldErrors: Partial<typeof errors> = {};
          data.errors.forEach(
            (error: { field: keyof typeof postData; message: string }) => {
              fieldErrors[error.field] = error.message;
            }
          );
          setErrors((prevErrors) => ({ ...prevErrors, ...fieldErrors }));
        }
        Toast.fire({
          icon: "error",
          title: "Failed to post",
        });
      }
    } catch (err: { message?: string } | any) {
      console.error("Error adding post:", err);
      Toast.fire({
        icon: "error",
        title: err?.message || "Failed to create post",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="text-[0.9em] flex items-center justify-between cursor-pointer">
          <span className="bg-primary sm:bg-transparent text-white sm:text-black rounded-full p-1 flex items-center justify-center ml-2">
            <FiPlus />
          </span>
          <DialogTitle>
            <span className="hidden sm:inline text-[0.8em]">Create Post</span>
          </DialogTitle>
        </div>
      </DialogTrigger>

      <DialogContent
        aria-description="Post Card"
        className={`w-full max-w-full h-full sm:max-h-[90vh] sm:h-fit sm:max-w-[425px] rounded-none sm:rounded-lg overflow-y-auto ${
          isDragActive
            ? "bg-gray-100 border-2 border-dashed border-primary"
            : ""
        }`}
        {...getRootProps()}
      >
        <form onSubmit={handleSubmit}>
          <input {...getInputProps()} />
          {isDragActive && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100/80">
              <p className="text-primary font-semibold">Drop your files here</p>
            </div>
          )}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-15 h-15 rounded-full overflow-hidden">
              <UserAvatar
                alt={`${user.firstName?.[0]}${user.lastName?.[0]}`}
                src={user.profileImageUrl}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <ClubsDropdown
                value={postData.clubId}
                handleChange={(value) => handleChange("clubId", value)}
              />
              {errors.clubId && (
                <p className="text-red-500 text-sm mt-1">{errors.clubId}</p>
              )}
            </div>
          </div>

          <Input
            id="postTitle"
            placeholder="Post Title"
            className="mb-1"
            name="title"
            value={postData.title}
            onChange={handleInputChange}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mb-2">{errors.title}</p>
          )}

          <Textarea
            id="postContent"
            placeholder="Write your post here..."
            className="resize-none border-none shadow-none focus:outline-none focus:ring-0 focus-visible:ring-0 p-0"
            autoFocus
            name="content"
            value={postData.content}
            onChange={handleInputChange}
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">{errors.content}</p>
          )}

          <PostFiles
            files={postData.files}
            handleRemoveFile={handleRemoveFile}
          />

          {thumbnailUrl && (
            <div className="mb-3">
              <img
                src={thumbnailUrl}
                alt="YouTube video thumbnail"
                className="w-full max-w-[300px] h-auto rounded-lg"
              />
            </div>
          )}

          <div className="flex items-center border-gray-200 border-1 rounded-lg transition-all cursor-pointer mb-3">
            <FiLink className="ml-3" />
            <Input
              className="border-none outline-none shadow-none focus:outline-none focus:ring-0 focus-visible:ring-0"
              type="text"
              placeholder="YouTube link (optional)"
              name="link"
              value={postData.link}
              onChange={handleInputChange}
            />
          </div>
          {errors.link && (
            <p className="text-red-500 text-sm mt-1 mb-2">{errors.link}</p>
          )}

          <DialogFooter>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <input
                  id="media-upload"
                  type="file"
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={handleFileChange}
                  name="files"
                  multiple
                />
                <label htmlFor="media-upload">
                  <div className="p-2 hover:bg-primary/20 rounded-lg transition-all cursor-pointer">
                    <FiImage />
                  </div>
                </label>
              </div>

              <Button
                type="submit"
                className="bg-primary text-white cursor-pointer hover:bg-primary/80 hover:text-white transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Post"}
                <FiArrowRight className="ml-2" />
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
