"use client";

import React, { useState, useEffect } from "react";
// Correct imports for App Router
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Edit,
  Settings,
  Bug,
  DollarSign,
  FileText,
  Play,
  Pause,
  Archive,
  Layers,
  Users,
  Globe,
  Lock,
  Loader2,
  AlertTriangle,
  ArrowLeft,
  BarChart,
  ChevronDown,
  ClipboardList, // Renamed from FileText for Overview icon
  Star, // Keep for featured indicator
  Cpu, // For Targets
} from "lucide-react";

// --- Types ---
type ProgramType = "Public" | "Private";
type ProgramStatus = "Active" | "Paused" | "Archived";
interface Program {
  id: string;
  name: string;
  type: ProgramType;
  company: string;
  scope: string;
  rewardRange: string;
  avgReward: number;
  avgResponseTime: number;
  reportsResolved: number;
  pendingReports: number; // Added field
  acceptanceRate: number;
  targets: string[];
  tags: string[]; // Keep if needed for search, can remove from display
  vrt: string;
  lastActivity: string; // Use formatTimeAgo
  status: ProgramStatus;
  activeHackers: number;
  featured?: boolean;
  payoutPolicy?: string;
  accepts?: string[];
  description?: string; // Short description
  policyDetails?: string; // Full markdown/rich text policy
}

// --- Mock Data (Should be fetched from API in real app) ---
const mockPrograms: Program[] = [
  {
    id: "prog-fintech-01",
    name: "FinTech Innovations Core Banking",
    type: "Public",
    company: "FinBank Corp",
    scope:
      "Web Application (core.finbank.com), API (api.finbank.com/v3), Internal Dashboard (Requires Invite)",
    rewardRange: "$100 - $15,000+",
    avgReward: 1250,
    avgResponseTime: 48,
    reportsResolved: 235,
    pendingReports: 15,
    acceptanceRate: 78,
    targets: ["Web App", "API", "Cloud Config", "Source Code Review"],
    tags: ["finance", "owasp-top-10", "pci-dss", "ssr", "critical"],
    vrt: "Financial Services",
    lastActivity: "2023-10-28T10:00:00Z",
    status: "Active",
    activeHackers: 120,
    featured: true,
    payoutPolicy: "CVSS v3.1 Based",
    accepts: ["XSS", "SQLi", "Auth Bypass", "IDOR", "SSRF", "RCE"],
    description:
      "Our core banking platform handles sensitive financial data and transactions. We prioritize security.",
    policyDetails:
      "## Policy Summary\n\n- **Response Targets**: \n  - Triage: < 2 business days\n  - Resolution: Dependent on severity (Critical: < 7 days)\n- **Reward Philosophy**: Impact-based using CVSS v3.1, bonuses possible.\n- **Safe Harbor**: Yes, for good-faith research.\n\n## Out of Scope\n- DoS/DDoS\n- Social Engineering\n- Phishing\n- *.marketing.finbank.com",
  },
  {
    id: "prog-gamer-net",
    name: "GamerConnect Social Platform",
    type: "Public",
    company: "Playco",
    scope: "Mobile App (iOS/Android), Backend API (api.gamerconnect.gg)",
    rewardRange: "$50 - $2,500",
    avgReward: 300,
    avgResponseTime: 72,
    reportsResolved: 152,
    pendingReports: 8,
    acceptanceRate: 65,
    targets: ["Mobile App", "API", "Websocket"],
    tags: ["gaming", "social", "ios", "android", "privacy", "gdpr"],
    vrt: "Social Media & Platforms",
    lastActivity: "2023-10-25T14:00:00Z",
    status: "Active",
    activeHackers: 85,
    payoutPolicy: "Tiered - Severity",
    accepts: ["Data Exposure", "Account Takeover", "Abuse", "Cheating"],
    description:
      "Social platform for gamers. Focus on account security and privacy.",
    policyDetails:
      "## Policy Summary\n\nRewards tiered by severity (Low, Medium, High, Critical). Standard disclosure policy. See full details below.",
  },
  {
    id: "prog-ai-core",
    name: "DataCorp AI Inference Engine",
    type: "Private",
    company: "DataCorp",
    scope: "API (ai.datacorp.io/v2/inference), Model Access (API)",
    rewardRange: "$500 - $25,000",
    avgReward: 4500,
    avgResponseTime: 24,
    reportsResolved: 45,
    pendingReports: 3,
    acceptanceRate: 92,
    targets: ["API", "ML/AI"],
    tags: ["ai", "ml", "api-security", "python", "confidential", "beta"],
    vrt: "AI & Machine Learning",
    lastActivity: "2023-10-29T08:00:00Z",
    status: "Active",
    activeHackers: 35,
    payoutPolicy: "Impact & Novelty",
    accepts: [
      "Model Evasion",
      "Data Poisoning",
      "Prompt Injection",
      "Auth Flaws",
    ],
    description: "Private program focused on our AI/ML model security.",
    policyDetails:
      "## Focus Areas\n- Model manipulation attacks\n- Unauthorized data access via API\n- Infrastructure security\nContact program admin for access details.",
  },
  {
    id: "prog-iot-fw",
    name: "SmartHome Connect Firmware",
    type: "Public",
    company: "HomeSys Inc.",
    scope: "IoT Device Firmware (Model SHC-V3), Control Hub API",
    rewardRange: "$200 - $8,000",
    avgReward: 1500,
    avgResponseTime: 96,
    reportsResolved: 88,
    pendingReports: 0,
    acceptanceRate: 71,
    targets: ["IoT", "Firmware", "API", "Hardware"],
    tags: ["iot", "hardware", "embedded", "mqtt"],
    vrt: "IoT Devices",
    lastActivity: "2023-10-22T11:00:00Z",
    status: "Paused",
    activeHackers: 15,
    payoutPolicy: "CVSS + Device Impact",
    accepts: ["RCE", "Auth Bypass", "Device Tampering"],
    description:
      "Currently paused. Testing involves device firmware and related APIs.",
    policyDetails:
      "**This program is currently paused and not accepting new submissions.**",
  },
  {
    id: "prog-cloudsec-k8s",
    name: "SecureApp Cloud Infra Audit",
    type: "Private",
    company: "SecureApp Ltd.",
    scope: "AWS/GCP Configuration, Kubernetes Cluster (*.secureapp.cloud)",
    rewardRange: "$1,000 - $20,000",
    avgReward: 6000,
    avgResponseTime: 36,
    reportsResolved: 62,
    pendingReports: 6,
    acceptanceRate: 85,
    targets: ["Cloud Config", "Kubernetes", "Infra"],
    tags: [
      "cloud",
      "aws",
      "gcp",
      "k8s",
      "devsecops",
      "terraform",
      "high-impact",
    ],
    vrt: "Cloud Infrastructure",
    lastActivity: "2023-10-29T12:00:00Z",
    status: "Active",
    activeHackers: 45,
    featured: true,
    payoutPolicy: "Severity & Scope",
    accepts: ["Misconfiguration", "IAM Escalation", "Container Escape"],
    description:
      "Private audit focused on cloud infrastructure security (AWS, GCP, K8s).",
    policyDetails:
      "Invite-only. Emphasis on cloud security best practices deviations, privilege escalation paths, and infrastructure-level vulnerabilities.",
  },
];

// --- Fetch Function ---
const fetchProgramDetails = async (id: string): Promise<Program | null> => {
  // Simulate API call
  console.log(`Simulating fetch for program ID: ${id}`);
  await new Promise((res) => setTimeout(res, 300)); // Simulate network latency
  const program = mockPrograms.find((p) => p.id === id);
  console.log("Found program:", program ? program.name : "None");
  return program ? { ...program } : null; // Return a copy or null
};

// --- Style Variables ---
const themeAccentColor = "purple";
const gradientBg =
  "bg-[radial-gradient(70.07%_69.22%_at_50%_50%,#2A0D45_6.63%,#080808_100%)]";
const cardBaseStyle =
  "bg-slate-900/70 backdrop-blur-md border border-purple-900/30 shadow-xl rounded-xl overflow-hidden isolate"; // Base card style
const themeAccent = {
  // Theme helper
  text: `text-${themeAccentColor}-400`,
  colorName: themeAccentColor,
  border: `border-${themeAccentColor}-500`,
  borderLighter: `border-${themeAccentColor}-600/60`,
  borderCard: `border-${themeAccentColor}-900/30`, // Command center example card border
  ring: `ring-${themeAccentColor}-500`,
  focusRing: `focus:ring-${themeAccentColor}-500/60`,
  hoverBorder: `hover:border-${themeAccentColor}-400`,
  hoverCardBorder: `hover:border-${themeAccentColor}-700/60`, // Subtle card hover
  buttonBg: `bg-${themeAccentColor}-600`,
  buttonHoverBg: `hover:bg-${themeAccentColor}-700`,
  linkHoverText: `hover:text-${themeAccentColor}-300`,
};

// --- Main Page Component ---
export default function StartupProgramDetailPage() {
  // Hooks
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  // State
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Policy"); // Default to Policy

  // Data Fetching Effect
  useEffect(() => {
    if (id && typeof id === "string") {
      setLoading(true);
      fetchProgramDetails(id)
        .then((data) => setProgram(data)) // Directly set fetched data or null
        .catch((err) => {
          console.error("Error fetching program details:", err);
          setProgram(null); // Ensure null on error
        })
        .finally(() => setLoading(false));
    } else {
      // Handles cases where id is not yet available or invalid
      setProgram(null);
      setLoading(false);
    }
  }, [id]);

  // Loading State
  if (loading)
    return (
      <div
        className={`min-h-screen flex items-center justify-center p-8 ${gradientBg}`}
      >
        <Loader2 className={`animate-spin ${themeAccent.text}`} size={40} />
      </div>
    );

  // Not Found State
  if (!program)
    return (
      <div className={`min-h-screen p-8 ${gradientBg} text-center`}>
        <div className={`${cardBaseStyle} max-w-md mx-auto p-6 mt-10`}>
          {" "}
          {/* Apply card style */}
          <AlertTriangle className="mx-auto mb-3 text-red-500" size={32} />
          <h2 className="text-lg font-semibold text-slate-100 mb-1">
            Program Not Found
          </h2>
          <p className="text-sm text-slate-400 mb-4">
            The requested program could not be found.
          </p>
          <Link
            href="/dashboard/startup/programs"
            className={`inline-flex items-center gap-1.5 text-sm ${themeAccent.text} ${themeAccent.linkHoverText} font-medium`}
          >
            <ArrowLeft size={16} /> Back to Programs
          </Link>
        </div>
      </div>
    );

  // Tabs configuration
  const tabs = [
    { name: "Overview", icon: ClipboardList },
    { name: "Scope", icon: Layers },
    { name: "Policy", icon: DollarSign },
    { name: "Reports", icon: Bug },
    { name: "Statistics", icon: BarChart },
    { name: "Hackers", icon: Users },
    { name: "Settings", icon: Settings },
  ];

  // Helper to render status chip with appropriate color
  function getStatusChip(status: ProgramStatus): React.ReactNode {
    // Define status style configurations
    const statusConfig = {
      Active: {
        bgColor: "bg-green-900/30",
        textColor: "text-green-400",
        borderColor: "border-green-700/50",
        icon: <Play size={10} className="fill-current" />,
      },
      Paused: {
        bgColor: "bg-amber-900/30",
        textColor: "text-amber-400", 
        borderColor: "border-amber-700/50",
        icon: <Pause size={10} className="fill-current" />,
      },
      Archived: {
        bgColor: "bg-slate-900/30",
        textColor: "text-slate-400",
        borderColor: "border-slate-700/50",
        icon: <Archive size={10} />,
      },
    };

    const config = statusConfig[status];
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full ${config.bgColor} ${config.textColor} border ${config.borderColor}`}>
        {config.icon}
        {status}
      </span>
    );
  }

  return (
    <div className={`min-h-screen p-4 md:p-8 text-slate-200 ${gradientBg}`}>
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className={`flex items-center gap-1.5 text-sm text-slate-400 ${themeAccent.linkHoverText} transition-colors font-medium`}
        >
          <ArrowLeft size={16} /> Back to Programs
        </button>

        {/* Header Card */}
        <div className={`${cardBaseStyle} p-5 sm:p-6 relative group`}>
          <div
            className={`absolute -top-4 -right-4 w-24 h-24 bg-${themeAccent.colorName}-600/10 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none -z-10`}
          ></div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              {/* Type Icon */}
              <div
                className={`p-2.5 rounded-lg border shadow-inner ${
                  program.type === "Public"
                    ? `border-blue-600/50 bg-blue-950/50 text-blue-400`
                    : `border-orange-600/50 bg-orange-950/50 text-orange-400`
                }`}
              >
                {program.type === "Public" ? (
                  <Globe size={24} />
                ) : (
                  <Lock size={24} />
                )}
              </div>
              {/* Name & Company */}
              <div>
                <div className="flex items-center flex-wrap gap-x-3 gap-y-1">
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-100">
                    {program.name}
                  </h1>
                  {/* Inline Star for Featured */}
                  {program.featured && (
                    <span title="Featured Program">
                      <Star
                        size={14}
                        className={`fill-current text-yellow-400 inline-block ml-1 mb-px`}
                      />
                    </span>
                  )}
                  {getStatusChip(program.status)}
                </div>
                <p className="text-sm text-slate-400 mt-0.5">
                  {program.company}
                </p>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex gap-2 shrink-0 w-full md:w-auto">
              <Link
                href={`/dashboard/startup/programs/${program.id}/edit`} // Correct Edit link
                className="flex-1 md:flex-none px-3 py-1.5 text-xs border border-slate-600 text-slate-300 rounded-md hover:bg-slate-700/50 hover:border-slate-500 transition-colors flex items-center justify-center gap-1.5"
              >
                <Edit size={13} /> Edit
              </Link>
              {/* Pause/Activate Button */}
              <button
                className={`flex-1 md:flex-none px-3 py-1.5 text-xs border rounded-md transition-colors flex items-center justify-center gap-1.5 ${
                  program.status === "Active"
                    ? `border-amber-600/70 text-amber-300 hover:bg-amber-900/50`
                    : `border-green-600/70 text-green-300 hover:bg-green-900/50`
                }`}
              >
                {program.status === "Active" ? (
                  <Pause size={13} className="fill-current" />
                ) : (
                  <Play size={13} className="fill-current" />
                )}
                {program.status === "Active" ? "Pause" : "Activate"}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div
          className={`border-b ${themeAccent.borderLighter}/30 sticky top-0 bg-[#080808]/80 backdrop-blur-sm z-20 -mx-4 px-4 sm:-mx-8 sm:px-8`}
        >
          <nav
            className="-mb-px flex space-x-5 sm:space-x-6 overflow-x-auto scrollbar-hide"
            aria-label="Tabs"
          >
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-150 ease-out flex items-center gap-1.5 ${
                  activeTab === tab.name
                    ? `${themeAccent.border} ${themeAccent.text}`
                    : `border-transparent text-slate-400 hover:text-slate-100 hover:border-slate-500/80`
                }`}
              >
                <tab.icon
                  size={15}
                  strokeWidth={activeTab === tab.name ? 2.5 : 2}
                />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="min-h-[300px] pt-2">
          {(() => {
            switch (activeTab) {
              case "Scope":
                return <ProgramScopeTab program={program} />;
              case "Policy":
                return <ProgramPolicyTab program={program} />;
              case "Reports":
                return <ProgramReportsTab programId={program.id} />;
              case "Statistics":
                return <ProgramStatisticsTab program={program} />;
              case "Hackers":
                return <ProgramHackersTab programId={program.id} />;
              case "Settings":
                return <ProgramSettingsTab program={program} />;
              case "Overview":
              default:
                return <ProgramOverviewDetails program={program} />;
            }
          })()}
        </div>
      </div>
    </div>
  );
}

// --- Section Component (Styled like Cards) ---
const DetailSection: React.FC<{
  title: string;
  children: React.ReactNode;
  icon?: React.ElementType;
  defaultOpen?: boolean;
}> = ({ title, children, icon: Icon, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    // Use the consistent card base style, padding handled inside
    <div className={`${cardBaseStyle} mb-6 p-0`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 hover:bg-slate-800/40 transition-colors rounded-t-xl"
      >
        <h3
          className={`text-base font-semibold text-slate-100 flex items-center gap-2`}
        >
          {Icon && <Icon size={18} className={themeAccent.text} />}
          {title}
        </h3>
        <ChevronDown
          size={18}
          className={`text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        // Style the content area, add prose for markdown if needed
        <div
          className={`px-5 pb-5 pt-2 text-sm text-slate-300 leading-relaxed prose prose-sm prose-invert max-w-none prose-p:my-2 prose-headings:mt-3 prose-headings:mb-1 prose-headings:text-slate-100 prose-headings:font-semibold prose-a:${themeAccent.text} prose-a:font-medium hover:prose-a:underline prose-pre:bg-slate-800/60 prose-pre:border prose-pre:border-slate-700/50 prose-pre:rounded prose-pre:p-3 prose-code:bg-transparent prose-code:p-0 prose-code:text-xs`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

// --- Placeholder Tab Content Components ---
const ProgramOverviewDetails: React.FC<{ program: Program }> = ({
  program,
}) => (
  <DetailSection
    title="Program Overview"
    icon={ClipboardList}
    defaultOpen={true}
  >
    {/* Display basic stats again or a summary */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <StatDisplay
            label="Avg Reward"
            value={`$${program.avgReward.toLocaleString()}`}
            color="text-emerald-300"
            small={true}
          />
          <StatDisplay
            label="Response Time"
            value={`${program.avgResponseTime}h`}
            color={getResponseTypeColor(program.avgResponseTime)}
            small={true}
          />
          <StatDisplay
            label="Resolved"
            value={program.reportsResolved.toLocaleString()}
            small={true}
          />
          <StatDisplay
            label="Pending"
            value={program.pendingReports.toLocaleString()}
            color="text-orange-400"
            small={true}
          />
        </div>
    <h4 className="text-sm font-semibold mb-1">Description</h4>
    <p className="whitespace-pre-line text-slate-300">
      {program.description || "No description available."}
    </p>
  </DetailSection>
);

const ProgramScopeTab: React.FC<{ program: Program }> = ({ program }) => (
  <DetailSection title="Scope & Targets" icon={Layers} defaultOpen={true}>
    <h4 className="text-sm font-semibold mb-1">Targets</h4>
    {program.targets?.length > 0 ? (
      <div className="flex flex-wrap gap-1.5 mb-3">
        {program.targets.map((t) => (
          <TagChip key={t} text={t} icon={<Cpu size={11} />} />
        ))}
      </div>
    ) : (
      <p className="text-slate-400 italic text-xs mb-3">
        No specific targets listed.
      </p>
    )}

    <h4 className="text-sm font-semibold mb-1">Detailed Scope</h4>
    <pre className="text-xs whitespace-pre-wrap font-mono leading-relaxed p-3 bg-slate-800/60 border border-slate-700/50 rounded">
      {program.scope || "Scope details not provided."}
    </pre>
  </DetailSection>
);

const ProgramPolicyTab: React.FC<{ program: Program }> = ({ program }) => (
  <>
    <DetailSection
      title="Reward Structure"
      icon={DollarSign}
      defaultOpen={true}
    >
      {/* More visual reward info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-slate-800/50 rounded-md border border-slate-700/50 mb-4">
        <div>
          <p className="text-xs uppercase text-slate-400 tracking-wider">
            Payout Range
          </p>
          <p className="text-xl font-bold text-emerald-300">
            {program.rewardRange}
          </p>
        </div>
        <div className="sm:text-right">
          <p className="text-xs uppercase text-slate-400 tracking-wider">
            Average Payout
          </p>
          <p className="text-xl font-bold text-emerald-300">
            ${program.avgReward.toLocaleString()}
          </p>
        </div>
      </div>
      <p>
        <strong className="text-slate-300">Basis:</strong>{" "}
        {program.payoutPolicy || "Not specified"}
      </p>

      {program.accepts && program.accepts.length > 0 && (
        <div className="mt-3">
          <h4 className="text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">
            Example Accepted Vulnerabilities
          </h4>
          <div className="flex flex-wrap gap-1">
            {/* More visible tags */}
            {program.accepts.slice(0, 10).map((a) => (
              <span
                key={a}
                className="text-[10px] bg-purple-900/60 text-purple-300 px-2 py-0.5 rounded border border-purple-700/50 font-mono"
              >
                {a}
              </span>
            ))}
            {program.accepts.length > 10 && (
              <span className="text-xs text-slate-500 self-center ml-1">
                {" "}
                + more
              </span>
            )}
          </div>
        </div>
      )}
    </DetailSection>

    {/* Requires a Markdown Renderer library (e.g., react-markdown) */}
    <DetailSection
      title="Full Policy Document"
      icon={FileText}
      defaultOpen={true}
    >
      <div className="prose-policy max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
        {/* !! Replace this pre tag with your Markdown component !! */}
        {/* Example: <ReactMarkdown>{program.policyDetails}</ReactMarkdown> */}
        <pre className="text-xs">
          {program.policyDetails || "No detailed policy document provided."}
        </pre>
      </div>
    </DetailSection>
  </>
);
// Other Tab Placeholders (Keep as is for now)
const ProgramReportsTab: React.FC<{ programId: string }> = ({ programId }) => (
  <DetailSection title={`Submitted Reports`} icon={Bug}>
    <p className="text-slate-400 italic">
      PLACEHOLDER: A filterable, sortable table/list of reports for program{" "}
      <code className="text-xs bg-slate-700 px-1 rounded">{programId}</code>{" "}
      would be loaded here.
    </p>
    {/* Add placeholder for controls */}
  </DetailSection>
);
const ProgramHackersTab: React.FC<{ programId: string }> = ({ programId }) => (
  <DetailSection title={`Participating Researchers`} icon={Users}>
    <p className="text-slate-400 italic">
      PLACEHOLDER: A list or leaderboard of researchers involved in{" "}
      <code className="text-xs bg-slate-700 px-1 rounded">{programId}</code>.
    </p>
  </DetailSection>
);
const ProgramSettingsTab: React.FC<{ program: Program }> = ({ program }) => (
  <DetailSection title={`Program Settings`} icon={Settings}>
    <p className="text-slate-400 italic">
      PLACEHOLDER: Forms for editing details of{" "}
      <strong className="text-white">{program.name}</strong>.
    </p>
    {/* Example: Input fields, save button */}
  </DetailSection>
);
const ProgramStatisticsTab: React.FC<{ program: Program }> = ({ program }) => (
  <DetailSection title={`Performance Metrics`} icon={BarChart}>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <StatDisplay
        label="Avg Response"
        value={`${program.avgResponseTime}h`}
        color={getResponseTypeColor(program.avgResponseTime)}
      />
      <StatDisplay
        label="Acceptance Rate"
        value={`${program.acceptanceRate}%`}
      />
      <StatDisplay
        label="Resolved"
        value={program.reportsResolved.toLocaleString()}
      />
      <StatDisplay
        label="Pending"
        value={program.pendingReports.toLocaleString()}
        color="text-orange-400"
      />
    </div>
    <div className="h-48 flex items-center justify-center bg-slate-800/40 border border-slate-700/50 rounded-lg text-slate-500 text-sm italic">
      [Chart Placeholder: Report Trends for {program.name}]
    </div>
  </DetailSection>
);

// --- Helper Components (Tag Chip, Stat Display - Minor adjustments) ---
const TagChip: React.FC<{ text: string; icon?: React.ReactNode }> = ({
  text,
  icon,
}) => (
  // Consistent styling with previous TagChip
  <span className="inline-flex items-center gap-1 text-[10px] bg-slate-700/60 text-slate-300 px-1.5 py-0.5 rounded border border-slate-600/60 whitespace-nowrap">
    {icon} {text}
  </span>
);
const StatDisplay: React.FC<{
  label: string;
  value: string | number;
  color?: string;
  small?: boolean;
}> = ({ label, value, color = "text-slate-100", small = false }) => (
  <div
    className={`bg-slate-800/50 p-3 rounded-lg border border-slate-700/50 text-center ${
      small ? "p-2" : "p-3"
    }`}
  >
    <p
      className={`text-[10px] uppercase text-slate-400 tracking-wider font-medium mb-0.5`}
    >
      {label}
    </p>
    <p className={`font-semibold ${color} ${small ? "text-base" : "text-lg"}`}>
      {value}
    </p>{" "}
    {/* Conditionally size */}
  </div>
);

// Helper for coloring response times based on hours
function getResponseTypeColor(hours: number): string {
  if (hours <= 24) return "text-green-400";  // Fast response (under 1 day)
  if (hours <= 48) return "text-blue-400";   // Good response (1-2 days)
  if (hours <= 72) return "text-amber-400";  // Moderate response (2-3 days)
  return "text-red-400";                    // Slow response (over 3 days)
}
// Scrollbar/Keyframes Styles assumed available globally
// Add Keyframes for Filter Dropdown if needed (see previous examples)
