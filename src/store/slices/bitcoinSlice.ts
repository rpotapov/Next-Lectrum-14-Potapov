import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Article } from '@/types';

export interface BitcoinState {
    articles: Article[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: BitcoinState = {
    articles: [],
    status: 'idle',
};

export const fetchBitcoinNews = createAsyncThunk(
    'bitcoin/fetchBitcoinNews',
    async () => {
        const res = await fetch(
            `https://newsapi.org/v2/everything?q=bitcoin&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
        );
        const data = await res.json();

        return data.articles.map((article: Article) => ({
            source: article.source || { id: null, name: 'Unknown source' },
            author: article.author || 'Unknown author',
            title: article.title || 'No title',
            description: article.description || null,
            url: article.url || '#',
            urlToImage: article.urlToImage || null,
            publishedAt: article.publishedAt || 'Unknown date',
            content: article.content || null,
        }));
    }
);

const bitcoinSlice = createSlice({
    name: 'bitcoin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBitcoinNews.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBitcoinNews.fulfilled, (state, action: PayloadAction<Article[]>) => {
                state.status = 'succeeded';
                state.articles = action.payload;
            })
            .addCase(fetchBitcoinNews.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default bitcoinSlice.reducer;