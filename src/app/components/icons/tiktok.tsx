import React from "react";
import { SVGProps } from "./types";

export const TiktokIcon = React.forwardRef<SVGElement, SVGProps>(
  ({ size, className, ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        width={size || 16}
        height={size || 16}
        fill="currentColor"
        className={className}
        viewBox="0 0 16 16"
      >
        <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
      </svg>
    );
  }
);

TiktokIcon.displayName = "TiktokIcon";