// Assume these imports point to relevant icons for a hacker theme
// (or keep existing ones as placeholders)
// import dashboardIcon from "../../public/Aside/home.svg"; // Renamed for clarity
// import PdashboardIcon from "../../public/Aside/Phome.svg"; // Renamed for clarity
// import targetsIcon from "../../public/Aside/playlist.svg"; // Reused or replace
// import PtargetsIcon from "../../public/Aside/Pplaylist.svg"; // Reused or replace
// import toolsIcon from "../../public/Aside/progress.svg"; // Reused or replace
// import PtoolsIcon from "../../public/Aside/Pprogress.svg"; // Reused or replace
// import communityIcon from "../../public/Aside/community.svg"; // Reused or replace
// import PcommunityIcon from "../../public/Aside/Pcommunity.svg"; // Reused or replace

export interface AsideLinkData {
  name: string;
  // icon: StaticImageData | string;
  // hoverIcon: StaticImageData | string;
  href: string;
}

export const aside_links: AsideLinkData[] = [
  {
    name: "Dashboard",
    // icon: dashboardIcon,
    // hoverIcon: PdashboardIcon,
    href: "",
  },
  {
    name: "Targets", // Example: Changed from Question Bank
    // icon: targetsIcon,
    // hoverIcon: PtargetsIcon,
    href: "targets", // Example: Changed href
  },
  {
    name: "Tools", // Example: Changed from My Progress
    // icon: toolsIcon,
    // hoverIcon: PtoolsIcon,
    href: "tools", // Example: Changed href
  },
  {
    name: "Community", // Kept Community, could be CTF, Forum etc.
    // icon: communityIcon,
    // hoverIcon: PcommunityIcon,
    href: "community",
  },
];
