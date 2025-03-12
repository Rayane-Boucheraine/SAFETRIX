import Image from "next/image";
import encrypted from "../../../public/Landing/encrypted.svg";

const Hero = () => {
  return (
    <div className="w-[90%] mx-auto flex items-center justify-between pt-[120px]">
      <div className="basis-[56%]">
        <h1 className="text-[#FAFAFAE5] text-[100px] font-[600] leading-[80px]">
          <div className="flex items-center gap-4">
            <span>Secured</span>
            <Image src={encrypted} alt="encrypted" className="w-[110px]" />
          </div>
          <span>Easy Servers</span>
        </h1>
        <div className="flex items-center gap-3 mt-16">
          <div className="w-[60px] h-[1px] bg-[#FAFAFA] rounded-[20px] mt-[3px]"></div>
          <span className="text-[#FAFAFA] text-[15px]">
            Designed for Server Protection
          </span>
        </div>
      </div>
      <div className="basis-[40%] flex flex-col gap-16">
        <p className="text-[#FAFAFA] text-[16px] leading-[28px] mt-6">
          Protecting your digital assets should be straightforward. <br /> At
          <span className="text-[#0ACF83] font-[500]"> SAFETRIX</span>, we
          provide top-tier, AI-driven cybersecurity solution <br /> from threat
          detection to incident response—making robust <br /> security simple
          and accessible for businesses across Algeria.
        </p>
        <div className="flex items-center gap-16">
          <div className="flex flex-col leading-[36px]">
            <span className="text-[#FAFAFAE5] text-[46px]">4.9 L</span>
            <span className="text-[#FAFAFA80] text-[14px] font-[400]">
              Active Users
            </span>
          </div>
          <div className="flex flex-col leading-[36px]">
            <span className="text-[#FAFAFAE5] text-[46px]">20k+</span>
            <span className="text-[#FAFAFA80] text-[14px]">
              Protected Servers
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
