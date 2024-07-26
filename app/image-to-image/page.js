import ImageToImage from "@/components/ImageToImage";

export const metadata = {
  title: "Imagify - AI-Powered Image Modification",
  description:
    "Transform your ideas into stunning visuals with our AI-powered text-to-image generator. Powered by Stable Diffusion XL Lightning for high-quality, rapid image creation.",
  keywords: [
    "AI, image generation, text to image, image modification, modify images, image to image, Stable Diffusion, machine learning",
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
