import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link href="/">Lesson 1</Link>
        </h1>
        <div>
          <Link href="/" className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-100 transition">
            Home
          </Link>
        </div>
      </div>
    </nav>
  );
}
