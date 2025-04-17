import React from "react";
import Image from "next/image";

interface Reason {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const AiIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);
const ExpertIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-5.173-5.973"
    />
  </svg>
);
const ProactiveIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622a12.02 12.02 0 00-1.382-3.04z"
    />
  </svg>
);
const SupportIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

const reasonsData: Reason[] = [
  {
    id: 1,
    title: "AI-Powered Intelligence",
    description:
      "Leverage cutting-edge AI and machine learning to proactively identify threats and analyze vulnerabilities faster and more accurately than traditional methods.",
    icon: <AiIcon />,
  },
  {
    id: 2,
    title: "Seasoned Security Experts",
    description:
      "Our team comprises certified cybersecurity professionals with extensive experience across diverse industries, ensuring deep expertise and practical solutions.",
    icon: <ExpertIcon />,
  },
  {
    id: 3,
    title: "Proactive Defense Strategy",
    description:
      "We focus on prevention, implementing robust defenses and continuous monitoring to stop threats before they impact your business operations.",
    icon: <ProactiveIcon />,
  },
  {
    id: 4,
    title: "Client-Centric Support",
    description:
      "Your security is our priority. We offer dedicated support and transparent communication, working as a true extension of your team.",
    icon: <SupportIcon />,
  },
];

const WhyUs: React.FC = () => {
  return (
    <section id="why-us" className="py-16 md:py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-20 lg:mb-24">
          <h2 className="text-base text-[#0ACF83] font-semibold tracking-wide uppercase">
            Why Partner with SAFETRIX?
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-100 sm:text-4xl lg:text-5xl">
            The Clear Choice for Your Security
          </p>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            We combine advanced technology with expert human oversight to
            deliver security solutions that are both powerful and accessible.
          </p>
        </div>
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 xl:gap-24 lg:items-center">
          <div className="animate-fade-in-left">
            <dl className="space-y-10 md:space-y-12">
              {reasonsData.map((reason) => (
                <div key={reason.id} className="relative flex items-start">
                  <dt className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-emerald-700/30 via-emerald-600/20 to-emerald-900/30 text-[#0ACF83]">
                      {reason.icon}
                    </div>
                  </dt>
                  <dd className="ml-6">
                    <p className="text-lg leading-6 font-semibold text-white">
                      {reason.title}
                    </p>
                    <p className="mt-2 text-base text-gray-400">
                      {reason.description}
                    </p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="mt-12 lg:mt-0 flex justify-center animate-fade-in-right animation-delay-200">
            <Image
              src="/Landing/whyus.svg"
              alt="Abstract representation of secure connections and data protection"
              width={500}
              height={450}
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;