import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";

export const Socials = [
  {
    Icon: FaFacebook,
    url: "https://facebook.com/sharer/sharer.php?quote=🚀%20Join%20me%20on%20Flowva!%0AFlowva%20is%20where%20I%20discover%20top%20tools%2C%20earn%20rewards%2C%20and%20grow%20with%20community%20power.%0A%0AUse%20my%20referral%20link%20to%20sign%20up%20and%20get%20rewarded%20too%3A%0Ahttps%3A%2F%2Fapp.flowvahub.com%2Fsignup%2F%3Fref%3Dlucky1932",
    color: "#1877f2",
  },
  {
    url: "https://x.com/intent/post?text=%F0%9F%9A%80%20Join%20me%20on%20Flowva!%0AFlowva%20is%20where%20I%20discover%20top%20tools%2C%20earn%20rewards%2C%20and%20grow%20with%20community%20power.%0A%0AUse%20my%20referral%20link%20to%20sign%20up%20and%20get%20rewarded%20too%3A%0Ahttps%3A%2F%2Fapp.flowvahub.com%2Fsignup%2F%3Fref%3Dlucky1932",
    Icon: FaXTwitter,
    color: "#000000",
  },
  {
    Icon: FaLinkedin,
    url: "https://www.linkedin.com/sharing/share-offsite/?summary=%F0%9F%9A%80%20Join%20me%20on%20Flowva!%0AFlowva%20is%20where%20I%20discover%20top%20tools%2C%20earn%20rewards%2C%20and%20grow%20with%20community%20power.%0A%0AUse%20my%20referral%20link%20to%20sign%20up%20and%20get%20rewarded%20too%3A%0Ahttps%3A%2F%2Fapp.flowvahub.com%2Fsignup%2F%3Fref%3Dlucky1932",
    color: "#0077b5",
  },
  {
    Icon: IoLogoWhatsapp,
    url: "https://api.whatsapp.com/send?text=%F0%9F%9A%80%20Join%20me%20on%20Flowva!%0AFlowva%20is%20where%20I%20discover%20top%20tools%2C%20earn%20rewards%2C%20and%20grow%20with%20community%20power.%0A%0AUse%20my%20referral%20link%20to%20sign%20up%20and%20get%20rewarded%20too%3A%0Ahttps%3A%2F%2Fapp.flowvahub.com%2Fsignup%2F%3Fref%3Dlucky1932",
    color: "#25d366",
  },
];
export const weekdays = [
  {
    weekDay: "Monday",
    Title: "M",
    isCurrentDay: false,
    isClaimed: true,
    date: "",
  },
  {
    weekDay: "Tuesday",
    Title: "T",
    isCurrentDay: true,
    isClaimed: false,
    date: "",
  },
  {
    weekDay: "Wednesday",
    Title: "W",
    isCurrentDay: false,
    isClaimed: false,
    date: "",
  },
  {
    weekDay: "Thursday",
    Title: "T",
    isCurrentDay: false,
    isClaimed: false,
    date: "",
  },
  {
    weekDay: "Friday",
    Title: "F",
    isCurrentDay: false,
    isClaimed: true,
    date: "",
  },
  {
    weekDay: "Saturday",
    Title: "S",
    isCurrentDay: false,
    isClaimed: true,
    date: "",
  },
  {
    weekDay: "Sunday",
    Title: "S",
    isCurrentDay: false,
    isClaimed: true,
    date: "",
  },
];
export const slides = ["Earn points", "Redeem rewards"];

export const rewardSlides = [
  {
    slide: "All Rewards",
    count: 8,
  },
  {
    slide: "Unlocked",
    count: 0,
  },
  {
    slide: "Locked",
    count: 0,
  },
  {
    slide: "Coming Soon",
    count: 0,
  },
];
