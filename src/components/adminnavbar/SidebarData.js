import React from "react";
import * as FaIcons from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { MdVerifiedUser } from "react-icons/md";
import { MdOutlineScreenSearchDesktop } from "react-icons/md";
const SidebarData = [
  {
    title: "Instructions",
    path: "/admin/dashboard",
    icon: <FaIcons.FaHandPointRight />,
  },
  {
    title: "Candidate Details",
    path: "/candidatedetails",
    icon: <MdOutlineScreenSearchDesktop />,
  },
  {
    title: "Approve Voter",
    path: "/approve/voter",
    icon: <MdVerifiedUser />,
  },
  {
    title: "Add Candidate",
    path: "/addcandidate",
    icon: <FaIcons.FaPlusSquare />,
  },
  {
    title: "Change State",
    path: "/changestate",
    icon: <FaIcons.FaEdit />,
  },
  {
    title: "Logout",
    path: "/logout",
    icon: <MdLogout />,
  },
];

export default SidebarData;
