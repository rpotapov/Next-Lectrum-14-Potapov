import Link from 'next/link';

export default function Home() {
  return (
    <section className="text-center p-8 bg-white rounded-lg shadow-lg space-y-6">
      <h1 className="text-3xl font-bold">Welcome to the Homepage!</h1>
      <div className="space-x-4">
        <Link href="/contact" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Contact
        </Link>
        <Link href="/marketing" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
          Marketing
        </Link>
      </div>
    </section>
  );
}
