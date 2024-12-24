/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        russo: ['"Russo One"', "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #fff, 0 0 70px #fff, 0 0 80px #fff, 0 0 100px #ff1177",
      },
      animation: {
        orbit1: "orbit 8s linear infinite",
        orbit2: "orbit 12s linear infinite",
        orbit3: "orbit 16s linear infinite",
        glow: "glow 1.5s infinite alternate",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",

        twinkle: "twinkle 5s infinite ease-in-out",
        rotate: "rotate 5s infinite ease-in-out",
        snore: "snore 5s infinite ease-in-out",
        wingLeft: "wingLeft 1.3s cubic-bezier(0.45, 0, 0.5, 0.95) infinite",
        wingRight: "wingRight 1.3s cubic-bezier(0.45, 0, 0.5, 0.95) infinite",
      },
      keyframes: {
        orbit: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        glow: {
          "0%": {
            boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
          },
          "100%": {
            boxShadow: "0 0 20px rgba(255, 255, 255, 1)",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        twinkle: {
          "0%": {
            opacity: "0.7",
          },
          "50%": {
            opacity: "0.3",
          },
          "100%": {
            opacity: "0.7",
          },
        },
        wingLeft: {
          "0%": {
            transform: "translate3d(0, 0, 0) rotateX(-50deg)",
          },
          "50%": {
            transform: "translate3d(0, -20px, 0) rotateX(-130deg)",
            background: "linear-gradient(to bottom, #d9d3e2 0%, #b8a5d1 100%)",
          },
          "100%": {
            transform: "translate3d(0, 0, 0) rotateX(-50deg)",
          },
        },
        wingRight: {
          "0%": {
            transform: "translate3d(0, 0, 0) rotateX(50deg)",
          },
          "50%": {
            transform: "translate3d(0, -20px, 0) rotateX(130deg)",
            background: "linear-gradient(to bottom, #a58dc4 0%, #7979a8 100%)",
          },
          "100%": {
            transform: "translate3d(0, 0, 0) rotateX(50deg)",
          },
        },
        wingLeftTop: {
          "0%": {
            transform: "translate3d(0, 0, 0) rotateX(-10deg)",
          },
          "50%": {
            transform: "translate3d(0px, 0px, 0) rotateX(-40deg)",
            borderBottom: "20px solid #b8a5d1",
          },
          "100%": {
            transform: "translate3d(0, 0, 0) rotateX(-10deg)",
          },
        },
        wingRightTop: {
          "0%": {
            transform: "translate3d(0, 0, 0) rotateX(10deg)",
          },
          "50%": {
            transform: "translate3d(0px, 0px, 0px) rotateX(40deg)",
          },
          "100%": {
            transform: "translate3d(0, 0, 0) rotateX(10deg)",
          },
        },
        rotate: {
          "0%": {
            transform: "rotate(-8deg)",
          },
          "50%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(-8deg)",
          },
        },
        snore: {
          "0%": {
            transform: "scale(1) rotate(30deg)",
          },
          "50%": {
            transform: "scale(0.5) rotate(30deg)",
            borderBottomLeftRadius: "50%",
          },
        },
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  safelist: ["animate-orbit1", "animate-orbit2", "animate-orbit3"],
  plugins: [require("tailwindcss-animate")],
};
