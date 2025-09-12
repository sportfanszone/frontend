"use client";

import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { z } from "zod";
import Image from "next/image";

import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Button } from "@/app/components/ui/button";
import BackButton from "@/app/components/ui/BackButton";
import Swal from "sweetalert2";

import {
  personalInfoSchema,
  securityInfoSchema,
  photoSchema,
} from "@/lib/validation/userSettingsSchema";
import { User } from "@/types";

type PersonalInfoErrors = z.inferFlattenedErrors<
  typeof personalInfoSchema
>["fieldErrors"];
type SecurityInfoErrors = z.inferFlattenedErrors<
  typeof securityInfoSchema
>["fieldErrors"];
type PhotoErrors = z.inferFlattenedErrors<typeof photoSchema>["fieldErrors"];

const SettingsSection = ({ user }: { user: User }) => {
  const [personalInfo, setPersonalInfo] = useState<
    Pick<User, "firstName" | "middleName" | "lastName" | "username">
  >({
    firstName: user.firstName || "",
    middleName: user.middleName || "",
    lastName: user.lastName || "",
    username: user.username || "",
  });
  const [securityInfo, setSecurityInfo] = useState<{
    oldPassword: string;
    newPassword: string;
    passwordConfirm: string;
  }>({
    newPassword: "",
    oldPassword: "",
    passwordConfirm: "",
  });
  const [photos, setPhotos] = useState<{
    profilePhoto: File | null;
    coverPhoto: File | null;
  }>({
    profilePhoto: null,
    coverPhoto: null,
  });
  const [currentImages, setCurrentImages] = useState<{
    profilePhoto: string | null;
    coverPhoto: string | null;
  }>({
    profilePhoto: user.profileImageUrl,
    coverPhoto: user.coverPhotoUrl,
  });
  const [errors, setErrors] = useState<{
    personalInfo: PersonalInfoErrors;
    securityInfo: SecurityInfoErrors;
    photos: PhotoErrors;
  }>({
    personalInfo: {},
    securityInfo: {},
    photos: {},
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePersonalInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSecurityInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSecurityInfo((prev) => ({ ...prev, [name]: value }));
  };

  const onDropProfile = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const result = photoSchema.safeParse({ profilePhoto: file });
      if (!result.success) {
        setErrors((prev) => ({
          ...prev,
          photos: result.error.flatten().fieldErrors,
        }));
      } else {
        setPhotos((prev) => ({ ...prev, profilePhoto: file }));
        setCurrentImages((prev) => ({
          ...prev,
          profilePhoto: URL.createObjectURL(file),
        }));
        setErrors((prev) => ({ ...prev, photos: {} }));
      }
    }
  }, []);

  const onDropCover = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const result = photoSchema.safeParse({ coverPhoto: file });
      if (!result.success) {
        setErrors((prev) => ({
          ...prev,
          photos: result.error.flatten().fieldErrors,
        }));
      } else {
        setPhotos((prev) => ({ ...prev, coverPhoto: file }));
        setCurrentImages((prev) => ({
          ...prev,
          coverPhoto: URL.createObjectURL(file),
        }));
        setErrors((prev) => ({ ...prev, photos: {} }));
      }
    }
  }, []);

  // Cleanup object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (currentImages.profilePhoto?.startsWith("blob:")) {
        URL.revokeObjectURL(currentImages.profilePhoto);
      }
      if (currentImages.coverPhoto?.startsWith("blob:")) {
        URL.revokeObjectURL(currentImages.coverPhoto);
      }
    };
  }, [currentImages.profilePhoto, currentImages.coverPhoto]);

  const {
    getRootProps: getProfileRootProps,
    getInputProps: getProfileInputProps,
    isDragActive: isProfileDragActive,
  } = useDropzone({
    onDrop: onDropProfile,
    accept: { "image/*": [".png", ".jpg", ".jpeg"] },
    maxFiles: 1,
  });

  const {
    getRootProps: getCoverRootProps,
    getInputProps: getCoverInputProps,
    isDragActive: isCoverDragActive,
  } = useDropzone({
    onDrop: onDropCover,
    accept: { "image/*": [".png", ".jpg", ".jpeg"] },
    maxFiles: 1,
  });

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

  const handlePersonalInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const result = personalInfoSchema.safeParse(personalInfo);
    if (!result.success) {
      setErrors((prev) => ({
        ...prev,
        personalInfo: result.error.flatten().fieldErrors,
      }));
      setIsSubmitting(false);
      return;
    }
    setErrors((prev) => ({ ...prev, personalInfo: {} }));

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/settings/update_personal_info`,
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(personalInfo),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (!res.ok || data.status === "error") {
        throw new Error(data.message || "Failed to update personal info");
      }

      Toast.fire({
        icon: "success",
        title: "Personal info updated successfully",
      });
    } catch (err: { message?: string } | any) {
      console.error("Error adding post:", err);
      Toast.fire({
        icon: "error",
        title: err?.message || "An error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSecurityInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const result = securityInfoSchema.safeParse(securityInfo);
    if (!result.success) {
      setErrors((prev) => ({
        ...prev,
        securityInfo: result.error.flatten().fieldErrors,
      }));
      setIsSubmitting(false);
      return;
    }
    setErrors((prev) => ({ ...prev, securityInfo: {} }));
    // TODO: Handle successful form submission (e.g., API call)
    setIsSubmitting(false);
  };

  const handlePhotosSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const result = photoSchema.safeParse(photos);
    if (!result.success) {
      setErrors((prev) => ({
        ...prev,
        photos: result.error.flatten().fieldErrors,
      }));
      setIsSubmitting(false);
      return;
    }
    setErrors((prev) => ({ ...prev, photos: {} }));
    // TODO: Handle successful form submission (e.g., API call)
    setIsSubmitting(false);
  };

  return (
    <section>
      <div className="flex gap-3">
        <BackButton />
        <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl mb-10">
          Settings
        </h2>
      </div>

      <form
        onSubmit={handlePhotosSubmit}
        className="bg-white border-2 border-gray-200 rounded-xl p-5 md:p-7.5 mb-5"
      >
        <h2 className="mb-3 font-bold">Profile Photos</h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mb-4">
          <div>
            <Label className="mb-2">Profile Photo</Label>
            {currentImages.profilePhoto && (
              <div className="mb-4">
                <Image
                  width={800}
                  height={800}
                  src={currentImages.profilePhoto}
                  alt="Current Profile Preview"
                  className="max-w-full h-auto max-h-48 mx-auto rounded object-cover"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Current Profile Photo
                </p>
              </div>
            )}
            <div
              {...getProfileRootProps()}
              className={`border-2 border-dashed rounded-lg p-4 text-center ${
                isProfileDragActive
                  ? "border-primary bg-primary/10"
                  : "border-gray-300"
              }`}
            >
              <input {...getProfileInputProps()} />
              {photos.profilePhoto ? (
                <div>
                  <Image
                    width={800}
                    height={800}
                    src={URL.createObjectURL(photos.profilePhoto)}
                    alt="New Profile Preview"
                    className="max-w-full h-auto max-h-48 mx-auto rounded object-cover"
                  />
                  <p className="mt-2 text-sm">{photos.profilePhoto.name}</p>
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  Drag & drop a new profile photo here, or click to select
                </p>
              )}
            </div>
            {errors.photos.profilePhoto && (
              <p className="text-red-500 text-sm mt-1">
                {errors.photos.profilePhoto}
              </p>
            )}
          </div>
          <div>
            <Label className="mb-2">Cover Photo</Label>
            {currentImages.coverPhoto && (
              <div className="mb-4">
                <Image
                  width={800}
                  height={800}
                  src={currentImages.coverPhoto}
                  alt="Current Cover Preview"
                  className="max-w-full h-auto max-h-48 mx-auto rounded object-cover"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Current Cover Photo
                </p>
              </div>
            )}
            <div
              {...getCoverRootProps()}
              className={`border-2 border-dashed rounded-lg p-4 text-center ${
                isCoverDragActive
                  ? "border-primary bg-primary/10"
                  : "border-gray-300"
              }`}
            >
              <input {...getCoverInputProps()} />
              {photos.coverPhoto ? (
                <div>
                  <Image
                    width={800}
                    height={800}
                    src={URL.createObjectURL(photos.coverPhoto)}
                    alt="New Cover Preview"
                    className="max-w-full h-auto max-h-48 mx-auto rounded object-cover"
                  />
                  <p className="mt-2 text-sm">{photos.coverPhoto.name}</p>
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  Drag & drop a new cover photo here, or click to select
                </p>
              )}
            </div>
            {errors.photos.coverPhoto && (
              <p className="text-red-500 text-sm mt-1">
                {errors.photos.coverPhoto}
              </p>
            )}
          </div>
        </div>
        <Button
          type="submit"
          className="bg-primary text-white cursor-pointer hover:bg-primary/80 hover:text-white transition-all"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Save Photos"}
        </Button>
      </form>

      <form
        onSubmit={handlePersonalInfoSubmit}
        className="bg-white border-2 border-gray-200 rounded-xl p-5 md:p-7.5 mb-5"
      >
        <h2 className="mb-3 font-bold">Personal Info</h2>
        <div className="grid gap-2 grid-cols-1 md:grid-cols-2 mb-2">
          <div>
            <Label htmlFor="firstName" className="mb-2">
              First Name
            </Label>
            <Input
              id="firstName"
              placeholder="First Name"
              className="mb-1"
              name="firstName"
              value={personalInfo.firstName}
              onChange={handlePersonalInfoChange}
            />
            {errors.personalInfo.firstName && (
              <p className="text-red-500 text-sm">
                {errors.personalInfo.firstName}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="middleName" className="mb-2">
              Middle Name
            </Label>
            <Input
              id="middleName"
              placeholder="Middle Name"
              className="mb-1"
              name="middleName"
              value={personalInfo.middleName}
              onChange={handlePersonalInfoChange}
            />
            {errors.personalInfo.middleName && (
              <p className="text-red-500 text-sm">
                {errors.personalInfo.middleName}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="lastName" className="mb-2">
              Last Name
            </Label>
            <Input
              id="lastName"
              placeholder="Last Name"
              className="mb-1"
              name="lastName"
              value={personalInfo.lastName}
              onChange={handlePersonalInfoChange}
            />
            {errors.personalInfo.lastName && (
              <p className="text-red-500 text-sm">
                {errors.personalInfo.lastName}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="username" className="mb-2">
              Username
            </Label>
            <Input
              id="username"
              placeholder="Username"
              className="mb-1"
              name="username"
              value={personalInfo.username}
              onChange={handlePersonalInfoChange}
            />
            {errors.personalInfo.username && (
              <p className="text-red-500 text-sm">
                {errors.personalInfo.username}
              </p>
            )}
          </div>
        </div>
        <Button
          type="submit"
          className="bg-primary text-white cursor-pointer hover:bg-primary/80 hover:text-white transition-all"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Save"}
        </Button>
      </form>

      <form
        onSubmit={handleSecurityInfoSubmit}
        className="bg-white border-2 border-gray-200 rounded-xl p-5 md:p-7.5 mb-5"
      >
        <h2 className="mb-3 font-bold">Security</h2>
        <div className="grid gap-2 grid-cols-1 md:grid-cols-2 mb-2">
          <div>
            <Label htmlFor="oldPassword" className="mb-2">
              Old Password
            </Label>
            <Input
              id="oldPassword"
              placeholder="Old Password"
              className="mb-1"
              name="oldPassword"
              value={securityInfo.oldPassword}
              type="password"
              onChange={handleSecurityInfoChange}
            />
            {errors.securityInfo.oldPassword && (
              <p className="text-red-500 text-sm">
                {errors.securityInfo.oldPassword}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="newPassword" className="mb-2">
              New Password
            </Label>
            <Input
              id="newPassword"
              placeholder="New Password"
              className="mb-1"
              name="newPassword"
              value={securityInfo.newPassword}
              type="password"
              onChange={handleSecurityInfoChange}
            />
            {errors.securityInfo.newPassword && (
              <p className="text-red-500 text-sm">
                {errors.securityInfo.newPassword}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="confirmPassword" className="mb-2">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              placeholder="Confirm Password"
              className="mb-1"
              name="confirmPassword"
              value={securityInfo.passwordConfirm}
              type="password"
              onChange={handleSecurityInfoChange}
            />
            {errors.securityInfo.passwordConfirm && (
              <p className="text-red-500 text-sm">
                {errors.securityInfo.passwordConfirm}
              </p>
            )}
          </div>
        </div>
        <Button
          type="submit"
          className="bg-primary text-white cursor-pointer hover:bg-primary/80 hover:text-white transition-all"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Save"}
        </Button>
      </form>
    </section>
  );
};

export default SettingsSection;
