import Image from "next/image";
import about from "../../../public/Landing/about.svg";

const About = () => {
  return (
    <div className="w-full bg-gradient-to-b from-[rgba(10,207,131,0.06)] via-[rgba(7,7,7,0.20)] to-[#101010] py-[60px]">
      <div className="w-[90%] mx-auto">
        <h2 className="text-3xl md:text-4xl text-center font-bold text-white mb-12">
          About Us
        </h2>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <Image
            src={about}
            alt="Safetrix security illustration"
            className="w-[500px] ml-10"
          />
          <div className="flex flex-col gap-6">
            <h2 className="text-[30px] font-[600]">24/7 Cyber Security Oparation Center</h2>
            <p className="text-[#E0E0E0] text-[15px] leading-relaxed">
              Safetrix is a leading cybersecurity firm dedicated to protecting
              businesses from evolving digital threats. Founded in 2015, we
              combine cutting-edge technology with expert knowledge to deliver
              comprehensive security solutions.
            </p>
            <ul className="text-[#E0E0E0] text-sm md:text-base grid grid-cols-1 sm:grid-cols-2 bg-[#16291F] gap-4 rounded-[16px] p-4 md:p-6">
              {/* Column 1 */}
              <div className="flex flex-col gap-3">
                <li className="flex items-start gap-3">
                  <span className="text-[#0ACF83] font-semibold">✓</span>
                  <span className="text-[15px]">24/7 threat monitoring </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#0ACF83] font-semibold">✓</span>
                  <span className="text-[15px]">Enterprise-grade security</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#0ACF83] font-semibold">✓</span>
                  <span className="text-[15px]">Proactive vulnerability</span>
                </li>
              </div>
              {/* Column 2 */}
              <div className="flex flex-col gap-3">
                <li className="flex items-start gap-3">
                  <span className="text-[#0ACF83] font-semibold">✓</span>
                  <span className="text-[15px]">Incident response & recovery</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#0ACF83] font-semibold">✓</span>
                  <span className="text-[15px]">Security awareness training</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#0ACF83] font-semibold">✓</span>
                  <span className="text-[15px]">Compliance (GDPR, PCI DSS...)</span>
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
