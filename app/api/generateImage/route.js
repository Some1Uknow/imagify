import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(req) {
  const url = new URL(req.url);
  const prompt = url.searchParams.get("prompt");

  if (!prompt) {
    return new Response("Prompt is required", { status: 400 });
  }

  const inputs = {
    prompt: prompt,
    height: 1024,
    width: 1024
  };

  const response = await getRequestContext().env.AI.run(
    "@cf/bytedance/stable-diffusion-xl-lightning",
    inputs
  );

  return new Response(response, {
    headers: {
      "content-type": "image/png",
    },
  });
}
