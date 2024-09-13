import { news } from '@/src/mock';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { newsId: string } }) {
  const newsItem = news.find(news => news.id === params.newsId);

  if (!newsItem) {
    return NextResponse.json({ message: 'News not found' }, { status: 404 });
  }

  return NextResponse.json(newsItem);
}