import { useEffect } from 'react';
import BitcoinNews from '@/components/BitcoinNews';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { fetchBitcoinNews } from '@/store/slices/bitcoinSlice';

const BitcoinPage = () => {
    const { t } = useTranslation('common');
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchBitcoinNews());
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-black text-white">
            <h1 className="text-4xl font-bold text-center py-8">{t('bitcoin_news')}</h1>
            <BitcoinNews />
        </div>
    );
};

export default BitcoinPage;
