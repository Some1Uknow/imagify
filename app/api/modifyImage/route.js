import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req) {
  try {
    const { prompt, sourceImage } = await req.json();

    if (!prompt || !sourceImage) {
      return new Response("Prompt and source image are required", {
        status: 400,
      });
    }

    // Convert base64 image to Uint8Array
    const imageData = atob(sourceImage.split(",")[1]);
    const arrayBuffer = new ArrayBuffer(imageData.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < imageData.length; i++) {
      uint8Array[i] = imageData.charCodeAt(i);
    }

    const inputs = {
        prompt: prompt,
        negative_prompt: "low quality, blurry, distorted", // Add negative prompts for better quality
        height: 1024, // Maximum allowed height for best resolution
        width: 1024, // Maximum allowed width for best resolution
        image: [...uint8Array], // Your existing image data
        num_steps: 20, // Maximum allowed steps for detailed generation
        strength: 0.8, // Adjust based on how much you want to preserve the original image
        guidance: 7.5, // Default value, can be adjusted for more or less prompt influence
        seed: Math.floor(Math.random() * 2**32), // Random seed for reproducibility
      };

    const response = await getRequestContext().env.AI.run(
      "@cf/runwayml/stable-diffusion-v1-5-img2img",
      inputs
    );

    return new Response(response, {
      headers: {
        "content-type": "image/png",
      },
    });
  } catch (error) {
    console.error("Error in modifyImage API:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
