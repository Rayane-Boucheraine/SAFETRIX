"use client";

import React, { useEffect } from "react"; 
import Header from "@/components/Landing/Header";
import Footer from "@/components/Landing/Footer";
import Link from "next/link";

const TargetIcon = () => (
   <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    {" "}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />{" "}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 12c0 4.142-3.358 7.5-7.5 7.5s-7.5-3.358-7.5-7.5 3.358-7.5 7.5-7.5 7.5 3.358 7.5 7.5z"
    />{" "}
  </svg>
);
const ReportIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    {" "}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />{" "}
  </svg>
);
const RewardIcon = () => (
   <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    {" "}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 11.25v8.25a2.25 2.25 0 01-2.25 2.25H5.25a2.25 2.25 0 01-2.25-2.25v-8.25M12 4.875A3.375 3.375 0 006.375 8.25v1.875c0 1.11.254 2.156.71 3.125M12 4.875A3.375 3.375 0 0117.625 8.25v1.875c0 1.11-.254 2.156-.71 3.125M12 4.875v-.625a3.375 3.375 0 116.75 0v.625m-6.75 0H9.188c-.475 0-.93.086-1.364.249m-1.364-.249a3.375 3.375 0 00-3.296 3.177M14.812 11.25h.375c.475 0 .93-.086 1.364-.249m1.364.249a3.375 3.375 0 003.296-3.177"
    />{" "}
  </svg>
);
const CheckIcon = () => (
   <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-emerald-400 mr-2 flex-shrink-0"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    {" "}
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />{" "}
  </svg>
);
const CrossIcon = () => (
   <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-red-400 mr-2 flex-shrink-0"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    {" "}
    <path
      fillRule="evenodd"
      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
      clipRule="evenodd"
    />{" "}
  </svg>
);
const InfoIcon = () => (
   <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-blue-400 mr-2 flex-shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    {" "}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />{" "}
  </svg>
);
const LegalIcon = () => (
   <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-gray-400 mr-2 flex-shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    {" "}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />{" "}
  </svg>
);
const TrophyIcon = () => (
   <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-yellow-400 mr-2 flex-shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    {" "}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
    />{" "}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
    />{" "}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13 21v-5.566A6.98 6.98 0 0016.96 10l.38-.857a6 6 0 00-6.68 0l.38.857A6.98 6.98 0 0011 15.434V21m2 0h-4"
    />{" "}
  </svg>
);

const reportLink = "/auth/signup/hacker";
const fullPolicyLink = "/bug-bounty-policy";

const BugBountyPage: React.FC = () => {
  useEffect(() => {
  }, []);

  return (
    <div className="bg-[#101010] text-white min-h-screen flex flex-col overflow-x-hidden antialiased">
      <Header />
      <main className="flex-grow bg-gradient-to-b from-[rgba(10,207,131,0.06)] via-[rgba(7,7,7,0.20)] to-[#101010]">
        <section className="pt-20 pb-16 md:pt-22 text-center relative overflow-hidden">
          <div
            className="absolute -top-20 left-0 w-full h-[500px] z-[-1] opacity-15"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(10, 207, 131, 0.3) 0%, transparent 60%)",
              filter: "blur(100px)",
            }}
          ></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up animation-duration-700">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl tracking-tight">
              SAFETRIX Bug Bounty Program
            </h1>
            <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in-up animation-delay-200 animation-duration-700">
              Help us enhance our security posture. Report vulnerabilities and
              get rewarded for making SAFETRIX safer for everyone. Your
              expertise is invaluable.
            </p>
            <div className="mt-10 transform transition duration-500 ease-out hover:scale-105 animate-fade-in-up animation-delay-400 animation-duration-700">
              <Link
                href={reportLink}
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-gray-900 bg-[#0ACF83] hover:bg-[#00b371] focus:outline-none focus:ring-4 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl hover:shadow-emerald-800/50"
              >
                Report a Vulnerability
              </Link>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20 md:space-y-28">
          <section
            id="introduction"
            className="animate-fade-in-up animation-duration-500"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Our Commitment to Security
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-4 transition-opacity duration-500 hover:text-gray-200">
              At SAFETRIX, securing our systems and protecting customer data is
              paramount. We recognize the critical role the security research
              community plays in achieving this goal. Our Bug Bounty Program
              provides a formal channel for researchers to report potential
              security vulnerabilities responsibly.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed transition-opacity duration-500 hover:text-gray-200">
              We are committed to working collaboratively with the community to
              validate, triage, and remediate reported issues promptly. We
              believe that transparency and partnership are key to maintaining a
              robust security posture in an ever-evolving threat landscape.
            </p>
          </section>

          <section
            id="how-it-works"
            className="animate-fade-in-up animation-duration-500 animation-delay-100"
          >
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              Program Workflow
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 text-center">
              {/* Updated Step Cards */}
              <div className="group flex flex-col items-center p-6 md:p-8 border border-gray-700/50 rounded-xl bg-gray-900/30 transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-gray-800/50 hover:border-emerald-600/70 hover:shadow-2xl hover:shadow-emerald-900/40 animate-fade-in-up animation-duration-500 animation-delay-200">
                <div className="p-4 rounded-full bg-gradient-to-br from-emerald-700/50 to-emerald-900/50 text-[#0ACF83] mb-6 ring-2 ring-emerald-600/30 transition-all duration-300 group-hover:ring-emerald-500/60 group-hover:scale-110">
                  <TargetIcon />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  1. Discover
                </h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  Review scope/rules. Find a unique, impactful vulnerability in
                  an eligible asset.
                </p>
              </div>
              <div className="group flex flex-col items-center p-6 md:p-8 border border-gray-700/50 rounded-xl bg-gray-900/30 transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-gray-800/50 hover:border-emerald-600/70 hover:shadow-2xl hover:shadow-emerald-900/40 animate-fade-in-up animation-duration-500 animation-delay-400">
                <div className="p-4 rounded-full bg-gradient-to-br from-emerald-700/50 to-emerald-900/50 text-[#0ACF83] mb-6 ring-2 ring-emerald-600/30 transition-all duration-300 group-hover:ring-emerald-500/60 group-hover:scale-110">
                  <ReportIcon />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  2. Report Responsibly
                </h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  Submit a detailed, high-quality report via our platform with
                  clear PoC & impact analysis.
                </p>
              </div>
              <div className="group flex flex-col items-center p-6 md:p-8 border border-gray-700/50 rounded-xl bg-gray-900/30 transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-gray-800/50 hover:border-emerald-600/70 hover:shadow-2xl hover:shadow-emerald-900/40 animate-fade-in-up animation-duration-500 animation-delay-600">
                <div className="p-4 rounded-full bg-gradient-to-br from-emerald-700/50 to-emerald-900/50 text-[#0ACF83] mb-6 ring-2 ring-emerald-600/30 transition-all duration-300 group-hover:ring-emerald-500/60 group-hover:scale-110">
                  <RewardIcon />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  3. Validate & Reward
                </h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  Our team validates. Qualifying reports receive recognition and
                  rewards based on severity.
                </p>
              </div>
            </div>
          </section>

          <section
            id="scope"
            className="animate-fade-in-up animation-duration-500 animation-delay-200"
          >
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              Scope & Rules of Engagement
            </h2>
            <div className="space-y-12">
              <div className="relative p-8 md:p-10 border-2 border-emerald-500/50 rounded-2xl bg-gradient-to-tr from-emerald-900/30 via-[#101c18] to-[#0a100e] shadow-xl shadow-emerald-950/40 transition-all duration-300 hover:shadow-2xl hover:border-emerald-400/80 hover:scale-[1.01]">
                <h3 className="text-2xl font-semibold text-emerald-300 mb-6 flex items-center">
                  <span className="mr-3 p-2 rounded-full bg-emerald-500/20 ring-1 ring-emerald-500/40">
                    <CheckIcon />
                  </span>
                  Eligible Targets (In Scope)
                </h3>
                <ul className="space-y-3 text-gray-300 list-none pl-0">
                  <li className="flex items-center border-b border-emerald-900/50 pb-2">
                    <strong className="w-40 flex-shrink-0 font-medium text-gray-200">
                      Web App:
                    </strong>{" "}
                    `app.safetrix.com` (User auth, core features)
                  </li>
                  <li className="flex items-center border-b border-emerald-900/50 pb-2">
                    <strong className="w-40 flex-shrink-0 font-medium text-gray-200">
                      Marketing Site:
                    </strong>{" "}
                    `www.safetrix.com` (Info disclosure, sensitive paths)
                  </li>
                  <li className="flex items-center border-b border-emerald-900/50 pb-2">
                    <strong className="w-40 flex-shrink-0 font-medium text-gray-200">
                      API:
                    </strong>{" "}
                    `api.safetrix.com/v1/` (AuthN/Z, core data)
                  </li>
                  <li className="flex items-center border-b border-emerald-900/50 pb-2">
                    <strong className="w-40 flex-shrink-0 font-medium text-gray-200">
                      iOS App:
                    </strong>{" "}
                    `SAFETRIX Security` (Latest release)
                  </li>
                  <li className="flex items-center">
                    <strong className="w-40 flex-shrink-0 font-medium text-gray-200">
                      Android App:
                    </strong>{" "}
                    `SAFETRIX Security` (Latest release)
                  </li>
                </ul>
                <p className="text-sm text-emerald-300 mt-6 italic">
                  Focus on impactful vulnerabilities (e.g., OWASP Top 10, logic
                  flaws) directly affecting these specified assets.
                </p>
              </div>

              <div className="relative p-8 md:p-10 border border-red-500/50 rounded-2xl bg-gradient-to-tr from-red-900/30 via-[#1a1111] to-[#100a0a] shadow-xl shadow-red-950/40 transition-all duration-300 hover:shadow-2xl hover:border-red-400/80 hover:scale-[1.01]">
                <h3 className="text-2xl font-semibold text-red-300 mb-6 flex items-center">
                  <span className="mr-3 p-2 rounded-full bg-red-500/20 ring-1 ring-red-500/40">
                    <CrossIcon />
                  </span>
                  Exclusions & Prohibited Actions
                </h3>
                <ul className="space-y-3 text-gray-300 columns-1 md:columns-2 gap-x-8 list-none pl-0">
                  <li className="break-inside-avoid mb-2 flex items-start">
                    <CrossIcon /> Denial of Service (DoS/DDoS).
                  </li>
                  <li className="break-inside-avoid mb-2 flex items-start">
                    <CrossIcon /> Social Engineering (Phishing, Vishing).
                  </li>
                  <li className="break-inside-avoid mb-2 flex items-start">
                    <CrossIcon /> Physical Access Attacks.
                  </li>
                  <li className="break-inside-avoid mb-2 flex items-start">
                    <CrossIcon /> 3rd Party Service Vulnerabilities.
                  </li>
                  <li className="break-inside-avoid mb-2 flex items-start">
                    <CrossIcon /> Missing HTTP Headers (No Impact).
                  </li>
                  <li className="break-inside-avoid mb-2 flex items-start">
                    <CrossIcon /> Rate Limiting/Brute Force Issues.
                  </li>
                  <li className="break-inside-avoid mb-2 flex items-start">
                    <CrossIcon /> Automated Scan Output (Unverified).
                  </li>
                  <li className="break-inside-avoid mb-2 flex items-start">
                    <CrossIcon /> Publicly Known/Recently Patched Vulns.
                  </li>
                  <li className="break-inside-avoid mb-2 flex items-start">
                    <CrossIcon /> Non-Production Environments.
                  </li>
                  <li className="break-inside-avoid mb-2 flex items-start">
                    <CrossIcon /> Non-Impactful Content Spoofing.
                  </li>
                </ul>
                <p className="text-sm text-red-300 mt-6 italic">
                  Do not engage in activities that disrupt service or compromise
                  non-target data. Violations may lead to disqualification.
                </p>
              </div>
            </div>
            <div className="mt-12 text-center text-gray-400 hover:text-emerald-300 transition duration-300 animate-fade-in-up animation-delay-600">
              <p>
                Adherence is mandatory. Read our full{" "}
                <Link
                  href={fullPolicyLink}
                  className="font-medium underline underline-offset-4 decoration-dashed hover:decoration-solid"
                >
                  Responsible Disclosure Policy
                </Link>{" "}
                for details.
              </p>
            </div>
          </section>

          <section
            id="guidelines"
            className="animate-fade-in-up animation-duration-500 animation-delay-300 p-8 md:p-10 border border-blue-500/50 rounded-2xl bg-gradient-to-br from-blue-900/30 via-[#10141f] to-[#0a0d13] transition-all duration-300 hover:shadow-xl hover:shadow-blue-950/40 hover:border-blue-400/80 hover:scale-[1.01]"
          >
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
              <InfoIcon />
              <span className="ml-3">Effective Reporting Guidelines</span>
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6 transition-opacity duration-500 hover:text-gray-200">
              Maximize your report&apos;s impact and potential reward by
              providing clear, concise, and actionable information:
            </p>
            <ul className="space-y-4 text-gray-300 list-none pl-0">
              <li className="pl-8 relative before:content-['✓'] before:absolute before:left-0 before:top-1 before:font-bold before:text-blue-400">
                <strong>Clear Title:</strong> Concisely summarize the
                vulnerability type and location.
              </li>
              <li className="pl-8 relative before:content-['✓'] before:absolute before:left-0 before:top-1 before:font-bold before:text-blue-400">
                <strong>Detailed Steps (PoC):</strong> Provide exact, verifiable
                steps to reproduce the issue consistently. Screenshots/videos
                are highly encouraged.
              </li>
              <li className="pl-8 relative before:content-['✓'] before:absolute before:left-0 before:top-1 before:font-bold before:text-blue-400">
                <strong>Impact Assessment:</strong> Explain the potential
                business or security impact if the vulnerability were exploited.
              </li>
              <li className="pl-8 relative before:content-['✓'] before:absolute before:left-0 before:top-1 before:font-bold before:text-blue-400">
                <strong>Affected Component:</strong> Specify the exact URL, API
                endpoint, parameter, or application area.
              </li>
              <li className="pl-8 relative before:content-['✓'] before:absolute before:left-0 before:top-1 before:font-bold before:text-blue-400">
                <strong>One Issue Per Report:</strong> Submit distinct
                vulnerabilities as separate reports for clarity.
              </li>
              <li className="pl-8 relative before:content-['✓'] before:absolute before:left-0 before:top-1 before:font-bold before:text-blue-400">
                <strong>Suggestion (Optional):</strong> If you have remediation
                ideas, feel free to include them.
              </li>
            </ul>
            <p className="text-sm text-blue-300 mt-8 italic">
              Quality reports streamline validation, leading to faster responses
              and potentially higher rewards.
            </p>
          </section>

          <section
            id="rewards"
            className="animate-fade-in-up animation-duration-500 animation-delay-400"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Rewards Framework & Recognition
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6 transition-opacity duration-500 hover:text-gray-200">
              We believe in fairly rewarding the crucial contributions of
              security researchers. Our reward structure considers vulnerability
              severity (impact, exploitability using CVSS as a guide), asset
              criticality, and the quality of the report.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 text-center">
              <div className="p-5 border border-red-500/60 rounded-xl bg-red-900/25 transform transition duration-300 ease-out hover:scale-105 hover:bg-red-900/40 hover:shadow-lg hover:shadow-red-800/30">
                <h4 className="font-bold text-red-300 text-lg mb-1">
                  Critical
                </h4>{" "}
                <p className="text-xs text-gray-400 mb-2">RCE, SQLi, etc.</p>{" "}
                <p className="font-semibold text-white text-xl mt-2">$3,000+</p>{" "}
              </div>
              <div className="p-5 border border-orange-500/60 rounded-xl bg-orange-900/25 transform transition duration-300 ease-out hover:scale-105 hover:bg-orange-900/40 hover:shadow-lg hover:shadow-orange-800/30">
                <h4 className="font-bold text-orange-300 text-lg mb-1">High</h4>{" "}
                <p className="text-xs text-gray-400 mb-2">
                  Stored XSS, Auth Bypass, etc.
                </p>{" "}
                <p className="font-semibold text-white text-xl mt-2">
                  $1,000 - $2,999
                </p>{" "}
              </div>
              <div className="p-5 border border-yellow-500/60 rounded-xl bg-yellow-900/25 transform transition duration-300 ease-out hover:scale-105 hover:bg-yellow-900/40 hover:shadow-lg hover:shadow-yellow-800/30">
                <h4 className="font-bold text-yellow-300 text-lg mb-1">
                  Medium
                </h4>{" "}
                <p className="text-xs text-gray-400 mb-2">
                  Reflected XSS, CSRF, Info Disc, etc.
                </p>{" "}
                <p className="font-semibold text-white text-xl mt-2">
                  $300 - $999
                </p>{" "}
              </div>
              <div className="p-5 border border-blue-500/60 rounded-xl bg-blue-900/25 transform transition duration-300 ease-out hover:scale-105 hover:bg-blue-900/40 hover:shadow-lg hover:shadow-blue-800/30">
                <h4 className="font-bold text-blue-300 text-lg mb-1">Low</h4>{" "}
                <p className="text-xs text-gray-400 mb-2">
                  Minor Config Issues, Self-XSS, etc.
                </p>{" "}
                <p className="font-semibold text-white text-xl mt-2">
                  $50 - $299 / Swag
                </p>{" "}
              </div>
            </div>
            <p className="text-base text-gray-400 italic mb-6 text-center">
              Amounts are indicative; final rewards decided case-by-case by the
              SAFETRIX security team.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed transition-opacity duration-500 hover:text-gray-200">
              <strong>A Note for Startups & Early Stage Companies:</strong>{" "}
              While SAFETRIX offers competitive bounties, reward structures at
              startups often evolve. Early contributions might involve lower
              initial monetary rewards, swag, or public acknowledgment, but are
              immensely valuable and deeply appreciated as the company grows.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mt-4 transition-opacity duration-500 hover:text-gray-200">
              Exceptional reports and consistent, high-impact contributors may
              be eligible for bonus rewards, exclusive SAFETRIX swag, and
              recognition in our Security Hall of Fame (with permission).
            </p>
          </section>

          <section
            id="legal"
            className="animate-fade-in-up animation-duration-500 animation-delay-500 p-8 md:p-10 border border-gray-600/50 rounded-2xl bg-gray-800/20 transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/30 hover:border-gray-500/80 hover:scale-[1.01]"
          >
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
              <LegalIcon />
              <span className="ml-3">Safe Harbor & Legal Considerations</span>
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-4 transition-opacity duration-500 hover:text-gray-200">
              SAFETRIX provides safe harbor for security research conducted
              according to this policy. We consider research compliant with this
              policy to be authorized and will not pursue legal action for
              accidental, good-faith violations. We waive any claims under DMCA
              for activities solely related to this research.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed transition-opacity duration-500 hover:text-gray-200">
              However, compliance with all applicable laws is required. Actions
              disrupting service, accessing/modifying/destroying data not
              belonging to you, or intentionally harming SAFETRIX or its users
              fall outside this safe harbor. Full terms are in our detailed{" "}
              <Link
                href={fullPolicyLink}
                className="text-emerald-400 hover:underline"
              >
                Responsible Disclosure Policy
              </Link>
              .
            </p>
          </section>

          <section
            id="hall-of-fame"
            className="animate-fade-in-up animation-duration-500 animation-delay-600 text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center justify-center">
              <TrophyIcon />
              <span className="ml-2">Researcher Hall of Fame</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8 transition-opacity duration-500 hover:text-gray-200">
              We deeply appreciate the security community&apos;s efforts. Our
              Hall of Fame recognizes researchers (with consent) who have made
              significant contributions to SAFETRIX security.
            </p>
            <div className="p-8 border border-dashed border-yellow-600/50 rounded-xl bg-yellow-900/10 text-yellow-300/80 transform transition duration-300 hover:scale-105 hover:border-yellow-500/80 hover:bg-yellow-900/20">
              <p className="font-semibold">Recognition Coming Soon!</p>
              <p className="text-sm mt-2">
                We&apos;re preparing our first list of acknowledgements. Thank
                you for your patience!
              </p>
            </div>
          </section>

          <section
            id="reporting-cta"
            className="text-center border-t border-gray-700/50 pt-16 md:pt-20 animate-fade-in-up animation-duration-500 animation-delay-700"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Make an Impact?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 transition-opacity duration-500 hover:text-gray-200">
              Your findings help protect our users and improve our platform.
              Submit your report securely and become part of the SAFETRIX
              security journey.
            </p>
            <div className="transform transition duration-500 ease-out hover:scale-105">
              <Link
                href={reportLink}
                className="inline-flex items-center justify-center px-10 py-4 border border-transparent text-lg font-medium rounded-lg text-gray-900 bg-[#0ACF83] hover:bg-[#00b371] focus:outline-none focus:ring-4 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] transition-all duration-300 ease-in-out shadow-xl hover:shadow-2xl hover:shadow-emerald-800/50"
              >
                Submit Your Secure Report
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BugBountyPage;