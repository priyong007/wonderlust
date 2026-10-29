

const ReadySection = () => {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background image */}
      <div
        className="relative flex min-h-45 items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-10 sm:min-h-55 md:min-h-65"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url('/images/CTA.png')",
        }}
      >
        {/* Content */}
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center text-white">
          <h2 className="text-2xl font-normal tracking-tight sm:text-3xl md:text-4xl">
            Ready To Start Your Journey?
          </h2>

          <p className="mt-2 text-[10px] font-light text-white/90 sm:text-xs md:text-sm">
            Join thousands of travelers who have discovered the world with us
          </p>

          <a
            href="/destinations"
            className="mt-5 inline-flex min-h-9 items-center justify-center gap-4 bg-white px-5 py-2 text-[10px] font-medium uppercase tracking-wide text-black transition-colors duration-300 hover:bg-gray-200 sm:min-h-10 sm:px-7 sm:text-xs"
          >
            Book Your Trip Today
            <span aria-hidden="true" className="text-sm">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ReadySection;