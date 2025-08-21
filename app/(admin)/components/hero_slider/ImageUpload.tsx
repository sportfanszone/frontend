"use client";
import React, { useCallback, useState, useEffect } from "react";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/app/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/app/components/ui/dialog";
import Swal from "sweetalert2";

interface UploadedImage {
  id: string;
  url: string;
  name: string;
  size: number;
}

export const ImageUpload = () => {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [loading, setLoading] = useState<{
    isUploading: boolean;
    isDeleting: Set<string>;
    isClearingAll: boolean;
  }>({
    isUploading: false,
    isDeleting: new Set(),
    isClearingAll: false,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  // Fetch existing slider images on mount
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/slider`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await res.json();
        if (res.ok && data.status === "success") {
          setImages(data.data || []);
          if (data.data.length >= 5) {
            Toast.fire({
              icon: "warning",
              title: "Maximum 5 images allowed in the slider",
            });
          }
        } else {
          Toast.fire({
            icon: "error",
            title: "Failed to load slider images",
          });
        }
      } catch (error) {
        console.error("Error fetching slider images:", error);
        Toast.fire({
          icon: "error",
          title: "Failed to load slider images",
        });
      }
    };
    fetchImages();
  }, []);

  const handleFileUpload = useCallback(async (files: FileList) => {
    const validFiles = Array.from(files).filter((file) => {
      if (!file.type.startsWith("image/")) {
        Toast.fire({
          icon: "error",
          title: `${file.name} is not an image file`,
        });
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        Toast.fire({
          icon: "error",
          title: `${file.name} is larger than 5MB`,
        });
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    setLoading((prev) => ({ ...prev, isUploading: true }));
    const formData = new FormData();
    validFiles.forEach((file) => {
      formData.append("sliderImage", file);
    });

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/admin/upload_slider_images`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );
      const data = await res.json();

      if (res.ok && data.status === "success") {
        setImages((prev) => [...prev, ...data.data]);
        Toast.fire({
          icon: "success",
          title: `Successfully uploaded ${data.data.length} image(s)`,
        });
      } else {
        Toast.fire({
          icon: "error",
          title: data.message || "Failed to upload images",
        });
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      Toast.fire({
        icon: "error",
        title: "Failed to upload images",
      });
    } finally {
      setLoading((prev) => ({ ...prev, isUploading: false }));
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      if (!loading.isUploading) {
        handleFileUpload(e.dataTransfer.files);
      }
    },
    [handleFileUpload, loading.isUploading]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!loading.isUploading) {
        setIsDragOver(true);
      }
    },
    [loading.isUploading]
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && !loading.isUploading) {
        handleFileUpload(e.target.files);
      }
    },
    [handleFileUpload, loading.isUploading]
  );

  const removeImage = useCallback(async (id: string) => {
    setLoading((prev) => ({
      ...prev,
      isDeleting: new Set(prev.isDeleting).add(id),
    }));

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/admin/delete_slider_image/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json();

      if (res.ok && data.status === "success") {
        setImages((prev) => prev.filter((img) => img.id !== id));
        Toast.fire({
          icon: "success",
          title: "Image has been removed from the slider",
        });
      } else {
        Toast.fire({
          icon: "error",
          title: data.message || "Failed to remove image",
        });
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      Toast.fire({
        icon: "error",
        title: "Failed to remove image",
      });
    } finally {
      setLoading((prev) => {
        const newSet = new Set(prev.isDeleting);
        newSet.delete(id);
        return { ...prev, isDeleting: newSet };
      });
    }
  }, []);

  const handleClearAll = useCallback(async () => {
    setLoading((prev) => ({ ...prev, isClearingAll: true }));
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/admin/delete_all_slider_images`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (res.ok && data.status === "success") {
        setImages([]);
        Toast.fire({
          icon: "success",
          title: data.message || "All images have been cleared from the slider",
        });
      } else {
        Toast.fire({
          icon: "error",
          title: data.message || "Failed to clear slider images",
        });
      }
    } catch (error) {
      console.error("Error deleting all slider images:", error);
      Toast.fire({
        icon: "error",
        title: "Failed to clear slider images",
      });
    } finally {
      setLoading((prev) => ({ ...prev, isClearingAll: false }));
      setIsDialogOpen(false);
    }
  }, []);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Manage Slider Images</CardTitle>
        <CardDescription>
          Upload and manage images for the hero section slider
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Upload Area */}
          <div
            className={`
              relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200
              ${
                isDragOver && !loading.isUploading
                  ? "border-blue-500 bg-blue-50 shadow-md"
                  : "border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-blue-400"
              }
              ${loading.isUploading ? "opacity-50 cursor-not-allowed" : ""}
            `}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={loading.isUploading}
            />

            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                <Upload className="w-8 h-8 text-white" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {loading.isUploading
                    ? "Uploading..."
                    : "Drop images here or click to upload"}
                </h3>
                <p className="text-sm text-gray-500">
                  Support for JPG, PNG, WebP files up to 5MB each
                </p>
              </div>

              <Button
                variant="outline"
                className="mt-4"
                disabled={loading.isUploading}
              >
                {loading.isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Files
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Images Grid */}
          {images.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Uploaded Images ({images.length} of 5)
                </h3>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={images.length === 0 || loading.isClearingAll}
                    >
                      {loading.isClearingAll ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Clearing...
                        </>
                      ) : (
                        "Clear All"
                      )}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you sure?</DialogTitle>
                      <DialogDescription>
                        This will permanently delete all slider images. This
                        action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                        disabled={loading.isClearingAll}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={handleClearAll}
                        disabled={loading.isClearingAll}
                      >
                        {loading.isClearingAll ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Deleting...
                          </>
                        ) : (
                          "Delete All"
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className="group relative bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden"
                  >
                    <div className="aspect-square relative overflow-hidden">
                      <img
                        src={image.url}
                        alt={image.name}
                        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />

                      <Button
                        variant="destructive"
                        size="sm"
                        className="bg-black/40 absolute top-2 right-2 w-8 h-8 p-0 md:opacity-0 group-hover:bg-red-500/80 group-hover:opacity-100 transition-opacity duration-200"
                        onClick={() => removeImage(image.id)}
                        disabled={loading.isDeleting.has(image.id)}
                      >
                        {loading.isDeleting.has(image.id) ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <X className="w-4 h-4" />
                        )}
                      </Button>
                    </div>

                    <div className="p-3 space-y-1">
                      <p
                        className="text-sm font-medium text-gray-900 truncate"
                        title={image.name}
                      >
                        {image.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(image.size)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {images.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ImageIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No images uploaded yet
              </h3>
              <p className="text-gray-500">
                Upload some images to get started with your slider
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
