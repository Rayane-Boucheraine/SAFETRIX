import Image from "next/image";
import NavBar from "./NavBar";
import Link from "next/link";
import logo from "../../../public/Logo.svg";
import signup from "../../../public/Landing/signup.svg";

const Header = () => {
  return (
    <header className="flex items-center justify-between w-[90%] mx-auto py-[24px]">
      <div className="basis-[90px]">
        <Image src={logo} alt="logo" className="w-[36px]" />
      </div>
      <NavBar />
      <div className="basis-[120px]">
        <Link
          href="/signup"
          className="text-[#FFFFFF] bg-[#0ACF83] text-[15px] px-[20px] py-[6px] rounded-[16px] text-[14px] flex items-center gap-3 duration-300 hover:bg-[#00945B]"
        >
          Sign up
          <Image src={signup} alt="signup" className="w-[12px]" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
