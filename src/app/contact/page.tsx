"use client";

import React from "react";
import Header from "@/components/Landing/Header";
import Footer from "@/components/Landing/Footer";

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    {" "}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
    />{" "}
  </svg>
);
const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    {" "}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z"
    />{" "}
  </svg>
);
const LocationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    {" "}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
    />{" "}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
    />{" "}
  </svg>
);
const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    {" "}
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />{" "}
  </svg>
);
const TwitterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    {" "}
    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-.42.718-.662 1.553-.662 2.429 0 1.668.847 3.143 2.133 3.997-.786-.025-1.524-.24-2.17-.598v.052c0 2.328 1.658 4.276 3.854 4.714-.404.11-.828.168-1.264.168-.31 0-.613-.03-.904-.086.611 1.906 2.381 3.292 4.484 3.332-1.648 1.293-3.732 2.062-5.992 2.062-.389 0-.772-.023-1.15-.068 2.133 1.367 4.67 2.169 7.39 2.169 8.866 0 13.716-7.353 13.716-13.717 0-.208-.004-.416-.014-.622.94-.677 1.755-1.527 2.4-2.49z" />{" "}
  </svg>
);
const FacebookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    {" "}
    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />{" "}
  </svg>
);
const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    {" "}
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069s-3.584-.012-4.85-.069c-3.252-.149-4.771-1.699-4.919-4.92-.058-1.265-.069-1.644-.069-4.849s.012-3.584.069-4.85c.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.059 1.689.073 4.948.073s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.947s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />{" "}
  </svg>
);

const contactEmail = "support@safetrix.com";
const contactPhone = "+1 (555) 123-4567";
const companyAddressLine1 = "123 Security Lane, Suite 404";
const companyAddressLine2 = "Cyber City, TX 78701";
const linkedInUrl = "https://linkedin.com/company/safetrix";
const twitterUrl = "https://twitter.com/safetrix"; 
const facebookUrl = "https://facebook.com/safetrix"; 
const instagramUrl = "https://instagram.com/safetrix";

const ContactPage: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted with data:", new FormData(event.currentTarget));
    alert(
      "Message supposedly sent! Check console. Implement actual backend submission."
    );
  };

  return (
    <div className="bg-gradient-to-b from-[#0a0a0a] via-[#111111] to-[#080808] text-white min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <section id="contact" className="pt-18 pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 md:mb-20">
              <h1 className="text-base text-[#0ACF83] font-semibold tracking-wide uppercase">
                Contact Us
              </h1>
              <p className="mt-2 text-3xl font-extrabold text-gray-100 sm:text-4xl lg:text-5xl">
                Get in Touch with SAFETRIX
              </p>
              <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
                Have questions about our services, need support, or want to
                discuss a custom solution? We&apos;re here to help.
              </p>
            </div>

            <div className="lg:grid lg:grid-cols-2 lg:gap-16 xl:gap-24 items-start">
              <div className="animate-fade-in-left mb-16 lg:mb-0">
                <h2 className="text-2xl font-semibold text-white mb-6">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="name"
                      required
                      className="block w-full rounded-md border-gray-600 bg-gray-800/50 py-2 px-3 text-white shadow-sm focus:border-[#0ACF83] focus:ring-[#0ACF83] sm:text-sm"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      required
                      className="block w-full rounded-md border-gray-600 bg-gray-800/50 py-2 px-3 text-white shadow-sm focus:border-[#0ACF83] focus:ring-[#0ACF83] sm:text-sm"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      required
                      className="block w-full rounded-md border-gray-600 bg-gray-800/50 py-2 px-3 text-white shadow-sm focus:border-[#0ACF83] focus:ring-[#0ACF83] sm:text-sm"
                      placeholder="Briefly describe your inquiry"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows={5}
                      required
                      className="block w-full rounded-md border-gray-600 bg-gray-800/50 py-2 px-3 text-white shadow-sm focus:border-[#0ACF83] focus:ring-[#0ACF83] sm:text-sm resize-none"
                      placeholder="Enter your detailed message here..."
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full cursor-pointer flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-gray-900 bg-[#0ACF83] hover:bg-[#00b371] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-[#0ACF83] transition duration-300 ease-in-out"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>

              <div className="animate-fade-in-right">
                <h2 className="text-2xl font-semibold text-white mb-7">
                  Direct Contact & Information
                </h2>

                <div className="space-y-12 text-gray-300">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 text-[#0ACF83] pt-0.5">
                      <MailIcon />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-base font-medium text-gray-200">
                        Email Us
                      </h3>
                      <a
                        href={`mailto:${contactEmail}`}
                        className="hover:text-white hover:underline break-words"
                      >
                        {contactEmail}
                      </a>
                      <p className="text-sm text-gray-400 mt-1">
                        Response within 24 business hours.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 text-[#0ACF83] pt-0.5">
                      <PhoneIcon />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-base font-medium text-gray-200">
                        Call Us
                      </h3>
                      <a
                        href={`tel:${contactPhone}`}
                        className="hover:text-white hover:underline whitespace-nowrap"
                      >
                        {contactPhone}
                      </a>
                      <p className="text-sm text-gray-400 mt-1">
                        Mon-Fri, 9 AM - 5 PM (EST).
                      </p>{" "}
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 text-[#0ACF83] pt-0.5">
                      <LocationIcon />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-base font-medium text-gray-200">
                        Our Headquarters
                      </h3>
                      <p>{companyAddressLine1}</p>
                      <p>{companyAddressLine2}</p>
                      <p className="text-sm text-gray-400 mt-1">
                        Visits by appointment only.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="my-6 h-[1.2px] bg-[gray]"></div>

                <div>
                  <h3 className="text-lg font-medium text-gray-200 mb-4">
                    Connect with Us
                  </h3>
                  <div className="flex space-x-6">

                    <a
                      href={linkedInUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#0077b5] transition-colors duration-200"
                      aria-label="LinkedIn"
                    >
                      <LinkedInIcon />
                    </a>
                    <a
                      href={twitterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#1DA1F2] transition-colors duration-200"
                      aria-label="Twitter"
                    >
                      <TwitterIcon />
                    </a>
                    <a
                      href={facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#1877F2] transition-colors duration-200"
                      aria-label="Facebook"
                    >
                      <FacebookIcon />
                    </a>
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#E4405F] transition-colors duration-200"
                      aria-label="Instagram"
                    >
                      <InstagramIcon />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
