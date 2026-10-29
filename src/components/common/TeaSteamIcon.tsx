import React from "react";

interface TeaSteamIconProps {
  className?: string;
  size?: number;
  steamColor?: string;
  cupColor?: string;
  crownColor?: string;
}

export default function TeaSteamIcon({
  className = "",
  size = 48,
  steamColor = "var(--color-primary)",
  cupColor = "var(--color-primary)",
  crownColor = "var(--color-accent-gold)",
}: TeaSteamIconProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* Animated Steam Plumes */}
        <g opacity="0.8">
          <path
            d="M24 24C23 20 27 16 25 10C24 7 21 5 23 2"
            stroke={steamColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            className="animate-steam-1"
          />
          <path
            d="M32 23C31 18 35 14 33 8C32 5 29 3 31 1"
            stroke={steamColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            className="animate-steam-2"
          />
          <path
            d="M40 24C39 19 43 15 41 9C40 6 37 4 39 2"
            stroke={steamColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            className="animate-steam-3"
          />
        </g>

        {/* Delicate Crown above cup */}
        <path
          d="M26 27L29 30L32 26L35 30L38 27V32H26V27Z"
          fill={crownColor}
          stroke={crownColor}
          strokeWidth="1"
          strokeLinejoin="round"
          className="animate-float-soft"
        />

        {/* Teacup Body */}
        <path
          d="M17 33C17 33 17 48 32 48C47 48 47 33 47 33H17Z"
          fill="white"
          stroke={cupColor}
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Cup Rim */}
        <path
          d="M15 33C15 32 17 31 32 31C47 31 49 32 49 33C49 34 47 35 32 35C17 35 15 34 15 33Z"
          fill={cupColor}
          opacity="0.15"
        />

        {/* Cup Handle */}
        <path
          d="M47 36C52 36 55 38 55 42C55 46 51 47 45 47"
          stroke={cupColor}
          strokeWidth="2.8"
          strokeLinecap="round"
        />

        {/* Saucer / Plate */}
        <path
          d="M12 51C12 51 20 54 32 54C44 54 52 51 52 51"
          stroke={cupColor}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M20 54C23 57 28 58 32 58C36 58 41 57 44 54"
          stroke={crownColor}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
