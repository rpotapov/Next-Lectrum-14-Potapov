import News from '@/src/components/News';
import { getBaseURL } from '@/src/lib';
import { NewsType } from '@/src/types';

export const dynamicParams = false;

const NewsPage = async ({ params }: { params: { newsId: string } }) => {
  const res = await fetch(`${getBaseURL()}/api/news/${params.newsId}`, { cache: 'no-store' });

  if (!res.ok) {
    return <p>News not found</p>;
  }

  const news = await res.json() as NewsType;

  return (
    <div>
      <News news={news} />
    </div>
  );
};

export default NewsPage;