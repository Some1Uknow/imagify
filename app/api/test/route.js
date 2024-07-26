import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req) {
  try {
    const prompt = "a cat"

    if (!prompt) {
      return new Response("Prompt is required", { status: 400 });
    }

    const inputs = {
      prompt: prompt,
      num_steps: 50, // You can adjust this
      guidance_scale: 7.5, // You can adjust this
      height: 768, // You can adjust this
      width: 768, // You can adjust this
    };

    const response = await getRequestContext().env.AI.run(
      "@cf/stabilityai/stable-diffusion-xl-base-1.0",
      inputs
    );

    return new Response(response, {
      headers: {
        "content-type": "image/png",
      },
    });
  } catch (error) {
    console.error("Error in generateImage API:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}