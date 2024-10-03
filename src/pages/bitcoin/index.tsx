import { Article, PageProps } from '@/types';
import { GetServerSideProps } from 'next';

const HomePage: React.FC<PageProps> = ({ topHeadlines }) => {
    return (
        <div className="min-h-screen bg-black text-white">
            <h1 className="text-4xl font-bold text-center py-8">Top US News</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-12">
                {topHeadlines.map((news) => (
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
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const res = await fetch(
            `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
        );
        const data = await res.json();

        const sanitizedArticles: Article[] = data.articles?.map((article: Article) => ({
            source: article.source || { id: null, name: "Unknown source" },
            author: article.author || "Unknown author",
            title: article.title || "No title",
            description: article.description || null,
            url: article.url || "#",
            urlToImage: article.urlToImage || null,
            publishedAt: article.publishedAt || "Unknown date",
            content: article.content || null,
        })) || [];

        return {
            props: {
                topHeadlines: sanitizedArticles,
            },
        };
    } catch (error) {
        console.error("Error fetching top headlines:", error);
        return {
            props: {
                topHeadlines: [],
            },
        };
    }
};

export default HomePage;