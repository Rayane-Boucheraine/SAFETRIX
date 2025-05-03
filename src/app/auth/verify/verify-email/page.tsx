"use client";

import { Suspense, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type { ReadonlyURLSearchParams } from "next/navigation";
import BaseUrl from "@/components/BaseUrl";
import toast from "react-hot-toast";
import Loading from "@/components/Loading";
import type { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";

interface VerifyEmailResponse {
  status: number;
  message?: string;
}

interface ErrorResponseData {
  message?: string;
}

interface UserData {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

const USER_DATA_QUERY_KEY = ["userData"];

const fetchUserData = async (): Promise<UserData> => {
  const response = await BaseUrl.get("/user/me");
  if (!response.data || !response.data.data) {
    throw new Error("Failed to fetch user data or data format is incorrect.");
  }
  return response.data.data
};

function EmailVerificationContent(): null {
  const router: AppRouterInstance = useRouter();
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const token: string | null = searchParams.get("token");
  const isVerifying = useRef<boolean>(false);
  const verificationProcessed = useRef<boolean>(false); // Prevent re-processing after verification

  const {
    data: userData,
    refetch,
    isSuccess: isUserDataSuccess,
  } = useQuery<UserData>({
    queryKey: USER_DATA_QUERY_KEY,
    queryFn: fetchUserData,
    enabled: false, // Only fetch manually via refetch
    retry: false, // Don't retry fetching user data if it fails initially here
  });

  // Effect 1: Trigger verification API call based on token
  useEffect(() => {
    if (!token || isVerifying.current || verificationProcessed.current) {
      if (!token && !verificationProcessed.current) {
        toast.error("Lien de vérification invalide ou manquant.");
        router.replace("/auth");
      }
      return;
    }

    const verifyEmail = async (): Promise<void> => {
      isVerifying.current = true;
      const verificationToastId = toast.loading("Vérification de l'email...");

      try {
        const response: AxiosResponse<VerifyEmailResponse> =
          await BaseUrl.post<VerifyEmailResponse>("/auth/user/email/verify", {
            token,
          });

        if (response.status === 200 || response.status === 201) {
          toast.success(
            response.data.message || "Email vérifié avec succès !",
            {
              id: verificationToastId,
            }
          );
          verificationProcessed.current = true; // Mark verification as done
          // Trigger user data fetch, the redirect logic is in the next effect
          refetch();
        } else {
          // Should be caught by Axios error handling, but included for completeness
          throw new Error(
            response.data.message || `Échec: Status ${response.status}`
          );
        }
      } catch (error: unknown) {
        toast.dismiss(verificationToastId);
        let errorMessage = "Une erreur est survenue lors de la vérification";

        const axiosError = error as AxiosError<ErrorResponseData>;
        if (axiosError.isAxiosError && axiosError.response) {
          errorMessage =
            axiosError.response.data?.message ||
            `Erreur ${axiosError.response.status}: ${axiosError.message}` ||
            errorMessage;
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }

        toast.error(errorMessage);
        verificationProcessed.current = true; // Also mark as processed on error
        router.replace("/auth");
      } finally {
        // Release the lock slightly later to avoid race conditions on fast clicks/mounts
        setTimeout(() => {
          isVerifying.current = false;
        }, 100);
      }
    };

    verifyEmail();
  }, [token, router, refetch]);

  // Effect 2: React to fetched user data *after* successful verification and refetch
  useEffect(() => {
    // Only proceed if verification was processed, user data fetch succeeded, and we have data
    if (verificationProcessed.current && isUserDataSuccess && userData) {
      const userRole = userData.role;

      if (userRole === "hacker") {
        router.push("/auth/set-profile/hacker");
      } else if (userRole === "startup") {
        router.push("/auth/set-profile/startup"); 
      } else {
        console.warn("User role not recognized after verification:", userRole);
        router.push("/dashboard"); // Default redirect for unknown/missing roles
      }
    }
    // Intentionally only reacting to userData changes after verification process finished
  }, [userData, isUserDataSuccess, router]); // Add isUserDataSuccess as dependency

  return null;
}

export default function EmailVerificationPage() {
  return (
    <Suspense fallback={<Loading />}>
      <EmailVerificationContent />
    </Suspense>
  );
}

export const dynamic = "force-dynamic";
