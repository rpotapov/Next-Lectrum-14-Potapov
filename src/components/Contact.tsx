const Contact = () => {
    return (
        <div className="max-auto md:px-6 py-[50px]">
            <section className="md-32">
                <div className="flex flex-wrap">
                    <div className="mb-10 w-full shrink-0 grow-0 basis-auto">
                        <h2 className="mb-6 text-3xl font-bold">Get in Touch</h2>
                        <p className="text-sm font-roboto text-gray-600 text-left my-4 leading-6">
                            We would love to hear from you! Whether you have a question about our services, need support, or just want to share your feedback, feel free to reach out to us.
                        </p>
                    </div>
                </div>
                <div className="flex flex-wrap justify-between">
                    <div className="mb-10 w-full">
                        <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                        <p className="text-gray-600">Email: <a href="hello@lectrum.ua">hello@lectrum.ua</a></p>
                        <p className="text-gray-600">Phone: <a href="tel:+380 44 333 6011">+380 44 333 6011</a></p>
                        <p className="text-gray-600">Address: <a target="_blank" href="https://www.google.com/maps/place//data=!4m2!3m1!1s0x40d4cef9521a5c47:0x27a329b9e6bd4791?sa=X&ved=1t:8290&ictx=111">02160, м. Київ, пр. Соборності, буд. 19, оф. 515</a></p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Contact;
