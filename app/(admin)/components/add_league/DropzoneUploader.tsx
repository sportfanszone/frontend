"use client";

import { useCallback, useEffect, useState } from "react";
import { useDropzone, Accept } from "react-dropzone";
import { CiImageOn } from "react-icons/ci";

interface DropzoneUploaderProps {
  onFileSelect: (file: File) => void;
  label: string;
  accept?: Accept;
  file?: File | null;
  error?: string;
}

const DropzoneUploader = ({
  onFileSelect,
  label,
  accept = {
    "image/*": [],
    "video/*": [],
  },
  file,
  error,
}: DropzoneUploaderProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const selectedFile = acceptedFiles[0];
      if (selectedFile) {
        onFileSelect(selectedFile);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple: false,
  });

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setPreviewUrl(null);
    }
  }, [file]);

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="font-medium text-sm mb-1">{label}</div>

      <div
        className={`border border-dashed rounded-md p-4 text-center cursor-pointer w-full grid place-content-center h-full ${
          isDragActive ? "bg-gray-100" : ""
        } ${error ? "border-red-500" : ""}`}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {previewUrl ? (
          <>
            {file?.type.startsWith("video/") ? (
              <video
                src={previewUrl}
                controls
                className="mx-auto max-h-32 object-contain"
              />
            ) : (
              <img
                src={previewUrl}
                alt={`${label} Preview`}
                className="mx-auto max-h-32 object-contain"
              />
            )}
          </>
        ) : (
          <div>
            <p className="text-sm text-gray-600">
              {isDragActive
                ? `Drop the ${label.toLowerCase()} here...`
                : `Drag and drop ${label.toLowerCase()}, or click to select`}
            </p>
            <CiImageOn className="mx-auto mt-2 text-gray-400" size={90} />
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-left text-sm">{error}</p>}
    </div>
  );
};

export default DropzoneUploader;
