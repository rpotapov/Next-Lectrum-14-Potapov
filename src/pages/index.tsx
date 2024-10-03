import { Article, PageProps } from '@/types';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import Link from 'next/link';

const HomePage: React.FC<PageProps> = ({ topHeadlines }) => {
  const [selectedSource, setSelectedSource] = useState<string>('all');

  const uniqueSources = Array.from(new Set(topHeadlines.map((news) => news.source.name)));

  const filteredHeadlines = selectedSource === 'all'
    ? topHeadlines
    : topHeadlines.filter((news) => news.source.name === selectedSource);

  return (
    <div className="min-h-screen bg-black text-white pb-8">
      <h1 className="text-4xl font-bold text-center py-8">Top US News</h1>

      <div className="text-center mb-6">
        <Link href="/bitcoin">
          <span className="text-yellow-500 underline hover:text-yellow-300 transition duration-300">
            See Bitcoin News
          </span>
        </Link>
      </div>

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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-12">
        {filteredHeadlines.map((news) => (
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

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
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
        topHeadlines: sanitizedArticles,
      },
    };
  } catch (error) {
    console.error('Error fetching top headlines:', error);
    return {
      props: {
        topHeadlines: [],
      },
    };
  }
};

export default HomePage;