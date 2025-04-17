import Image from "next/image";
import Link from "next/link";
import encrypted from "../../../public/Landing/encrypted.svg";

const Hero = () => {
  return (
    <section
      id="home"
      className="w-[90%] mx-auto flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8 pb-16 md:pb-24 mt-12 min-h-[calc(100vh-80px)]"
    >
      <div className="w-full md:basis-[55%] text-center md:text-left animate-fade-in-up">
        <h1 className="text-[#FAFAFAE5] text-6xl font-[600] leading-tight lg:leading-snug xl:leading-tight mb-6">
          Protect Your Digital World with{" "}
          <span className="text-[#0ACF83] font-[700]">SAFETRIX</span> Security
          Solutions
        </h1>
        <p className="text-[#FAFAFA]/80 text-[17px] leading-relaxed md:leading-loose mb-10 max-w-xl mx-auto md:mx-0">
          Protecting your digital assets should be straightforward. At{" "}
          <span className="text-[#0ACF83] font-[500]">SAFETRIX</span>, we
          provide top-tier, AI-driven cybersecurity solutions from threat
          detection to incident response—making robust security simple and
          accessible for businesses.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 sm:gap-6 mt-8 animate-fade-in-up animation-delay-200">
          <Link
            href="/auth"
            className="text-white bg-[#0ACF83]  text-[15px] px-[28px] py-[8px] rounded-[16px] flex items-center justify-center gap-3 transition-all duration-300 ease-in-out hover:bg-[#00B371] hover:shadow-lg hover:shadow-[#0ACF83]/30 hover:scale-[1.03] active:scale-95 w-full sm:w-auto"
          >
            Get Started
          </Link>
          <Link
            href="#contact"
            className="text-[#E0E0E0] border border-[#E0E0E0]/50 text-[15px] px-[28px] py-[8px] rounded-[16px] flex items-center justify-center gap-3 transition-all duration-300 ease-in-out hover:bg-white/10 hover:border-white/80 hover:scale-[1.03] active:scale-95 w-full sm:w-auto"
          >
            Contact Us
          </Link>
        </div>
      </div>
      <div
        className="absolute top-[30%] right-[140px] w-[360px] h-[360px] rounded-[50%] bg-gradient-to-r from-[rgba(10,207,131,0.4)] via-[rgba(12,170,109,0.54)] via-[30.98%] to-[rgba(21,24,23,0.48)] blur-[120px]"
      ></div>
      <div className="w-full md:basis-[40%] flex justify-center md:justify-end mt-10 md:mt-0 animate-fade-in animation-delay-400">
        <div className="w-[70%] sm:w-[60%] md:w-full max-w-md lg:max-w-lg animate-pulse-slow">
          <Image
            src={encrypted}
            alt="Abstract representation of data encryption and security"
            width={500}
            height={500}
            layout="responsive"
            priority
            className="!w-[500px]"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
