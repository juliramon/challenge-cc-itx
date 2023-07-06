const Error404 = () => {
  return (
    <section className="py-10 md:py-20 lg:py-36 relative">
      <div className="container relative z-10">
        <div className="flex flex-wrap items-start justify-center -mx-6">
          <div className="w-full md:w-auto flex justify-center px-6">
            <span className="text-primary-600 text-6xl lg:text-8xl font-heading font-bold !leading-none inline-block">
              404
            </span>
          </div>
          <div className="w-full md:max-w-xl px-6 text-center md:text-left mt-5 md:mt-2">
            <div className="max-w-xs mx-auto md:max-w-full">
              <h1 className="mt-0 mb-5">Page not found</h1>
              <p className="text-primary-400">
                The requested page is not available, apologize for the
                inconvenience.
              </p>
              <p className="text-primary-400">
                Frequently, it is due to an error in writing the direction of
                the page you are trying to access. Check it again to see if it
                is correct.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Error404;
