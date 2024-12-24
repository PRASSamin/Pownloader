import React from "react";
import { SVGProps } from "./types";

export const WNotIcon = React.forwardRef<SVGElement, SVGProps>(
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
            d="m46.6 132.9c-1.1-5.5-1.1-7.7-1.1-14.4 0-13.3 11.3-27.8 30.5-27.8 21.4 0 31.6 12.2 34.9 31.1l37.3 182.3h1.1l56.4-187.8c5.7-15.6 18-25.6 35-25.6 15.8 0 29.4 10 33.8 25.6l56.5 187.8h1.1l37.2-182.3c3.4-18.9 13.6-31.1 35-31.1 19.2 0 30.4 14.5 30.4 27.8 0 6.7 0 8.9-1.1 14.4l-55.3 235.7c-4.4 17.8-19.1 33.4-43.9 33.4q-6.8 0-13.6-2.3-6.8-2.2-13.5-5.5-5.7-4.5-10.2-11.1-3.4-5.6-5.6-12.3l-50.8-166.7h-1.1l-50.8 166.7q-2.3 6.7-5.6 12.3-4.6 6.6-10.2 11.1-5.7 3.3-13.5 5.5-6.8 2.3-13.5 2.3c-24.9 0-39.5-15.6-44.1-33.4z"
          />
          <path
            style={{ fill: "#fff" }}
            d="m35.1 341.1l408.8-236c13.8-8 31.6-3.3 39.6 10.6 8 13.8 3.2 31.6-10.6 39.6l-408.8 236c-13.9 8-31.6 3.2-39.6-10.6-8-13.9-3.3-31.6 10.6-39.6z"
          />
        </g>
      </svg>
    );
  }
);
