import { GetServerSideProps } from 'next';
import BitcoinNews from '@/components/BitcoinNews';
import { fetchBitcoinNews } from '@/store/slices/bitcoinSlice';
import { wrapper } from '@/store';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const BitcoinPage = () => {
    const { t } = useTranslation('common');
    const { status } = useSelector((state: RootState) => state.bitcoin);

    return (
        <div className="min-h-screen bg-black text-white">
            <h1 className="text-4xl font-bold text-center py-8">{t('bitcoin_news')}</h1>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>Error loading Bitcoin news.</p>}
            <BitcoinNews />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    (store) => async () => {
        await store.dispatch(fetchBitcoinNews());
        console.log('Added Bitcoin News');
        return {
            props: {},
        };
    }
);

export default BitcoinPage;