import { Fragment } from "react";
import Navbar from "./Navbar";
import ProfileSet from "../profile/ProfileSet";
function AdminProfileSet() {
  return (
    <Fragment>
      <Navbar />
      <ProfileSet />
    </Fragment>
  );
}

export default AdminProfileSet;
