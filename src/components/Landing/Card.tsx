// src/components/Card.tsx
import React from "react";

// Define the props the component accepts
interface CardProps {
  icon: React.ReactNode; // Can be an emoji (string), SVG component, etc.
  title: string;
  description: string;
}

// The Card component using Function Component type from React
const Card: React.FC<CardProps> = ({ icon, title, description }) => {
  return (
    // Card container: Applying Tailwind classes for styling
    <div
      className="
        m-4 p-6                          // Spacing: Margin around card, Padding inside
        bg-[#16291F]                    // Background: Custom dark green color (fully opaque)
        rounded-[12px]                 // Appearance: Custom border radius (reduced from 40px)
        shadow-lg                      // Appearance: Drop shadow (UNCOMMENTED)
        flex flex-col items-center     // Layout: Flex column, centers content horizontally
        text-center                    // Text Alignment: Center align text
        w-full sm:w-[calc(50%-2rem)] md:w-[calc(33.333%-2rem)] // Responsive Width: Full width on mobile, adjusting for larger screens accounting for margin
        transition                     // Interaction: Enable smooth transitions for hover effects
        hover:bg-[#16291F]/90          // Interaction: Slightly reduce opacity on hover for feedback
      "
    >
      {/* Wrapper for the icon with specific background and rounded shape */}
      <div className="mb-4 inline-flex items-center justify-center p-3 bg-gray-700 rounded-full">
        {/* Icon styling using Tailwind */}
        <span className="text-3xl text-emerald-400">{icon}</span>
      </div>

      {/* Card Title Styling */}
      <h3 className="text-xl font-semibold text-gray-100 mb-2">{title}</h3>

      {/* Card Description Styling */}
      <p className="text-base text-gray-300">{description}</p>
    </div>
  );
};

export default Card;
