"use client";

import React from "react";
import Header from "@/components/Landing/Header";
import Footer from "@/components/Landing/Footer";

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
    />
  </svg>
);
const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z"
    />
  </svg>
);

const BuildingIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M8.25 21V10.5M12 21V10.5M15.75 21V10.5m-9.75 6h3.75m3 0h3.75M8.25 6h7.5v3h-7.5z"
    />
  </svg>
);
const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);
const TwitterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-.42.718-.662 1.553-.662 2.429 0 1.668.847 3.143 2.133 3.997-.786-.025-1.524-.24-2.17-.598v.052c0 2.328 1.658 4.276 3.854 4.714-.404.11-.828.168-1.264.168-.31 0-.613-.03-.904-.086.611 1.906 2.381 3.292 4.484 3.332-1.648 1.293-3.732 2.062-5.992 2.062-.389 0-.772-.023-1.15-.068 2.133 1.367 4.67 2.169 7.39 2.169 8.866 0 13.716-7.353 13.716-13.717 0-.208-.004-.416-.014-.622.94-.677 1.755-1.527 2.4-2.49z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5" // Standard size
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069s-3.584-.012-4.85-.069c-3.252-.149-4.771-1.699-4.919-4.92-.058-1.265-.069-1.644-.069-4.849s.012-3.584.069-4.85c.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.059 1.689.073 4.948.073s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.947s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5" // Standard size
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
  </svg>
);

const contactEmail = "support@safetrix.com";
const contactPhone = "+1 (555) 123-4567"; 
const companyAddressLine1 = "123 Security Lane, Suite 404";
const companyAddressLine2 = "Cyber City, TX 78701";
const emailResponseTime = "Typically within 24 business hours";
const linkedInUrl = "https://linkedin.com/company/safetrix";
const twitterUrl = "https://twitter.com/safetrix";
const instagramUrl = "https://twitter.com/safetrix";
const youtubeUrl = "https://twitter.com/safetrix";

const ContactPage: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("Form submitted! (Backend needed for real use)");
    (event.target as HTMLFormElement).reset();
  };

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen flex flex-col overflow-x-hidden antialiased">
      <Header />

      <main className="flex-grow container mx-auto px-4 pt-20 md:pt-28 pb-24 relative">
        <div
          className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#0dd48b] to-[#053a27] opacity-15 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </div>

        <div className="text-center mb-16 md:mb-20 animate-fade-in-up">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl tracking-tight mb-5">
            Let&apos;s Connect
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Whether you have a question about our cybersecurity services, need
            support, or want to explore a partnership, we&apos;re ready to
            listen and assist. Choose your preferred way to reach us.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-20 items-start max-lg:flex max-lg:flex-col-reverse">
          <div className="order-2 lg:order-1 animate-fade-in-left animation-delay-200 max-lg:w-full">
            <div className="bg-gradient-to-br from-[#111111]/80 to-[#181818]/90 p-8 md:p-10 rounded-2xl border border-gray-700/60 shadow-2xl shadow-black/30">
              <h2 className="text-2xl font-semibold text-white mb-6 max-md:text-[22px]">
                Send Us a Secure Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-1.5"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    required
                    className="block w-full text-sm rounded-lg border-gray-600 bg-[#0d0d0d]/70 py-3 px-4 text-white shadow-sm placeholder-gray-500 focus:border-[#0ACF83] focus:ring-2 focus:ring-[#0ACF83]/50 focus:outline-none transition duration-200 ease-in-out"
                    placeholder="e.g., Jane Doe"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-1.5"
                  >
                    Work Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    required
                    className="block w-full text-sm rounded-lg border-gray-600 bg-[#0d0d0d]/70 py-3 px-4 text-white shadow-sm placeholder-gray-500 focus:border-[#0ACF83] focus:ring-2 focus:ring-[#0ACF83]/50 focus:outline-none transition duration-200 ease-in-out"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-300 mb-1.5"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    required
                    className="block w-full text-sm rounded-lg border-gray-600 bg-[#0d0d0d]/70 py-3 px-4 text-white shadow-sm placeholder-gray-500 focus:border-[#0ACF83] focus:ring-2 focus:ring-[#0ACF83]/50 focus:outline-none transition duration-200 ease-in-out"
                    placeholder="Inquiry Topic (e.g., Service Request, Partnership)"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-1.5"
                  >
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={5}
                    required
                    className="block w-full text-sm rounded-lg border-gray-600 bg-[#0d0d0d]/70 py-3 px-4 text-white shadow-sm placeholder-gray-500 focus:border-[#0ACF83] focus:ring-2 focus:ring-[#0ACF83]/50 focus:outline-none resize-none transition duration-200 ease-in-out"
                    placeholder="Please provide details about your inquiry..."
                  />
                </div>
                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full cursor-pointer flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-semibold text-gray-950 bg-[#0ACF83] hover:bg-opacity-85 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#111] focus:ring-[#0ACF83] transition duration-300 ease-in-out transform hover:scale-[1.01] active:scale-[0.99]"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="lg:order-2 text-center animate-fade-in-right animation-delay-100 space-y-10 max-lg:w-full">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Contact Details & Channels
            </h2>

            <div className="space-y-8 text-sm">
              <div className="flex flex-col gap-3 items-center justify-center group text-center sm:text-left">
                <div className="flex-shrink-0 mb-3 sm:mb-0 sm:mr-4 p-2.5 rounded-full bg-[#0ACF83]/10 border border-[#0ACF83]/30 text-[#0ACF83] transition-all duration-300 group-hover:bg-[#0ACF83]/20 group-hover:scale-110">
                  <MailIcon />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-gray-200 text-base mb-1">
                    General Inquiries
                  </h3>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="block text-gray-300 hover:text-white hover:underline transition-colors duration-200 break-words"
                  >
                    {contactEmail}
                  </a>
                  <p className="text-gray-400 text-xs mt-1">{`Response time: ${emailResponseTime}`}</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 items-center justify-center group text-center sm:text-left">
                <div className="flex-shrink-0 mb-3 sm:mb-0 sm:mr-4 p-2.5 rounded-full bg-[#0ACF83]/10 border border-[#0ACF83]/30 text-[#0ACF83] transition-all duration-300 group-hover:bg-[#0ACF83]/20 group-hover:scale-110">
                  <PhoneIcon />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-gray-200 text-base mb-1">
                    Sales & Support Line
                  </h3>
                  <a
                    href={`tel:${contactPhone}`}
                    className="block text-gray-300 hover:text-white hover:underline transition-colors duration-200 whitespace-nowrap"
                  >
                    {contactPhone}
                  </a>
                  <p className="text-gray-400 text-xs mt-1">
                    Direct assistance during business hours.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 items-center justify-center group text-center sm:text-left">
                <div className="flex-shrink-0 mb-3 sm:mb-0 sm:mr-4 p-2.5 rounded-full bg-[#0ACF83]/10 border border-[#0ACF83]/30 text-[#0ACF83] transition-all duration-300 group-hover:bg-[#0ACF83]/20 group-hover:scale-110">
                  <BuildingIcon />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-gray-200 text-base mb-1">
                    Headquarters
                  </h3>
                  <address className="not-italic">
                    <p className="text-gray-300">{companyAddressLine1}</p>
                    <p className="text-gray-300">{companyAddressLine2}</p>
                  </address>
                  <p className="text-gray-400 text-xs mt-1">
                    Visits strictly by appointment.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-800/50">
              <h3 className="text-base font-semibold text-gray-200 mb-4">
                Follow Our Journey
              </h3>
              <div className="flex space-x-6 justify-center">
                <a
                  href={linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#0077b5] transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <span className="sr-only">LinkedIn</span>
                  <LinkedInIcon />
                </a>
                <a
                  href={twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#1DA1F2] transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <span className="sr-only">Twitter</span>
                  <TwitterIcon />
                </a>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#E1306C] transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <span className="sr-only">Instagram</span>
                  <InstagramIcon />
                </a>
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#FF0000] transition-colors duration-200"
                  aria-label="YouTube"
                >
                  <span className="sr-only">YouTube</span>
                  <YouTubeIcon />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#0ACF83] to-[#0f3128] opacity-10 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
