// src/components/dashboard/Notification.tsx (example path)

import React from "react";
// import Image, { StaticImageData } from "next/image";
import { X } from "lucide-react";

// import clock_notif from "../../../public/Home/clock_notif.svg";

export interface NotificationItem {
  id: string | number; // Use a unique ID
  message: string;
  created_at?: string | number | Date; // Accept various date formats
  timestamp?: string | number | Date; // Alternative field name
  // Add other potential fields if your API returns them
}

interface NotificationProps {
  onClose: () => void;
  notifications: NotificationItem[] | null | undefined; // Allow null or undefined
}

const Notification: React.FC<NotificationProps> = ({
  onClose,
  notifications,
}) => {
  const formatTime = (
    dateInput: string | number | Date | undefined
  ): string => {
    if (!dateInput) return "";
    try {
      const date = new Date(dateInput);
      // Check if date is valid before formatting
      if (isNaN(date.getTime())) return "Invalid Date";
      return date.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      console.error("Error formatting date:", e);
      return "Invalid Date";
    }
  };

  return (
    <div className="absolute bg-[#FFF] rounded-[8px] p-4 h-[240px] w-[400px] top-[56px] right-[11%] z-[60] shadow-lg border border-gray-100 overflow-hidden flex flex-col">
      <div className="flex justify-between items-center mb-2 flex-shrink-0">
        <h3 className="text-md font-semibold text-[#191919] pr-6">
          Notifications
        </h3>
        <X
          size={20}
          className="text-[#B5BEC6] cursor-pointer"
          onClick={onClose}
          aria-label="Close notifications"
        />
      </div>

      <div className="overflow-y-auto flex-grow">
        {" "}
        {/* Use overflow-y-auto and flex-grow */}
        {notifications && notifications.length > 0 ? (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className="mb-3 border-b border-gray-100 pb-2 last:border-b-0"
            >
              <span className="text-[12px] text-gray-400 block">
                {formatTime(notif.created_at || notif.timestamp)}
              </span>
              <div className="flex items-center gap-2 mt-1">
                {/* <Image
                  src={clock_notif as StaticImageData | string} // Type assertion might be needed if SVG import isn't fully typed
                  alt=""
                  width={18}
                  height={18}
                /> */}
                <span className="text-[#191919] text-[14px] font-[500] break-words">
                  {" "}
                  {/* Allow text wrapping */}
                  {notif.message || "Message non disponible"}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center h-full text-sm text-gray-500">
            <span>Aucune notification</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
