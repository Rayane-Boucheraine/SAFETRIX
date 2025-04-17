// src/components/Card.tsx (EXAMPLE - Incorporate into your existing Card.tsx)
import React from "react";

interface CardProps {
  icon: string;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ icon, title, description }) => {
  return (
    // Removed the outer p-4 wrapper as grid gap handles spacing now

    // The actual card element - enhanced transitions/hovers
    <div
      className="
        h-full // Stretch to fill grid cell height
        rounded-[30px]
        border border-white/30 // Slightly softer default border
        bg-gradient-to-br from-[rgba(38,45,42,0.6)] via-[rgba(25,30,28,0.5)] to-[rgba(15,20,18,0.6)] // More subtle bg gradient
        p-8
        text-center
        transition-all duration-300 ease-out // Smooth transitions
        group // Added group for potential group-hover effects
        relative // Needed for potential pseudo-elements or overlays
        overflow-hidden // Ensure gradients/glows inside don't bleed unexpectedly
        cursor-pointer // Indicate interactivity
        hover:scale-[1.04] // Slightly more scale on hover
        hover:border-emerald-400/80 // Brighter border glow
        hover:shadow-2xl hover:shadow-emerald-900/40 // More prominent shadow
        flex flex-col
        items-center
      "
    >
      {/* Optional: Subtle inner glow on hover */}
      <div className="absolute inset-0 rounded-[30px] bg-gradient-to-t from-emerald-800/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>

      {/* Content remains on top */}
      <div className="relative z-10 flex flex-col items-center h-full">
        {/* Stylized Icon Container */}
        <div
          className="
            w-16 h-16
            mb-6
            inline-flex items-center justify-center
            rounded-full
            bg-gradient-to-tl from-emerald-800/60 via-emerald-600/40 to-emerald-900/60
            text-emerald-300
            text-3xl
            flex-shrink-0
            shadow-md shadow-emerald-950/30
            ring-1 ring-emerald-500/30 // Add subtle ring
            transition-transform duration-300 group-hover:scale-110 // Icon scale on hover
          "
        >
          {icon}
        </div>

        {/* Text Content Area */}
        <div className="flex-grow">
          <h2 className="text-xl font-semibold text-gray-100 title-font mb-3 transition-colors duration-300 group-hover:text-emerald-300">
            {title}
          </h2>
          <p className="leading-relaxed text-base text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
