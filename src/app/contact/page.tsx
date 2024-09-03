const Contact = () => {
  return (
    <div className="flex items-center justify-center bg-gray-50">
      <section className="bg-white p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-semibold mb-4">Contact Us</h1>
        <p className="text-lg text-gray-700">We would love to hear from you. Please reach out for any queries or feedback.</p>
        <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
          Send a Message
        </button>
      </section>
    </div>
  );
};

export default Contact;
