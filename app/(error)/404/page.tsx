import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-6 max-w-md">
        <h1 className="text-9xl font-extrabold text-blue-600">404</h1>
        <p className="text-2xl font-semibold mt-4 text-gray-800">
          Page not found
        </p>
        <p className="text-gray-600 mt-2">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Go Back Home
        </Link>
      </div>
    </main>
  );
}
