import { FaBoxOpen, FaCreditCard, FaGem } from "react-icons/fa";
import { FaUserGear } from "react-icons/fa6";
import { HiSquare3Stack3D } from "react-icons/hi2";
import { MdHome } from "react-icons/md";
import { SiSafari } from "react-icons/si";

export const nav = [
  {
    name: "Home",
    icon: MdHome,
    route: "",
  },
  {
    name: "Discover",
    icon: SiSafari,
    route: "",
  },
  {
    name: "Library",
    icon: FaBoxOpen,
    route: "",
  },
  {
    name: "Tech Stack",
    icon: HiSquare3Stack3D,
    route: "",
  },
  {
    name: "Subscription",
    icon: FaCreditCard,
    route: "",
  },
  {
    name: "Rewards Hub",
    icon: FaGem,
    route: "/reward",
  },
  {
    name: "Settings",
    icon: FaUserGear,
    route: "",
  },
];
