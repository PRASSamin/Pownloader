import React from "react";
import { SVGProps } from "./types";

export const Logo = React.forwardRef<SVGElement, SVGProps>(
  ({ size, className, ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        width={size || 16}
        height={size || 16}
        fill="currentColor"
        className={className}
        viewBox="0 0 366 226"
      >
        <path
          style={{ fill: "#7d67f1" }}
          d="m34 92h67c7.2 0 13 5.8 13 13v2c0 7.2-5.8 13-13 13h-67c-7.2 0-13-5.8-13-13v-2c0-7.2 5.8-13 13-13z"
        />
        <path
          style={{ fill: "#91eff6" }}
          d="m41.5 145h59c8 0 14.5 6.5 14.5 14.5 0 8-6.5 14.5-14.5 14.5h-59c-8 0-14.5-6.5-14.5-14.5 0-8 6.5-14.5 14.5-14.5z"
        />
        <path
          style={{ fill: "#7c62eb" }}
          d="m23.5 198h77c8 0 14.5 6.5 14.5 14.5 0 8-6.5 14.5-14.5 14.5h-77c-8 0-14.5-6.5-14.5-14.5 0-8 6.5-14.5 14.5-14.5z"
        />
        <path
          style={{ fill: "#7d67f1" }}
          d="m41.5 251h59c8 0 14.5 6.5 14.5 14.5 0 8-6.5 14.5-14.5 14.5h-59c-8 0-14.5-6.5-14.5-14.5 0-8 6.5-14.5 14.5-14.5zm143.5-174l155 78"
        />
        <path
          style={{ fill: "#91eff6" }}
          d="m183 76l160 81c0 0 14.4 9.3 14 24 0 0 0.2 17.4-13 26l-158 83c0 0-34.7 11.2-43-25l-1-163c0 0 4.9-36.1 41-26z"
        />
        <path
          style={{ fill: "#7c62eb" }}
          d="m170.5 108.5l111.3 56.4c0 0 10 6.5 9.7 16.8 0 0 0.1 12.1-9 18.1l-109.9 57.9c0 0-24.1 7.8-29.9-17.5l-0.7-113.6c0 0 3.4-25.1 28.5-18.1z"
        />
      </svg>
    );
  }
);
