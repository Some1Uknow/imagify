export const runtime = "edge";

import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-medium mb-2">Page Not Found</h2>
      <p className="text-lg text-gray-600 mb-4">
        Sorry, the page you're looking for doesn't exist.
      </p>
      <Link href="/">
        <p className="text-blue-600 hover:text-blue-800">
          Go back to the homepage
        </p>
      </Link>
    </div>
  );
};

export default NotFound;
