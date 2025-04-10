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
  return (
    <section
      id="trust"
      aria-labelledby="trust-heading"
      className="pb-16 md:pb-24 bg-[linear-gradient(0deg,_rgba(10,207,131,0.04)_-71.1%,_rgba(7,7,7,0.40)_85.26%),_linear-gradient(180deg,_#070707_0%,_#101010_100%)] text-center"
    >
      <div className="w-[90%] mx-auto px-4">
        <h2
          id="trust-heading"
          className="text-lg sm:text-xl lg:text-2xl text-[#FAFAFA]/80 mb-10 md:mb-16 animate-fade-in-up"
        >
          Trusted by more than{" "}
          <span className="text-[#0ACF83] font-semibold">100+</span> leading
          Algerian companies,
          <br className="hidden sm:block" /> securing their digital future
          together.
        </h2>

        <ul className="flex flex-wrap items-center justify-between gap-y-8 md:gap-x-16 lg:gap-x-20">
          {trustedCompanies.map((company, index) => (
            <li
              key={company.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${150 + index * 100}ms` }}
            >
              <div
                className="h-8 md:h-10 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition duration-300 ease-in-out"
                title={company.name}
              >
                <Image
                  src={company.src}
                  alt={company.alt}
                  width={120}
                  height={40}
                  style={{
                    objectFit: "contain",
                    height: "100%",
                    width: "auto",
                  }} // Maintain aspect ratio
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Trust;
