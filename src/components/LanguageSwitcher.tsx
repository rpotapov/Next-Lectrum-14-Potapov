import { useRouter } from 'next/router';
import i18n from 'i18next';

const LanguageSwitcher = () => {
    const router = useRouter();

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        router.push(router.pathname, router.asPath, { locale: lang });
    };

    return (
        <div className="flex space-x-4">
            <button
                onClick={() => changeLanguage('en')}
                className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-400 transition duration-300"
            >
                English
            </button>
            <button
                onClick={() => changeLanguage('uk')}
                className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-400 transition duration-300"
            >
                Українська
            </button>
        </div>
    );
};

export default LanguageSwitcher;
