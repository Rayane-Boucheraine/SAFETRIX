import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import email from "../../../public/Landing/email.png";
import phone from "../../../public/Landing/phone.png";
import arrow from "../../../public/Landing/arrow.svg";
import Image from "next/image";

const Footer = () => {
  const navLinks = [
    { name: "Home", url: "/#home" },
    { name: "Services", url: "/#services" },
    { name: "About Us", url: "/#about" },
    { name: "Bug Bounty", url: "/bug-bounty" },
    { name: "Pricing", url: "/#pricing" },
  ];

  const quickLinks = [
    { name: "Contact", url: "/contact" },
    { name: "FAQ", url: "/#faq" },
  ];

  const socialLinks = [
    { Icon: FaFacebookF, url: "https://facebook.com/safetrix" },
    { Icon: FaTwitter, url: "https://twitter.com/safetrix" },
    { Icon: FaInstagram, url: "https://instagram.com/safetrix" },
    { Icon: FaLinkedinIn, url: "https://linkedin.com/company/safetrix" },
    { Icon: SiGmail, url: "mailto:contact@safetrix.com" },
  ];

  return (
    <footer className="rounded-t-[30px] bg-gradient-to-b from-[#0E241B] from-[55.57%] to-[#080808]">
      <div className="w-[90%] mx-auto py-[40px] flex flex-col md:flex-row justify-between gap-8">
        <div className="max-w-[300px] mx-auto md:mx-0">
          <h1 className="text-white font-semibold text-[30px] text-center md:text-left">
            SAFETRIX
          </h1>
          <p className="text-[#E0E0E0] text-center md:text-left mt-2">
            SAFETRIX provides comprehensive cybersecurity solutions designed to
            protect your business from evolving digital threats.
          </p>
          <ul className="flex items-center gap-4 mt-6 justify-center md:justify-start">
            {socialLinks.map(({ Icon, url }, index) => (
              <li
                key={index}
                className="bg-[#0ACF83] p-2 rounded-full hover:bg-[#00945B] transition"
              >
                <Link href={url} target="_blank" rel="noopener noreferrer">
                  <Icon className="text-white cursor-pointer text-sm" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center md:text-left">
          <h2 className="text-white font-semibold text-[18px] mb-4">
            Navigation
          </h2>
          <ul className="space-y-3 ">
            {navLinks.map(({ name, url }) => (
              <li
                key={name}
                className="flex items-center gap-3 max-md:justify-center"
              >
                <Image
                  src={arrow}
                  alt="arrow"
                  className="w-2 h-2"
                  width={10}
                  height={10}
                />
                <Link
                  href={url}
                  className="text-[#E0E0E0] hover:text-[#0ACF83] transition text-[15px]"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center md:text-left">
          <h2 className="text-white font-semibold text-[18px] mb-4">
            Quick Links
          </h2>
          <ul className="space-y-3">
            {quickLinks.map(({ name, url }) => (
              <li
                key={name}
                className="flex items-center gap-3 max-md:justify-center"
              >
                <Image
                  src={arrow}
                  alt="arrow"
                  className="w-2 h-2"
                  width={12}
                  height={12}
                />
                <Link
                  href={url}
                  className="text-[#E0E0E0] hover:text-[#0ACF83] transition text-[15px]"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center md:text-left">
          <h2 className="text-white font-semibold text-lg mb-4">
            Get In Touch
          </h2>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 max-md:justify-center max-md:flex-col">
              <Image
                src={email}
                alt="Email"
                className="w-[20px]"
                width={16}
                height={16}
              />
              <Link
                href="mailto:contact@safetrix.com"
                className="text-[#E0E0E0] hover:text-[#0ACF83] transition text-[15px] ml-2"
              >
                contact@safetrix.com
              </Link>
            </li>
            <li className="flex items-center gap-4 mt-3 pr-10 max-md:justify-center max-md:flex-col max-md:pr-0">
              <Image
                src={phone}
                alt="Phone"
                width={16}
                height={16}
                className="w-[20px]"
              />
              <Link
                href="tel:+1234567890"
                className="text-[#E0E0E0] hover:text-[#0ACF83] transition text-[15px]"
              >
                +1 (234) 567-890
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="w-[90%] mx-auto h-[1.6px] rounded-[16px] bg-[#E0E0E0] opacity-20 mb-6"></div>

      <div className="text-center text-[#E0E0E0] text-[15px] pb-6">
        Copyright © 2025 Safetrix. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
