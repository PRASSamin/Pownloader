"use client";
import { useState, useEffect } from "react";
import { BottomNavigation as MuiBottomNavigation } from "@mui/material";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Home, Package, PackageOpen } from "lucide-react";
import { useSpring, animated } from "@react-spring/web";
import { useRouter } from "next/navigation";
import { navItems } from "./nav.list";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#151316bf",
      paper: "#151316bf",
    },
    text: {
      primary: "#fff",
    },
  },
});

export default function BottomNavigation() {
  const [value, setValue] = useState(
    null
  );
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const tools = navItems().filter((item) => item.title.toLowerCase() === "tools").flatMap((item) => item.subItems);


  useEffect(() => {
    setValue(window.location.pathname.includes("tool") ? 1 : 0);
  }, [])


  const popupStyle = useSpring({
    transform: showPopup
      ? "scale(1) translateY(0%)"
      : "scale(0.1) translateY(50%)",
    opacity: showPopup ? 1 : 0,
    width: showPopup ? "95%" : "0%",
    height: showPopup ? "70%" : "0%",
    borderRadius: "10px",
    config: { tension: 300, friction: 20 },
  });

  const handleBottomNavChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 1) {
      setShowPopup((prev) => !prev)
      if (showPopup) {
        setTimeout(() => {
          setValue(window.location.pathname.includes("tool") ? 1 : 0)
        }, 100);
      }
    } else {
      setShowPopup(false);
      router.push("/");
    }

  };


  return (
    <ThemeProvider theme={darkTheme}>
      <MuiBottomNavigation
        value={value}
        onChange={handleBottomNavChange}
        className="md:!hidden"
        sx={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          backgroundColor: (theme) => theme.palette.background.paper,
          color: (theme) => theme.palette.text.primary,
          backdropFilter: "blur(10px)",
          zIndex: 1300,
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<Home />}
          sx={{ color: "inherit" }}
          aria-label="Home"
        />
        <BottomNavigationAction
          label="Toolbox"
          icon={showPopup ? <PackageOpen /> : <Package />}
          sx={{ color: "inherit" }}
          aria-label="Toolbox"
        />
      </MuiBottomNavigation>

      {value === 1 && (
        <animated.div
          className="fixed bottom-[70px] left-1/2 bg-[#202124] border border-[#46464d] p-5 z-[1400] flex gap-3 flex-wrap justify-start items-start overflow-y-auto"
          style={{
            ...popupStyle,
            transform: "translateX(-50%)",
            transformOrigin: "center bottom",
          }}
        >
          {tools.map((tool, index) => (
            <button
              key={index}
              onClick={() => {
                router.push(tool.url);
                setShowPopup(false);
              }}
              className="w-24 h-24 border border-[#37373d] bg-card/30 hover:bg-card/50 flex flex-col items-center justify-center gap-2 rounded-md cursor-pointer transition-all duration-200"
            >
              {<tool.icon />}
              <span style={{ fontSize: "0.8rem", fontWeight: "bold" }}>{tool.title}</span>
            </button>
          ))}
        </animated.div>
      )}
    </ThemeProvider>
  );
}
