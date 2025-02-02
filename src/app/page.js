import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <img
          className="dark:invert"
          src={'https://marketplace.canva.com/EAF6nmbUlhg/1/0/1600w/canva-black-and-gold-flat-illustrative-real-estate-logo-Jj0rP4nw9ug.jpg'}
          alt="Property Logo"
          width={180}
          height={38}
          priority
        />
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
          Buy & Sell Properties with Ease
        </h1>
        <p className="text-center sm:text-left text-sm sm:text-base mb-6">
          Discover the best properties for sale, and find your dream home today.
          Whether you're buying or selling, we've got you covered with a seamless
          experience.
        </p>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="#"
          >
           
            Buy Property
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="#"
          >
           
            Sell Property
          </a>
        </div>
      </main>
     
    </div>
  );
}
