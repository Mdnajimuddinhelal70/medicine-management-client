const AbtDetails = () => {
  return (
    <div className="overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 mt-12">
      <h1 className="text-center text-5xl text-green-800 font-extrabold font-sans">
        WHO WE ARE.
      </h1>

      <img
        className="object-cover w-full"
        src="https://i.ibb.co.com/dK136s7/voluter3.jpg"
        alt="Article"
      />

      <div className="p-6">
        <div>
          <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">
            Product
          </span>
          <a
            href="#"
            className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline"
            tabIndex="0"
            role="link"
          >
            I Built A Successful Blog In One Year
          </a>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            From consulting and à la carte services to turnkey practice
            management, Medical Management Services will help you solve the
            puzzles that keep your practice from experiencing optimal cash flow
            while reducing cost and creating an environment that allows
            providers to get back to practicing medicine. Medical Management
            Services consistently provides superior consulting services within
            the Healthcare Industry. We do this by bringing the most proficient
            business and clinical consultants in the industry together to
            identify our clients issues, and to work with them to explore the
            right solutions to fit their organizations goals. We combine people,
            processes, and technology to ensure your success. For over 12 years
            Medical Management Services, located in Pensacola, Florida, has been
            meeting the needs of providers and practices with innovative and
            realistic solutions resulting in “best in class” practice
            performance. Our team of professionals continues to perfect their
            expertise in the various aspects of practice management by working
            daily with and for practices all over the country. With experience
            on a variety of practice management systems, we partner with
            providers to understand their vision and goals. With those practice
            goals in mind, we construct solutions that are cost-effective,
            practical and time tested.
          </p>
        </div>

        <div className="mt-4">
          <div className="flex items-center">
            <div className="flex items-center">
              <img
                className="object-cover h-10 rounded-full"
                src="https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=48&q=60"
                alt="Avatar"
              />
              <a
                href="#"
                className="mx-2 font-semibold text-gray-700 dark:text-gray-200"
                tabIndex="0"
                role="link"
              >
                Jone Doe
              </a>
            </div>
            <span className="mx-1 text-xs text-gray-600 dark:text-gray-300">
              21 SEP 2015
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbtDetails;
