import { HiChatAlt2, HiFilm, HiHome, HiOutlineBookmark, HiOutlineCog, HiOutlineHeart, HiOutlineSearch, HiPlus } from "react-icons/hi";
import { MdOutlineExplore } from "react-icons/md";
import UserAvatar from "../components/shared/UserAvatar";

export const sidebarLinks = [
    {
        icon: <HiHome />,
        route: "/",
        label: "Home"
    },
    {
        icon: <HiOutlineSearch />,
        route: "/search",
        label: "Search"
    },
    {
        icon: <MdOutlineExplore />,
        route: "/explore",
        label: "Explore"
    },
    {
        icon: <HiFilm />,
        route: "/reels",
        label: "Reels"
    },
    {
        icon: <HiChatAlt2 />,
        route: "/messages",
        label: "Messages"
    },
    {
        icon: <HiOutlineHeart />,
        route: "/notifications",
        label: "Notifications"
    },
    {
        icon: <HiPlus className=' border-2 border-gray-800 rounded-md' />,
        route: "",
        label: "Create"
    },
    {
        icon: <UserAvatar />,
        route: "/profile",
        label: "Profile"
    },
];
export const moreLinks = [
    {
        icon: <HiOutlineCog />,
        route: "/settings",
        label: "Settings"
    },
    {
        icon: <HiOutlineBookmark />,
        route: "/saved",
        label: "Saved"
    },

];