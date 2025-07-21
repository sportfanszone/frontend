"use client";
import { useState } from "react";
import { FiArrowRight, FiPlus, FiLink, FiImage, FiX } from "react-icons/fi";

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

import { postSchema, PostSchema } from "@/lib/validation/postSchema";

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

  const [errors, setErrors] = useState<
    Partial<Record<keyof PostSchema, string>>
  >({});

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
      const updatedFiles = [...prev.files, ...newFiles];
      return { ...prev, files: updatedFiles };
    });
  };

  const handleRemoveFile = (index: number) => {
    setPostData((prev) => {
      const updatedFiles = [...prev.files];
      updatedFiles.splice(index, 1);
      return { ...prev, files: updatedFiles };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = postSchema.safeParse(postData);

    if (!result.success) {
      const fieldErrors: typeof errors = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof PostSchema;
        fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    console.log("✅ Valid post data:", result.data);
  };

  return (
    <Dialog>
      <form onSubmit={handleSubmit}>
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
          className="w-full max-w-full h-full sm:h-fit sm:max-w-[425px] rounded-none sm:rounded-lg"
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-15 h-15 rounded-full overflow-hidden">
                <UserAvatar
                  alt={`${user.firstName} ${user.middleName} ${user.lastName}`}
                  src={user.profileImageUrl}
                  className="w-full h-full object-cover"
                  width={50}
                  height={50}
                />
              </div>
              <ClubsDropdown />
            </div>

            <Input
              id="postTitle"
              placeholder="Post Title"
              className="mb-1"
              required
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
              required
              autoFocus
              name="content"
              value={postData.content}
              onChange={handleInputChange}
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">{errors.content}</p>
            )}

            {postData.files.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-3">
                {postData.files.map((file, index) => (
                  <div
                    key={index}
                    className="relative w-24 h-24 rounded-md overflow-hidden border"
                  >
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-black transition"
                      onClick={() => handleRemoveFile(index)}
                    >
                      <FiX size={14} />
                    </button>

                    {file.type.startsWith("image/") ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : file.type.startsWith("video/") ? (
                      <video
                        src={URL.createObjectURL(file)}
                        controls
                        className="w-full h-full object-cover"
                      />
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </div>

          <DialogFooter>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <input
                  id="media-upload"
                  type="file"
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={handleFileChange}
                  name="file"
                />
                <label htmlFor="media-upload">
                  <div className="p-2 hover:bg-primary/20 rounded-lg transition-all cursor-pointer">
                    <FiImage />
                  </div>
                </label>
                <div className="flex items-center border-gray-200 border-1 rounded-lg transition-all cursor-pointer mr-3">
                  <FiLink className="ml-3" />
                  <Input
                    className="border-none outline-none shadow-none focus:outline-none focus:ring-0 focus-visible:ring-0"
                    type="text"
                    placeholder="Your link (optional)"
                    name="link"
                    value={postData.link}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="bg-primary text-white cursor-pointer hover:bg-primary/80 hover:text-white transition-all"
              >
                Post
                <FiArrowRight className="ml-2" />
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default CreatePost;
