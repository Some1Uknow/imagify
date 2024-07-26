import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <>
      <main className="flex flex-col items-center justify-center gap-2 min-h-screen">
        <h1 className="text-8xl font-bold m-10 mb-0">Imagify</h1>
        <p className="text-xl">
          Play with images using our state of the art AI models!
        </p>
        <div className="flex flex-row gap-2 mt-4">
          <Link
            href="/text-to-image"
            className="p-2 bg-white text-black text-center font-semibold hover:bg-slate-200 rounded-lg"
          >
            Text to Image
          </Link>
          <Link
            href="/image-to-image"
            className="p-2 bg-white text-black text-center font-semibold hover:bg-slate-200 rounded-lg"
          >
            Image to Image
          </Link>
        </div>
      </main>
    </>
  );
}
