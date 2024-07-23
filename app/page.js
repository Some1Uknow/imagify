"use client";
import { useState } from "react";

export default function Home() {
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
    <main className="max-h-screen">
      <h1 className="text-6xl font-bold m-10 mb-0">Imagify</h1>
      <p className="m-10 mt-2">Powered by Stable Diffusion XL Lightning</p>
      <div className="flex flex-col items-center justify-center p-4 bg-black">
        <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl mt-10 space-x-0 md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex flex-col items-center justify-center w-full md:w-1/2 space-y-4">
            <textarea
              className="w-full h-32 p-4 text-lg border-2 bg-gray-800 border-gray-300 rounded-md resize-none focus:outline-none focus:border-blue-500"
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
          <div className="flex flex-col items-center justify-center w-full md:w-1/2 space-y-4">
            {loading && (
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            )}
            {!loading && !imageSrc && (
              <p className="text-lg text-gray-500">Enter a prompt to Generate an Image</p>
            )}
            {!loading && imageSrc && (
              <img
                src={imageSrc}
                alt="Generated"
                className="max-w-full max-h-96 rounded-md"
              />
            )}
            {!loading && imageSrc && (
              <a
                href={imageSrc}
                download="generated-image.png"
                className="px-6 py-2 text-lg font-semibold text-white bg-green-500 rounded-md hover:bg-green-600"
              >
                Download Image
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
