import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

// Configure Poppins font
const poppins = Poppins({
  weight: ["400", "500", "600", "700"], 
  subsets: ["latin"],
  variable: "--font-poppins", 
});

export const metadata: Metadata = {
  title: "SAFETRIX",
  description:
    "Safetrix is an Algerian cybersecurity startup dedicated to providing localized solutions to combat cyber threats. We specialize in threat detection, vulnerability assessment, incident response, and bug bounty programs, tailored to meet the unique needs of Algeria’s digital landscape. By leveraging AI-driven insights, Safetrix empowers organizations to secure their digital transformation and build resilient cyber ecosystems. Our mission is to safeguard Algeria’s digital future and foster a secure, trusted environment for businesses and individuals alike.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>{children}</body>
    </html>
  );
}
