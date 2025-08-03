import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getYouTubeThumbnail = (url: string): string | null => {
  // Regular expression to match YouTube URLs and extract video ID
  const youtubeRegex =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  const match = url.match(youtubeRegex);
  if (!match) {
    return null; // Return null if not a valid YouTube URL
  }

  const videoId = match[1];
  // Return the max resolution thumbnail URL
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

// Function to validate YouTube URL
export const isValidYouTubeUrl = (url: string): boolean => {
  const youtubeRegex =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  return youtubeRegex.test(url);
};
