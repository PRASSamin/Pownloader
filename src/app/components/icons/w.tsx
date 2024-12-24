import React from "react";
import { SVGProps } from "./types";

export const WIcon = React.forwardRef<SVGElement, SVGProps>(
  ({ size, className, ...props }, ref) => {
    return (
      <svg
        version="1.2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 500"
        width={size || 16}
        height={size || 16}
        className={className}
        {...props}
      >
        <defs>
          <clipPath clipPathUnits="userSpaceOnUse" id="cp1">
            <path d="m501 0v501h-501v-501z" />
          </clipPath>
        </defs>
        <g clip-path="url(#cp1)">
          <path
            style={{ fill: "#fff" }}
            d="m12.9 114.2c-1.4-6.9-1.4-9.6-1.4-17.9 0-16.6 13.9-34.6 37.5-34.6 26.4 0 38.9 15.2 43 38.7l45.8 226.8h1.4l69.4-233.7c7-19.4 22.2-31.8 43.1-31.8 19.4 0 36.1 12.4 41.6 31.8l69.4 233.7h1.4l45.8-226.8c4.2-23.5 16.7-38.7 43-38.7 23.6 0 37.5 18 37.5 34.6 0 8.3 0 11-1.4 17.9l-68 293.2c-5.5 22.1-23.6 41.5-54.1 41.5q-8.3 0-16.7-2.8-8.3-2.7-16.6-6.9-7-5.5-12.5-13.8-4.2-6.9-7-15.2l-62.4-207.4h-1.4l-62.5 207.4q-2.8 8.3-6.9 15.2-5.6 8.3-12.5 13.8-7 4.2-16.7 6.9-8.3 2.8-16.6 2.8c-30.6 0-48.6-19.4-54.2-41.5z"
          />
        </g>
      </svg>
    );
  }
);

WIcon.displayName = "WIcon";