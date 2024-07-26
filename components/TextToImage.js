"use client";
import { useState } from "react";

export default function TextToImage() {
  const [prompt, setPrompt] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    setImageSrc("");
    const response = await fetch(
      `/api/generateImage?prompt=${encodeURIComponent(prompt)}`
    );
    if (response.ok) {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setImageSrc(url);
    } else {
      alert("Failed to generate image");
    }
    setLoading(false);
  };

  return (
    <main className="h-screen flex flex-col">
      <div className="flex-none p-10">
        <h1 className="text-5xl font-bold mb-2">Imagify - Text to Image</h1>
        <p className="text-xl">Powered by Stable Diffusion XL Lightning</p>
      </div>
      <div className="flex-grow flex overflow-hidden bg-black">
        <div className="w-1/2 p-4 flex flex-col">
          <textarea
            className="flex-grow w-full p-4 text-lg border-2 bg-gray-800 border-gray-300 rounded-md resize-none focus:outline-none focus:border-blue-500 mb-4"
            placeholder="Enter your prompt here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={loading}
          />
          <button
            className="px-6 py-2 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleGenerate}
            disabled={!prompt || loading}
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>
        <div className="w-1/2 p-4 flex flex-col items-center justify-center">
          {loading && (
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          )}
          {!loading && !imageSrc && (
            <p className="text-lg text-gray-500">
              Enter a prompt to Generate an Image
            </p>
          )}
          {!loading && imageSrc && (
            <div className="flex flex-col items-center space-y-4">
              <img
                src={imageSrc}
                alt="Generated"
                className="max-w-full max-h-[calc(100vh-13rem)] object-contain rounded-md"
              />
              <a
                href={imageSrc}
                download="generated-image.png"
                className="px-6 py-2 text-lg font-semibold text-white bg-green-500 rounded-md hover:bg-green-600"
              >
                Download Image
              </a>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
