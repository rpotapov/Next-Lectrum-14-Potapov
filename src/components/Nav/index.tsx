import Link from 'next/link';

const Nav = () => {
    return (
        <nav className="bg-gray-800 p-4">
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
        </nav>
    );
};

export default Nav;