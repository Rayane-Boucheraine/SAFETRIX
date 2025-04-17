import Image from "next/image";
import NavBar from "./NavBar";
import Link from "next/link";
import logo from "../../../public/Logo.svg"; 
import signup from "../../../public/Landing/signup.svg"; 

const Header = () => {
  return (
    <header className="top-0 z-50 flex items-center justify-between w-full bg-[#101010] backdrop-blur-md px-[5%] py-[22px] ">
      <div className="flex-none w-[90px] ">
        <Link href="/" aria-label="Homepage">
          <div className="transition-transform duration-300 ease-out hover:animate-spin-slow w-[36px]">
            <Image
              src={logo}
              alt="CyberGuard logo"
              className="w-[36px]"
              priority
            />{" "}
          </div>
        </Link>
      </div>

      <div className="flex-grow flex justify-center animate-fade-in animate-duration-500">
        <NavBar />
      </div>

      <div className="flex-none w-[150px] flex justify-end animate-fade-in animate-delay-200 animate-duration-500">
        <Link
          href="/auth"
          className="text-white block bg-[#0ACF83] text-[14px] sm:text-[15px] px-[18px] sm:px-[20px] py-[8px] rounded-[16px] flex items-center gap-3 transition-all duration-300 ease-in-out hover:bg-[#00B371] hover:shadow-lg hover:shadow-[#0ACF83]/30 hover:scale-[1.03] active:scale-95"
        >
          Get Started
          <span className="animate-pulse-slow inline-block">
            <Image src={signup} alt="signup arrow" className="w-[12px]" />
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
