import News from '@/src/components/News';
import { getBaseURL } from '@/src/lib';
import { news } from '@/src/mock';

export const dynamicParams = false;

export async function generateStaticParams() {
    return news.map((news) => ({
        newsId: news.id,
    }));
}

const NewsPage = async ({ params }: { params: { newsId: string } }) => {
    const res = await fetch(`${getBaseURL()}/api/news/${params.newsId}`, { cache: 'no-store' });

    if (!res.ok) {
        return <p>News not found</p>;
    }

    const news = await res.json();

    return (
        <News news={news}/>
    );
};

export default NewsPage;
