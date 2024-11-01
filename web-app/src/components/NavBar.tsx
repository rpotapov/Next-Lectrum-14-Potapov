import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const NavBar = () => {
    const { t } = useTranslation('common');

    return (
        <nav className="navbar bg-gray-800 p-4 flex justify-around">
            <Link className="text-yellow-500 underline hover:text-yellow-300 transition duration-300 mx-2" href="/">{t('home')}</Link>
            <Link className="text-yellow-500 underline hover:text-yellow-300 transition duration-300 mx-2" href="/bitcoin">{t('bitcoin_news')}</Link>
            <Link className="text-yellow-500 underline hover:text-yellow-300 transition duration-300 mx-2" href="/news/football">{t('football_news')}</Link>
            <Link className="text-yellow-500 underline hover:text-yellow-300 transition duration-300 mx-2" href="/news/ethereum">{t('ethereum_news')}</Link>
            <Link className="text-yellow-500 underline hover:text-yellow-300 transition duration-300 mx-2" href="/news/cryptocurrency">{t('cryptocurrency_news')}</Link>
        </nav>
    );
};

export default NavBar;