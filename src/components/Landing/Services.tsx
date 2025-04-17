// src/components/Services.tsx
"use client"; // Add if using client-side features like hooks (though not strictly needed here yet)

import React from "react";
import Card from "./Card"; // Ensure Card.tsx is correctly imported

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const servicesData: Service[] = [
  {
    id: 1,
    title: "Vulnerability Assessment",
    description:
      "Proactively discover and analyze security weaknesses across your applications, networks, and infrastructure. We provide detailed reports outlining vulnerabilities, potential impact, and actionable recommendations for remediation, helping you fortify your defenses before attackers exploit them.",
    icon: "🔎",
  },
  {
    id: 2,
    title: "Bug Bounty Program",
    description:
      "Leverage the global community of ethical hackers. We design, launch, and manage effective bug bounty programs tailored to your needs, handling triage, validation, and rewarding researchers for finding valid security flaws. Turn potential threats into strengthened security.",
    icon: "💰",
  },
  {
    id: 3,
    title: "Incident Response",
    description:
      "Minimize damage and ensure swift recovery during a security breach. Our expert team provides rapid containment, thorough investigation, eradication of threats, and post-incident analysis to restore operations and prevent future occurrences, available when you need it most.",
    icon: "🛡️",
  },
];

const Services: React.FC = () => {
  return (
    <section
      id="services"
      className={`bg-gradient-to-b from-[rgba(10,207,131,0.06)] via-[rgba(7,7,7,0.20)] to-[#101010] relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden isolate`} // Added relative, isolate, adjusted padding
    >
      {/* Subtle Background Glow Element */}
      <div
        className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl opacity-30"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#0ACF83] to-[#1b5f45] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-base text-emerald-400 font-semibold tracking-wide uppercase animate-fade-in-down animation-duration-500">
            Our Core Expertise
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-100 sm:text-4xl lg:text-5xl tracking-tight animate-fade-in-down animation-delay-100 animation-duration-500">
            Focused Security Solutions
          </p>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in-up animation-delay-200 animation-duration-500">
            Mastering the essential pillars of modern cybersecurity to safeguard
            your digital environment.
          </p>
        </div>

        {/* Changed to Grid for better spacing control with animations */}
        {/* Removed -m-4 wrapper */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch">
          {servicesData.map((service, index) => (
            // Added wrapper for animation & delay control on each card container
            <div
              key={service.id}
              className="animate-fade-in-up animation-duration-500"
              style={{ animationDelay: `${150 + index * 150}ms` }} // Staggered delay
            >
              <Card
                title={service.title}
                description={service.description}
                icon={service.icon}
                // Pass any additional props if needed
              />
            </div>
          ))}
        </div>
      </div>
      {/* Another optional background element */}
      <div
        className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl opacity-20"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#1b5f45] to-[#0ACF83] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </section>
  );
};

export default Services;
