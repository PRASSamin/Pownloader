import React from "react";
import { navItems } from "../../components/nav.list";
import { cn } from "@/lib/utils";

const Galaxy = () => {
  const platforms = navItems()
    .filter((item) => item.title.toLowerCase() === "tools")
    .flatMap((item) => item.subItems)
    .map((subItem) => subItem.icon); 

  const orbitSizes = [200, 300, 400];

  return (
    <div className="relative flex items-center justify-center bg-black">
      {/* Central Logo */}
      <div className="central-logo">
        <img src="/logo.png" alt="Central Logo" className="w-20 h-auto" />
      </div>

      {/* Rotating Orbits */}
      {orbitSizes.map((size, orbitIndex) => (
        <div
          key={orbitIndex}
          className={cn(
            `absolute rounded-full border border-gray-300 animate-orbit${orbitIndex + 1}`
          )}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `calc(50% - ${size / 2}px)`,
            left: `calc(50% - ${size / 2}px)`,
          }}
        >
          {/* Logos on Orbit */}
          {platforms.map((Icon, logoIndex) => {
            const angle = (360 / platforms.length) * logoIndex; // Divide the circle evenly
            const radian = (Math.PI / 180) * angle; // Convert angle to radians
            const translateDistance = size / 2; // Distance from center to the orbit

            // Calculate positions
            const x = translateDistance * Math.cos(radian);
            const y = translateDistance * Math.sin(radian);

            return (
              <div
                key={logoIndex}
                className="absolute flex items-center justify-center"
                style={{
                  top: `calc(50% + ${y}px)`,
                  left: `calc(50% + ${x}px)`,
                  transform: `translate(-50%, -50%)`,
                }}
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center glass-icon animate-glow">
                  <Icon className="text-black w-8 h-8" />
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Galaxy;
