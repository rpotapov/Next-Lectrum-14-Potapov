import { useEffect } from 'react';
import BitcoinNews from '@/components/BitcoinNews';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { fetchBitcoinNews } from '@/store/slices/bitcoinSlice';

const BitcoinPage = () => {
    const { t } = useTranslation('common');
    const dispatch = useDispatch<AppDispatch>();
    const { status } = useSelector((state: RootState) => state.bitcoin);

    useEffect(() => {
        dispatch(fetchBitcoinNews());
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-black text-white">
            <h1 className="text-4xl font-bold text-center py-8">{t('bitcoin_news')}</h1>
            {status === 'loading' && <p>{t('loading_bitcoins_news')}</p>}
            {status === 'failed' && <p>{t('error_while_loading_btc_news')}</p>}
            <BitcoinNews />
        </div>
    );
};

export default BitcoinPage;
