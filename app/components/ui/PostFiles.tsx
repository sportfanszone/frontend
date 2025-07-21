import { FiX } from "react-icons/fi";

const PostFiles = ({
  files,
  handleRemoveFile,
}: {
  files: File[];
  handleRemoveFile: (index: number) => void;
}) => {
  return (
    <>
      {files.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-3">
          {files.map((file, index) => (
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
    </>
  );
};

export default PostFiles;
