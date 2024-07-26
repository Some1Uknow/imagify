"use client";
import { useState } from "react";

export default function ImageToImage() {
  const [sourceImage, setSourceImage] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [resultImage, setResultImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setSourceImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSourceImage(null);
  };

  const handleModify = async () => {
    if (!sourceImage || !prompt) return;
    setLoading(true);
    setResultImage("");
    
    // Placeholder for the actual API call
    try {
      const response = await fetch('/api/modifyImage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sourceImage, prompt })
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setResultImage(url);
      } else {
        alert("Failed to modify image");
      }
    } catch (error) {
      alert("Error modifying image");
    }
    
    setLoading(false);
  };

  return (
    <main className="h-screen flex flex-col bg-black text-white">
      <div className="flex-none p-10">
        <h1 className="text-5xl font-bold mb-2">Imagify - Image to Image</h1>
        <p className="text-xl">Modify your images using Stable Diffusion 1.5 Image to Image</p>
      </div>
      <div className="flex-grow flex overflow-hidden">
        <div className="w-1/2 p-4 flex flex-col">
          <div className="mb-4">
            <label className="block text-lg mb-2">Upload Image</label>
            <div className="flex items-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="flex-grow p-2 border border-gray-300 rounded-l-md bg-gray-800"
                placeholder="Choose an image to Modify"
              />
             {sourceImage && <button
                onClick={handleRemoveImage}
                className="px-4 py-2 bg-red-500 text-white rounded-r-md hover:bg-red-600 focus:outline-none"
                disabled={!sourceImage}
              >
                Remove
              </button>}
            </div>
          </div>
          {sourceImage && (
            <img
              src={sourceImage}
              alt="Source"
              className="mb-4 max-h-48 object-contain"
            />
          )}
          <textarea
            className="flex-grow w-full p-4 text-lg border-2 bg-gray-800 border-gray-300 rounded-md resize-none focus:outline-none focus:border-blue-500 mb-4"
            placeholder="Enter your modification prompt here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={loading}
          />
          <button
            className="px-6 py-2 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleModify}
            disabled={!sourceImage || !prompt || loading}
          >
            {loading ? "Modifying..." : "Modify"}
          </button>
        </div>
        <div className="w-1/2 p-4 flex flex-col items-center justify-center">
          {loading && (
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          )}
          {!loading && !resultImage && (
            <p className="text-lg text-gray-500">Upload an image and enter a prompt to modify it</p>
          )}
          {!loading && resultImage && (
            <div className="flex flex-col items-center space-y-4">
              <img
                src={resultImage}
                alt="Modified"
                className="max-w-full max-h-[calc(100vh-13rem)] object-contain rounded-md"
              />
              <a
                href={resultImage}
                download="modified-image.png"
                className="px-6 py-2 text-lg font-semibold text-white bg-green-500 rounded-md hover:bg-green-600"
              >
                Download Modified Image
              </a>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}