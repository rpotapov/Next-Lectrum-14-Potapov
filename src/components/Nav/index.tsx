'use client'

import Link from 'next/link';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';

const Nav = () => {
    const { session, signOut } = useAuthStore();
    const router = useRouter();

    const handleLogout = async () => {
        await signOut();
        router.push('/');
    };

    return (
        <nav className="bg-gray-800 p-4 flex justify-between items-center">
            <ul className="flex space-x-4">
                <li>
                    <Link href="/" className="text-white hover:text-gray-400">
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/blog" className="text-white hover:text-gray-400">
                        Go to Blog
                    </Link>
                </li>
            </ul>
            {session && (<button
                onClick={handleLogout}
                className="text-white hover:text-gray-400"
            >
                Logout
            </button>)}
        </nav>
    );
};

export default Nav;