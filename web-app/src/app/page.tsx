import Link from 'next/link';
import { cookies } from 'next/headers';

export default function Home() {
  const cookieStore = cookies();
  const cookie = cookieStore.get('hasVisited');
  return (
    <section className="text-center p-8 bg-white rounded-lg shadow-lg space-y-6">
      <h1 className="text-3xl font-bold">{cookie?.value ? 'Привіт, раді бачити тебе знову!' : 'Ласкаво просимо!'}</h1>
      <div className="space-x-4">
        <Link href="/profile" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Profile
        </Link>
        <Link href="/about" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
          About
        </Link>
      </div>
    </section>
  );
}