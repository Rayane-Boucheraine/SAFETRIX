"use client";

import Image from "next/image";
import google from "../../../../public/signup/google.svg";

const GoogleAuthButton = () => {
  const handleGoogleAuth = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/user/google/auth`;
    window.location.href = url;
  };

  return (
    <button
      onClick={handleGoogleAuth}
      
      className="flex items-center gap-5 justify-center w-full py-[8px] rounded-xl shadow-sm border transition duration-300 border-[#E4E7EB] cursor-pointer"
    >
      <Image src={google} alt="google" />
      <span className="whitespace-nowrap text-[14px] font-medium font-[600] text-[#FAFAFA]">
        Continue Avec Google
      </span>
    </button>
  );
};

export default GoogleAuthButton;
