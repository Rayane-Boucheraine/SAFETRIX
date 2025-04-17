// src/components/Pricing.tsx
import React from "react";
import Link from "next/link"; // Import Link for buttons

// Interface for pricing plan data
interface PricingPlan {
  id: number;
  name: string;
  price: string;
  frequency: string; // e.g., "/ month", "/ year"
  description: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  isMostPopular?: boolean; // Optional flag to highlight a plan
}

// Sample pricing data
const pricingPlans: PricingPlan[] = [
  {
    id: 1,
    name: "Starter Security",
    price: "$49",
    frequency: "/ month",
    description:
      "Essential protection for individuals and small teams getting started.",
    features: [
      "Basic Vulnerability Scan (1/month)",
      "Email Security Filter",
      "Standard Support",
      "Up to 5 Assets Monitored",
      "Monthly Security Report",
    ],
    ctaText: "Choose Starter",
    ctaLink: "/auth?plan=starter",
  },
  {
    id: 2,
    name: "Business Pro",
    price: "$199",
    frequency: "/ month",
    description:
      "Comprehensive security for growing businesses needing robust defense.",
    features: [
      "Advanced Vulnerability Assessment (Weekly)",
      "Managed Bug Bounty Program Setup",
      "Incident Response Retainer (Basic)",
      "Up to 25 Assets Monitored",
      "Priority Support (Email & Chat)",
      "Customizable Security Dashboards",
      "Threat Intelligence Feeds",
    ],
    ctaText: "Choose Pro",
    ctaLink: "/auth?plan=pro",
    isMostPopular: true, // Highlight this plan
  },
  {
    id: 3,
    name: "Enterprise Shield",
    price: "Custom",
    frequency: "", // Custom pricing doesn't have a standard frequency
    description:
      "Tailored, top-tier security solutions for large organizations.",
    features: [
      "Continuous Vulnerability Management",
      "Fully Managed Bug Bounty Program",
      "Advanced Incident Response & Forensics",
      "Unlimited Assets Monitored",
      "Dedicated Security Advisor",
      "24/7 Premium Support (Phone, Chat, Email)",
      "Compliance Reporting (SOC 2, ISO 27001)",
      "API Access & Integrations",
    ],
    ctaText: "Contact Sales",
    ctaLink: "#contact", // Link to contact section or form
  },
];

const Pricing: React.FC = () => {
  return (
    <section
      id="pricing"
      className="py-16 md:py-24 bg-gradient-to-b from-[#111111] to-[#080808]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-base text-[#0ACF83] font-semibold tracking-wide uppercase">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-100 sm:text-4xl lg:text-5xl">
            Choose Your Security Plan
          </p>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Select the plan that fits your needs. All plans are designed for
            clarity and value, with no hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 items-stretch">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`
                flex flex-col // Ensure footer sticks to bottom
                rounded-[30px] // Your requested border radius
                border border-white/50 // Your requested border (using default 1px thickness for simplicity)
                bg-[rgba(38,45,42,0.50)] // Your requested background RGBA
                p-8 // Internal padding
                shadow-lg // Subtle shadow for depth
                transition-transform duration-300 ease-in-out
                hover:scale-[1.03] // Slight scale on hover for feedback
                relative // Needed for the optional "Most Popular" badge
                ${
                  plan.isMostPopular
                    ? "border-2 border-[#0ACF83]"
                    : "border-white/50"
                } // Highlight popular plan border
              `}
            >
              {/* Most Popular Badge */}
              {plan.isMostPopular && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-[#0ACF83] text-gray-900 shadow-md">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="flex-grow">
                {" "}
                {/* Content area that grows */}
                {/* Plan Name */}
                <h3 className="text-2xl font-semibold text-white mb-2">
                  {plan.name}
                </h3>
                {/* Description */}
                <p className="text-gray-400 mb-6 text-sm">{plan.description}</p>
                {/* Price */}
                <div className="mb-8">
                  <span className="text-4xl lg:text-5xl font-extrabold text-white">
                    {plan.price}
                  </span>
                  {plan.frequency && (
                    <span className="text-lg font-medium text-gray-400">
                      {plan.frequency}
                    </span>
                  )}
                  {plan.price === "Custom" && ( // Specific text if price is 'Custom'
                    <span className="block text-lg font-medium text-gray-400 mt-1">
                      Tailored to your needs
                    </span>
                  )}
                </div>
                {/* Features List */}
                <ul className="space-y-3 text-gray-300 mb-10">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-[#0ACF83] mr-2 mt-0.5" // Checkmark icon
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>{" "}
              {/* End flex-grow */}
              {/* CTA Button Wrapper (ensures button is at the bottom) */}
              <div className="mt-auto pt-6">
                {" "}
                {/* mt-auto pushes to bottom, pt adds space */}
                <Link
                  href={plan.ctaLink}
                  className={`
                    block w-full py-3 px-6 border border-transparent rounded-lg text-center font-medium
                    transition duration-300 ease-in-out
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-[#0ACF83]
                    ${
                      plan.isMostPopular
                        ? "bg-[#0ACF83] text-gray-900 hover:bg-[#00b371]" // Button style for popular plan
                        : "bg-white/10 text-white hover:bg-white/20 border border-white/30" // Button style for other plans
                    }
                  `}
                >
                  {plan.ctaText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
