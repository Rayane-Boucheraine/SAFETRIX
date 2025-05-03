"use client";

import { Suspense } from "react";
import Image from "next/image";
import logo from "../../../../../public/Logo.svg";
import lock from "../../../../../public/signup/pass.svg";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import BaseUrl from "@/components/BaseUrl";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { CaretLeft, Eye, EyeSlash } from "phosphor-react";
import Link from "next/link";
import Loading from "@/components/Loading";

function PasswordResetContent() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  interface ResetPasswordResponse {
    message: string;
  }
  interface ValidatePasswordProps {
    password: string;
  }

  interface ChangePasswordData {
    token: string;
    password: string;
  }

  interface ValidateConfirmPasswordProps {
    confirmPassword: string;
  }

  const { mutate: changePassword } = useMutation<
    ResetPasswordResponse,
    Error,
    ChangePasswordData
  >({
    mutationFn: (data) =>
      BaseUrl.post("/auth/user/forgot-password/reset", data),
    onSuccess: () => {
      router.push("/auth");
      toast.success("Mot de passe réinitialisé avec succès");
    },
    onError: (error) => {
      const axiosError = error as {
        response?: { data?: { message?: string | string[] } };
      };
      const message = Array.isArray(axiosError.response?.data?.message)
        ? axiosError.response.data.message[0]
        : axiosError.response?.data?.message ||
          "Échec de la réinitialisation du mot de passe";
      toast.error(message);
    },
  });

  const validatePassword = (
    password: ValidatePasswordProps["password"]
  ): void => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!strongPasswordRegex.test(password)) {
      setPasswordError("8+ caractères, majuscule, minuscule et chiffre");
    } else {
      setPasswordError("");
    }
  };

  const validateConfirmPassword = (
    confirmPassword: ValidateConfirmPasswordProps["confirmPassword"]
  ): void => {
    if (confirmPassword !== newPassword) {
      setConfirmPasswordError("Les mots de passe ne correspondent pas");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!token) {
      toast.error("Lien de réinitialisation invalide");
      router.push("/auth");
      return;
    }

    if (passwordError || confirmPasswordError) {
      toast.error("Veuillez corriger les erreurs du mot de passe");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    changePassword({ token, password: newPassword });
  };

  if (!token) return null;

  return (
    <div className="bg-[#FFF] w-full h-full rounded-[16px] flex flex-col items-center justify-center gap-6 max-xl:py-6">
      <Image src={logo} alt="logo" className="w-[140px] mb-6" />

      <div className="flex items-center gap-1 self-start w-[567.09px] mx-auto max-md:pl-3">
        <Link href="/login" className="flex items-center gap-1">
          <CaretLeft size={16} className="text-[#F8589F]" />
          <span className="text-[15px] font-[500] text-[#F8589F]">Retour</span>
        </Link>
      </div>

      <div className="w-[567.09px] mx-auto max-md:w-[90%]">
        <h2 className="text-[#191919] font-[500] text-[20px]">
          Réinitialisation du mot de passe
        </h2>
        <p className="text-[#666666] text-[13px] mt-2">
          Choisissez un mot de passe fort pour sécuriser votre compte.
        </p>
      </div>

      <form
        className="w-[567.09px] flex flex-col items-center gap-6 max-md:w-[90%]"
        onSubmit={handleSubmit}
      >
        <div className="w-full flex flex-col gap-2">
          <label
            htmlFor="newPassword"
            className="text-[#191919] text-[15px] font-medium"
          >
            Nouveau mot de passe
          </label>
          <div className="bg-[#FFF] w-full flex items-center gap-4 px-[16px] py-[14px] rounded-[12px] border border-[#E4E4E4]">
            <Image src={lock} alt="icône mot de passe" />
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              placeholder="Entrez votre nouveau mot de passe"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                validatePassword(e.target.value);
              }}
              className="text-[#6C727580] text-[14px] font-Inter bg-transparent outline-none w-full"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="text-[#666666] hover:text-[#FD2E8A] transition-colors"
            >
              {showNewPassword ? (
                <EyeSlash size={20} className="text-[#B5BEC6]" />
              ) : (
                <Eye size={20} className="text-[#B5BEC6]" />
              )}
            </button>
          </div>
          {passwordError && (
            <p className="text-red-500 text-[12px]">{passwordError}</p>
          )}
        </div>

        <div className="w-full flex flex-col gap-2">
          <label
            htmlFor="confirmPassword"
            className="text-[#191919] text-[15px] font-medium"
          >
            Confirmer le mot de passe
          </label>
          <div className="bg-[#FFF] w-full flex items-center gap-4 px-[16px] py-[14px] rounded-[12px] border border-[#E4E4E4]">
            <Image src={lock} alt="icône mot de passe" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Confirmez votre nouveau mot de passe"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                validateConfirmPassword(e.target.value);
              }}
              className="text-[#6C727580] text-[14px] font-Inter bg-transparent outline-none w-full"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-[#666666] hover:text-[#FD2E8A] transition-colors"
            >
              {showConfirmPassword ? (
                <EyeSlash size={20} className="text-[#B5BEC6]" />
              ) : (
                <Eye size={20} className="text-[#B5BEC6]" />
              )}
            </button>
          </div>
          {confirmPasswordError && (
            <p className="text-red-500 text-[12px]">{confirmPasswordError}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-gradient-to-t from-[#FD2E8A] to-[#F8589F] text-[#FEFEFE] text-[15px] w-full py-[12px] rounded-[12px] font-medium mt-4"
        >
          Réinitialiser le mot de passe
        </button>
      </form>
    </div>
  );
}

export default function PasswordResetPage() {
  return (
    <Suspense fallback={<Loading />}>
      <PasswordResetContent />
    </Suspense>
  );
}

export const dynamic = "force-dynamic";