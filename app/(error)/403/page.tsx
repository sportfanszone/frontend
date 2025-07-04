import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-6 max-w-md">
        <h1 className="text-9xl font-extrabold text-red-500">403</h1>
        <p className="text-2xl font-semibold mt-4 text-gray-800">
          Access Denied
        </p>
        <p className="text-gray-600 mt-2">
          You don&apos;t have permission to access this page.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Go Back Home
        </Link>
      </div>
    </main>
  );
}
