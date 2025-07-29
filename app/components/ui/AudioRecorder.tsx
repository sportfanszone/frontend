// components/ui/AudioRecorder.tsx
"use client";

import React from "react";
import { useReactMediaRecorder } from "react-media-recorder";

type Props = {
  onStop: (blobUrl: string, blob: Blob) => void;
};

const AudioRecorder = ({ onStop }: Props) => {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({
      audio: true,
      onStop: (_blobUrl, blob) => {
        const url = URL.createObjectURL(blob);
        onStop(url, blob);
      },
    });

  return (
    <div className="flex flex-col items-start space-y-2">
      <div>Status: {status}</div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={startRecording}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Start
        </button>
        <button
          type="button"
          onClick={stopRecording}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Stop
        </button>
      </div>
      {mediaBlobUrl && <audio src={mediaBlobUrl} controls className="mt-2" />}
    </div>
  );
};

export default AudioRecorder;
