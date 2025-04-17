// src/components/Trust.tsx
import React from "react";
import Image from "next/image";

const trustedCompanies = [
  {
    id: 1,
    name: "Company Alpha",
    src: "/Landing/trust6.svg",
    alt: "Company Alpha Logo",
  },
  {
    id: 2,
    name: "Company Beta",
    src: "/Landing/trust5.svg",
    alt: "Company Beta Logo",
  },
  {
    id: 3,
    name: "Company Gamma",
    src: "/Landing/trust4.svg",
    alt: "Company Gamma Logo",
  },
  {
    id: 4,
    name: "Company Delta",
    src: "/Landing/trust3.svg",
    alt: "Company Delta Logo",
  },
  {
    id: 5,
    name: "Company Epsilon",
    src: "/Landing/trust2.svg",
    alt: "Company Epsilon Logo",
  },
  {
    id: 6,
    name: "Company Zeta",
    src: "/Landing/trust1.svg",
    alt: "Company Zeta Logo",
  },
];

const Trust = () => {
  const extendedLogos = [...trustedCompanies, ...trustedCompanies];

  const keyframes = `
    @keyframes marqueeTrust {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-100%); }
    }
    .animate-marqueeTrust {
      /* MODIFICATION HERE: Added 'alternate' */
      animation: marqueeTrust 30s linear infinite alternate; /* Adjust 30s for speed */
    }
  `;

  return (
    <section
      id="trust"
      aria-labelledby="trust-heading"
      className="pb-16 bg-[linear-gradient(0deg,_rgba(10,207,131,0.04)_-71.1%,_rgba(7,7,7,0.40)_85.26%),_linear-gradient(180deg,_#070707_0%,_#101010_100%)] text-center overflow-x-hidden"
    >
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <div className="px-20">
        <h2
          id="trust-heading"
          className="text-lg sm:text-xl lg:text-2xl text-[#FAFAFA]/80 mb-12 md:mb-16 animate-fade-in-up"
        >
          Trusted by more than{" "}
          <span className="text-[#0ACF83] font-semibold">100+</span> leading
          Algerian companies,
          <br className="hidden sm:block" /> securing their digital future
          together.
        </h2>

        <div className="relative w-full overflow-hidden">
          <ul
            className="flex w-max animate-marqueeTrust hover:[animation-play-state:paused] py-2" 
          >
            {extendedLogos.map((company, index) => (
              <li
                key={`${company.id}-${index}`}
                className="flex-shrink-0 px-8 sm:px-10 md:px-12" 
              >
                <div
                  className="h-8 md:h-10 flex items-center transition-transform duration-300 ease-in-out transform hover:scale-110"
                  title={company.name}
                >
                  <Image
                    src={company.src}
                    alt={company.alt}
                    width={130}
                    height={40}
                    className="max-h-full w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" // Removed grayscale
                    unoptimized 
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Trust;
