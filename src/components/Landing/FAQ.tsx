"use client";

import Link from "next/link";
import React, { useState } from "react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    id: 1,
    question: "What is Cybersecurity, and why is it important?",
    answer:
      "Cybersecurity involves protecting computer systems, networks, and data from theft, damage, or unauthorized access. It's crucial because our reliance on technology makes us vulnerable to cyber threats that can cause financial loss, identity theft, and disruption of essential services.",
  },
  {
    id: 2,
    question: "How can I protect my personal data online?",
    answer:
      "Use strong, unique passwords for different accounts, enable two-factor authentication (2FA) whenever possible, be cautious about clicking links or downloading attachments in emails, avoid sharing sensitive information on public Wi-Fi, and regularly review your privacy settings on social media and other online services.",
  },
  {
    id: 3,
    question: "What are common types of cyber threats?",
    answer:
      "Common threats include malware (viruses, ransomware, spyware), phishing (fraudulent attempts to obtain sensitive information), denial-of-service (DoS) attacks (overloading systems to make them unavailable), man-in-the-middle attacks (intercepting communication), and social engineering (manipulating people into revealing confidential information).",
  },
  {
    id: 4,
    question: "Do I need antivirus software on all my devices?",
    answer:
      "Yes, it's highly recommended. Antivirus software helps detect and remove malware from computers, smartphones, and tablets. Ensure it's kept up-to-date to protect against the latest threats. Modern operating systems have built-in protections, but dedicated antivirus often provides more comprehensive coverage.",
  },
  {
    id: 5,
    question: "What should I do if I suspect a security breach?",
    answer:
      "Immediately change your passwords for the affected account and any others using the same password. Enable 2FA if you haven't already. Monitor your accounts for suspicious activity. If financial information was involved, notify your bank or credit card company. Report significant breaches to relevant authorities if necessary.",
  },
];

const FAQ = () => {
  const [openQuestionId, setOpenQuestionId] = useState<number | null>(null);

  const handleQuestionClick = (id: number) => {
    setOpenQuestionId((prevOpenId) => (prevOpenId === id ? null : id));
  };

  return (
    <div
      className={`bg-[linear-gradient(0deg,_rgba(10,207,131,0.04)_-71.1%,_rgba(7,7,7,0.40)_85.26%),_linear-gradient(180deg,_#070707_0%,_#101010_100%)] py-16 px-4 sm:px-6 lg:px-8 text-gray-100`}
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-white sm:text-4xl mb-12">
          FAQ
        </h1>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-center">
          <div className="md:w-1/2 space-y-4">
            <h2 className="text-2xl font-semibold text-gray-100">
              Common Cybersecurity Questions
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Find answers to frequently asked questions about cybersecurity
              threats, best practices, and how to stay safe in the digital
              world. Our experts provide clear and concise information to help
              you understand this critical field.
            </p>
            <div className="mt-8 pt-6 border-t border-gray-600">
              <p className="text-lg font-medium text-gray-200">
                Can&apos;t find what you are looking for?
              </p>
              <p className="text-gray-300 mt-2">
                Let&apos;s Talk: Engage with us in a conversation tailored just
                for you. We&apos;re here to address your specific cybersecurity
                concerns.
              </p>
              <Link
                href="/contact"
                className="inline-block mt-4 px-6 py-2 bg-emerald-600 text-white font-medium rounded-[8px] shadow-sm hover:bg-emerald-700 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 focus:ring-offset-gray-900"
              >
                Contact Us
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 w-full">
            <ul className="space-y-4">
              {faqItems.map((item) => {
                const isOpen = openQuestionId === item.id;
                return (
                  <li
                    key={item.id}
                    className="bg-[#112E23] rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out"
                  >
                    <button
                      onClick={() => handleQuestionClick(item.id)}
                      className="w-full p-4 text-left flex justify-between items-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800 rounded-t-lg"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${item.id}`}
                    >
                      <span className="font-medium text-gray-100">
                        {item.question}
                      </span>
                      <span
                        className="text-emerald-400 text-xl ml-4 transform transition-transform duration-300"
                        style={{
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m19.5 8.25-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      </span>
                    </button>

                    <div
                      id={`faq-answer-${item.id}`}
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="p-4 pt-2 text-gray-300 bg-black/30 rounded-b-lg">
                        {item.answer}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
