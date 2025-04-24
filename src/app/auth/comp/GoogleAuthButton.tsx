"use client";

import Image from "next/image";
import google from "../../../../public/signup/google.svg";
import React from "react"; // Import React

interface GoogleAuthButtonProps {
  disabled?: boolean;
}

const GoogleAuthButton = ({ disabled = false }: GoogleAuthButtonProps) => {
  const handleGoogleAuth = () => {
    if (disabled) return;
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/user/google/auth`; // Corrected endpoint
    window.location.href = url;
  };

  return (
    <button
      onClick={handleGoogleAuth}
      disabled={disabled}
      className={`flex items-center gap-5 justify-center w-full py-[8px] rounded-xl shadow-sm border transition duration-300 border-[#E4E7EB] ${
        disabled
          ? "opacity-60 cursor-not-allowed bg-gray-700/30" // Styles when disabled
          : "cursor-pointer hover:bg-gray-700/20 active:bg-gray-700/30" // Styles when enabled
      }`}
    >
      <Image src={google} alt="google" width={20} height={20} />{" "}
      {/* Added width/height */}
      <span className="whitespace-nowrap text-[14px] font-medium font-[600] text-[#FAFAFA]">
        Continue Avec Google
      </span>
    </button>
  );
};

export default GoogleAuthButton;
