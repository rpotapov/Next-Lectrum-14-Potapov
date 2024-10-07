import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const BitcoinNews = () => {
    const { articles, status } = useSelector((state: RootState) => state.bitcoin);

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    if (status === 'failed') {
        return <p>Error loading Bitcoin news.</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-12">
            {articles.map((news) => (
                <a
                    key={news.url}
                    href={news.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-gray-800 rounded-lg shadow-md p-6 hover:bg-gray-700 hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out flex flex-col justify-between"
                >
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">{news.title}</h2>
                        <p className="text-gray-400 mb-4">
                            {news.description || "No description available."}
                        </p>
                    </div>
                    <div className="mt-auto">
                        <div className="text-yellow-500 font-semibold">Read more</div>
                    </div>
                </a>
            ))}
        </div>
    );
};

export default BitcoinNews;