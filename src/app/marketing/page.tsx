import { cookies } from 'next/headers';

const Marketing = () => {
  const cookieStore = cookies();
  const cookie = cookieStore.get('name');
  const cookieValue = cookie ? cookie.value : 'Guest';

  return (
    <div className="flex items-center justify-center bg-green-50">
      <section className="bg-white p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-semibold mb-4">Welcome to the Marketing Page, {cookieValue}!</h1>
        <p className="text-lg text-gray-700">We are glad to see you here. Explore our marketing strategies and tips to grow your business.</p>
      </section>
    </div>
  );
};

export default Marketing;
