// src/app/verify-email/page.tsx  (Example file path)
"use client";

import { Suspense, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"; // More specific type for router if needed
import type { ReadonlyURLSearchParams } from "next/navigation";
import BaseUrl from "@/components/BaseUrl"; // Assuming BaseUrl is configured (e.g., Axios instance)
import toast from "react-hot-toast";
import Loading from "@/components/Loading";
import type { AxiosError, AxiosResponse } from "axios"; // Import Axios types if BaseUrl is Axios

// Define expected response structure for better type safety
interface VerifyEmailResponse {
  status: number;
  message?: string;
  // Add other expected properties if any
}

// Define structure for expected error response data
interface ErrorResponseData {
  message?: string;
  // Add other potential error properties
}

function EmailVerificationContent(): null {
  // Explicitly stating it returns null
  const router: AppRouterInstance = useRouter();
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const token: string | null = searchParams.get("token");
  const isVerifying = useRef<boolean>(false); // Type the ref's content

  useEffect(() => {
    if (!token) {
      toast.error("Lien de vérification invalide");
      // Use replace instead of push to prevent adding invalid state to history
      router.replace("/signup");
      return;
    }

    const verifyEmail = async (): Promise<void> => {
      // Add async return type
      // Prevent double verification attempts
      if (isVerifying.current) {
        console.log("Verification already in progress, skipping.");
        return;
      }
      isVerifying.current = true;
      console.log(`Verifying email with token: ${token}`); // Added log

      try {
        // Assume BaseUrl.post returns AxiosResponse<VerifyEmailResponse>
        // Adjust TData (VerifyEmailResponse) and TRequestData ({ token: string }) as needed based on BaseUrl definition
        const response: AxiosResponse<VerifyEmailResponse> =
          await BaseUrl.post<VerifyEmailResponse>(
            "/auth/user/email/verify",
            { token } // Request payload type inferred or explicitly set: { token: string }
          );

        console.log("Verification API response:", response); // Added log

        // Check specifically for success status (201CREATED often means resource created)
        if (response.status === 201 || response.status === 200) {
          // Also allow 200 OK
          toast.success(response.data.message || "Email vérifié avec succès !");
          router.push("/signup/set-profile");
        } else {
          // Handle non-2xx success statuses that aren't errors per se but might indicate unexpected flow
          toast.error(
            response.data.message ||
              `Échec de la vérification (Status: ${response.status})`
          );
          router.replace("/signup"); // Use replace here too
        }
      } catch (error: unknown) {
        // Catch unknown type first
        console.error("Verification API error:", error); // Added log

        let errorMessage = "Une erreur est survenue lors de la vérification";

        // Type guard for AxiosError with a potential response structure
        const axiosError = error as AxiosError<ErrorResponseData>;
        if (axiosError.isAxiosError && axiosError.response) {
          errorMessage =
            axiosError.response.data?.message ||
            axiosError.message ||
            errorMessage;
          console.error("API Error details:", axiosError.response.data);
        } else if (error instanceof Error) {
          // Handle generic JS errors
          errorMessage = error.message;
        }
        // Fallback already assigned

        toast.error(errorMessage);
        router.replace("/signup"); // Use replace here too
      } finally {
        isVerifying.current = false;
        console.log("Verification process finished."); // Added log
      }
    };

    verifyEmail();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, router]); // Keep dependencies, router identity should be stable

  // This component renders nothing itself, it only triggers side effects
  return null;
}

export default function EmailVerificationPage() {
  // Return type is JSX.Element
  return (
    <Suspense fallback={<Loading />}>
      <EmailVerificationContent />
    </Suspense>
  );
}

// Keep this if you need the page to be dynamically rendered on every request
// Useful if the verification logic must always run server-side or avoid caching
export const dynamic = "force-dynamic";
