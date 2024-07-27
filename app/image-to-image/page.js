import ImageToImage from "@/components/ImageToImage";

export const metadata = {
  title: "Imagify - AI-Powered Image Modification",
  description:
    "Transform your ideas into stunning visuals with our AI-powered text-to-image generator. Powered by Stable Diffusion XL Lightning for high-quality, rapid image creation.",
  keywords: [
    "Text to image",
    "AI image",
    "AI Image Generator",
    "AI Art",
    "Generate Image",
    "Midjourney",
    "DALL-E",
    "ChatGPT",
    "Generate Image using AI",
    "AI",
    "image generation",
    "text to image",
    "Stable Diffusion",
    "machine learning",
    "image modification",
    "modify images",
    "image to image",
  ],
  author: "Some1Uknow",
};

export default function page() {
  return (
    <>
      <ImageToImage />
    </>
  );
}
