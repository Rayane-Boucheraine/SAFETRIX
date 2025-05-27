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
import { Eye, EyeSlash } from "phosphor-react";
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
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-])[A-Za-z\d!@#$%^&*(),.?":{}|<>_\-]{8,}$/;
    if (!strongPasswordRegex.test(password)) {
      setPasswordError(
        "8+ caractères, majuscule, minuscule, chiffre et symbole"
      );
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
    <div className="bg-[radial-gradient(70.07%_69.22%_at_50%_50%,#2A0D45_6.63%,#080808_100%)] w-full min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl lg:w-[62.8%] flex flex-col rounded-[16px] border border-white/40 bg-[rgba(74,20,120,0.05)] shadow-[0px_4px_30px_0px_rgba(255,255,255,0.20)] overflow-hidden h-auto max-h-[90vh] md:max-h-[700px] md:h-auto">
        <div className="w-full bg-[#2A0D45] bg-opacity-90 backdrop-blur-sm flex flex-col items-center p-6 sm:p-8 md:p-10 overflow-y-auto">
          <div className="w-full max-w-[500px] flex flex-col justify-center">
            {/* Logo and back button */}
            <div className="flex flex-col items-center mb-6">
              <Image src={logo} alt="logo" className="w-[50px] mb-4" />
            </div>

            <div className="mb-6">
              <h1 className="text-2xl sm:text-[26px] font-bold text-white mb-1 text-center">
                Réinitialisation du mot de passe
              </h1>
              <p className="text-gray-300 text-sm text-center">
                Créez un nouveau mot de passe fort pour sécuriser votre compte.
              </p>
              <p className="text-gray-400 text-xs mt-2 text-center">
                Le mot de passe doit contenir au moins 8 caractères, une
                majuscule, une minuscule, un chiffre et un symbole (!@#$%^&*).
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* New password field */}
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-xs font-medium text-gray-300 mb-1"
                >
                  Nouveau mot de passe
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Image
                      src={lock}
                      alt="icône mot de passe"
                      width={16}
                      height={16}
                    />
                  </div>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    id="newPassword"
                    placeholder="Entrez votre nouveau mot de passe"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      validatePassword(e.target.value);
                    }}
                    className="w-full text-sm bg-black/30 border border-white/20 rounded-lg pl-9 pr-10 py-[8px] text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500 disabled:opacity-50 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-purple-400"
                  >
                    {showNewPassword ? (
                      <EyeSlash size={18} weight="regular" />
                    ) : (
                      <Eye size={18} weight="regular" />
                    )}
                  </button>
                </div>
                {passwordError && (
                  <p className="mt-1 text-xs text-red-400">{passwordError}</p>
                )}
                {!passwordError && newPassword && (
                  <p className="mt-1 text-xs text-green-400">
                    Mot de passe valide
                  </p>
                )}
              </div>

              {/* Confirm password field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-xs font-medium text-gray-300 mb-1"
                >
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Image
                      src={lock}
                      alt="icône mot de passe"
                      width={16}
                      height={16}
                    />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    placeholder="Confirmez votre nouveau mot de passe"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      validateConfirmPassword(e.target.value);
                    }}
                    className="w-full text-sm bg-black/30 border border-white/20 rounded-lg pl-9 pr-10 py-[8px] text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500 disabled:opacity-50 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-purple-400"
                  >
                    {showConfirmPassword ? (
                      <EyeSlash size={18} weight="regular" />
                    ) : (
                      <Eye size={18} weight="regular" />
                    )}
                  </button>
                </div>
                {confirmPasswordError && (
                  <p className="mt-1 text-xs text-red-400">
                    {confirmPasswordError}
                  </p>
                )}
                {!confirmPasswordError &&
                  confirmPassword &&
                  newPassword === confirmPassword && (
                    <p className="mt-1 text-xs text-green-400">
                      Les mots de passe correspondent
                    </p>
                  )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full cursor-pointer bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors mt-6"
              >
                Réinitialiser le mot de passe
              </button>
            </form>
          </div>
        </div>
      </div>
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
