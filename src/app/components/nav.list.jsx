import { Home } from "lucide-react";
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import { Instagram, Facebook } from "@mui/icons-material";
import { TiktokIcon as Tiktok } from "./icons/tiktok";

export const navItems = () => {
  return [
    {
      title: "Home",
      url: "/",
      icon: Home,
      subItems: [],
    },
    {
      title: "Tools",
      icon: HomeRepairServiceIcon,
      subItems: [
        {
          title: "Instagram",
          icon: Instagram,
          url: "/tool/instagram",
          description: "Download Instagram videos, reels, and photos.",
        },
        {
          title: "Facebook",
          icon: Facebook,
          url: "/tool/facebook",
          description: "Download Facebook videos, reels, and stories",
        },
        {
          title: "Tiktok",
          icon: Tiktok,
          url: "/tool/tiktok",
          description: "Download Tiktok videos, slideshows and music.",
        }
      ],
    },
  ];
}