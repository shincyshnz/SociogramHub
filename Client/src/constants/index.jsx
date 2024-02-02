import { HiChatAlt2, HiFilm, HiHome, HiOutlineBookmark, HiOutlineCog, HiOutlineHeart, HiOutlineSearch, HiPlus } from "react-icons/hi";
import { MdOutlineExplore } from "react-icons/md";
import { UserAvatar } from "../components";

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
        icon: <HiPlus className='ml-1 text-xl font-bold border-[3px] border-gray-900 rounded-md' />,
        route: "",
        label: "Create"
    },
    {
        icon: <UserAvatar size="25px"/>,
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

export const CUSTOM_RULES = {
    email: {
        required: "Email is required",
        pattern: {
            value: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
            message: 'Invalid email format.',
        },
    },
    fullname: {
        required: "Full Name is required",
        maxLength: {
            value: 20,
            message: 'Full Name must be of maximum 20 characters.',
        }
    },
    username: {
        required: "Username is required",
        maxLength: {
            value: 20,
            message: 'Username must be of maximum 20 characters.',
        }
    },
    password: {
        required: "password is required",
        minLength: {
            value: 6,
            message: "Password must be of minimum 6 character."
        }
    },
    confirmPassword: {
        required: "Confirm password required",
    },
    dob: {
        required: "Date of birth is required",
    },
    otp: {
        pattern: {
            value: /^[0-9]*$/,
        }
    },
    location: {
        type: String,
    },
}