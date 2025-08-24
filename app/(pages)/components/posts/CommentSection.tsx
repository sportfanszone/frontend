"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { FC } from "react";
import Link from "next/link";
import Image from "next/image"; // Import Image component
import { FiMessageCircle, FiShare2, FiPlay, FiPause } from "react-icons/fi";
import UserAvatar from "@/app/components/ui/UserAvatar";
import WaveSurfer from "wavesurfer.js";

const CreateComment = dynamic(
  () => import("@/app/components/ui/CreateComment"),
  { ssr: false }
);
const Like = dynamic(() => import("@/app/components/ui/Like"), { ssr: false });
const Share = dynamic(() => import("@/app/components/ui/Share"), {
  ssr: false,
});

import { CommentType } from "@/types";

interface Props {
  comment: CommentType;
  level?: number;
}

const Comment: FC<Props> = ({ comment, level = 0 }) => {
  const [replyCount, setReplyCount] = useState<number>(
    comment?.replyCount || 0
  );
  const [likes, setLikes] = useState<number>(comment?.likes || 0); // eslint-disable-line @typescript-eslint/no-unused-vars
  const [likedByUser, setLikedByUser] = useState<boolean>(
    comment?.likedByUser || false
  ); // eslint-disable-line @typescript-eslint/no-unused-vars
  const [shareCount, setShareCount] = useState<number>(comment?.shares || 0); // eslint-disable-line @typescript-eslint/no-unused-vars
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [useFallback, setUseFallback] = useState(false);
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  const initializeWaveSurfer = useCallback(
    async (retryCount = 0, maxRetries = 3) => {
      if (!comment.audioUrl || !waveformRef.current) return;

      setIsAudioLoading(true);
      setAudioError(null);

      try {
        await new Promise((resolve) => setTimeout(resolve, 100));

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

        console.log("Loading audio with WaveSurfer:", comment.audioUrl);
        wavesurferRef.current.load(comment.audioUrl);

        wavesurferRef.current.on("ready", () => {
          setIsAudioLoading(false);
          console.log("WaveSurfer ready for audio:", comment.audioUrl);
        });

        wavesurferRef.current.on("error", async (error) => {
          console.error(
            "WaveSurfer error:",
            error,
            "for URL:",
            comment.audioUrl
          );
          setIsAudioLoading(false);
          if (retryCount < maxRetries) {
            console.log(
              `Retrying audio load (${retryCount + 1}/${maxRetries})...`
            );
            setTimeout(
              () => initializeWaveSurfer(retryCount + 1, maxRetries),
              1000
            );
          } else {
            setAudioError("Failed to load audio after retries");
            setUseFallback(true);
          }
        });

        wavesurferRef.current.on("play", () => setIsPlaying(true));
        wavesurferRef.current.on("pause", () => setIsPlaying(false));
        wavesurferRef.current.on("finish", () => setIsPlaying(false));
      } catch (error: unknown) {
        console.error(
          "WaveSurfer initialization error:",
          error instanceof Error ? error.message : String(error),
          "for URL:",
          comment.audioUrl
        );
        if (retryCount < maxRetries) {
          console.log(
            `Retrying audio load (${retryCount + 1}/${maxRetries})...`
          );
          setTimeout(
            () => initializeWaveSurfer(retryCount + 1, maxRetries),
            1000
          );
        } else {
          setAudioError(
            error instanceof Error
              ? error.message
              : "Failed to initialize audio player"
          );
          setUseFallback(true);
        }
        setIsAudioLoading(false);
      }
    },
    [comment.audioUrl]
  );

  useEffect(() => {
    console.log(
      "Attempting to initialize WaveSurfer for audio:",
      comment.audioUrl
    );
    if (comment.audioUrl && waveformRef.current) {
      initializeWaveSurfer();

      return () => {
        if (wavesurferRef.current) {
          wavesurferRef.current.destroy();
          wavesurferRef.current = null;
          setIsPlaying(false);
          setIsAudioLoading(false);
          setAudioError(null);
          setUseFallback(false);
        }
      };
    }
  }, [comment.audioUrl, initializeWaveSurfer]);

  const handlePlayPause = useCallback(() => {
    if (wavesurferRef.current && !isAudioLoading && !audioError) {
      wavesurferRef.current.playPause();
    }
  }, [isAudioLoading, audioError]);

  return (
    <section className="relative pl-4 border-l-1 border-gray-400/40 max-w-180 2xl:max-w-200 mx-auto p-4 pt-0">
      <div className="flex items-start gap-3 mb-2">
        <div className="flex items-center gap-3 mb-4">
          <UserAvatar
            src={comment.user?.profileImageUrl || ""}
            alt={`${comment.user?.firstName?.[0] || ""}${
              comment.user?.lastName?.[0] || ""
            }`}
            className="size-10"
          />
        </div>
        <div className="mb-2 w-full">
          <div className="flex items-center gap-2">
            <Link
              href={`/user/@${comment.user.username}`}
              className="text-sm font-semibold text-black cursor-pointer hover:text-blue-700 transition-all"
            >
              @{comment.user.username}
            </Link>
            {comment.replyTo && (
              <Link
                href={`/user/@${comment.replyTo.username}`}
                className="text-sm font-semibold text-black cursor-pointer hover:text-blue-700 transition-all"
              >
                <span className="text-black/40">
                  &gt;&gt;{" "}
                  <span className="text-blue-500/60">
                    @{comment.replyTo.username}
                  </span>
                </span>
              </Link>
            )}
          </div>
          {comment.content && (
            <p className="text-gray-500 mb-1">{comment.content}</p>
          )}
          {comment.imageUrl && (
            <div className="mt-2">
              <Image
                src={comment.imageUrl}
                alt="Comment image"
                className="max-h-40 md:max-h-50 h-auto rounded object-cover"
                width={400}
                height={200}
                onError={(e) =>
                  console.error(`Failed to load image: ${comment.imageUrl}`, e)
                }
              />
            </div>
          )}
          {comment.audioUrl && (
            <div className="flex items-center gap-2 mt-2 w-full">
              {useFallback ? (
                <audio
                  controls
                  src={comment.audioUrl}
                  className="w-full max-w-[80%]"
                >
                  Your browser does not support the audio element.
                </audio>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handlePlayPause}
                    className={`p-2 bg-black/20 size-8 text-white rounded-full hover:bg-black/30 ${
                      isAudioLoading || audioError
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {isPlaying ? <FiPause /> : <FiPlay />}
                  </button>
                  <div
                    ref={waveformRef}
                    className="w-full max-w-[80%] h-10 bg-gray-100 rounded"
                    style={{ minHeight: "40px", minWidth: "100px" }}
                  ></div>
                </>
              )}
              {audioError &&
                // <p className="text-red-500 text-sm">{audioError}</p>
                null}
              {isAudioLoading && (
                <p className="text-gray-500 text-sm">Loading audio...</p>
              )}
            </div>
          )}
          <div className="flex items-center gap-4 mt-2">
            <Like
              commentId={comment.id}
              initialLiked={comment.likedByUser}
              initialLikeCount={comment.likes}
              onSuccess={(liked, likeCount) => {
                setLikedByUser(liked);
                setLikes(likeCount);
              }}
            />
            <CreateComment
              replyTo={comment.user}
              replyToContent={comment.content || ""}
              parentCommentId={comment.id}
              onSuccess={() => setReplyCount((prev) => prev + 1)}
            >
              <div className="text-sm flex justify-between items-center gap-1 cursor-pointer">
                <FiMessageCircle />{" "}
                <b className="text-gray-700">{replyCount}</b>
              </div>
            </CreateComment>
            <Share
              commentId={comment.id}
              initialShareCount={comment.shares}
              shareUrl={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/comment/${comment.id}`}
              onSuccess={() => setShareCount((prev) => prev + 1)}
            >
              <div className="text-sm flex justify-between items-center gap-1 cursor-pointer">
                <FiShare2 /> <b className="text-gray-700">{comment.shares}</b>
              </div>
            </Share>
          </div>
        </div>
      </div>

      {(comment.replies ?? []).length > 0 && (
        <div className="ml-4">
          {(comment.replies ?? []).map((reply) => (
            <Comment key={reply.id} comment={reply} level={level + 1} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Comment;
