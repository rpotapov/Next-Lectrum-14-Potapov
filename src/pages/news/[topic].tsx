import { Article } from '@/types';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useState } from 'react';

interface TopicPageProps {
    articles: Article[];
    topic: string;
}

const TopicPage: React.FC<TopicPageProps> = ({ articles, topic }) => {
    const [selectedSource, setSelectedSource] = useState<string>('all');

    const uniqueSources = Array.from(new Set(articles.map((news) => news.source.name)));

    const filteredArticles = selectedSource === 'all'
        ? articles
        : articles.filter((news) => news.source.name === selectedSource);

    return (
        <div className="min-h-screen bg-black text-white">
            <h1 className="text-4xl font-bold text-center py-8">{topic} News</h1>

            <div className="flex justify-center mb-8">
                <select
                    value={selectedSource}
                    onChange={(e) => setSelectedSource(e.target.value)}
                    className="bg-gray-800 border border-gray-700 text-white rounded-md px-4 py-2 appearance-none focus:outline-none focus:ring focus:ring-yellow-500 transition duration-300"
                >
                    <option value="all">All Sources</option>
                    {uniqueSources.map((source, index) => (
                        <option key={index} value={source}>
                            {source}
                        </option>
                    ))}
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-12">
                {filteredArticles.map((news) => (
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
                                {news.description || 'No description available.'}
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

export const getStaticPaths: GetStaticPaths = async () => {
    const topics = ['football', 'ethereum', 'cryptocurrency'];

    const paths = topics.map((topic) => ({
        params: { topic },
    }));

    return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const topic = params?.topic;

    try {
        const res = await fetch(
            `https://newsapi.org/v2/everything?q=${topic}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
        );
        const data = await res.json();

        const sanitizedArticles: Article[] = data.articles?.map((article: Article) => ({
            source: article.source || { id: null, name: 'Unknown source' },
            author: article.author || 'Unknown author',
            title: article.title || 'No title',
            description: article.description || null,
            url: article.url || '#',
            urlToImage: article.urlToImage || null,
            publishedAt: article.publishedAt || 'Unknown date',
            content: article.content || null,
        })) || [];

        return {
            props: {
                articles: sanitizedArticles,
                topic,
            },
            revalidate: 86400, // 24h
        };
    } catch (error) {
        console.error(`Error fetching ${topic} news:`, error);
        return {
            props: {
                articles: [],
                topic: topic || 'Unknown Topic',
            },
        };
    }
};

export default TopicPage;