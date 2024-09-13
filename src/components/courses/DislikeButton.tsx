"use client";
import { useState } from "react";

const DislikeButton = () => {
  const [dislikes, setDislikes] = useState(0);

  const handleLike = () => {
    setDislikes(dislikes + 1);
  };

  return (
    <button
      className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 ml-1 rounded-lg transition-colors"
      onClick={handleLike}
    >
      👎 {dislikes} Dislikes
    </button>
  );
};

export default DislikeButton;
