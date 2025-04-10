// src/components/Services.tsx
import React from "react";
import Card from "./Card"; // Import the Card component

// Define the structure for a single service object
interface Service {
  id: number;
  title: string;
  description: string;
  icon: string; // Using strings for emojis
}

// Data for the services to be displayed
const servicesData: Service[] = [
  {
    id: 1,
    title: "Vulnerability Assessment",
    description:
      "Identifying and quantifying security weaknesses in your systems.",
    icon: "🔎", // Magnifying glass emoji
  },
  {
    id: 2,
    title: "Bug Bounty Program",
    description:
      "Managing programs that reward ethical hackers for finding vulnerabilities.",
    icon: "💰", // Money bag emoji (alternative: 🐞)
  },
  {
    id: 3,
    title: "Incident Response",
    description:
      "Rapidly responding to and managing cybersecurity breaches or attacks.",
    icon: "🛡️", // Shield emoji
  },

];

const Services: React.FC = () => {
  return (
    <section
      id="services"
      className={`py-16 px-4 sm:px-6 lg:py-24 lg:px-8 bg-[background-image:linear-gradient(180deg,_rgba(10,_207,_131,_0.02)_0%,_rgba(7,_7,_7,_0.20)_91.5%),_linear-gradient(0deg,_#070707_0%,_#101010_100%)]
`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-base text-emerald-400 font-semibold tracking-wide uppercase">
            Our Expertise
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-100 sm:text-4xl lg:text-5xl">
            Security Services
          </p>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Protecting your assets with comprehensive security solutions.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-stretch -m-4">
          {servicesData.map((service) => (
            <Card
              key={service.id} 
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
