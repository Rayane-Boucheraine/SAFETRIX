import Image from "next/image";
import about from "../../../public/Landing/about.svg";

const About = () => {
  return (
    <div
      id="about"
      className="w-full bg-gradient-to-b from-[rgba(10,207,131,0.06)] via-[rgba(7,7,7,0.20)] to-[#101010] py-[60px]"
    >
      <div className="w-[90%] mx-auto">
        <h2 className="text-3xl md:text-4xl text-center font-bold text-white mb-12">
          About Us
        </h2>

        <div className="grid md:grid-cols-2 items-center">
          <Image
            src={about}
            alt="Safetrix security illustration"
            className="w-[500px] ml-16"
          />
          <div className="flex flex-col gap-6">
            <h2 className="text-[30px] font-[600]">
              Empowering Startups with Cyber Resilience
            </h2>
            <p className="text-[#E0E0E0] text-[15px] leading-relaxed">
              SAFETRIX is an Algerian cybersecurity startup dedicated to
              protecting local businesses, especially startups, against evolving
              digital threats. We deliver AI-powered threat detection, localized
              bug bounty programs, vulnerability management, and rapid incident
              response — all tailored to the unique challenges of the Algerian
              digital landscape.
            </p>
            <ul className="text-[#E0E0E0] text-sm md:text-base grid grid-cols-1 sm:grid-cols-2 bg-[#16291F] gap-4 rounded-[16px] p-4 md:p-6">
              {/* Column 1 */}
              <div className="flex flex-col gap-3">
                <li className="flex items-start gap-3">
                  <span className="text-[#0ACF83] font-semibold">✓</span>
                  <span className="text-[15px]">
                    AI-driven threat detection
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#0ACF83] font-semibold">✓</span>
                  <span className="text-[15px]">
                    Localized vulnerability assessment
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#0ACF83] font-semibold">✓</span>
                  <span className="text-[15px]">
                    Ethical hacking bug bounty platform
                  </span>
                </li>
              </div>
              {/* Column 2 */}
              <div className="flex flex-col gap-3">
                <li className="flex items-start gap-3">
                  <span className="text-[#0ACF83] font-semibold">✓</span>
                  <span className="text-[15px]">
                    Rapid incident response & recovery
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#0ACF83] font-semibold">✓</span>
                  <span className="text-[15px]">Team Security Coaching</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#0ACF83] font-semibold">✓</span>
                  <span className="text-[15px]">North Africa Shield</span>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
