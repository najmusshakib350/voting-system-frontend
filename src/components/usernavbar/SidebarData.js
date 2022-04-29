import React from "react";
import * as FaIcons from "react-icons/fa";
import { MdOutlineHowToVote } from "react-icons/md";
import { MdLogout } from "react-icons/md";

const UserSidebarData = [
  {
    title: "Instructions",
    path: "/user/dashboard",
    icon: <FaIcons.FaHandPointRight />,
  },
  {
    title: "Voter Registration",
    path: "/voter/registration",
    icon: <FaIcons.FaUserEdit />,
  },
  {
    title: "Voting Area",
    path: "/votingarea",
    icon: <MdOutlineHowToVote />,
  },
  {
    title: "Result",
    path: "/result",
    icon: <FaIcons.FaRegCheckSquare />,
  },
  {
    title: "Logout",
    path: "/logout",
    icon: <MdLogout />,
  },
];

export default UserSidebarData;
