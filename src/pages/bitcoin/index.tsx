import { GetServerSideProps } from 'next';
import BitcoinNews from '@/components/BitcoinNews';
import { fetchBitcoinNews } from '@/store/slices/bitcoinSlice';
import { wrapper } from '@/store';

const BitcoinPage = () => {
    return (
        <div className="min-h-screen bg-black text-white">
            <h1 className="text-4xl font-bold text-center py-8">Bitcoin News</h1>
            <BitcoinNews />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    (store) => async () => {
        await store.dispatch(fetchBitcoinNews());

        return {
            props: {},
        };
    }
);

export default BitcoinPage;